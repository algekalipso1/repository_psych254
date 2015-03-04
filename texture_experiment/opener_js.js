
var number_to_name = new Array();
number_to_name[0] = 'Left';
number_to_name[1] = 'Top';
number_to_name[2] = 'Right';


showSlide("instructions");

//showSlide("calibration_trial");

var opener_functions = {
	next_description: function() {
		if (window.self == window.top | turk.workerId.length > 0) {
		}
		showSlide("prestage");	
	},

	last_of_opener: function() {
		showSlide("openerLast");
	}
}