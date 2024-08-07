<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class StudentController extends Controller
{

    public function index()
    {
        $items = Student::with(['user'])->get();
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
    public function store(Request $request)
    {
        $data = $request->all();
        $request->file('pas_photo') != null ? $data['pas_photo'] = $request->file('pas_photo')->store('assets/gallery', 'public') : $data['pas_photo'] = null;
        $request->file('kk') != null ? $data['kk'] = $request->file('kk')->store('assets/gallery', 'public') : $data['kk'] = null;
        $request->file('akta_lahir') != null ? $data['akta_lahir'] = $request->file('akta_lahir')->store('assets/gallery', 'public') : $data['akta_lahir'] = null;
        // $data['password'] = Hash::make(request('password'));


        try {
            $item = Student::create($data);
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
        $item = Student::with([
            'user'
        ])->where('users_id', $id)->first();

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

    public function updateNote(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $student->note = $request->note;
        $student->save();

        return response()->json(['message' => 'Note updated successfully']);
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
        $item = Student::findOrFail($id);


        try {



            if ($request->file('pas_photo') != null) {
                $data['pas_photo'] = $request->file('pas_photo')->store('assets/gallery', 'public');
                if (File::exists(('storage/' . $item->pas_photo))) {
                    File::delete('storage/' . $item->pas_photo);
                }
            }

            if ($request->file('kk') != null) {
                $data['kk'] = $request->file('kk')->store('assets/gallery', 'public');
                if (File::exists(('storage/' . $item->kk))) {
                    File::delete('storage/' . $item->kk);
                }
            }

            if ($request->file('akta_lahir') != null) {
                $data['akta_lahir'] = $request->file('akta_lahir')->store('assets/gallery', 'public');
                if (File::exists(('storage/' . $item->akta_lahir))) {
                    File::delete('storage/' . $item->akta_lahir);
                }
            }

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
        $item = Student::findOrFail($id);

        try {
            if (File::exists(('storage/' . $item->pas_photo))) {
                File::delete('storage/' . $item->pas_photo);
            }
            if (File::exists(('storage/' . $item->kk))) {
                File::delete('storage/' . $item->kk);
            }
            if (File::exists(('storage/' . $item->akta_lahir))) {
                File::delete('storage/' . $item->akta_lahir);
            }

            $item->delete();

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
