$(".img6,.img7,.img8,.img9,.img10").hide();	


 

$( ".img1, .img2, .img3, .img4, .img5" ).mouseenter(function(e) {
 enter(e);
});

   

   function enter(e){
    var cname = e.target.className;
    if(cname=="img1"){
      $(".img6").show();
      $(".img7,.img8,.img9,.img10").hide();
    } else if (cname=="img2") {
      $(".img6,.img7").show();
      $(".img8,.img9,.img10").hide();
    } else if (cname=="img3") {
      $(".img6,.img7,.img8").show();
      $(".img9,.img10").hide();	
    } else if (cname=="img4") {
      $(".img6,.img7,.img8,.img9").show();
      $(".img10").hide();	
    } else if (cname=="img5") {
      $(".img6,.img7,.img8,.img9,.img10").show();	
    }

   }