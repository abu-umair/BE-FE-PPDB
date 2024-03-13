<!DOCTYPE html>
<html lang="en">
{{-- <html lang="{{ str_replace('_', '-', app()->getLocale()) }}"> --}}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{csrf_token()}}">
  <title>@yield('title')</title>

  @stack('prepend-style')
  
  @include('includes.admin.style')

  @stack('addon-style')

</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__shake" src="{{url('backend/dist/img/AdminLTELogo.png')}}" alt="AdminLTELogo" height="60" width="60">
  </div>

  @include('sweetalert::alert')
  
  @include('includes.admin.navbar')
  

  @include('includes.admin.sidebar')


  <div class="content-wrapper">

    @yield('content')

  </div>

  @include('includes.admin.footer')
  

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</div>



@stack('prepend-script')

@include('includes.admin.script')

@stack('addon-script')

</body>
</html>
