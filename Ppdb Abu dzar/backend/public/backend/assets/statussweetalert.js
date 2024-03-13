function changeStatus(id)
         {
             swal({
               title: 'Are you sure ?',
                   text: "only status changes and can be returned.",
                   type: 'warning',
                   showCancelButton: true,
                   confirmButtonColor: '#3abaf4',
                   cancelButtonColor: '#fc544b',
                   confirmButtonText: 'Yes'
             }).then((result) => {
                 if (result.value) {                  
                   $('#data-'+id).submit();
                 } else if (result.dismiss === Swal.DismissReason.cancel) {
                     Swal(
                     'Cancelled',
                     'Status as before :)',
                     'error'
                     );
                   }
               });
                 
       }