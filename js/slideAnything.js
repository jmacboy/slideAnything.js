
var SildeInterval = 0;
var currentSlide = 0;

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
        var sliderLength = 0;
        var slider = $(this);
        /* list of css specifically set due to the possible use of a UL element. */
        slider.css({
                'list-style': 'none',
                'margin': 0,
                'padding': 0
            });
        sliderLength = AssignDisplay(0, slider, options['transition']);
        /* Container
			-----------------------------------------------*/
		// we create the div parent of the slider that'll contain our navigation arrows and points, as well as points.
        var sliderParent = '<div class="slideAnything" style="height: ' + options['height'] + 'px; width: ' + options['width'] + 'px; margin: 0px auto 0px;" />';
        slider.wrap(sliderParent);//wraps the element that called the function and inserts it into the parent of our slider
        sliderParent = slider.parent();// we re-use the parent variable and make it equal to the DOM parent that we created.
        /* Previous and Next Buttons
			-----------------------------------------------*/
        sliderParent.append('<div class="botonesnav">'+
        						'<div style="line-height: 17px;" ><a href="#" style="left: 0;">Prv</a></div>'+
        						'<div style="line-height: 17px;" ><a href="#" style="right: 0;">Nxt</a></div>'+
        						'</div>');//adding the previous and next buttons
        /* Nav Points 
			-----------------------------------------------*/
        //and to finally end the html setup we add the nav points that are created based on the number of objects the slider contains
        var navPoints = '<div class="contenedornavegacion">'+
        					'<ul class="navegacion">';
        for (var i = 0;  i < sliderLength; i++) {
        		var idx = i+1;
       			navPoints+= '<li><a href="#">'+idx+'</a></li>';
       	}
       	navPoints += '</ul></div>';
       	sliderParent.append(navPoints);
       	SlideLoop(0, options['transition'], sliderLength, slider);
        return slider;
    }

    /*
        function that's primarily used for assigning the class
        > Parameters:
        - index: which index will be the 'current' element which will be visible.
        - element: the DOM element which was user defined to be a slider.
    */
    function AssignDisplay(index, element,transition){
        var i = 0;
        /*var sliderType = element.prop('tagName');
        var tagType = (sliderType === 'UL')? 'li': 'div';*/
        element.children().each(function(){
            if( i === index){
                $(this).css({
                    display: 'none'
                });
                $(this).fadeIn(transition);
            }else{
                $(this).css({
                    display: 'none'
                });
            }
            i++;
        });
        /*
            in an early attempt at multi-tasking the function it returns how many children
            the slider has to know how many navPoints there needs to be.
        */
        return i;
    }

    /*
        function that's used for creating the loop that'll change the slides at a specific interval
        Parameters:
        - index: refers to which slide it will change into
        - transTime: interval at which the function will change
        - sliderLimit: number of slides that the slider has
        - element: slider DOM
    */
            function SlideLoop(index, transTime, sliderLimit, element){
                //var trans = transTime;
                var i = (index < sliderLimit)? index: 0;
                SlideInterval = setInterval(function(){
                    if(i === (sliderLimit)){
                        i = 0;
                    }
                    AssignDisplay(i, element, transTime);
                    console.log('change of Slide'+i+' sliderLimit: '+sliderLimit);
                    i++;
                }, transTime);
            }
         
 

});

