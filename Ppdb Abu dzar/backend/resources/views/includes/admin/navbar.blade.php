<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="{{url('backend/index3.html')}}" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" id="inputSearch" type="" name="" placeholder="Searching" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="w-100" style="position: absolute; z-index: 9999; margin-top: 35px;">
                <div class="list-group style-search-me" id="searchResult" style="display: none;">
                  {{-- <a href="#" class="list-group-item list-group-item-action">
                    Cras justo odio
                  </a>
                  <a href="#" class="list-group-item list-group-item-action disabled" id="list-me"><small> Dapibus ac facilisis in</small></a>
                  <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
                  <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a> --}}
                  
                </div>
              </div>
            </div>
          </form>
        </div>
      </li>

      <!-- Messages Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-comments"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="{{url('backend/dist/img/user1-128x128.jpg')}}" alt="User Avatar" class="img-size-50 mr-3 img-circle">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="{{url('backend/dist/img/user8-128x128.jpg')}}" alt="User Avatar" class="img-size-50 img-circle mr-3">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  John Pierce
                  <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">I got your message bro</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <!-- Message Start -->
            <div class="media">
              <img src="{{url('backend/dist/img/user3-128x128.jpg')}}" alt="User Avatar" class="img-size-50 img-circle mr-3">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Nora Silvester
                  <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">The subject goes here</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            <!-- Message End -->
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link " data-toggle="dropdown" href="#" id="notifclick">
          <i class="far fa-bell"></i>
          <span >
            <span id="countnotif" class="badge badge-warning navbar-badge"></span>
          </span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right " id="">
          {{-- <span  class="dropdown-item dropdown-header">15 Notifications</span> --}}
          <span id="notification">
            
          </span>
          
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
          <i class="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  @push('addon-script')

  <script>
    $(document).ready(function () {
      fetchnotification();
      countnotif();
  
          function fetchnotification() {
              $.ajax({
                  type: "GET",
                  url: "fetch-notifications",
                  dataType: "json",
                  success: function (response) {
                      // console.log(response);
                      // $('tbody').html("");
                      $.each(response.notifications, function (key, item) {
                          $('#notification').append('<div class="dropdown-divider"></div>\
                        <a href="#" class="dropdown-item">\
                          <small><span class="border-bottom">'+item.datas+'</span>'+item.from+'</small>\
                          <span class="float-right text-muted text-sm">'+item.created_at_convert+'</span>\
                        </a>');
                      });
                  }
              });
          }
  
          // update click notif
          $(document).on('click', '#notifclick', function (e) {
              e.preventDefault();
  
              $.ajax({
                  type: "GET",
                  url: "updateclick",
                  dataType: "json",
                  success: function (response) {
                      // console.log(response);
                      countnotif();
                  }
              });
          });
  
          // count notif
          function countnotif() {
  
              $.ajax({
                  type: "GET",
                  url: "countnotif",
                  dataType: "json",
                  success: function (response) {
                    // console.log(response);
                     $('#countnotif').empty('');
                      $('#countnotif').append(response.notifcount);
                  }
              });
            }
    });
  </script>
  
  @endpush