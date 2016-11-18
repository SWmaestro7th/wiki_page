var getParam = function(key){
        var _parammap = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
         	function decode(s) {
                	return decodeURIComponent(s.split("+").join(" "));
            	}
 
            	_parammap[decode(arguments[1])] = decode(arguments[2]);
        });
 
       	return _parammap[key];
};
	

$(document).ready(function(){
	$.get("http://52.78.70.54:9500/getmenu", function( data ) {
		var html = "";
		html += "<ul>";
		$.each(data.domain_name, function (index, item) {
    			html += "<li><a href='wiki_main.html?domain="+ item + "'>" + item + "</a></li>";
    
		});
		html += "</ul>";

		$(".nav").append(html);
	},"json");

	var domain_parameter = getParam("domain");
	if(!domain_parameter) {
		domain_parameter='급식';
	}

	$.post("http://52.78.70.54:9500/getdetail",
    	{
	        domain : domain_parameter
	},
	function(data, status){
		var obj = JSON.parse(data)
		$("#name").text(obj.name);
		$("#desc").text(obj.desc);

		var q_list = "";
		$.each(obj.question, function(index,item) {
			q_list += "<li>" + item + "</li>";
		});
		$("#questions").append(q_list);

		var f_list = "";
		$.each(obj.feature, function(index,item) {
			f_list += "<li>" + item + "</li>";
		});
		$("#features").append(f_list);

		$("#code").text(obj.code);
	});

});