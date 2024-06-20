<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Xenditpayment;
use Illuminate\Http\Request;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;
use Illuminate\Support\Str;


class XenditpaymentController extends Controller
{
    var $apiInstance = null;

    public function __construct()
    {
        Configuration::setXenditKey("xnd_development_pB5l7ecyfloar6uSUpPcHKVpXD1mYGf3ek6719W4An2IeEFQWU60JVl5BaEZ");
        $this->apiInstance = new InvoiceApi();
    }

    public function store(Request $request)
    {
        $create_invoice_request = new \Xendit\Invoice\CreateInvoiceRequest([
            'external_id' => (string) Str::uuid(),
            'description' => $request->description,
            'amount' => $request->amount,
            'payer_email' => $request->payer_email,
        ]);
        $result = $this->apiInstance->createInvoice($create_invoice_request);

        // Save to database
        $payment = new Xenditpayment();
        $payment->status = 'pending';
        $payment->checkout_link = $result['invoice_url'];
        $payment->external_id = $create_invoice_request['external_id'];
        $payment->save();

        return response()->json($payment);
    }

    public function notification(Request $request)
    {
        $result = $this->apiInstance->getInvoices(null, $request->external_id);

        // Get data
        $payment = Xenditpayment::where('external_id', $request->external_id)->firstOrFail();

        if ($payment->status == 'settled') {
            return response()->json('Payment anda telah di proses');
        }

        // update status
        $payment->status = strtolower($result[0]['status']);
        $payment->save();

        return response()->json('Success');
    }
}
