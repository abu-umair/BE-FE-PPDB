<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordApi;
use App\Mail\VerificationApi;
use App\Models\Student;
use JWTAuth;
use Seshac\Otp\Otp;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTFactory;
use App\Models\User;
use App\Models\User_custom;
use GrahamCampbell\ResultType\Success;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        //'auth:api': harus diberi authentic kecuali login & register tdk perlu uthentic API
        // $this->middleware(['auth:api', 'verified'], ['except' => ['login', 'register', 'verify', 'notice', 'resend','otp']]);
        $this->middleware(['auth:api'], ['except' => ['login', 'register', 'verify', 'notice', 'resend', 'otp', 'reset_password_with_email', 'user_without_auth']]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'name'          => 'required',
            'email'         => 'required|email|unique:users',
            'password'      => 'required',
            'roles'         => 'nullable|in:USER,ADMIN',
            'photo'         => 'nullable|image',
        ]);

        if ($validator->fails()) {
            // return response()->json(['message' => 'pendaftaran gagal']);
            // return response()->json($validator->messages());
            // return response()->json($validator->messages(), 422);
            return response()->json(['errors' => $validator->messages()], 422);
        }

        $request->file('photo') != null ? $data['image'] = $request->file('photo')->store('assets/gallery', 'public') : $data['image'] = null;
        request('roles') ? $data['roles'] = request('roles') : $data['roles'] = 'USER';

        $user = User::create([
            'name'          => request('name'),
            'email'         => request('email'),
            'password'      => Hash::make(request('password')),
            'roles'         => $data['roles'],
            'image'         => $data['image'],
        ]);

        if ($data['roles'] === 'USER') {
            Student::create([
                'users_id'          => $user->id,
                'biaya'             => request('biaya'),
                'jenjang'             => request('jenjang'),
            ]);
        }

        // token
        $credentials = request(['email', 'password']);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // $user->sendEmailVerificationNotification(); default email laravel


        if ($user) {
            $item = User_custom::findOrFail($user->id);
            unset($item['password']);

            return response()->json([
                'user' => $item,
                'token'     => $token,
                'message' => 'pendaftaran success',
            ], 200);
        } else {
            return response()->json(['message' => 'pendaftaran gagal'], 422);
        }
    }

    public function otp($id)
    {
        $user = User_custom::findOrFail($id);

        $identifier = Str::random(12);
        $otp =  Otp::setValidity(30)  // otp validity time in mins
            ->setLength(4)  // Lenght of the generated otp
            ->setMaximumOtpsAllowed(100) // Number of times allowed to regenerate otps
            ->setOnlyDigits(true)  // generated otp contains mixed characters ex:ad2312
            ->setUseSameToken(false) // if you re-generate OTP, you will get same token
            ->generate($identifier);


        Mail::to($user)->send(
            new VerificationApi($user, $otp)
        );

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'otp' => $otp,
        ]);
    }

    public function reset_password_with_email($id) //$id = email
    {
        try {
            $user = User_custom::where('email', $id)->first();
            $user = User_custom::findOrFail($user->id);

            $identifier = Str::random(12);
            $otp =  Otp::setValidity(30)  // otp validity time in mins
                ->setLength(6)  // Lenght of the generated otp
                ->setMaximumOtpsAllowed(100) // Number of times allowed to regenerate otps
                ->setOnlyDigits(true)  // generated otp contains mixed characters ex:ad2312
                ->setUseSameToken(false) // if you re-generate OTP, you will get same token
                ->generate($identifier);

            $user->update([
                'password' => Hash::make($otp->token)
            ]);
            Mail::to($user)->send(
                new ResetPasswordApi($user, $otp)
            );

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                ],
                // 'password' => $otp->token,
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'data'          => $e
            ], 401);
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        $user = User_custom::where('email', request('email'))->get();

        // $token = JWTAuth::attempt($credentials);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // return $this->respondWithToken($token);
        return response()->json(([
            'message'                  => 'login success',
            'token'                    => $token,
            'id'                       => $user->first()->id,
            'name'                     => $user->first()->name,
            'email_verified_at'        => $user->first()->email_verified_at,
            'email'                    => $user->first()->email,
            'address'                  => $user->first()->address,
            'phone'                    => $user->first()->phone,
            'city'                     => $user->first()->city,
            'zip_code'                 => $user->first()->zip_code,
            'image'                    => $user->first()->image,
            'roles'                    => $user->first()->roles,

        ]));
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    public function verify($id, Request $request)
    {
        // if (!$request->hasValidSignature()) {
        //     return response()->json([
        //         'status'    => false,
        //         'message'   => 'Verifying email fails'
        //     ], 400);
        // }

        $user = User::find($id);

        if (!$user->hasVerifiedEmail()) { //jika usernya belum di verifikasi
            $user->markEmailAsVerified(); //maka akan diberikan tanggal & jam
        }

        // return redirect()->to('/');
        return response()->json($user);
    }

    public function notice()
    {
        return response()->json([
            'status'    => false,
            'message'   => 'Anda belum melakukan verifikasi email'
        ],  400);
    }

    public function resend()
    {
        if (auth('api')->user()->hasVerifiedEmail()) { //jika user telah melakukan verified email (email_verified_at)
            return response()->json([
                'status'    => true,
                'message'   => 'Email sudah diverifikasi'
            ], 200);
        }

        auth('api')->user()->sendEmailVerificationNotification();

        return response()->json([
            'status'    => true,
            'message'   => 'Link verifikasi email sudah dikirim ke email anda'
        ], 200);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 525600
        ]);
    }

    public function user_without_auth()
    {
        $items = User_custom::with([
            'staff', 'owner'
        ])->get();
        // unset($items['password']);
        return response()->json([
            'data'          => $items
        ], 200);
    }
}
