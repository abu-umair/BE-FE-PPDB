<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerificationApi extends Mailable
{
    use Queueable, SerializesModels;
    
    public $data; //utk menapung data yang passing dr ctrl lain, variable $data bs dipake di view
    public $otp;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data, $otp)
    {
        $this->data = $data; //variable send mail dari forgotpasswordcontroller.php
        $this->otp = $otp;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'One-Time Password (OTP)',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            // view: 'view.name',
            view: 'email.verification-bestari', //variable $data bisa dipake di sini
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
