
// ---------------- 3. CONTROL FLOW ------------------
// This .js file determines the flow of the variable elements in the experiment as dictated 
// by the various calls from pragmods html.


var number_to_name = new Array();
number_to_name[0] = 'Left';
number_to_name[1] = 'Top';
number_to_name[2] = 'Right';




// The main experiment:
//		The variable/object 'experiment' has two distinct but interrelated components:
//		1) It collects the variables that will be delivered to Turk at the end of the experiment
//		2) It hall all the functions that change the visual aspect of the experiment such as showing images, etc.

var experiment = {

	responses: correct_answers,
	total_left:0,
	total_top:0,
	total_right:0,

	total_correct:0,

	correct_ordered_trials: correct_by_trial,

    position_chosen_trial: position_by_trial,

    odd_one_pos: odd_one_pos_by_trial,

    // For the 4 example trials
    example_chosen_positions: example_user_choices,

    // Presentation time
    time_shown: presentation_time,


	// Free form text given by the participant
	about: "",
	comment: "",
	age: "",
	gender: "",


	next_description: function() {
		if (window.self == window.top | turk.workerId.length > 0) {

		}
		showSlide("prestage");	
	},
	next_instructions: function() {
		showSlide("instructions");	
	},

	calibration_trial: function() {
		var example_text_explanation = "Calibration.<br> <br>";
		example_text_explanation += " Please extend your right arm while sticking your thumb up.";
		example_text_explanation += " Close your left eye and place your thumbnail between your right eye and the bottom-right circle.";
		example_text_explanation += " Stay where you are if your thumbnail fully covers the circle when you touch the screen. If your thumbnail is smaller than the circle's diameter, then move away from the screen";
		example_text_explanation +=	" until your thumbnail just covers the blue circle.";
		example_text_explanation += " Then stay at that distance from your computer for the duration of this experiment.";
		example_text_explanation += " Click next.";
      	$("#calibrationText").html(example_text_explanation);
      	var place_count = 0;
      	var triT = '<table id = "example_table" class = "tdt">';
      	for (i = 0; i < 4; i ++) {
      		triT += '<tr>';
      		for (j = 0; j < 5; j ++) {
      			triT += '<td width=64px height=64px>';
      			if ((i == 0 && j == 2) || (i == 3 && (j == 0 || j == 4) ))  {
      				triT += '<img class = "imageCalibration" id = "crgb' + String(i + 1) + '" width=64px height=64px src="' + calibration_images[place_count] +  '">'
      				place_count += 1;
      			}
      			if (i == 2 && j == 2) {
      				triT += '<p align = "center">X</p>';
      			}
      			triT += '</td>';
      		}
      		triT += '</tr>';
      	}
      	triT += '</table>';
      	$("#triangularTableCalibration").html(triT);

		var next_after_calibration = 'experiment.next_example_trial()';

      	var button_advance = '<button class = "buttonAttr" type="button" id="calibration_next" onClick="experiment.next_example_trial();">Next</button>';

      	var  user_input_selection = '';
		user_input_selection += '<table align="center"><tr>';
		for (i=0;i<3;i++) {
			user_input_selection += '<td width=98px height=50px align="center"' + 
				' class="unchosen" ' +
				'id="calibrationChoice' + String(i) + '_'  + String(0) + '" ' +
				'onclick=\"' + next_after_calibration + '; experiment.select(' + String(-1) + ',' + String(i) + ');\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr>';
		user_input_selection += '<td></td>';
		user_input_selection += '<td>' +  button_advance + '</td>';
		user_input_selection += '<td></td>';
		user_input_selection +='<tr>';
		user_input_selection += '</tr></table>';
		$("#selectionCalibration").html(user_input_selection)
		showSlide("calibration_trial");
	},

	next_example_trial: function() {

		has_clicked_show = 0;
		example_count += 1;
		var example_text_explanation = "Example trial #" + String(example_count + 1) + ".<br><br>";
		if (example_count < 3) {
			example_text_explanation += "Instructions: You will choose the odd one out by clicking in the corresponding button. Center your vision in the X at the center of the screen. <br><br> "
			example_text_explanation += " Click the 'show' button several times to see the images. For the first three example trials, the pictures will appear for 2 seconds so you notice the differences between the pictures.";
			example_text_explanation += " In the 4th example trial and the rest of the experiment the pictures will be displayed for 250 miliseconds. <br><br>";
			example_text_explanation += " Note: The correct answer for this example is the " + example_odd_one[example_count] +  " image.";
		}
		if (example_count == 3) {
			example_text_explanation += "This is the last example trial. Feel free to click the show button several times. Now the display time is 250 milliseconds, the same as that for the real trials. <br> <br>";
			example_text_explanation += " Note: The correct answer for this example is the " + example_odd_one[example_count] +  " image.";
		}
      	$("#exampleText").html(example_text_explanation);

      	var place_count = 0;
      	var triT = '<table id = "example_table" class = "tdt">';
      	for (i = 0; i < 4; i ++) {
      		triT += '<tr>';
      		for (j = 0; j < 5; j ++) {
      			triT += '<td width=64px height=64px>';
      			if ((i == 0 && j == 2) || (i == 3 && (j == 0 || j == 4) ))  {
      				triT += '<img class = "imageCorner" id = "ps' + String(example_positions[example_count][odd_one_cycle[odd_one_place][place_count]] + 1) + '" width=64px height=64px src="' + image_sources_for_example[example_count][example_positions[example_count][odd_one_cycle[odd_one_place][place_count]]] + '">'
      				place_count += 1;
      			}
      			if (i == 2 && j == 2) {
      				triT += '<p align = "center">X</p>';
      			}
      			triT += '</td>';
      		}
      		triT += '</tr>';
      	}
      	triT += '</table>';
      	$("#triangularTableExample").html(triT);

      	// The "Show" button. 
      	var button_show_id = 'exampleShow' + example_count;
      	var button_to_show = '<button class = "buttonAttr" type="button" id="' +  button_show_id +  '" onClick="showAndHide(\'ps1\', 2000); showAndHide(\'ps2\', 2000); showAndHide(\'ps3\', 2000); justShow(\'exampleChoice' + String(0) +  '_'  + String(example_count) +'\'); justShow(\'exampleChoice' + String(1) +  '_'  + String(example_count) +'\'); justShow(\'exampleChoice' + String(2) + '_'  + String(example_count) + '\'); experiment.clicked_show();">Show</button>';
      	if (example_count == 3) {
      		button_to_show = '<button class = "buttonAttr" type="button" id="' +  button_show_id +  '" onClick="showAndHide(\'ps1\', 250); showAndHide(\'ps2\', 250); showAndHide(\'ps3\', 250); justShow(\'exampleChoice' + String(0) +  '_'  + String(example_count) +'\'); justShow(\'exampleChoice' + String(1) +  '_'  + String(example_count) +'\'); justShow(\'exampleChoice' + String(2) + '_'  + String(example_count) + '\'); experiment.clicked_show();">Show</button>';
      	}

		var next_depending_on_trial = '';
      	
      	if (example_count < 3) {
      		next_depending_on_trial += 'experiment.next_example_trial()';
      	} 
      	if (example_count == 3) {
      		next_depending_on_trial += 'experiment.next_real_trial()';
      	};

      	var  user_input_selection = '';
		user_input_selection += '<table align="center"><tr>';
		for (i=0;i<3;i++) {
			user_input_selection += '<td width=98px height=50px align="center"' + 
				' class="unchosen" ' +
				'id="exampleChoice' + String(i) + '_'  + String(example_count) + '" ' +
				'onclick=\"' + next_depending_on_trial + '; experiment.example_select(' + String(example_count) + ',' + String(i) + ');\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr>';
		user_input_selection += '<td></td>';
		user_input_selection += '<td>' + button_to_show + '</td>';
		user_input_selection += '<td></td>';
		user_input_selection +='<tr>';
		user_input_selection += '</tr></table>';
		$("#selectionExample").html(user_input_selection)
		showSlide("example_trial");
	},



	next_real_trial: function() {
		has_clicked_show = 0;
      	trial_counter += 1;
		var example_text_explanation = "Choose the odd one out. <br> (Now it is for real) <br> Trial " + String(trial_counter + 1) + " /" + String(number_of_trials);
      	$("#trialText").html(example_text_explanation);
      	var picture_1 = list_of_image_paths[sequence_order[trial_counter]][0];
      	var picture_2 = list_of_image_paths[sequence_order[trial_counter]][1];
      	var picture_3 = list_of_image_paths[sequence_order[trial_counter]][2];
      	var identity_of_1 = String(3*trial_counter + 4);
      	var identity_of_2 = String(3*trial_counter + 5);
      	var identity_of_3 = String(3*trial_counter + 6);
      	var identities = [identity_of_1, identity_of_2, identity_of_3];
		var imagesHtmlCode = '';
		odd_one_place = odd_one_position[sequence_order[trial_counter]];


      	var place_count = 0;
      	var triT = '<table id = "actual_table" class = "tdt">';
      	for (i = 0; i < 4; i ++) {
      		triT += '<tr>';
      		for (j = 0; j < 5; j ++) {
      			triT += '<td width=64px height=64px>';
      			if ((i == 0 && j == 2) || (i == 3 && (j == 0 || j == 4) ))  {
      				triT += '<img class = "imageCorner" id = "ps' + identities[odd_one_cycle[odd_one_place][place_count]] + '" width=64px height=64px src="' + list_of_image_paths[sequence_order[trial_counter]][odd_one_cycle[odd_one_place][place_count]] + '">'
      				place_count += 1;
      			}
      			if (i == 2 && j == 2) {
      				triT += '<p align = "center">X</p>';
      			}
      			triT += '</td>';
      		}
      		triT += '</tr>';
      	}
      	triT += '</table>';
      	$("#triangularTable").html(triT);


      	var button_show_id = 'showImagesButton' + trial_counter;
      	//var button_advance_id = '';
      	//if (trial_counter + 1 < number_of_trials) {
      	//	button_advance_id += 'trial_sequence_button' + trial_counter;
      	//} else {
      	//	button_advance_id += 'final_slide_button' + trial_counter;
      	//}
      	var button_to_show = '<button class = "buttonAttr" type="button" id="' +  button_show_id +  '" onClick="showAndHide(\'ps' + identity_of_1 + '\', ' + String(presentation_time) + '); showAndHide(\'ps' + identity_of_2 + '\', ' + String(presentation_time) + '); showAndHide(\'ps' + identity_of_3 + '\', ' + String(presentation_time) + '); justHide(\'' + button_show_id + '\'); ';
      	button_to_show += 'justShow(\'tdchoice' + String(trial_counter) + '_' + String(0) +  '\'); justShow(\'tdchoice' + String(trial_counter) + '_' + String(1) +  '\'); justShow(\'tdchoice' + String(trial_counter) + '_' + String(2) +  '\'); experiment.clicked_show();">Show</button>';


      	// Dynamically create a button that either sends you to the same slide with updated
      	// picture values or, if the number of trials is reached, sends you to the end slide / or the "what was it about?" slide
		var next_depending_on_trial = '';
      	
      	if (trial_counter + 1 < number_of_trials) {
      		next_depending_on_trial += 'experiment.next_real_trial()';
      	} else {
      		next_depending_on_trial += 'experiment.final_slide()';
      	};

      	var  user_input_selection = '';
		user_input_selection += '<table align="center"><tr>';


		for (i=0;i<3;i++) {
			user_input_selection += '<td width=98px height=50px align="center"' + 
				' class="unchosen" ' +
				'id="tdchoice' + String(trial_counter) + '_' + String(i) +  '" ' +
				'onclick=\"' + next_depending_on_trial + '; experiment.select(' + String(trial_counter) + ',' + String(i) + ');\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr>';
		user_input_selection += '<td></td>';
		user_input_selection += '<td>' + button_to_show + '</td>';
		user_input_selection += '<td></td>';
		user_input_selection +='<tr>';
		user_input_selection += '</tr></table>';
		$("#userSelectionInputFields").html(user_input_selection)

		showSlide("series_of_trials");
	},


	select: function (trialc, place) {
		if (trialc < 0) {
			exampleChoice = place;
		}
		//if (target == c) {
		//	experiment.choice = "target"
		//} else {
		if (trialc >=0){
			// Update tracking variables
			if (place == 0) {
				experiment.total_left = experiment.total_left + 1;
			}
			if (place == 1) {
				experiment.total_top = experiment.total_top + 1;
			}
			if (place == 2) {
				experiment.total_right = experiment.total_right + 1;
			}
			corrected_pl = place;
			if (place == 1){
				corrected_pl = 0;
			}
			if (place == 0) {
				corrected_pl = 1;
			}

			position_by_trial[trialc] = corrected_pl;
			

    		if (corrected_pl == odd_one_position[sequence_order[trialc]]) {
    			correct_answers[sequence_order[trialc]] = 1;
    			correct_by_trial[trialc] = 1;
    		} else {
    			correct_answers[sequence_order[trialc]] = 0;
    			correct_by_trial[trialc] = 0;
    		}

			answers_by_displayed_sequence[sequence_order[trialc]] = corrected_pl;
			var coded_seq = String(trialc) + "_";
			coded_seq += String(place);
			var choice_button = "#tdchoice" + coded_seq;		
			// unchoose everything
			for (var i=0; i< 3; i++) {
				var each_other_button = String(trialc) + "_";
				each_other_button += String(i);
				each_other_button = "#tdchoice" + each_other_button;
			    $(each_other_button).removeClass('chosen').addClass('unchosen');
			}
			// choose this one
			$(choice_button).removeClass('unchosen').addClass('chosen');
		} else {
			var choice_button = "#exampleChoice";
			for (var i=0; i<3; i++) {
				var this_button = choice_button + String(i);
				$(this_button).removeClass('chosen').addClass('unchosen');
			}
			choice_button += String(place);
			$(choice_button).removeClass('unchosen').addClass('chosen');
		}
		if (has_clicked_show == 1) {
			$("#go_next_trial_button").show();
		}
	},

	example_select: function(c, i){
		corrected_pl = i;
		if (i == 1){
			corrected_pl = 0;
		}
		if (i == 0) {
			corrected_pl = 1;
		}
		example_user_choices[c] = corrected_pl;
	},

	clicked_show: function() {
		has_clicked_show = 1;
	},

	disable_show: function() {
		//var this_b = "#" + String(bid);
		$("#show_trial_button").hide();
	},

	enable_show: function() {
		//var this_b = "#" + String(bid);
		$("#show_trial_button").show();
	},

	disable_next: function() {
		//var this_b = "#" + String(bid);
		$("#go_next_trial_button").hide();
	},

	enable_next: function() {
		//var this_b = "#" + String(bid);
		$("#go_next_trial_button").show();
	},

	enable_next_example: function() {
		$("#go_to_real_trial_button").show();
	},

	final_slide: function() {
		all_trials_completed = 1;
		showSlide("end_slide");
	},

    check_finished: function() {
    	experiment.responses = correct_answers;

    	experiment.total_correct = sumElements(correct_answers);

    	experiment.correct_ordered_trials = correct_by_trial;

    	experiment.position_chosen_trial = position_by_trial;
    	experiment.example_chosen_positions = example_user_choices;

	    experiment.about = document.getElementById("about").value;
	    experiment.comment = document.getElementById("comments").value;
	    experiment.age = document.getElementById("age").value;
	    experiment.gender = document.getElementById("gender").value;

		experiment.end();
    },

    // END FUNCTION 
    end: function () {
    	showSlide("finished");
    	setTimeout(function () {
		opener.turk.submit(experiment);
        }, 500); 
    }
}




// ---------------- SECTION FOR HANDLING KEYBOARD INPUT ------------------

// Set an event listener for the entire document so that the user
// doesn't have to be clicking on any specific part of the screen
// for their keypress to register properly.
//
// Calls click() on the appropriate buttons so no code duplication is required.

document.addEventListener('keydown', function(event) {
    if (String.fromCharCode(event.keyCode) == "1") {
    	// Used for the "Left" button.

    	// Still in calibration mode.
    	if (example_count == -1) {
    		// Do nothing.
    	}
    	// Looking at the ending, submit slide, after all trials finished.
    	else if (all_trials_completed == 1) {
    		// Do nothing.
    	}
    	// In example mode.
    	else if (has_clicked_show == 1 && example_count <= 3 && trial_counter == -1) {
    		
    		$("#exampleChoice0_" + String(example_count)).click();
    	}
    	// Real trials.
    	else if (has_clicked_show == 1 && trial_counter > -1) {
    		$("#tdchoice" + String(trial_counter) + '_0').click();
    	}
    }

    else if (String.fromCharCode(event.keyCode) == "2") {
    	// Used for the "Top" button.
        
        // Still in calibration mode.
        if (example_count == -1) {
    		// Do nothing.
    	}
    	// Looking at the ending, submit slide, after all trials finished.
    	else if (all_trials_completed == 1) {
    		// Do nothing.
    	}
    	// In example mode.
    	else if (has_clicked_show == 1 && example_count <= 3 && trial_counter == -1) {
    		$("#exampleChoice1_" + String(example_count)).click();
    	}
    	// Real trials.
    	else if (has_clicked_show == 1 && trial_counter > -1) {
    		$("#tdchoice" + String(trial_counter) + '_1').click();
    	}
    }

    else if (String.fromCharCode(event.keyCode) == "3") {
    	// Used for the "Right" button.

    	// Still in calibration mode.
    	if (example_count == -1) {
    		// Do nothing.
    	}
    	// Looking at the ending, submit slide, after all trials finished.
    	else if (all_trials_completed == 1) {
    		// Do nothing.
    	}
    	// In example mode.
    	else if (has_clicked_show == 1 && example_count <= 3 && trial_counter == -1) {
    		$("#exampleChoice2_" + String(example_count)).click();
    	}
    	// Real trials.
    	else if (has_clicked_show == 1 && trial_counter > -1) {
    		$("#tdchoice" + String(trial_counter) + '_2').click();
    	}
    }

    else if (String.fromCharCode(event.keyCode) == " ") {
    	// Used for the "show" button.

    	// Still in calibration mode.
    	if (example_count == -1) {
    		$("#calibration_next").click();
    	}
    	// Looking at the ending, submit slide, after all trials finished.
    	else if (all_trials_completed == 1) {
    		// Do nothing.
    	}
    	// In Example mode.
    	// In the example mode, you can use the "show" button as much as you want.
    	else if (example_count <= 3 && trial_counter == -1) {
    		$("#exampleShow" + String(example_count)).click();
    	}
    	// Real trials.
    	// Can only click the "show" button once.
    	else if (has_clicked_show == 0 && trial_counter > -1) {
    		$("#showImagesButton" + String(trial_counter)).click();
    	}

    }
}, true);





// Initial entry point to the Javascript program flow

experiment.calibration_trial();

