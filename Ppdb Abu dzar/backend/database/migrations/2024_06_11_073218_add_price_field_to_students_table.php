<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->string('order_id')->nullable();
            $table->string('status_payment')->nullable();
            $table->double('price')->nullable();
            $table->string('item_name')->nullable();
            $table->string('customer_first_name')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('checkout_link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            //
        });
    }
};
