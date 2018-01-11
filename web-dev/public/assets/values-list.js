$(document).ready(function(){

  $('form').on('submit',function(){

    var item = $('form input');
    var value = {item: item.val()};

    $.ajax({
      type: 'POST',
      url: '/data',
      data: value,
      success: function(data){
        // do something with the data
        location.reload();
      }
    });

    return false;


  });

  // $('li').on('click', function(){
  //   var item = $(this).text().replace(/ /g, "-");
  //   $.ajax({
  //     type: 'DELETE',
  //     url: '/todo/'
  //   })
  // })


})
