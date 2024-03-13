@extends('layouts.admin')
@section('title','Teacher')

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
          {{-- <h1 class="m-0">Teacher</h1> --}}
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

  
  <section class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between">
          <h3 class="card-title">Teachers</h3>
          <a href="{{ route('teacher.create')}}"
           class="btn btn-sm btn-primary shadow-sm rounded">
           <i class="fas fa-plus fa-sm text-white-50"></i>
           Teacher
            </a>        
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="example1" class="table table-bordered table-striped ">
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Verified</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Jumlah Hafalan</th>
              <th>Sanad</th>
              <th>Online</th>
              <th>Offline</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
                @php $s=1; @endphp
                @forelse ($items as $item)
              <tr>
                <td>{{ $s }}</td>
                <td>{{ $item->name }}</td>
                <td>{!! $item->email_verified_at ? '<i class="fa-solid fa-circle-check text-success"></i>' : ''!!}</td>
                <td>{{ $item->phone }}</td>
                <td>{!! $item->gender == 1 ? '<i class="fa-solid fa-person text-success"></i>' : '' !!}</td>
                <td>{{ $item->jumlah_hafalan }}</td>
                <td>{{ $item->sanad }}</td>
                <td>{!! $item->online == 'on' ? '<i class="fa-solid fa-circle-check text-success"></i>' : ''!!}</td>
                <td>{!! $item->offline == 'on' ? '<i class="fa-solid fa-circle-check text-success"></i>' : ''!!}</td>
                <td class="text-center">
                  <a href="{{ route('teacher.edit', $item->id)}}" 
                    class="btn btn-info">
                    <i class="fa fa-pencil-alt"></i>
                  </a>

                  <a href="{{ route('teacher.show', $item->id)}}" 
                    class="btn btn-success">
                    <i class="fa-solid fa-eye"></i>
                  </a>
                  
                  <form action="{{ route('change_status', $item->id) }}"
                      method="POST" class="d-inline" id="data-{{ $item->id }}">
                      @csrf
                      @method('delete')
                  </form>
                  <button class="btn btn-warning" onclick="changeStatus( {{ $item->id }} )" > 
                    <i class="fa-solid fa-spinner"></i>
                  </button>
                      
                  <form action="{{ route('teacher.destroy', $item->id) }}"
                    method="POST" class="d-inline" id="dataPermanen-{{ $item->id }}">
                    @csrf
                    @method('delete')
                  </form>
                  <button class="btn btn-danger" onclick="deleteRowPermanen( {{ $item->id }} )" > 
                    <i class="fa fa-trash"></i> 
                  </button>
                </td>
                @php $s++; @endphp
                @empty
                <td colspan="8" class="text-center">
                @endforelse
              </tr>
            </tbody>
            
          </table>
        </div>
        <!-- /.card-body -->
      </div>
    </div>
  </section>
  
@endsection

@push('prepend-script')

@endpush

@push('addon-script')
<!-- DataTables  & Plugins -->
<script src="{{url('backend/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
<script src="{{url('backend/plugins/jszip/jszip.min.js')}}"></script>
<script src="{{url('backend/plugins/pdfmake/pdfmake.min.js')}}"></script>
<script src="{{url('backend/plugins/pdfmake/vfs_fonts.js')}}"></script>
<script src="{{url('backend/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
<script src="{{url('backend/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>

<!-- Page specific script -->
<script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
  });
</script>



@endpush
