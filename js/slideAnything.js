jQuery(document).ready(function () {
    $.fn.slideit = function (options) { 
 		/*
        	Initial values that the slider will have by default. 
        	user CAN put a custom width and height.
        */
        var defaults = {
            width: 620,
            height: 310
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
        var sliderType = slider.prop('tagName');
        /*
            we detect which type of slider we're building so as to be able to know
            if we'll search through a list of <li> tags or <div> tags
        */
        if(sliderType === 'UL'){
        	slider.find('li').each(function(){
            if(sliderLength != 0){
        		$(this).children(':first').addClass('hiddenElement');
        	}
        	sliderLength++;
        	});
        }else {
        	slider.find('div').each(function(){
        	if(sliderLength != 0){
        		$(this).children(':first').addClass('hiddenElement');
        	}
        	sliderLength++;
        	});
        }
        
        /* Container
			-----------------------------------------------*/
		// we create the div parent of the slider that'll contain our navigation arrows and points, as well as points.
        var sliderParent = '<div class="slideAnything" style="height: ' + options['height'] + 'px; width: ' + options['width'] + 'px;" />';
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
        for (var i = 0;  i <= sliderLength; i++) {
        		var idx = i+1;
       			navPoints+= '<li><a href="#">'+idx+'</a></li>';
       	}
       	navPoints += '</ul></div>';
       	sliderParent.append(navPoints);
        return slider;
    }
});