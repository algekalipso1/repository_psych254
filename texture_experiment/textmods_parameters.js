// ---------------- 2. STIMULUS SETUP ------------------
// Condition - call the maker getter to get the cond variable 
// Parameters and Stimulus Setup 


// Side of the equilateral triangle for stimuli display, in proportion of the width of the screen.
var triangle_side_prop = 0.1;
var triangle_side_pixels = 120;


// Location of the odd one out (this should be a sequence)
var odd_one_place = 2; // 0 is left, 1 is top, 2 is right

// Sequence of stimuli (randomized)

var orders_list = [["leftImage", "topImage", "rightImage"], ["rightImage", "leftImage", "topImage"], ["topImage", "rightImage", "leftImage"]];

// x, y displacements 

var xy_displacement = [[-triangle_side_prop/2, -0.288675*triangle_side_prop], [0, 0.57735027*triangle_side_prop], [-triangle_side_prop/2, -0.288675*triangle_side_prop]];


// Trial counter
var trial_counter = -1;

// List of filenames to use as stimuli
// You have to decide on a reasonable structure to do this.
// Though it is reasonable to first try to make a 1 trial settup work.

// var list_of_image_paths = [
//     ["images/experimental_names/s_5_0_0.jpg", "images/experimental_names/s_0_0_0.bmp", "images/experimental_names/s_0_0_0.bmp"],
//     ["images/experimental_names/s_0_0_0.bmp", "images/experimental_names/s_5_0_0.jpg", "images/experimental_names/s_5_0_0.jpg"],
//     ["images/experimental_names/s_5_1_0.jpg", "images/experimental_names/s_0_1_0.bmp", "images/experimental_names/s_0_1_0.bmp"],
//     ["images/experimental_names/s_0_1_0.bmp", "images/experimental_names/s_5_1_0.jpg", "images/experimental_names/s_5_1_0.jpg"],
//     ["images/experimental_names/s_5_2_0.jpg", "images/experimental_names/s_0_2_0.bmp", "images/experimental_names/s_0_2_0.bmp"],
//     ["images/experimental_names/s_0_2_0.bmp", "images/experimental_names/s_5_2_0.jpg", "images/experimental_names/s_5_2_0.jpg"],
//     ["images/experimental_names/s_5_3_0.jpg", "images/experimental_names/s_0_3_0.bmp", "images/experimental_names/s_0_3_0.bmp"],
//     ["images/experimental_names/s_0_3_0.bmp", "images/experimental_names/s_5_3_0.jpg", "images/experimental_names/s_5_3_0.jpg"],
//     ["images/experimental_names/s_5_4_0.jpg", "images/experimental_names/s_0_4_0.bmp", "images/experimental_names/s_0_4_0.bmp"],
//     ["images/experimental_names/s_0_4_0.bmp", "images/experimental_names/s_5_4_0.jpg", "images/experimental_names/s_5_4_0.jpg"],
//     ["images/experimental_names/s_5_5_0.jpg", "images/experimental_names/s_0_5_0.bmp", "images/experimental_names/s_0_5_0.bmp"],
//     ["images/experimental_names/s_0_5_0.bmp", "images/experimental_names/s_5_5_0.jpg", "images/experimental_names/s_5_5_0.jpg"]
//     ];

