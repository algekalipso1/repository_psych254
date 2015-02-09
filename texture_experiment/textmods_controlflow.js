
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
	choice: "null",




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

		var imagesHtmlCode = '';
		if (odd_one_place == 0) {
			imagesHtmlCode += '<img src="images/pseudoperiodic/pseudoperiodic_d30_2192.jpg" width=75px alt="threads" id="ps1" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src="images/full_set/pseudoperiodic_d30_2jpg_one_0.bmp" width=75px alt="peacock" id="ps2" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src="images/full_set/pseudoperiodic_d30_2jpg_dos_0.bmp" width=75px alt="peacock" id="ps3" class = ' + orders_list[odd_one_place][2] + '>';	
		}
		if (odd_one_place == 1) {
			imagesHtmlCode += '<img src="images/full_set/pseudoperiodic_d30_2jpg_one_0.bmp" width=75px alt="peacock" id="ps2" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src="images/full_set/pseudoperiodic_d30_2jpg_dos_0.bmp" width=75px alt="peacock" id="ps3" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src="images/pseudoperiodic/pseudoperiodic_d30_2192.jpg" width=75px alt="threads" id="ps1" class = ' + orders_list[odd_one_place][0] + '>';
		}
		if (odd_one_place == 2) {
	        imagesHtmlCode +=  '<img src="images/full_set/pseudoperiodic_d30_2jpg_dos_0.bmp" width=75px alt="peacock" id="ps3" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src="images/pseudoperiodic/pseudoperiodic_d30_2192.jpg" width=75px alt="threads" id="ps1" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src="images/full_set/pseudoperiodic_d30_2jpg_one_0.bmp" width=75px alt="peacock" id="ps2" class = ' + orders_list[odd_one_place][1] + '>';
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
				'onclick=\"experiment.select(' + String(-1) + ',' + String(i) + ')\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr><tr>';
		user_input_selection += '</tr></table>';
		$("#selectionExample").html(user_input_selection)

		showSlide("example_trial");
	},





	next_real_trial: function() {
		var example_text_explanation = "You will choose the odd one out.";
      	$("#trialText").html(example_text_explanation);
      	var picture_1 = list_of_image_paths[trial_counter][0];
      	var picture_2 = list_of_image_paths[trial_counter][1];
      	var picture_3 = list_of_image_paths[trial_counter][2];
      	var identity_of_1 = String(3*trial_counter + 4);
      	var identity_of_2 = String(3*trial_counter + 5);
      	var identity_of_3 = String(3*trial_counter + 6);
		var imagesHtmlCode = '';
		if (odd_one_place == 0) {
			imagesHtmlCode += '<img src="'  + picture_1 + '" width=75px alt="threads" id="ps' + identity_of_1 + '" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src="'+ picture_2 + '" width=75px alt="peacock" id="ps' + identity_of_2 + '" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src="'+ picture_3 + '" width=75px alt="peacock" id="ps' + identity_of_3 + '" class = ' + orders_list[odd_one_place][2] + '>';	
		};
		if (odd_one_place == 1) {
			imagesHtmlCode += '<img src="'+ picture_2 + '" width=75px alt="peacock" id="ps' + identity_of_2 + '" class = ' + orders_list[odd_one_place][1] + '>';
	        imagesHtmlCode +=  '<img src="'+ picture_3 + '" width=75px alt="peacock" id="ps' + identity_of_3 + '" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src="'+ picture_1 + '" width=75px alt="threads" id="ps' + identity_of_1 + '" class = ' + orders_list[odd_one_place][0] + '>';
		};
		if (odd_one_place == 2) {
	        imagesHtmlCode +=  '<img src="'+ picture_3 + '" width=75px alt="peacock" id="ps' + identity_of_3 + '" class = ' + orders_list[odd_one_place][2] + '>';	
			imagesHtmlCode += '<img src="'+ picture_1 + '" width=75px alt="threads" id="ps' + identity_of_1 + '" class = ' + orders_list[odd_one_place][0] + '>';
			imagesHtmlCode += '<img src="'+ picture_2 + '" width=75px alt="peacock" id="ps' + identity_of_2 + '" class = ' + orders_list[odd_one_place][1] + '>';
		};
      	$("#trialImages").html(imagesHtmlCode);

      	var button_to_show = '<button type="button" id="showImagesButton" onClick="showAndHide(\'ps' + identity_of_1 + '\'); showAndHide(\'ps' + identity_of_2 + '\'); showAndHide(\'ps' + identity_of_3 + '\')">Show image</button>';
      	$("#show_trial_button").html(button_to_show);


      	// Dynamically create a button that either sends you to the same slide with updated
      	// picture values or, if the number of trials is reached, sends you to the end slide / or the "what was it about?" slide
      	var button_to_advance = '';
      	if (trial_counter + 1 < number_of_trials) {

      		button_to_advance += '<button type="button" id="trial_sequence_button" onClick="experiment.next_real_trial()">Next</button>';
      	} else {
      		//button_to_advance += '<button type="button" id="trial_sequence_button" onClick="experiment.next_real_trial()">Next</button>';
      		button_to_advance += '<button type="button" id="final_slide_button" onClick="experiment.final_slide()">Next</button>';
      	};
      	$("#go_next_trial_button").html(button_to_advance);


      	var  user_input_selection = '';
		user_input_selection += '<table align="center"><tr>';
		for (i=0;i<3;i++) {
			user_input_selection += '<td width=98px height=50px align="center"' + 
				' class="unchosen answerTable" ' +
				'id="tdchoice' + String(trial_counter) + ',' + String(i) +  '" ' +
				'onclick=\"experiment.select(' + String(trial_counter) + ',' + String(i) + ')\">';
			user_input_selection +=  '<br>' + number_to_name[i];
			user_input_selection += '</td>';
		}
		user_input_selection += '</tr><tr>';
		user_input_selection += '</tr></table>';
		$("#userSelectionInputFields").html(user_input_selection)


      	trial_counter += 1;
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
			answers_by_displayed_sequence[trialc] = place;
		}
		
		//}
		// unchoose everything
		//for (var i=0; i<choices.length; i++) {
		 //   $("#tdchoice" + String(trialc + i)).removeClass('chosen').addClass('unchosen')
		//}
		// choose this one
		//$("#tdchoice" + String(trialc + place)).removeClass('unchosen').addClass('chosen')

	},

	final_slide: function() {
		showSlide("end_slide");
	},
}





