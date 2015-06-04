function formToObject(object)
{
	var obj = $(object).serializeArray();
	var result = {};
	for(var i = 0; i < obj.length; i++){
	    var property = obj[i];
	    result[property.name] = property.value;
    }
    return result;
}

function fade(obj, time){
	setTimeout(function(){
		obj.animate({
        	opacity:0
        }, 1000, 
        function(){
          obj.css({'display': 'none', 'opacity': 1});
        });
    }, time||1000);
}