var list_of_image_paths = [
    ["images/after_script/structured/original/1_2.bmp", "images/after_script/structured/full_set/1_0.bmp", "images/after_script/structured/full_set/1_1.bmp"],
    ["images/after_script/structured/original/1_3.bmp", "images/after_script/structured/full_set/1_2.bmp", "images/after_script/structured/full_set/1_3.bmp"],
    ["images/after_script/structured/original/2_0.bmp", "images/after_script/structured/full_set/2_0.bmp", "images/after_script/structured/full_set/2_1.bmp"],
    ["images/after_script/structured/original/2_3.bmp", "images/after_script/structured/full_set/2_2.bmp", "images/after_script/structured/full_set/2_3.bmp"],
    ["images/after_script/structured/original/1_3.bmp", "images/after_script/structured/local_phase/1_0.bmp", "images/after_script/structured/local_phase/1_1.bmp"],
    ["images/after_script/structured/original/1_2.bmp", "images/after_script/structured/local_phase/1_2.bmp", "images/after_script/structured/local_phase/1_3.bmp"],
    ["images/after_script/structured/original/2_3.bmp", "images/after_script/structured/local_phase/2_0.bmp", "images/after_script/structured/local_phase/2_1.bmp"],
    ["images/after_script/structured/original/2_3.bmp", "images/after_script/structured/local_phase/2_2.bmp", "images/after_script/structured/local_phase/2_3.bmp"],
    ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/magnitude_corr/1_0.bmp", "images/after_script/structured/magnitude_corr/1_1.bmp"],
    ["images/after_script/structured/original/1_2.bmp", "images/after_script/structured/magnitude_corr/1_2.bmp", "images/after_script/structured/magnitude_corr/1_3.bmp"],
    ["images/after_script/structured/original/2_0.bmp", "images/after_script/structured/magnitude_corr/2_0.bmp", "images/after_script/structured/magnitude_corr/2_1.bmp"],
    ["images/after_script/structured/original/2_3.bmp", "images/after_script/structured/magnitude_corr/2_2.bmp", "images/after_script/structured/magnitude_corr/2_3.bmp"],
    ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/marginals/1_0.bmp", "images/after_script/structured/marginals/1_1.bmp"],
    ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/marginals/1_2.bmp", "images/after_script/structured/marginals/1_3.bmp"],
    ["images/after_script/structured/original/2_3.bmp", "images/after_script/structured/marginals/2_0.bmp", "images/after_script/structured/marginals/2_1.bmp"],
    ["images/after_script/structured/original/2_0.bmp", "images/after_script/structured/marginals/2_2.bmp", "images/after_script/structured/marginals/2_3.bmp"],
    ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/subband_corr/1_0.bmp", "images/after_script/structured/subband_corr/1_1.bmp"],
    ["images/after_script/structured/original/1_2.bmp", "images/after_script/structured/subband_corr/1_2.bmp", "images/after_script/structured/subband_corr/1_3.bmp"],
    ["images/after_script/structured/original/2_0.bmp", "images/after_script/structured/subband_corr/2_0.bmp", "images/after_script/structured/subband_corr/2_1.bmp"],
    ["images/after_script/structured/original/2_3.bmp", "images/after_script/structured/subband_corr/2_2.bmp", "images/after_script/structured/subband_corr/2_3.bmp"],
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_0.bmp", "images/after_script/pseudoperiodic/full_set/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/4_3.bmp", "images/after_script/pseudoperiodic/full_set/4_2.bmp", "images/after_script/pseudoperiodic/full_set/4_3.bmp"],
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/local_phase/4_0.bmp", "images/after_script/pseudoperiodic/local_phase/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/4_3.bmp", "images/after_script/pseudoperiodic/local_phase/4_2.bmp", "images/after_script/pseudoperiodic/local_phase/4_3.bmp"],
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/magnitude_corr/4_0.bmp", "images/after_script/pseudoperiodic/magnitude_corr/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/4_3.bmp", "images/after_script/pseudoperiodic/magnitude_corr/4_2.bmp", "images/after_script/pseudoperiodic/magnitude_corr/4_3.bmp"],
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/marginals/4_0.bmp", "images/after_script/pseudoperiodic/marginals/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/4_2.bmp", "images/after_script/pseudoperiodic/marginals/4_2.bmp", "images/after_script/pseudoperiodic/marginals/4_3.bmp"],
    ["images/after_script/pseudoperiodic/original/4_0.bmp", "images/after_script/pseudoperiodic/subband_corr/4_0.bmp", "images/after_script/pseudoperiodic/subband_corr/4_1.bmp"],
    ["images/after_script/pseudoperiodic/original/4_2.bmp", "images/after_script/pseudoperiodic/subband_corr/4_2.bmp", "images/after_script/pseudoperiodic/subband_corr/4_3.bmp"],
    ["images/after_script/pseudoperiodic/original/1_0.bmp", "images/after_script/pseudoperiodic/full_set/1_0.bmp", "images/after_script/pseudoperiodic/full_set/1_1.bmp"],
    ["images/after_script/pseudoperiodic/original/1_2.bmp", "images/after_script/pseudoperiodic/full_set/1_2.bmp", "images/after_script/pseudoperiodic/full_set/1_3.bmp"],
    ["images/after_script/pseudoperiodic/original/1_0.bmp", "images/after_script/pseudoperiodic/local_phase/1_0.bmp", "images/after_script/pseudoperiodic/local_phase/1_1.bmp"],
    ["images/after_script/pseudoperiodic/original/1_3.bmp", "images/after_script/pseudoperiodic/local_phase/1_2.bmp", "images/after_script/pseudoperiodic/local_phase/1_3.bmp"],
    ["images/after_script/pseudoperiodic/original/1_0.bmp", "images/after_script/pseudoperiodic/magnitude_corr/1_0.bmp", "images/after_script/pseudoperiodic/magnitude_corr/1_1.bmp"],
    ["images/after_script/pseudoperiodic/original/1_2.bmp", "images/after_script/pseudoperiodic/magnitude_corr/1_2.bmp", "images/after_script/pseudoperiodic/magnitude_corr/1_3.bmp"],
    ["images/after_script/pseudoperiodic/original/1_0.bmp", "images/after_script/pseudoperiodic/marginals/1_0.bmp", "images/after_script/pseudoperiodic/marginals/1_1.bmp"],
    ["images/after_script/pseudoperiodic/original/1_3.bmp", "images/after_script/pseudoperiodic/marginals/1_2.bmp", "images/after_script/pseudoperiodic/marginals/1_3.bmp"],
    ["images/after_script/pseudoperiodic/original/1_0.bmp", "images/after_script/pseudoperiodic/subband_corr/1_0.bmp", "images/after_script/pseudoperiodic/subband_corr/1_1.bmp"],
    ["images/after_script/pseudoperiodic/original/1_2.bmp", "images/after_script/pseudoperiodic/subband_corr/1_2.bmp", "images/after_script/pseudoperiodic/subband_corr/1_3.bmp"]
    ];


// var list_of_image_paths = [
//     ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/full_set/1_0.bmp", "images/after_script/structured/full_set/1_1.bmp"],
//     ["images/after_script/structured/original/1_1.bmp", "images/after_script/structured/full_set/1_2.bmp", "images/after_script/structured/full_set/1_3.bmp"],
//     ["images/after_script/structured/original/2_0.bmp", "images/after_script/structured/full_set/2_0.bmp", "images/after_script/structured/full_set/2_1.bmp"],
//     ["images/after_script/structured/original/2_1.bmp", "images/after_script/structured/full_set/2_2.bmp", "images/after_script/structured/full_set/2_3.bmp"],
//     ["images/after_script/structured/original/1_0.bmp", "images/after_script/structured/local_phase/1_0.bmp", "images/after_script/structured/local_phase/1_1.bmp"],
//     ["images/after_script/structured/original/1_1.bmp", "images/after_script/structured/local_phase/1_2.bmp", "images/after_script/structured/local_phase/1_3.bmp"]
//     ];

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
    correct_answers.push(0);
}

var example_choice = -1;

var has_clicked_show = 0;

