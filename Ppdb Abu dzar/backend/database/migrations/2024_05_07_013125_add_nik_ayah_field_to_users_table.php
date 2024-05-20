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
            $table->integer('nik_ayah')->nullable();
            $table->string('pekerjaan_ayah')->nullable();
            $table->date('dob_ayah')->nullable();
            $table->string('kota_lahir_ayah')->nullable();
            $table->string('penghasilan_ayah')->nullable();
            $table->string('phone_ayah')->nullable();
            $table->string('name_ibu')->nullable();
            $table->integer('nik_ibu')->nullable();
            $table->string('pekerjaan_ibu')->nullable();
            $table->date('dob_ibu')->nullable();
            $table->string('kota_lahir_ibu')->nullable();
            $table->string('penghasilan_ibu')->nullable();
            $table->string('phone_ibu')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten_kota')->nullable();
            $table->string('provinsi')->nullable();
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
