
// ---------------- 3. CONTROL FLOW ------------------
// This .js file determines the flow of the variable elements in the experiment as dictated 
// by the various calls from pragmods html.


var number_to_name = new Array();
number_to_name[0] = 'Left';
number_to_name[1] = 'Top';
number_to_name[2] = 'Right';


showSlide("instructions");

// The main experiment:
//		The variable/object 'experiment' has two distinct but interrelated components:
//		1) It collects the variables that will be delivered to Turk at the end of the experiment
//		2) It hall all the functions that change the visual aspect of the experiment such as showing images, etc.

var experiment = {
	response_0: -1,
	response_1: -1,
	response_2: -1,
	response_3: -1,	
	response_4: -1,
	response_5: -1,
	response_6: -1,
	response_7: -1,
	response_8: -1,
	response_9: -1,
	response_10: -1,
	response_11: -1,
	response_12: -1,
	response_13: -1,	
	response_14: -1,
	response_15: -1,
	response_16: -1,
	response_17: -1,
	response_18: -1,
	response_19: -1,
	response_20: -1,
	response_21: -1,
	response_22: -1,
	response_23: -1,	
	response_24: -1,
	response_25: -1,
	response_26: -1,
	response_27: -1,
	response_28: -1,
	response_29: -1,
	response_30: -1,
	response_31: -1,
	response_32: -1,
	response_33: -1,	
	response_34: -1,
	response_35: -1,
	response_36: -1,
	response_37: -1,
	response_38: -1,
	response_39: -1,
	response_40: -1,
	response_41: -1,
	response_42: -1,
	response_43: -1,	
	response_44: -1,
	response_45: -1,
	response_46: -1,
	response_47: -1,
	response_48: -1,
	response_49: -1,
	response_50: -1,
	response_51: -1,
	response_52: -1,
	response_53: -1,	
	response_54: -1,
	response_55: -1,
	response_56: -1,
	response_57: -1,
	response_58: -1,
	response_59: -1,

	total_left:0,
	total_top:0,
	total_right:0,

	total_correct:0,

	correct_ordered_trials: correct_by_trial,

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
		example_text_explanation += " To standarize the angle of vision please extend your right arm while sticking your thumb up.";
		example_text_explanation += " Then place your thumbnail between your right eye and the blue circle (bottom right). Close your left eye and look at your thumbnail with your right eye.";
		example_text_explanation += " If your thumbnail fully covers the circle when you touch the screen with your thumb then stay there. If your thumbnail's width is smaller than the circle's diameter, then move away from the screen (and maintain";
		example_text_explanation +=	" the alignment between your right eye, your thumbnail and the circle) until your thumbnail just prevents you from seeing the blue circle.";
		example_text_explanation += " That is, stop at the point where your thumb perfectly covers the circle. Then stay at that distance from the computer for all of the following trials.";
		example_text_explanation += " Click the next button to start the example trials.";
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

		example_count += 1;
		var example_text_explanation = "Example trial #" + String(example_count + 1) + ".<br><br>";
		if (example_count < 3) {
			example_text_explanation += "Instructions: You will choose the odd one out by clicking in the corresponding button. In the real trials you have to center your vision in the X at the center of the screen. <br><br> "
			example_text_explanation += " You can click the 'show' button several times during these 4 example trials. For the first three example trials, the pictures will appear for 2 seconds so you can familiarize yourself with the differences between the pictures.";
			example_text_explanation += " In the 4th example trial the pictures will be displayed for only a quarter of a second (250 miliseconds). That will be the presentation time for all of the subsequent trials. Notice that the correct";
			example_text_explanation += " answer is the top image. In the real trials the odd one out can be in any position with equal probability. <br> <br> To advance, simply click on one of the options.";
		}
		if (example_count == 3) {
			example_text_explanation += "This is the last example trial. Feel free to click the show button several times. Now the display time is 250 milliseconds, the same as that for the real trials.";
			example_text_explanation += " Note: The correct answer for this example is the top image.";
		}
      	$("#exampleText").html(example_text_explanation);

      	var place_count = 0;
      	var triT = '<table id = "example_table" class = "tdt">';
      	for (i = 0; i < 4; i ++) {
      		triT += '<tr>';
      		for (j = 0; j < 5; j ++) {
      			triT += '<td width=64px height=64px>';
      			if ((i == 0 && j == 2) || (i == 3 && (j == 0 || j == 4) ))  {
      				triT += '<img class = "imageCorner" id = "ps' + String(odd_one_cycle[odd_one_place][place_count] + 1) + '" width=64px height=64px src="' + image_sources_for_example[example_count][odd_one_cycle[odd_one_place][place_count]] + '">'
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
      	var button_show_id = 'exampleShow' + trial_counter;
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
				'onclick=\"' + next_depending_on_trial + '; experiment.select(' + String(-1) + ',' + String(i) + ');\">';
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
      	var button_to_show = '<button class = "buttonAttr" type="button" id="' +  button_show_id +  '" onClick="showAndHide(\'ps' + identity_of_1 + '\',250); showAndHide(\'ps' + identity_of_2 + '\', 250); showAndHide(\'ps' + identity_of_3 + '\', 250); justHide(\'' + button_show_id + '\'); ';
      	button_to_show += 'justShow(\'tdchoice' + String(trial_counter) + '_' + String(0) +  '\'); justShow(\'tdchoice' + String(trial_counter) + '_' + String(1) +  '\'); justShow(\'tdchoice' + String(trial_counter) + '_' + String(2) +  '\'); experiment.clicked_show();">Show</button>';


      	// Dynamically create a button that either sends you to the same slide with updated
      	// picture values or, if the number of trials is reached, sends you to the end slide / or the "what was it about?" slide
		var next_depending_on_trial = '';
      	
      	if (trial_counter + 1 < number_of_trials) {
      		next_depending_on_trial += 'experiment.next_real_trial()';
      	} else {
      		next_depending_on_trial += 'experiment.final_slide()';
      	};
      	//$("#go_next_trial_button").html(button_to_advance);
      	//$("#go_next_trial_button").hide();

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
			

    		if (corrected_pl == odd_one_position[sequence_order[trial_counter]]) {
    			correct_answers[sequence_order[trial_counter]] = 1;
    			correct_by_trial[trial_counter - 1] = 1;
    		} else {
    			correct_answers[sequence_order[trial_counter]] = 0;
    			correct_by_trial[trial_counter - 1] = 0;
    		}

			answers_by_displayed_sequence[sequence_order[trial_counter]] = corrected_pl;
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
		showSlide("end_slide");
	},

    check_finished: function() {
    	experiment.response_0 = correct_answers[0];
    	experiment.response_1 = correct_answers[1];
    	experiment.response_2 = correct_answers[2];
    	experiment.response_3 = correct_answers[3];
    	experiment.response_4 = correct_answers[4];
    	experiment.response_5 = correct_answers[5];
    	experiment.response_6 = correct_answers[6];
       	experiment.response_7 = correct_answers[7];
    	experiment.response_8 = correct_answers[8];
    	experiment.response_9 = correct_answers[9];
    	experiment.response_10 = correct_answers[10];
    	experiment.response_11 = correct_answers[11];
    	experiment.response_12 = correct_answers[12];
    	experiment.response_13 = correct_answers[13];
    	experiment.response_14 = correct_answers[14];
    	experiment.response_15 = correct_answers[15];
    	experiment.response_16 = correct_answers[16];
       	experiment.response_17 = correct_answers[17];
    	experiment.response_18 = correct_answers[18];
    	experiment.response_19 = correct_answers[19];
    	experiment.response_20 = correct_answers[20];
    	experiment.response_21 = correct_answers[21];
    	experiment.response_22 = correct_answers[22];
    	experiment.response_23 = correct_answers[23];
    	experiment.response_24 = correct_answers[24];
    	experiment.response_25 = correct_answers[25];
    	experiment.response_26 = correct_answers[26];
       	experiment.response_27 = correct_answers[27];
    	experiment.response_28 = correct_answers[28];
    	experiment.response_29 = correct_answers[29];
    	experiment.response_30 = correct_answers[30];
    	experiment.response_31 = correct_answers[31];
    	experiment.response_32 = correct_answers[32];
    	experiment.response_33 = correct_answers[33];
    	experiment.response_34 = correct_answers[34];
    	experiment.response_35 = correct_answers[35];
    	experiment.response_36 = correct_answers[36];
       	experiment.response_37 = correct_answers[37];
    	experiment.response_38 = correct_answers[38];
    	experiment.response_39 = correct_answers[39];
    	experiment.response_40 = correct_answers[40];
    	experiment.response_41 = correct_answers[41];
    	experiment.response_42 = correct_answers[42];
    	experiment.response_43 = correct_answers[43];
    	experiment.response_44 = correct_answers[44];
    	experiment.response_45 = correct_answers[45];
    	experiment.response_46 = correct_answers[46];
       	experiment.response_47 = correct_answers[47];
    	experiment.response_48 = correct_answers[48];
    	experiment.response_49 = correct_answers[49];
    	experiment.response_50 = correct_answers[50];
    	experiment.response_51 = correct_answers[51];
    	experiment.response_52 = correct_answers[52];
    	experiment.response_53 = correct_answers[53];
    	experiment.response_54 = correct_answers[54];
    	experiment.response_55 = correct_answers[55];
    	experiment.response_56 = correct_answers[56];
       	experiment.response_57 = correct_answers[57];
    	experiment.response_58 = correct_answers[58];
    	experiment.response_59 = correct_answers[59];

    	experiment.total_correct = sumElements(correct_answers);

    	experiment.correct_ordered_trials = correct_by_trial;

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
		turk.submit(experiment);
        }, 500); 
    }
}





