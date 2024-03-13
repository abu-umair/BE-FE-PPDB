@extends('layouts.admin')
@section('title','Credits')

@push('prepend-style')
 <!-- DataTables -->
 <link rel="stylesheet" href="{{url('backend/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
 <link rel="stylesheet" href="{{url('backend/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}">
 <link rel="stylesheet" href="{{url('backend/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}">
@endpush

@push('addon-style')
@endpush

@section('content')
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
          </ol>
        </div>
      </div>
    </div>
  </div>
  <!-- /.content-header -->

  
  <section class="content">
    <div class="container-fluid">
      {{-- <div class="card"> --}}
        <div class="row">
            <div class="col-lg-3 col-6">
              <div class="small-box bg-success">
                <div class="inner">
                  <h3>Admin LTE <sup style="font-size: 20px"></sup></h3>
                  <p>Template Admin</p>
                </div>
                <a href="https://adminlte.io/" target="_blank" class="small-box-footer">
                  More info <i class="fas fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
        </div>
      {{-- </div> --}}
    </div>
  </section>
  
@endsection

@push('prepend-script')
@endpush

@push('addon-script')
@endpush
