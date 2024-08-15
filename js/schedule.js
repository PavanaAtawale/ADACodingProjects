$(document).ready( function() {
    
    
	$.getJSON("schedule.json", function(data) { 
    	
        
        $.each(data, function(key, val){
        
        	var myid = "#" + key;
       
        	$(myid).addClass(val["type"]);
        
			$(myid).html(val["name"]);

        });    
    
    
    });
    
    
});
