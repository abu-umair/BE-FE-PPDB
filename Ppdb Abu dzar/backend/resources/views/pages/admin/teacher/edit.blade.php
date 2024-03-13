@extends('layouts.admin')
@section('title','Teacher - Dashboard')

@push('prepend-style')
@endpush

@push('addon-style')
  <!-- iCheck for checkboxes and radio inputs -->
  <link rel="stylesheet" href="{{url('backend/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">

  <!-- map leaft js -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@3.3.2/dist/geosearch.css" />
  <!-- map leaft js -->
@endpush

@section('content')
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          {{-- <h1 class="m-0">Dashboard</h1> --}}
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            {{-- <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Dashboard v1</li> --}}
          </ol>
        </div>
      </div>
    </div>
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      @if(session()->has('message')) 
      <div class="alert alert-danger alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h5><i class="icon fas fa-ban"></i> Alert!</h5>
        {{session('message')}}
      </div>
      @endif 
        <div class="card card-info">
            <div class="card-header">
              <h3 class="card-title">Edit teacher data</h3>
            </div>
            <form action="{{ route('teacher.update', $item->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="card-body">
              <div class="form-group">
            <img class="img-thumbnail" id="output" src="{!!$item->image ? Storage::url($item->image) : url('backend/assets/img/news/img11.jpg') !!}" alt="Responsive image" width="300">
              </div>
                <div class="form-group">
                  <label for="image">File input</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input @error('image') is-invalid @enderror" id="image" name="image" onchange="loadFile(event)">
                      <label class="custom-file-label" for="image">Choose file</label>
                    </div>
                    <div class="input-group-append">
                      <span class="input-group-text">Upload</span>
                    </div>
                  </div>
                  @error('image')<span class="error invalid-feedback">{{ $message }}</span>@enderror
                </div>
                
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input type="text" class="form-control @error('name') is-invalid @enderror" value="{{ $item->name }}" id="Name" name="name" placeholder="Enter Name" required>
                  @error('name') <span class="error invalid-feedback">{{ $message }} </span> @enderror
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" class="form-control @error('email') is-invalid @enderror" value="{{ $item->email }}" id="email" name="email" placeholder="Enter email" required>
                  @error('email') <span class="error invalid-feedback">{{ $message }} </span> @enderror
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control @error('password') is-invalid @enderror" id="password" name="password" placeholder="Password" value="aabbccdd" required>
                  @error('password') <span class="error invalid-feedback">{{ $message }} </span> @enderror
                </div>
                <div class="form-group">
                  <label for="password_confirmation">Password Confirmation</label>
                  <input type="password" class="form-control @error('password_confirmation') is-invalid @enderror" id="password_confirmation" name="password_confirmation" value="aabbccdd" placeholder="Enter Password Confirmation" required>
                  @error('password') <span class="error invalid-feedback">{{ $message }} </span> @enderror
                </div>
                <div class="form-group">
                  <label for="Phone">Phone</label>
                  <input type="text" class="form-control @error('phone') is-invalid @enderror" value="{{ $item->phone }}" id="Phone" name="phone" placeholder="Enter Phone" required>
                  @error('phone') <span class="error invalid-feedback">{{ $message }} </span> @enderror
                </div>
                <div class="form-group">
                  <label for="Gender">Gender</label>
                  <select class="form-control @error('gender') is-invalid @enderror" id="Gender" name="gender" required>
                    <option value="1">Laki-laki</option>
                    <option value="2">Wanita</option>
                  </select>
                  @error('gender') <span class="error invalid-feedback">{{ $message }} </span> @enderror
                </div>
                <div class="form-group">
                  <label for="dob">DOB</label>
                  <input type="date" class="form-control" value="{{ $item->dob }}" id="dob" name="dob" placeholder="Enter DOB">
                </div>
                <div class="form-group">
                  <label>Address</label>
                  <textarea class="form-control" rows="3" name="address" placeholder="Enter ..." required>{{ $item->address }}</textarea>
                </div>

                <div id="map" style="height: 400px;"></div>

                <div class="form-group">
                  <label for="lat">Lat</label>
                  <input type="text" class="form-control" value="{{ $item->lat }}" id="lat" name="lat">
                </div>

                <div class="form-group">
                  <label for="long">Long</label>
                  <input type="text" class="form-control" value="{{ $item->long }}" id="long" name="long">
                </div>
                
                <div class="form-group">
                  <label for="jumlah_hafalan">Jumlah Hafalan</label>
                  <input type="number" class="form-control" value="{{ $item->jumlah_hafalan }}" id="jumlah_hafalan" name="jumlah_hafalan" placeholder="Enter Jumlah Hafalan">
                </div>
                <div class="form-group">
                  <label for="jenis_pengajaran">Jenis Pengajaran</label>
                  <div class="form-group clearfix">
                    <div class="icheck-success d-inline">
                      <input type="checkbox" @if ($item->online) checked @endif id="checkboxSuccess1" name="online">
                      <label for="checkboxSuccess1">
                        Online
                      </label>
                    </div>
                    <br>
                    <div class="icheck-success d-inline">
                      <input type="checkbox" @if ($item->offline) checked @endif id="checkboxSuccess2" name="offline">
                      <label for="checkboxSuccess2">
                        Offline
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer">
                <button type="submit" class="btn btn-primary">
                  <i class="fa-solid fa-pencil text-white-50"></i>
                  Update
                </button>
              </div>
            </form>
          </div>
    </div>
  </section>
@endsection

@push('prepend-script')
@endpush

@push('addon-script')
 <!-- image view -->

<script>
  var loadFile = function (event) {
    // alert('ok');
    var ouput = document.getElementById('output');
    ouput.src = URL.createObjectURL(event.target.files[0]);
  };
</script>

 <!-- map leaft js --> 
 <script>
  var lat  = {{ $item->lat }};
  var long = {{ $item->long }};

</script>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
<script src="https://unpkg.com/leaflet-geosearch@3.3.2/dist/geosearch.umd.js"></script>
<script src="{{url('backend/assets/leafletjs2.js')}}">

</script>
 <!-- map leaft js -->

@endpush
