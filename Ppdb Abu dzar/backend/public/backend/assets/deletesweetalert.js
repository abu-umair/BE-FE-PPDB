function deleteRowPermanen(id)
           {
               swal({
                 title: 'Are you sure ?',
                     text: "You Won't Be Able To Return It!",
                     type: 'warning',
                     showCancelButton: true,
                     confirmButtonColor: '#3abaf4',
                     cancelButtonColor: '#fc544b',
                     confirmButtonText: 'Yes'
               }).then((result) => {
                   if (result.value) {                  
                     $('#dataPermanen-'+id).submit();
                   } else if (result.dismiss === Swal.DismissReason.cancel) {
                       Swal(
                       'Cancelled',
                       'Your imaginary file is safe :)',
                       'error'
                       );
                     }
                 });
                   
         }