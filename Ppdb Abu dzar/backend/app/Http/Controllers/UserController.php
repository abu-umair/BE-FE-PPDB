<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User_custom;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserController extends Controller
{

    public function index()
    {
        $items = User_custom::with(['student'])->get();
        // unset($items['password']);
        return response()->json([
            'data'          => $items
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
    public function store(UserRequest $request)
    {
        $data = $request->all();
        $request->file('image') != null ? $data['image'] = $request->file('image')->store('assets/gallery', 'public') : $data['image'] = null;
        $data['password'] = Hash::make(request('password'));


        try {
            $item = User_custom::create($data);
            unset($item['password']);
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
        $item = User_custom::findOrFail($id);
        unset($item['password']);

        return response()->json([
            'data'                  => $item,
            'message'               => "true"

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

        $request->validate([
            'image'             => 'nullable|image',
            'name'              => 'required|max:255',
            'password_now'      => 'nullable|string|min:6',
            'email'             => 'required|max:255|unique:users,id,' . $id,
            'password'          => 'nullable|string|min:6',
            'roles'             => 'nullable|max:30|in:USER,ADMIN',
        ]);

        $data = $request->all();
        $item = User_custom::findOrFail($id);
        // Ambil password asli dari database
        $originalPassword = $item->getAttributes()['password'];

        try {
            if (request('password')) {
                if (request('password_now')) {
                    // if (Hash::check('111111', $item->password)) {
                    if (Hash::check(request('password_now'), $originalPassword)) {
                        $data['password'] = Hash::make(request('password'));
                    } else {
                        return response()->json([
                            'message'          => 'Password tidak sesuai'
                        ], 401);
                    }
                    unset($data['password_now']); //menghapus 1 request (password_now)
                }
                $data['password'] = Hash::make(request('password'));
            }

            if ($request->file('image') != null) {
                $data['image'] = $request->file('image')->store('assets/gallery', 'public');
                //delete image
                if (File::exists(('storage/' . $item->image))) {
                    File::delete('storage/' . $item->image);
                }
            }

            $item->update($data);
            unset($item['password']); //menghapus 1 request (password)
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
        $item = User_custom::findOrFail($id);

        try {
            //delete image
            if (File::exists(('storage/' . $item->image))) {
                File::delete('storage/' . $item->image);
            }

            $item->delete();
            unset($item['password']);

            return response()->json([
                'data'          => $item
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e
            ]);
        }
    }
}
