<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateApplicantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applicant', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('question1', 1000)->nullable();
            $table->string('question2', 1000)->nullable();
            $table->string('question3', 1000)->nullable();
            // Temporarily define question4 as text for table creation
            $table->text('question4')->nullable();
            $table->time('question1_start')->nullable();
            $table->time('question2_start')->nullable();
            $table->time('question3_start')->nullable();
            $table->time('question4_start')->nullable();
            $table->time('question1_end')->nullable();
            $table->time('question2_end')->nullable();
            $table->time('question3_end')->nullable();
            $table->time('question4_end')->nullable();
            $table->string('token')->nullable();
            $table->timestamps();
        });

        // Alter question4 column to VARCHAR(8000) using ALTER COLUMN syntax
        DB::statement("ALTER TABLE applicant ALTER COLUMN question4 VARCHAR(8000) NULL");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applicant');
    }
}
