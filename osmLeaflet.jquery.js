(function ($) {
    var defaults = {
	zoom : 10,
	maxZoom : 18,
	lattitude : 0,
	longitude : 0,
	cloudmadeAttribution : 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade, osmLeaflet.jQuery by Mathieu ROBIN'
    },
    settings,
    map,
    methods = {
	init : function (options) {
	    return this.each(function () {
		if(options) {
		    settings = $.extend(defaults, options);
		}
		map = new L.Map(settings.target);

		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
		cloudmade = new L.TileLayer(cloudmadeUrl, {
		    maxZoom: settings.maxZoom,
		    attribution: settings.cloudmadeAttribution
		});

		map.setView(new L.LatLng(settings.lattitude, settings.longitude), settings.zoom).addLayer(cloudmade);
	    });
	},
	addMarker : function (options) {
	    return this.each(function () {
		var markerLocation = new L.LatLng(options.lattitude, options.longitude);

		var marker = new L.Marker(markerLocation);
		map.addLayer(marker);
	    });
	},
	addPopup : function (options) {
	    return this.each(function () {
		var popup = new L.Popup();

		popup.setLatLng(new L.LatLng(options.lattitude, options.longitude));
		popup.setContent(options.text);

		map.openPopup(popup);
	    });
	}
    };

    $.fn.osmLeaflet = function (method) {
	if(methods[method]) {
	    return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	} else if(( typeof method === 'object') || (!method)) {
	    return methods.init.apply(this, arguments);
	} else {
	    $.error('Method ' + method + ' does not exist on jQuery.osmLeaflet');
	}
    };
})(jQuery);