<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Purchase_card;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class Purchase_cardController extends Controller
{

    public function index()
    {
        $items = Purchase_card::with([
            'user', 'product'
        ])->get();
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
        // $request->file('image') != null ? $data['image'] = $request->file('image')->store('assets/gallery', 'public') : $data['image'] = null;
        // return response()->json([
        //     'data'          => $data
        // ]);
        try {
            $item = Purchase_card::create($data);
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
        $item = Purchase_card::with([
            'user', 'product'
        ])->find($id);

        
        return response()->json([
            'data'          => $item,
            'message'       => "true"

        ], 200);
    }

    public function show_by_user_id($id)
    {
        $item = Purchase_card::with([
            'user', 'product'
        ])->where('users_id',$id)->get();

        
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
    public function update(ProductRequest $request, $id)
    {
        $data = $request->all();

        $item = Purchase_card::findOrFail($id);

        try {
            // if ($request->file('banner') != null) {
            //     $data['banner'] = $request->file('banner')->store('assets/gallery', 'public');

            //     //delete image
            //     if (File::exists(('storage/' . $item->banner))) {
            //         File::delete('storage/' . $item->banner);
            //     }
            // }

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
        $item = Purchase_card::findOrFail($id);

        try {
            //delete image
            // if (File::exists(('storage/' . $item->banner))) {
            //     File::delete('storage/' . $item->banner);
            // }
            
            // delete Libraryword_user
            // if ($libraryword_user = Libraryword_user::where('word_libraries_id', $id)) {
            //     $libraryword_user->delete();
            // }

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

    public function activate_card($code)
    {
        // $item = Purchase_card::where('card_code',$code)->update(['status' => "true"]);
        $item = Purchase_card::where('card_code',$code)->first();
        if(!$item) {
            return response()->json([
                'message'       => "invalid code"
            ], 401);
        }
        elseif ($item->status == "true") {
            return response()->json([
                'message'       =>  "The Card with this serial number already activate"
            ], 401);
        }
        elseif($item->status ==null || $item->status == "false"){
            $item->status = "true";
            $item->save(); 
           if ($item) {
            return response()->json([
                'message'       => "true"
            ], 200);
           } 
        }
        
        
    }

    // public function search(Request $request)
    // {
    //     $title = $request->input('title');
    //     $search = Purchase_card::with([
    //         'evaluasi_audio_word', 'evaluasi_word'
    //         // 'evaluasi_word.option_evaluasi_word'
    //         // 'evaluasi_audio_word', 'evaluasi_word.option_evaluasi_word' => fn ($q) => $q->latest()
    //     ])
    //     ->where('title', 'LIKE', '%'.$title.'%')->get();
    //     return response()->json([
    //         'data'          => $search
    //     ]);
    // }
}
