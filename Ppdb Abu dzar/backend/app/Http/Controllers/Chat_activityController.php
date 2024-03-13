<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Chat_activity;
use App\Models\Libraryword_user;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Chat_activityController extends Controller
{

    public function index()
    {
        $items = Chat_activity::all();
        return response()->json([
            'data'          => $items,
            'message'       => "true"

        ], 200);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        try {
            $item = Chat_activity::create($data);
            return response()->json([
                'data'          => $item,
                'message'       => "true"

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e,
                'message'       => "false"

            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Chat_activity::find($id);


        return response()->json([
            'data'          => $item,
            'message'       => "true"

        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $item = Chat_activity::findOrFail($id);

        try {

            $item->update($data);
            return response()->json([
                'data'          => $item,
                'message'       => "true"

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e,
                'message'       => "false"

            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Chat_activity::findOrFail($id);

        try {

            $item->delete();

            return response()->json([
                'data'          => $item,
                'message'       => "true"

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e,
                'message'       => "false"

            ]);
        }
    }

    public function show_roomid($id)
    {
        $item = Chat_activity::where('room_id', $id)->get();


        return response()->json([
            'data'          => $item,
            'message'       => "true"

        ], 200);
    }

    public function show_id_staff($id)
    {
        $item = Chat_activity::where('id_staff', $id)->get();


        return response()->json([
            'data'          => $item,
            'message'       => "true"

        ], 200);
    }

    public function show_status($id)
    {
        $item = Chat_activity::where('status', $id)->get();


        return response()->json([
            'data'          => $item,
            'message'       => "true"

        ], 200);
    }
}
