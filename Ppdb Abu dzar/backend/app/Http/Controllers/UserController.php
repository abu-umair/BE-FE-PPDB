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
        $items = User_custom::all();
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

        $jumlahHari = 0;

        if ($item->accumulated_expired !== null) {
            $targetTanggal = Carbon::createFromFormat('Y-m-d', $item->accumulated_expired);
            $hariIni = Carbon::now();

            // Periksa apakah target tanggal lebih besar dari hari ini
            if ($targetTanggal->isAfter($hariIni)) {
                // Menghitung selisih hari
                $selisihHari = $hariIni->diffInDays($targetTanggal);
                // Tampilkan hasil
                $jumlahHari =  $selisihHari;
            }
        }



        return response()->json([
            'data'                  => $item,
            'jumlahHariExpired'     => $jumlahHari,
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
            'roles'             => 'nullable|max:30|in:USER,ADMIN,STAFF',
        ]);

        $data = $request->all();
        $item = User_custom::findOrFail($id);


        try {

            if (request('password')) {
                if (request('password_now')) {
                    if (Hash::check(request('password_now'), $item->password)) {
                        $data['password'] = Hash::make(request('password'));
                    } else {
                        return response()->json([
                            'message'          => 'Password saat ini tidak sesuai, mohon dicek kembali'
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

    // public function landingpage()
    // {
    //     $items = User_custom::all();
    //     return response()->json([
    //         'data'          => $items
    //     ], 200);
    // }
}
