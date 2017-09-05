<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('date_server')->default(null);
            $table->dateTime('datetime')->default(null);
            $table->dateTime('local_datetime')->default(null);
            $table->integer('receipt_no')->default(0);
            $table->integer('trace_no')->default(0);
            $table->string('comment', 200);
            $table->integer('terminalid')->default(0);
            $table->string('serial', 50);
            $table->integer('value')->default(0);
            $table->integer('type')->default(0);
            $table->integer('result')->default(0);
            $table->string('userref', 50);
            $table->boolean('id_country')->default(0);
            $table->string('country', 100);
            $table->integer('id_store')->default(0);
            $table->string('store', 100);
            $table->string('customer_store_id', 20);
            $table->integer('id_customer')->default(0);
            $table->string('customer', 100);
            $table->integer('id_division')->default(0);
            $table->string('division', 100);
            $table->integer('id_content_provider')->default(0);
            $table->string('content_provider', 100);
            $table->integer('id_provider')->default(0);
            $table->string('provider', 100);
            $table->string('ean', 100);
            $table->integer('id_products')->default(0);
            $table->string('product', 100);
            $table->boolean('id_currency')->default(0);
            $table->string('currency', 10);
            $table->string('latitude', 20)->default('');
            $table->string('longitude', 20)->default('');

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
        Schema::dropIfExists('transactions');
    }
}
