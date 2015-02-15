
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

	total_left:0,
	total_top:0,
	total_right:0,

	total_correct:0,

	// Free form text given by the participant
	about: "",
	comment: "",
	age: "",
	gender: "",


	next_familiarization: function() {
	    // Allow experiment to start if it's a turk worker OR if it's a test run
	    // Warning, it may not be security best practices... you know why
		if (window.self == window.top | turk.workerId.length > 0) {

			// When there is a familiarization stage that sets up the priors.
			if (familiarization_status == 1) {
				// FAMILIARIZATION INSTRUCTIONS
				var familiarization_html = '<p class="block-text"">Bob really likes to ' + 
				actions[0] + ' ' + plural + '. <br>' +
				'Every ' + times[0] + ' he ' + actions[1] + ' a ' + base + '.<p>' +
				'<p class="block-text">Click on each ' + times[1].toLowerCase() + ' to see the ' + base + ' Bob ' + actions[2] + '.</p>';
				$("#familiarizationText").html(familiarization_html);

				// TIME BY TIME POPUPS FOR FAMILIARIZATION
				// Here are all the different elements that will be displayed in the familiarization task
				// most likely it will always be 9, but not necessarily
				// That is why we have a table here
				var familiarization_objects_html = '<table align="center"><tr>';

				for (i=0;i<=instances_in_familiarization-1;i++){
					familiarization_objects_html += '<td width=200px height=230px align="center" ' +
						'class="objTable"' + 
						'id="famTable' + String(i) + 
						'" onclick="experiment.reveal(' + String(i) + ')">';
					familiarization_objects_html += '<br><br><br><br>' +times[1] + ' ' + String(i+1) + ', Bob ' + actions[2] 
						+ ':<div id="day' + String(i) + '"> </div>';
					if ((i+1)%3 == 0) {
						familiarization_objects_html += "</tr><tr>";
					}
				}
				familiarization_objects_html += '</tr></table>';
				$("#famObjects").html(familiarization_objects_html);
			} else {
				experiment.target_frequency = 0;
				experiment.familiarization_cond = -1;
				// Instructions when there is no familiarization: Presenting Bob and explaning what that Bob does.
				// The importance of this slide in this condition (familiarization_status == 0) is to reiffy 
				// the social situation. In other words, make it clear that *someone* is asking you about the person.
				var familiarization_html = '<p class="block-text"">Bob really likes to ' + 
				actions[0] + ' ' + plural + '. <br>' + 
				'Every ' + times[0] + ' he ' + actions[1] + ' a ' + base + '.<p>';
				$("#familiarizationText").html(familiarization_html);
			}
			showSlide("prestage");	
		}
	},


	next_description: function() {
		if (window.self == window.top | turk.workerId.length > 0) {

		}
		showSlide("prestage");	
	},
	next_instructions: function() {
		showSlide("instructions");	
	},

	next_example_trial: function() {


		var example_text_explanation = "You will choose the odd one out."
      	$("#exampleText").html(example_text_explanation);

      	var image_sources_for_example = ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_1.bmp"];

		var imagesHtmlCode = '';
		if (odd_one_place == 0) {
			imagesHtmlCode += '<img src='+ image_sources_for_example[0] + ' width=128px alt="threads" id="ps1" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src='+ image_sources_for_example[1] + ' width=128px alt="peacock" id="ps2" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src='+ image_sources_for_example[2] + ' width=128px alt="peacock" id="ps3" class = ' + orders_list[odd_one_place][2] + '>';	
		}
		if (odd_one_place == 1) {
			imagesHtmlCode += '<img src='+ image_sources_for_example[1] + ' width=128px alt="peacock" id="ps2" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src='+ image_sources_for_example[2] + ' width=128px alt="peacock" id="ps3" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src='+ image_sources_for_example[0] + ' width=128px alt="threads" id="ps1" class = ' + orders_list[odd_one_place][0] + '>';
		}
		if (odd_one_place == 2) {
	        imagesHtmlCode +=  '<img src='+ image_sources_for_example[2] + ' width=128px alt="peacock" id="ps3" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src='+ image_sources_for_example[0] + ' width=128px alt="threads" id="ps1" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src='+ image_sources_for_example[1] + ' width=128px alt="peacock" id="ps2" class = ' + orders_list[odd_one_place][1] + '>';
		}
      	$("#exampleImages").html(imagesHtmlCode);

      	var button_to_show = '<button type="button" id="showImagesButton" onClick="showAndHide(\'ps1\'); showAndHide(\'ps2\'); showAndHide(\'ps3\')">Show image</button>';
      	$("#show_button").html(button_to_show);

      	var  user_input_selection = '';
		user_input_selection += '<table align="center"><tr>';
		for (i=0;i<3;i++) {
			user_input_selection += '<td width=98px height=50px align="center"' + 
				' class="unchosen answerTable" ' +
				'id="exampleChoice' + String(i) + '" ' +
				'onclick=\"experiment.select(' + String(-1) + ',' + String(i) + ');\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr><tr>';
		user_input_selection += '</tr></table>';
		$("#selectionExample").html(user_input_selection)

		showSlide("example_trial");
	},





	next_real_trial: function() {
		has_clicked_show = 0;
      	trial_counter += 1;
		var example_text_explanation = "You will choose the odd one out. <br> (Now it is for real) <br> Trial " + String(trial_counter + 1) + " /" + String(number_of_trials);
      	$("#trialText").html(example_text_explanation);
      	var picture_1 = list_of_image_paths[sequence_order[trial_counter]][0];
      	var picture_2 = list_of_image_paths[sequence_order[trial_counter]][1];
      	var picture_3 = list_of_image_paths[sequence_order[trial_counter]][2];
      	var identity_of_1 = String(3*trial_counter + 4);
      	var identity_of_2 = String(3*trial_counter + 5);
      	var identity_of_3 = String(3*trial_counter + 6);
		var imagesHtmlCode = '';
		odd_one_place = odd_one_position[sequence_order[trial_counter]];
		if (odd_one_place == 0) {
			imagesHtmlCode += '<img src="'  + picture_1 + '" width=128px id="ps' + identity_of_1 + '" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src="'+ picture_2 + '" width=128px id="ps' + identity_of_2 + '" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src="'+ picture_3 + '" width=128px id="ps' + identity_of_3 + '" class = ' + orders_list[odd_one_place][2] + '>';	
		};
		if (odd_one_place == 1) {
			imagesHtmlCode += '<img src="'+ picture_2 + '" width=128px id="ps' + identity_of_2 + '" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src="'+ picture_3 + '" width=128px id="ps' + identity_of_3 + '" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src="'+ picture_1 + '" width=128px id="ps' + identity_of_1 + '" class = ' + orders_list[odd_one_place][0] + '>';
		};
		if (odd_one_place == 2) {
	        imagesHtmlCode +=  '<img src="'+ picture_3 + '" width=128px id="ps' + identity_of_3 + '" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src="'+ picture_1 + '" width=128px id="ps' + identity_of_1 + '" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src="'+ picture_2 + '" width=128px id="ps' + identity_of_2 + '" class = ' + orders_list[odd_one_place][1] + '>';
		};
      	$("#trialImages").html(imagesHtmlCode);

      	var button_to_show = '<button type="button" id="showImagesButton" onClick="showAndHide(\'ps' + identity_of_1 + '\'); showAndHide(\'ps' + identity_of_2 + '\'); showAndHide(\'ps' + identity_of_3 + '\'); experiment.disable_show(); experiment.clicked_show();">Show image</button>';
      	$("#show_trial_button").html(button_to_show);


      	// Dynamically create a button that either sends you to the same slide with updated
      	// picture values or, if the number of trials is reached, sends you to the end slide / or the "what was it about?" slide
      	var button_to_advance = '';
      	if (trial_counter + 1 < number_of_trials) {
      		button_to_advance += '<button type="button" id="trial_sequence_button" onClick="experiment.disable_next();  experiment.enable_show(); experiment.next_real_trial()">Next</button>';
      	} else {
      		button_to_advance += '<button type="button" id="final_slide_button" onClick="experiment.disable_next(); experiment.enable_show(); experiment.final_slide()">Next</button>';
      	};
      	$("#go_next_trial_button").html(button_to_advance);
      	//$("#go_next_trial_button").hide();


      	var  user_input_selection = '';
		user_input_selection += '<table align="center"><tr>';
		for (i=0;i<3;i++) {
			user_input_selection += '<td width=98px height=50px align="center"' + 
				' class="unchosen answerTable" ' +
				'id="tdchoice' + String(trial_counter) + '_' + String(i) +  '" ' +
				'onclick=\"experiment.select(' + String(trial_counter) + ',' + String(i) + ');\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr><tr>';
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
				corrected_pl = 2;
			}
			if (place == 2) {
				corrected_pl = 1;
			}
			

    		if (corrected_pl == odd_one_position[sequence_order[trial_counter]]) {
    			correct_answers[sequence_order[trial_counter]] = 1;
    		} else {
    			correct_answers[sequence_order[trial_counter]] = 0;
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

    	experiment.total_correct = sumElements(correct_answers);

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





