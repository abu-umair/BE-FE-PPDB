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
        Schema::create('evaluasi_words', function (Blueprint $table) {
            $table->id();
            $table->integer('word_libraries_id'); //relasi
            $table->string('banner')->nullable();
            $table->string('question')->nullable();
            $table->string('question_audio')->nullable();
            $table->string('user_answer')->nullable();
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
        Schema::dropIfExists('evaluasi_words');
    }
};
