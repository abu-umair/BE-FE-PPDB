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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->integer('no_kk')->nullable();
            $table->integer('nik_siswa')->nullable();
            $table->integer('nisn')->nullable();
            $table->date('dob_ayah')->nullable();
            $table->string('kota_lahir')->nullable();
            $table->boolean('jenis_kelamin')->nullable();
            $table->string('phone_santri')->nullable();
            $table->string('asal_sekolah')->nullable();
            $table->integer('anak_ke')->nullable();
            $table->integer('jumlah_saudara')->nullable();
            $table->integer('tinggi_badan')->nullable();
            $table->integer('berat_badan')->nullable();
            $table->string('status_dalam_keluarga')->nullable();
            $table->string('riwayat_penyakit')->nullable();
            $table->string('jenis_tempat_tinggal')->nullable();
            $table->string('transportasi')->nullable();
            $table->string('pas_photo')->nullable();
            $table->string('akta_lahir')->nullable();
            $table->string('kk')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
};
