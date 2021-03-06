
jQuery(document).ready(function () {
    $.fn.slideit = function (options) {
        /*
        	Initial values that the slider will have by default. 
        	user CAN put a custom width and height.
        */
        var defaults = {
            width: 620,
            height: 310,
            transition: 3000
        };

		options = $.extend(defaults, options);

        return this.each(function(){
            var SlideInterval = 0;
            var currentSlide = 0;
            var sliderLength = 0;
            var slider = $(this);
            /* list of css specifically set due to the possible use of a UL element. */
            slider.css({
                    'list-style': 'none',
                    'margin': 0,
                    'padding': 0
                });
            sliderLength = sliderSize(slider);
            /* Container
    			-----------------------------------------------*/
    		// we create the div parent of the slider that'll contain our navigation arrows and points, as well as points.
            var sliderParent = '<div class="slideAnything" style="height: ' + options['height'] + 'px; width: ' + options['width'] + 'px; margin: 0px auto 0px;" />';
            slider.wrap(sliderParent);//wraps the element that called the function and inserts it into the parent of our slider
            sliderParent = slider.parent();// we re-use the parent variable and make it equal to the DOM parent that we created.
            /* Previous and Next Buttons
    			-----------------------------------------------*/
            sliderParent.append('<div class="botonesnav">'+
            						'<div style="line-height: 17px;" ><a href="javascript:void(0)" style="left: 0;">Prv</a></div>'+
            						'<div style="line-height: 17px;" ><a href="javascript:void(0)" style="right: 0;">Nxt</a></div>'+
            						'</div>');//adding the previous and next buttons
            //event for the navigation arrows (Prv and Nxt)
            sliderParent.find('.botonesnav div a').click(function () {
                var direction = $(this).html();
                if (direction === 'Prv') {
                    clearInterval(SlideInterval);
                    currentSlide = currentSlide - 2;
                    console.log('currentSlide: ' + currentSlide);
                    SlideLoop(options['transition'], sliderLength, slider);
                } else if (direction === 'Nxt') {
                    clearInterval(SlideInterval);
                    console.log('currentSlide: ' + currentSlide);
                    SlideLoop(options['transition'], sliderLength, slider);

                }
            });
            
            
            /* Nav Points 
    			-----------------------------------------------*/
            //and to finally end the html setup we add the nav points that are created based on the number of objects the slider contains
            var navPoints = '<div class="contenedornavegacion">'+
            					'<ul class="navegacion">';
            for (var i = 0;  i < sliderLength; i++) {
            		var idx = i+1;
           			navPoints+= '<li><a href="javascript:void(0)">'+idx+'</a></li>';
           	}
           	navPoints += '</ul></div>';
           	sliderParent.append(navPoints);
            /*
                Nav Point event function: you get the index from the derived value (n-1) from the <a> inside the <ul> that acts as the navpoint.
                and simply call SlideLoop();
            */ 
           	sliderParent.find('.contenedornavegacion ul li a').click(function(){
                currentSlide = $(this).html()-1;
                clearInterval(SlideInterval);//never forget to call clearInterval before calling SlideLoop
                SlideLoop(options['transition'], sliderLength, slider);
            });
            SlideLoop(options['transition'], sliderLength, slider);
            
                /*
                function that's primarily used for assigning the visibility
                > Parameters:
                - index: which index will be the 'current' element which will be visible.
                - element: the DOM element which was user defined to be a slider.
                */
                function AssignDisplay(element,transition, length){
                    currentSlide = (currentSlide < 0) ? length-1 : currentSlide;
                    currentSlide = (currentSlide < (length)) ? currentSlide : 0;
                    console.log('currentSlide: ' + currentSlide);
                    console.log($(element.children()[currentSlide]).html());
                    $(element.children()[currentSlide]).fadeIn(transition);
                }

                function HideDisplay(element){
                    element.children().css({
                            display: 'none'
                    });
                }

                /*
                    function that's used for creating the loop that'll change the slides at a specific interval
                    Parameters:
                    - index: refers to which slide it will change into
                    - transTime: interval at which the function will change
                    - sliderLimit: number of slides that the slider has
                    - element: slider DOM
                */
                function SlideLoop(transTime, sliderLimit, element){
                    HideDisplay(slider);// we hide the slides for now
                    console.log('started loop! currentSlide: ' + currentSlide);
                    AssignDisplay(element, transTime, sliderLimit);
                    currentSlide++;
                    SlideInterval = setInterval(function () {
                        HideDisplay(element);
                        AssignDisplay(element, transTime, sliderLimit);
                        currentSlide++;
                    }, transTime);
                }
                     
                function sliderSize(element) {
                    var length = 0;
                    element.children().each(function () {
                        length++;
                    });
                    return length;
                }
            });
        }
});

