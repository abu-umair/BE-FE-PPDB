$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
})

$('#inputSearch').on('keyup',function(){
  // alert("ok");
  $inputSearch = $(this).val();
  // alert($inputSearch);
  if($inputSearch ==''){
      $('#searchResult').html('');
      $('#searchResult').hide();
  }else{
      $.ajax({
          method:"post",
          url:"{{ route('searchnavbar') }}",
          data:JSON.stringify({
              inputSearch:$inputSearch
          }),
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },

          success: function(data){
              var searchResultAjax='';
              data = JSON.parse(data);
              // console.log(data);
              $('#searchResult').show();
              var noteach = 0;
              // var nogroom = 0;
              // var nocust = 0;
              // var noong = 0;
              
              for(let i=0; i<data.length;i++){
                  if (data[i].roles == 'TEACHER') {
                        var routes ="{{url('admin')}}"+"/profile/"+data[i].id;
                        
                        if (noteach == 0) {
                          searchResultAjax +='<a class="list-group-item list-group-item-action disabled" id="list-me"><small> Teacher</small></a>'
                            // searchResultAjax +='<div class="search-header">Doctors</div>'
                            noteach++;
                        }
                            searchResultAjax +='<a href="'+routes+'" class="list-group-item list-group-item-action">'+data[i].name+'</a>'
                            // searchResultAjax +='<div class="search-item"><a href="'+routes+'">'+data[i].name+'</a></div>'
                  } 
                
              }
              $('#searchResult').html(searchResultAjax);
          }
      })
  }

})