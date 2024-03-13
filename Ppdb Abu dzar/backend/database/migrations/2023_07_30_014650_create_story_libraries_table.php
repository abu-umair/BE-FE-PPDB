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
        Schema::create('story_libraries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date');
            $table->string('level');
            $table->string('program');
            $table->string('type');
            $table->string('banner');
            $table->integer('urls'); //relation parent
            $table->string('body');
            $table->integer('evaluasi'); //relation parent
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
        Schema::dropIfExists('story_libraries');
    }
};
