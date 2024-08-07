<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        $biaya_admin =6000;
        $params = array(
            'transaction_details' => array(
                'order_id' => Str::uuid(),
                'gross_amount' => $request->price + $biaya_admin
            ),
            'item_details' => array(
                array(
                    'price' => $request->price,
                    'quantity' => 1,
                    'name' => $request->item_name,
                ),
                array(
                    'price' => $biaya_admin,
                    'quantity' => 1,
                    'name' => 'Biaya Admin',
                )

            ),
            'customer_details' => array(
                'first_name' => $request->customer_first_name,
                'email' => $request->customer_email
            ),
            'enabled_payments' => array(
                // "credit_card",
                // "gopay",
                // "shopeepay",
                "permata_va",
                "bca_va",
                "bni_va",
                "bri_va",
                // "echannel",
                "other_va",
                "Indomaret",
                "alfamart",
                // "akulaku"
                // "qris",
                "gopay",
            ),
            'expiry' => array(
                // "start_time": "2020-04-13 18:11:08 +0700",
                "unit" => "day",
                "duration" => 180
            ),
            // 'qris' => array(
            //     "acquirer" => "gopay",
            // ),

        );

        $auth = base64_encode(env('MIDTRANS_SERVER_KEY'));

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Authorization' => "Basic $auth",
        ])->post('https://app.sandbox.midtrans.com/snap/v1/transactions', $params);

        $responseData = json_decode($response->body());
        // return response()->json(['url' => $responseData], 200);


        if (isset($responseData->redirect_url) && !empty($responseData->redirect_url)) {
            // Save to DB
            $payment = Student::find($request->id);

            if ($payment) {
                // Jika entri ditemukan, perbarui data
                $payment->order_id = $params['transaction_details']['order_id'];
                $payment->status_payment = 'pending';
                $payment->price = $request->price;
                $payment->customer_first_name = $request->customer_first_name;
                $payment->customer_email = $request->customer_email;
                $payment->item_name = $request->item_name;
                $payment->checkout_link = $responseData->redirect_url;
                // $payment->checkout_link = 'test';
                $payment->save();
                // return response()->json($responseData->redirect_url);
                return response()->json($responseData);
            } else {
                // Jika entri tidak ditemukan, Anda bisa mengembalikan respons kesalahan atau membuat entri baru
                return response()->json(['error' => 'Student not found'], 404);
            }
            return response()->json(['error' => 'Redirect url not found'], 404);
        }
        // $payment = new Student;
        // $payment->order_id = $params['transaction_details']['order_id'];
        // $payment->status_payment = 'pending';
        // $payment->price = $request->price;
        // $payment->customer_first_name = $request->customer_first_name;
        // $payment->customer_email = $request->customer_email;
        // $payment->item_name = $request->item_name;
        // $payment->checkout_link = $response->redirect_url;
        // $payment->checkout_link = 'test';
        // $payment->save();

        // return response()->json($responseData);
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
        $payment = Student::where('order_id', $response->order_id)->firstOrFail();

        if ($payment->status_payment === 'settlement' || $payment->status_payment === 'capture') {
            return response()->json('Payment has been already processed');
        }

        if ($response->transaction_status === 'capture') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status_payment = 'capture';
        } else if ($response->transaction_status === 'settlement') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status_payment = 'settlement';
        } else if ($response->transaction_status === 'pending') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status_payment = 'pending';
        } else if ($response->transaction_status === 'deny') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status_payment = 'deny';
        } else if ($response->transaction_status === 'expire') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status_payment = 'expire';
        } else if ($response->transaction_status === 'cancel') {
            // misal memasukkan atau mengirimkan link dari pembelian ke customer
            $payment->status_payment = 'cancel';
        }

        $payment->save();

        return response()->json('success');
    }
}
