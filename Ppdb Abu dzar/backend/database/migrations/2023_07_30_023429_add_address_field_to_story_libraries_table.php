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
        Schema::table('story_libraries', function (Blueprint $table) {
            $table->string('video1')->nullable();
            $table->string('video2')->nullable();
            $table->string('video3')->nullable();
            $table->string('video4')->nullable();
            $table->string('gambar1')->nullable();
            $table->string('gambar2')->nullable();
            $table->string('gambar3')->nullable();
            $table->string('gambar4')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('story_libraries', function (Blueprint $table) {
            //
        });
    }
};
