var temp = "";

$(function() {
    //Extends JQuery Methods to get current cursor postion in input text.
    //GET CURSOR POSITION
    jQuery.fn.getCursorPosition = function() {
        if (this.lengh == 0) return -1;
        return $(this).getSelectionStart();
    }

    jQuery.fn.getSelectionStart = function() {
        if (this.lengh == 0) return -1;
        input = this[0];

        var pos = input.value.length;

        if (input.createTextRange) {
            var r = document.selection.createRange().duplicate();
            r.moveEnd('character', input.value.length);
            if (r.text == '') pos = input.value.length;
            pos = input.value.lastIndexOf(r.text);
        } else if (typeof(input.selectionStart) != "undefined") pos = input.selectionStart;

        return pos;
    }

    //Bind Key Press event with password field    
    $("#txtpwd").keydown(function(e) {
        setTimeout(function() {
            maskPassword(e)
        }, 200);
    });

});

function generateStars(n) {
    var stars = '';
    for (var i = 0; i < n-1; i++) {
        stars += '*';
    }
    return stars;
}

function maskPassword(e) {

    var text = $('#txtpwd').val().trim();
    var stars = $('#txtpwd').val().trim().length;
    var unicode = e.keyCode;
    console.log(unicode);
     

    //Get Current Cursor Position on Password Textbox
    var curPos = $("#txtpwd").getCursorPosition();
    var PwdLength = $("#txtpwd").val().trim().length;

    if (unicode != 9 && unicode != 13 && unicode != 37 && unicode != 40 && unicode != 37 && unicode != 39) {
        //If NOT <Back Space> OR <DEL> Then...
        if (unicode != 8 && unicode != 46) {
            text = text + String.fromCharCode(unicode);
            temp += String.fromCharCode(e.which);
             
            stars += 1;
            $('#txtpwd').val(generateStars(stars));
        }
        //If Press <DEL> Then...
        else if (unicode == 8) { 
         
             if (curPos==PwdLength){
         
         	   temp = temp.substring(0,curPos);	
             } else if (curPos==2){
        	    
         	   temp = temp.substring(1,PwdLength);
             } else { 
         	     
       		 temp = temp.substring(0, curPos)+temp.substring(curPos-1);
            
        }
          
         $('#txtpwd').val(generateStars(stars)+temp.substr(-1).toLowerCase());
       
       
        } 
        
    }

}

