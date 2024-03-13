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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 15)->nullable();
            $table->boolean('gender')->nullable();
            $table->date('dob')->nullable();
            $table->longText('address')->nullable();
            $table->string('long')->nullable();
            $table->string('lat')->nullable();
            $table->integer('jumlah_hafalan')->nullable();
            $table->string('sanad')->nullable();
            $table->string('jenis_pengajaran')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
