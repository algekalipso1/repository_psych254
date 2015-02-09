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
var trial_counter = 0;

// List of filenames to use as stimuli
// You have to decide on a reasonable structure to do this.
// Though it is reasonable to first try to make a 1 trial settup work.

var list_of_image_paths = [
    ["images/experimental_names/s_5_0_0.jpg", "images/experimental_names/s_0_0_0.bmp", "images/experimental_names/s_0_0_0.bmp"],
    ["images/experimental_names/s_0_0_0.bmp", "images/experimental_names/s_5_0_0.jpg", "images/experimental_names/s_5_0_0.jpg"],
    ["images/experimental_names/s_5_1_0.jpg", "images/experimental_names/s_0_1_0.bmp", "images/experimental_names/s_0_1_0.bmp"],
    ["images/experimental_names/s_0_1_0.bmp", "images/experimental_names/s_5_1_0.jpg", "images/experimental_names/s_5_1_0.jpg"],
    ["images/experimental_names/s_5_2_0.jpg", "images/experimental_names/s_0_2_0.bmp", "images/experimental_names/s_0_2_0.bmp"],
    ["images/experimental_names/s_0_2_0.bmp", "images/experimental_names/s_5_2_0.jpg", "images/experimental_names/s_5_2_0.jpg"],
    ["images/experimental_names/s_5_3_0.jpg", "images/experimental_names/s_0_3_0.bmp", "images/experimental_names/s_0_3_0.bmp"],
    ["images/experimental_names/s_0_3_0.bmp", "images/experimental_names/s_5_3_0.jpg", "images/experimental_names/s_5_3_0.jpg"],
    ["images/experimental_names/s_5_4_0.jpg", "images/experimental_names/s_0_4_0.bmp", "images/experimental_names/s_0_4_0.bmp"],
    ["images/experimental_names/s_0_4_0.bmp", "images/experimental_names/s_5_4_0.jpg", "images/experimental_names/s_5_4_0.jpg"],
    ["images/experimental_names/s_5_5_0.jpg", "images/experimental_names/s_0_5_0.bmp", "images/experimental_names/s_0_5_0.bmp"],
    ["images/experimental_names/s_0_5_0.bmp", "images/experimental_names/s_5_5_0.jpg", "images/experimental_names/s_5_5_0.jpg"]
    ];


// Total number of trials
var number_of_trials = list_of_image_paths.length;


// List of recorded answers:
var answers_by_displayed_sequence = [];
for (var i = 0; i < number_of_trials; i++) {
    answers_by_displayed_sequence.push(-1);
}

var example_choice = -1;
