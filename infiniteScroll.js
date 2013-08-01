/* 
 * Infinite Scroll v1
 *
 * Copyright (c) 2013, Sandi Rosyandi
 */
 
var success = true;
jQuery.fn.infiniteScroll = function(options){
	iSOptions = jQuery.extend({
		container: this,
		classNextSelector: 'url:last',
		dataclassNextSelector: 'href', 
		resultWord: 'done',
		loading: '<div class="loading" style="text-align:center;">Loading...</div>',
		classLoading: 'loading',
		animation: 'fade',
		animationSpeed: 'slow',
		done: '<div style="color:#f00; text-align:center;">It\'s done.</div>'
	}, options);
	
	$(window).scroll(function(){
		if(($(window).scrollTop() == ($(document).height() - $(window).height())) && (success)){
			success = false;
			$("."+iSOptions.classNextSelector).after(iSOptions.loading);
			var url = $("."+iSOptions.classNextSelector).data(iSOptions.dataclassNextSelector);
			$.ajax({
				type:"GET",
				url:url,
				success:function(result){
					if(result==iSOptions.resultWord){
						var typeDone = $.type(iSOptions.done);
						if(typeDone == 'string'){
							var result = $(iSOptions.done).hide();
							if(iSOptions.animation == 'fade')
								result.appendTo($(iSOptions.container)).fadeIn(iSOptions.animationSpeed);
							else
								result.appendTo($(iSOptions.container)).slideDown(iSOptions.animationSpeed);							
						}
						else if(typeDone == 'function')
							iSOptions.done();
						success = false;
					}
					else{
						var result = $(result).hide();
						if(iSOptions.animation == 'fade')
							result.appendTo($(iSOptions.container)).fadeIn(iSOptions.animationSpeed);
						else
							result.appendTo($(iSOptions.container)).slideDown(iSOptions.animationSpeed);							
						success = true;						
					}
					$("."+iSOptions.classLoading).remove();
				}
			});
		}
	});
}