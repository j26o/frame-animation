/*
 * Frame by Frame Animation - jQuery plugin
 *
 * Copyright (c) 2010-2012 Roland Baldovino
 *
 * Project home:
 *   https://github.com/junebaldovino/frame-animation.git
 *
 * Version:  0.1.0
 *
 */
(function($){
	var settings = {
		frameWidth:      100,
        frameHeight:     100,
        speed:           100,
        totalFrames:     0,
        loop:            false,
		isforward:		 true,
		direction:		 'x',
		currFrame:		 0,
		elements:		 [],
		swapImg:			  false,
		swapFrame:		 3,
		bgmode:			 true
	};
	
	var tm = null;
	var playing = false;
	var timerSwitch;
	var triggered = false;
	var image = null;
	var image2 = null;
	
	var methods = {
		init : function(options) {
			return this.each(function(){
				if (options) { 
					$.extend(settings, options);
			  	}
				
				var $this = $(this),
				data = $this.data('fanim');
				
				if (!data) {
					$(this).data('fanim', {
						target : $this,
					    option : settings
				    });
			 	}
			});

		},
		
		stop : function(){
			if(tm){ clearTimeout(tm); }
			tm = null;
			currFrame = 0;
			
			if(settings.bgmode) {
				for (i = 0; i < settings.elements.length; i++){
					elem = settings.elements[i];
					
					tinimg.src = bgtin;
					tinimg.load(function() {
						tin.css({display:'block'}).stop(true).animate({opacity:0},'slow', function(){
							showLoaded(tin, bgtin);
							flabelimg.src = bgflabel;
							flabelimg.load(function() {
								showLoaded(flabel, bgflabel);
								initializeTinMenu();
							});
						});
					});
				}
			}else {
				for (i = 0; i < settings.elements.length; i++){
					elem = settings.elements[i];
					
				}
			}
		},
		
		stopTimer: function(){
			if(tm)clearTimeout(tm);
			timerSwitch = false;
			playing = false;
		},
		
		stopTimerP: function(){
			if(tm)clearTimeout(tm);
			settings.currFrame = 0;
			timerSwitch = false;
			playing = false;
		},
		
		stopTimerR: function(){
			if(tm)clearTimeout(tm);
			settings.currFrame = settings.totalFrames-1;
			timerSwitch = false;
			playing = false;
		},
		
		play : function(){
			var ie=true;
			
			if(settings.bgmode) {
				for (i = 0; i < settings.elements.length; i++){
					elem = settings.elements[i];
					elem.bgPos = elem.obj.css('background-position');
					
					if(elem.bgPos == 'undefined' || elem.bgPos == null){
						elem.bgPos = parseInt(elem.obj.css('background-position-x'));
					} else {
						elem.bgPos = elem.bgPos.split(' ');
						elem.bgPos = parseInt(elem.bgPos[0]);
						ie = false;
					}
				
					elem.bgPos = -settings.frameWidth * settings.currFrame;
					
					if(ie){ elem.obj.css('background-position-x', elem.bgPos + 'px'); }
					else { elem.obj.css('background-position', (elem.bgPos + 'px 0px')); }
					
					if(i == settings.elements.length-1){
						settings.currFrame++;
						
						if(settings.currFrame+1 == settings.totalFrames){
							settings.currFrame = 0;
							elem.obj.css('background-position', '0 0');
							
							triggered = false;
							
							if(!settings.loop && i == settings.elements.length-1){
								return;
							}
							
						}
					}
				}
				
				if(settings.currFrame+1 > settings.swapFrame && !triggered && settings.swapImg){
					settings.elements[1].obj.css({'background-image': 'url(' + settings.elements[1].bg2 + ')'});
					settings.elements[2].obj.css({'background-image': 'url(' + settings.elements[2].bg2 + ')'});
					triggered = true;
				}

			}else{
				for (i = 0; i < settings.elements.length; i++){
					elem = settings.elements[i];
					
					image = elem.obj.find('img');
					
					elem.bgPos = -settings.frameWidth * settings.currFrame;
					
					image.css('left', (elem.bgPos));
					
					if(settings.currFrame+1 > settings.swapFrame && !triggered && settings.swapImg){
						settings.elements[1].obj.children('img:last-child').remove();
						settings.elements[2].obj.children('img:last-child').remove();
						triggered = true;
					}
					
					if(i == settings.elements.length-1){
						settings.currFrame++;
						
						if(settings.currFrame+1 == settings.totalFrames){
							settings.currFrame = 0;
							elem.obj.find('img').css('left', '0 0');
							
							triggered = false;
							
							if(!settings.loop && i == settings.elements.length-1){
								return;
							}
							
						}
					}
				}
			}
			
			requestAnimFrame(methods.play, window);
			
			playing = true;
		},
		
		extractUrl : function(url) {
			return url.replace(/"/g,"").replace(/url\(|\)$/ig, "");
		},
				
		destroy : function() {
			return this;
		}
	};
		
	$.fn.fanim = function(method) {
		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Method ' +  method + ' does not exist on this plugin.');
		}
	};
})(jQuery);