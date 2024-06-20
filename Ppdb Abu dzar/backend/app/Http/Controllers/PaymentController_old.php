<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        $params = array(
            'transaction_details' => array(
                'order_id' => Str::uuid(),
                'gross_amount' => $request->price
            ),
            'item_details' => array(
                array(
                    'price' => $request->price,
                    'quantity' => 1,
                    'name' => $request->item_name,
                )
            ),
            'customer_details' => array(
                'first_name' => $request->customer_first_name,
                'email' => $request->customer_email
            ),
            'enabled_payments' => array('credit_card', 'bca_va', 'bni_va', 'bri_va')
        );

        $auth = base64_encode(env('MIDTRANS_SERVER_KEY'));

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => "Basic $auth",
        ])->post('https://app.sandbox.midtrans.com/snap/v1/transactions', $params);

        $response = json_decode($response->body());
        // Save to DB
        $payment = new Payment;
        $payment->order_id = $params['transaction_details']['order_id'];
        $payment->status = 'pending';
        $payment->price = $request->price;
        $payment->customer_first_name = $request->customer_first_name;
        $payment->customer_email = $request->customer_email;
        $payment->item_name = $request->item_name;
        $payment->checkout_link = $response->redirect_url;
        // $payment->checkout_link = 'test';
        $payment->save();

        return response()->json($response);
    }

    public function webhook(Request $request)
    {
        $auth = base64_encode(env('MIDTRANS_SERVER_KEY'));
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => "Basic $auth",
        ])->get("https://api.sandbox.midtrans.com/v2/$request->order_id/status");

        $response = json_decode($response->body());

        // Check to DB
        $payment = Payment::where('order_id', $response->order_id)->firstOrFail();

        if ($payment->status === 'settlement' || $payment->status === 'capture') {
            return response()->json('Payment has been already processed');
        }

        if ($response->transaction_status === 'capture') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status = 'capture';
        } else if ($response->transaction_status === 'settlement') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status = 'settlement';
        } else if ($response->transaction_status === 'pending') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status = 'pending';
        } else if ($response->transaction_status === 'deny') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status = 'deny';
        } else if ($response->transaction_status === 'expire') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status = 'expire';
        } else if ($response->transaction_status === 'cancel') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status = 'cancel';
        }

        $payment->save();

        return response()->json('success');
    }
}
