// ---------------- 2. STIMULUS SETUP ------------------
// Condition - call the maker getter to get the cond variable 
// Parameters and Stimulus Setup 


// Side of the equilateral triangle for stimuli display, in proportion of the width of the screen.
var triangle_side_prop = 0.1;
var triangle_side_pixels = 120;


// Location of the odd one out (this should be a sequence)
var odd_one_place = 0; // 0 is top, 1 is left, 2 is right -> counter-clockwise for table convinience

// Sequence of stimuli (randomized)

var orders_list = [["leftImage", "topImage", "rightImage"], ["rightImage", "leftImage", "topImage"], ["topImage", "rightImage", "leftImage"]];

// x, y displacements 

var xy_displacement = [[-triangle_side_prop/2, -0.288675*triangle_side_prop], [0, 0.57735027*triangle_side_prop], [-triangle_side_prop/2, -0.288675*triangle_side_prop]];


// Trial counter for the example trials.
var example_count = -1;

// Trial counter for the real trials
var trial_counter = -1;

// Type of image shown. Options
//  'asymmetric'
//  'pseudoperiodic'
//  'structured'
var image_type = "structured/";


// Image path
var impath = "images/correct_after_script/";


// Time of presentation for the main task
var presentation_time = 250;

// List of filenames to use as stimuli
// 60 trials total. 2 oddball X 5 statistical categories X 6 images ("X 3 image categories" if I was running the entire thing.)
// Thus, each consecutive pair of even odd indexes are the two oddball conditions (2 synthetic, then 2 originals)
// Never put consecutive stimuli numbers (like 0_0 and 0_1) because they can come from overlapping regions of the image
var list_of_image_paths = [
    [impath + image_type + "original/" + "0_5.bmp", impath + image_type + "full_set/" + "0_0.bmp", impath + image_type + "full_set/" + "0_2.bmp"],
    [impath + image_type + "full_set/" + "0_4.bmp", impath + image_type + "original/" + "0_1.bmp", impath + image_type + "original/" + "0_3.bmp"],
    [impath + image_type + "original/" + "1_0.bmp", impath + image_type + "full_set/" + "1_0.bmp", impath + image_type + "full_set/" + "1_2.bmp"],
    [impath + image_type + "full_set/" + "1_4.bmp", impath + image_type + "original/" + "1_5.bmp", impath + image_type + "original/" + "1_7.bmp"],
    [impath + image_type + "original/" + "2_4.bmp", impath + image_type + "full_set/" + "2_0.bmp", impath + image_type + "full_set/" + "2_2.bmp"],
    [impath + image_type + "full_set/" + "2_4.bmp", impath + image_type + "original/" + "2_6.bmp", impath + image_type + "original/" + "2_8.bmp"],
    [impath + image_type + "original/" + "3_3.bmp", impath + image_type + "full_set/" + "3_0.bmp", impath + image_type + "full_set/" + "3_2.bmp"],
    [impath + image_type + "full_set/" + "3_4.bmp", impath + image_type + "original/" + "3_5.bmp", impath + image_type + "original/" + "3_8.bmp"],
    [impath + image_type + "original/" + "4_6.bmp", impath + image_type + "full_set/" + "4_0.bmp", impath + image_type + "full_set/" + "4_2.bmp"],
    [impath + image_type + "full_set/" + "4_4.bmp", impath + image_type + "original/" + "4_0.bmp", impath + image_type + "original/" + "4_3.bmp"],
    [impath + image_type + "original/" + "5_7.bmp", impath + image_type + "full_set/" + "5_0.bmp", impath + image_type + "full_set/" + "5_2.bmp"],
    [impath + image_type + "full_set/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],

    [impath + image_type + "original/" + "0_5.bmp", impath + image_type + "local_phase/" + "0_0.bmp", impath + image_type + "local_phase/" + "0_2.bmp"],
    [impath + image_type + "local_phase/" + "0_4.bmp", impath + image_type + "original/" + "0_1.bmp", impath + image_type + "original/" + "0_3.bmp"],
    [impath + image_type + "original/" + "1_0.bmp", impath + image_type + "local_phase/" + "1_0.bmp", impath + image_type + "local_phase/" + "1_2.bmp"],
    [impath + image_type + "local_phase/" + "1_4.bmp", impath + image_type + "original/" + "1_5.bmp", impath + image_type + "original/" + "1_7.bmp"],
    [impath + image_type + "original/" + "2_4.bmp", impath + image_type + "local_phase/" + "2_0.bmp", impath + image_type + "local_phase/" + "2_2.bmp"],
    [impath + image_type + "local_phase/" + "2_4.bmp", impath + image_type + "original/" + "2_6.bmp", impath + image_type + "original/" + "2_8.bmp"],
    [impath + image_type + "original/" + "3_3.bmp", impath + image_type + "local_phase/" + "3_0.bmp", impath + image_type + "local_phase/" + "3_2.bmp"],
    [impath + image_type + "local_phase/" + "3_4.bmp", impath + image_type + "original/" + "3_5.bmp", impath + image_type + "original/" + "3_8.bmp"],
    [impath + image_type + "original/" + "4_6.bmp", impath + image_type + "local_phase/" + "4_0.bmp", impath + image_type + "local_phase/" + "4_2.bmp"],
    [impath + image_type + "local_phase/" + "4_4.bmp", impath + image_type + "original/" + "4_0.bmp", impath + image_type + "original/" + "4_3.bmp"],
    [impath + image_type + "original/" + "5_7.bmp", impath + image_type + "local_phase/" + "5_0.bmp", impath + image_type + "local_phase/" + "5_2.bmp"],
    [impath + image_type + "local_phase/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],

    [impath + image_type + "original/" + "0_5.bmp", impath + image_type + "magnitude_corr/" + "0_0.bmp", impath + image_type + "magnitude_corr/" + "0_2.bmp"],
    [impath + image_type + "magnitude_corr/" + "0_4.bmp", impath + image_type + "original/" + "0_1.bmp", impath + image_type + "original/" + "0_3.bmp"],
    [impath + image_type + "original/" + "1_0.bmp", impath + image_type + "magnitude_corr/" + "1_0.bmp", impath + image_type + "magnitude_corr/" + "1_2.bmp"],
    [impath + image_type + "magnitude_corr/" + "1_4.bmp", impath + image_type + "original/" + "1_5.bmp", impath + image_type + "original/" + "1_7.bmp"],
    [impath + image_type + "original/" + "2_4.bmp", impath + image_type + "magnitude_corr/" + "2_0.bmp", impath + image_type + "magnitude_corr/" + "2_2.bmp"],
    [impath + image_type + "magnitude_corr/" + "2_4.bmp", impath + image_type + "original/" + "2_6.bmp", impath + image_type + "original/" + "2_8.bmp"],
    [impath + image_type + "original/" + "3_3.bmp", impath + image_type + "magnitude_corr/" + "3_0.bmp", impath + image_type + "magnitude_corr/" + "3_2.bmp"],
    [impath + image_type + "magnitude_corr/" + "3_4.bmp", impath + image_type + "original/" + "3_5.bmp", impath + image_type + "original/" + "3_8.bmp"],
    [impath + image_type + "original/" + "4_6.bmp", impath + image_type + "magnitude_corr/" + "4_0.bmp", impath + image_type + "magnitude_corr/" + "4_2.bmp"],
    [impath + image_type + "magnitude_corr/" + "4_4.bmp", impath + image_type + "original/" + "4_0.bmp", impath + image_type + "original/" + "4_3.bmp"],
    [impath + image_type + "original/" + "5_7.bmp", impath + image_type + "magnitude_corr/" + "5_0.bmp", impath + image_type + "magnitude_corr/" + "5_2.bmp"],
    [impath + image_type + "magnitude_corr/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],

    [impath + image_type + "original/" + "0_5.bmp", impath + image_type + "marginals/" + "0_0.bmp", impath + image_type + "marginals/" + "0_2.bmp"],
    [impath + image_type + "marginals/" + "0_4.bmp", impath + image_type + "original/" + "0_1.bmp", impath + image_type + "original/" + "0_3.bmp"],
    [impath + image_type + "original/" + "1_0.bmp", impath + image_type + "marginals/" + "1_0.bmp", impath + image_type + "marginals/" + "1_2.bmp"],
    [impath + image_type + "marginals/" + "1_4.bmp", impath + image_type + "original/" + "1_5.bmp", impath + image_type + "original/" + "1_7.bmp"],
    [impath + image_type + "original/" + "2_4.bmp", impath + image_type + "marginals/" + "2_0.bmp", impath + image_type + "marginals/" + "2_2.bmp"],
    [impath + image_type + "marginals/" + "2_4.bmp", impath + image_type + "original/" + "2_6.bmp", impath + image_type + "original/" + "2_8.bmp"],
    [impath + image_type + "original/" + "3_3.bmp", impath + image_type + "marginals/" + "3_0.bmp", impath + image_type + "marginals/" + "3_2.bmp"],
    [impath + image_type + "marginals/" + "3_4.bmp", impath + image_type + "original/" + "3_5.bmp", impath + image_type + "original/" + "3_8.bmp"],
    [impath + image_type + "original/" + "4_6.bmp", impath + image_type + "marginals/" + "4_0.bmp", impath + image_type + "marginals/" + "4_2.bmp"],
    [impath + image_type + "marginals/" + "4_4.bmp", impath + image_type + "original/" + "4_0.bmp", impath + image_type + "original/" + "4_3.bmp"],
    [impath + image_type + "original/" + "5_7.bmp", impath + image_type + "marginals/" + "5_0.bmp", impath + image_type + "marginals/" + "5_2.bmp"],
    [impath + image_type + "marginals/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],

    [impath + image_type + "original/" + "0_5.bmp", impath + image_type + "subband_corr/" + "0_0.bmp", impath + image_type + "subband_corr/" + "0_2.bmp"],
    [impath + image_type + "subband_corr/" + "0_4.bmp", impath + image_type + "original/" + "0_1.bmp", impath + image_type + "original/" + "0_3.bmp"],
    [impath + image_type + "original/" + "1_0.bmp", impath + image_type + "subband_corr/" + "1_0.bmp", impath + image_type + "subband_corr/" + "1_2.bmp"],
    [impath + image_type + "subband_corr/" + "1_4.bmp", impath + image_type + "original/" + "1_5.bmp", impath + image_type + "original/" + "1_7.bmp"],
    [impath + image_type + "original/" + "2_4.bmp", impath + image_type + "subband_corr/" + "2_0.bmp", impath + image_type + "subband_corr/" + "2_2.bmp"],
    [impath + image_type + "subband_corr/" + "2_4.bmp", impath + image_type + "original/" + "2_6.bmp", impath + image_type + "original/" + "2_8.bmp"],
    [impath + image_type + "original/" + "3_3.bmp", impath + image_type + "subband_corr/" + "3_0.bmp", impath + image_type + "subband_corr/" + "3_2.bmp"],
    [impath + image_type + "subband_corr/" + "3_4.bmp", impath + image_type + "original/" + "3_5.bmp", impath + image_type + "original/" + "3_8.bmp"],
    [impath + image_type + "original/" + "4_6.bmp", impath + image_type + "subband_corr/" + "4_0.bmp", impath + image_type + "subband_corr/" + "4_2.bmp"],
    [impath + image_type + "subband_corr/" + "4_4.bmp", impath + image_type + "original/" + "4_0.bmp", impath + image_type + "original/" + "4_3.bmp"],
    [impath + image_type + "original/" + "5_7.bmp", impath + image_type + "subband_corr/" + "5_0.bmp", impath + image_type + "subband_corr/" + "5_2.bmp"],
    [impath + image_type + "subband_corr/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],
    
    [impath + "calibration/" + "gr60.bmp", impath + "calibration/" + "gr190.bmp", impath + "calibration/" + "gr190.bmp"],
    [impath + "calibration/" + "gr190.bmp", impath + "calibration/" + "gr60.bmp", impath + "calibration/" + "gr60.bmp"],
    [impath + "calibration/" + "gr10.bmp", impath + "calibration/" + "gr240.bmp", impath + "calibration/" + "gr240.bmp"],
    [impath + "calibration/" + "gr240.bmp", impath + "calibration/" + "gr10.bmp", impath + "calibration/" + "gr10.bmp"],
    [impath + "calibration/" + "gr110.bmp", impath + "calibration/" + "gr130.bmp", impath + "calibration/" + "gr130.bmp"],
    [impath + "calibration/" + "gr130.bmp", impath + "calibration/" + "gr110.bmp", impath + "calibration/" + "gr110.bmp"]
    ];


// var list_of_image_paths = [
//     [impath + image_type + "original/" + "0_5.bmp", impath + image_type + "full_set/" + "0_0.bmp", impath + image_type + "full_set/" + "0_2.bmp"],
//     [impath + image_type + "full_set/" + "0_4.bmp", impath + image_type + "original/" + "0_1.bmp", impath + image_type + "original/" + "0_3.bmp"],
//     [impath + image_type + "original/" + "1_0.bmp", impath + image_type + "full_set/" + "1_0.bmp", impath + image_type + "full_set/" + "1_2.bmp"],
//     [impath + image_type + "full_set/" + "1_4.bmp", impath + image_type + "original/" + "1_5.bmp", impath + image_type + "original/" + "1_7.bmp"],
//     [impath + image_type + "original/" + "2_4.bmp", impath + image_type + "full_set/" + "2_0.bmp", impath + image_type + "full_set/" + "2_2.bmp"],
//     [impath + image_type + "full_set/" + "2_4.bmp", impath + image_type + "original/" + "2_6.bmp", impath + image_type + "original/" + "2_8.bmp"],
//     [impath + image_type + "original/" + "3_3.bmp", impath + image_type + "full_set/" + "3_0.bmp", impath + image_type + "full_set/" + "3_2.bmp"],
//     [impath + image_type + "full_set/" + "3_4.bmp", impath + image_type + "original/" + "3_5.bmp", impath + image_type + "original/" + "3_8.bmp"],
//     [impath + image_type + "original/" + "4_6.bmp", impath + image_type + "full_set/" + "4_0.bmp", impath + image_type + "full_set/" + "4_2.bmp"],
//     [impath + image_type + "full_set/" + "4_4.bmp", impath + image_type + "original/" + "4_0.bmp", impath + image_type + "original/" + "4_3.bmp"],
//     [impath + image_type + "original/" + "5_7.bmp", impath + image_type + "full_set/" + "5_0.bmp", impath + image_type + "full_set/" + "5_2.bmp"],
//     [impath + image_type + "full_set/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],
//     [impath + image_type + "full_set/" + "5_4.bmp", impath + image_type + "original/" + "5_4.bmp", impath + image_type + "original/" + "5_1.bmp"],
//     [impath + "calibration/" + "gr60.bmp", impath + "calibration/" + "gr190.bmp", impath + "calibration/" + "gr190.bmp"],
//     [impath + "calibration/" + "gr190.bmp", impath + "calibration/" + "gr60.bmp", impath + "calibration/" + "gr60.bmp"],
//     [impath + "calibration/" + "gr10.bmp", impath + "calibration/" + "gr240.bmp", impath + "calibration/" + "gr240.bmp"],
//     [impath + "calibration/" + "gr240.bmp", impath + "calibration/" + "gr10.bmp", impath + "calibration/" + "gr10.bmp"],
//     [impath + "calibration/" + "gr110.bmp", impath + "calibration/" + "gr130.bmp", impath + "calibration/" + "gr130.bmp"],
//     [impath + "calibration/" + "gr130.bmp", impath + "calibration/" + "gr110.bmp", impath + "calibration/" + "gr110.bmp"]
//     ];


// var list_of_image_paths = [
//     ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/full_set/1_0.bmp", "images/after_script/structured/full_set/1_1.bmp"],
//     ["images/after_script/structured/original/1_1.bmp", "images/after_script/structured/full_set/1_2.bmp", "images/after_script/structured/full_set/1_3.bmp"],
//     ["images/after_script/structured/original/2_0.bmp", "images/after_script/structured/full_set/2_0.bmp", "images/after_script/structured/full_set/2_1.bmp"],
//     ["images/after_script/structured/original/2_1.bmp", "images/after_script/structured/full_set/2_2.bmp", "images/after_script/structured/full_set/2_3.bmp"],
//     ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/local_phase/1_0.bmp", "images/after_script/structured/local_phase/1_1.bmp"],
//     ["images/after_script/structured/original/1_1.bmp", "images/after_script/structured/local_phase/1_2.bmp", "images/after_script/structured/local_phase/1_3.bmp"]
//     ];


// Exmaple trials image paths
var image_sources_for_example = [
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/2_0.bmp", "images/after_script/pseudoperiodic/full_set/2_0.bmp", "images/after_script/pseudoperiodic/full_set/2_5.bmp"],
    ["images/after_script/asymmetric/full_set/4_0.bmp", "images/after_script/asymmetric/original/4_0.bmp", "images/after_script/asymmetric/original/4_0.bmp"]
    ];


var calibration_images = ["images/after_script/calibration/r.bmp", "images/after_script/calibration/g.bmp", "images/after_script/calibration/b.bmp"];

// Total number of trials
var number_of_trials = list_of_image_paths.length;

// Record of positions
var odd_one_position = [];
for (var i = 0; i < number_of_trials; i++) {
    odd_one_position.push(random(0,2));
}

// List of recorded answers:
var answers_by_displayed_sequence = [];
for (var i = 0; i < number_of_trials; i++) {
    answers_by_displayed_sequence.push(-1);
}

// Sequence of trials (randomized)
var sequence_order = [];
for (var i = 0; i < number_of_trials; i++) {
    sequence_order.push(i);
}
sequence_order = shuffle(sequence_order);

// Tracks the correct odd one outs
var correct_answers = [];
for (var i = 0; i < number_of_trials; i++) {
    correct_answers.push(-1);
}

// Correct answers by number trial number
var correct_by_trial = [];
for (var i = 0; i < number_of_trials; i++) {
    correct_by_trial.push(-1);
}

// Position by trial
var position_by_trial = [];
for (var i = 0; i < number_of_trials; i++) {
    position_by_trial.push(-1);
}

// Position of the odd one by trial
odd_one_pos_by_trial = [];
for (var i = 0; i < number_of_trials; i++) {
    odd_one_pos_by_trial.push(odd_one_position[sequence_order[i]]);
}

var odd_one_cycle = [
    [0, 1, 2],
    [2, 0, 1],
    [1, 2, 0]
    ];

var example_positions = [
    [0, 1, 2],
    [2, 1, 0],
    [1, 2, 0],
    [1, 0, 2]
    ];

var example_odd_one = ["top", "right", "right", "left"];

var example_choice = -1;

var has_clicked_show = 0;

var example_user_choices = [-1, -1, -1, -1];

