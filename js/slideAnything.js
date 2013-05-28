jQuery(document).ready(function($){
    $.fn.slideAnything = function(options {  
 
        var opt = {
			'width': 908, // Width and height of the images
			'height': 340,
			'position': 'bottom', // Posicion
			'bullets': false, // Show numbering navigation
			'thumbs':  true, // Show thumbnail navigation
			'row': 10, // Thumbnails per row
			'auto': true, // Auto rotate
			'autoSpeed': 4000,
			'fadeSpeed': 1000
		};

		this.each(function() {        
		
			if (options) { 
				$.extend(opt, options);
			}

			/* Contenedor
			-----------------------------------------------*/
			$(this).children().wrapAll('<div class="slider" />');
			var contenedor = $(this).find('.slider');
			contenedor.find('img').wrapAll('<div class="wrapp" />');
			var wrapp = contenedor.find('.wrapp');

            /* Anterior & Siguiente Botones
			-----------------------------------------------*/
			wrapp.append('<a href="#" class="prev">Anterio</a><a href="#" class="next">Siguiente</a>');


			/* Navegacion 
			-----------------------------------------------*/
			switch (opt.position) { // Posicion
					case 'top': container.prepend('<div class="navegacion" />'); break;
					case 'bottom': container.append('<div class="navegacion" />'); break;
			}

			var nav = contenedor.find('.navegacion');

			wrapp.find('img').each(function(i){

				i += 1; // Inicia en 1

				if (opt.bullets === true) { // Bullet navigation
						navegacion.append('<a href="#">'+ i +'</a>'); 
				}

				if (opt.thumbs === true) { // Thumbnail navigation
						nav.addClass('thumbs').append(
							'<img class="thumb" src="'+
							$(this).attr('src') +'" alt=""/>'); 
				}

				
			});
        return "hola";//this.each(function() {        
            /* this is where the magic starts */
            /*if (options) { 
                $.extend(opt, options);
            }*/
                       
        });
    };
});