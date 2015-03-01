// ----------------------------
// Load handlebar template. 
function load(tpl, json) 
{
 	var deferred = $.Deferred();
 	$.ajax({url: tpl,
           cache: true,
           failed: function(response)
           {
           		deferred.fail(response);
           },
           success: function(data) {
                source    = data;
                template  = Handlebars.compile(source);
                deferred.resolve(template);
        	}
    });

    return deferred.promise();
}
