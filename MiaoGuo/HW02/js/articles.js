$(".content2,.content3").hide();	
$(".title1,.title2,.title3").mouseenter(function(e){
   
   show(e);

});	

function show(e) {
  var cname = e.target.className;
  if(cname=="title1"){
  	$(".title1").css({"border":"10px solid #00F","border-width":"2px","border-bottom": "none","border-color": "black"});
  	$(".title2").css("border-width","1px");
  	$(".title3").css("border-width","1px");
  	$(".content1").show();
    $(".content2,.content3").hide();
  } else if(cname=="title2"){
  	$(".title2").css({"border":"10px solid #00F","border-width":"2px","border-bottom": "none","border-color": "black"});
  	$(".title1").css("border-width","1px");
  	$(".title3").css("border-width","1px");
  	$(".content2").show();
    $(".content1,.content3").hide();
  } else if(cname=="title3"){
  	$(".title3").css({"border":"10px solid #00F","border-width":"2px","border-bottom": "none","border-color": "black"});
  	$(".title1").css("border-width","1px");
  	$(".title2").css("border-width","1px");
    $(".content1,.content2").hide();
    $(".content3").show();
  }

}