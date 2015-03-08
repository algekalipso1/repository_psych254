from PIL import Image, ImageFilter, ImageDraw
import random
import math
import sys
import os



#asymmetric		local_phase		random_weird
#button-gradient.png	magnitude_corr		stanford.png
#experimental_names	marginals		structured
#full_set		pseudoperiodic		subband_corr



picture_directory =  "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/full_set/"
#ready_stimuli =  "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/after_script/"
ready_stimuli =  "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/correct_after_script"



original_texture_directory = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/"
original_subdirectories = ["asymmetric", "structured", "pseudoperiodic"]
#synthesized_texture_directory = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/"
synthesized_texture_directory = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/corrected_scale/"
synthesized_subdirectories = ["full_set", "local_phase", "magnitude_corr", "marginals", "subband_corr"]

remade_structured = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/remakes/"



#ex_dir = os.listdir(synthesized_texture_directory + synthesized_subdirectories[0])
#ex_dir[5][:4]




# Function definitions
def cutImageCirlce(center, radious, base_to_cut, pixel_to_cut):
	new_piece_out = Image.new('RGB', (2*radious, 2*radious))
	pixel_piece_out = new_piece_out.load()
	for i in range(-radious, radious):
		for j in range(-radious, radious):
			pixel_piece_out[i + radious, j + radious] = (255, 255, 255)
			if (i**2 + j**2)**.5 < radious:
				if i + center[0] < X and i + center[0] >=0 and j + center[1] < Y and j + center[1] >=0:
					pixel_piece_out[i + radious, j + radious] = pixel_to_cut[i + center[0], j + center[1]]
					#pixel_to_cut[i + center[0], j + center[1]] = (0, 0, 0)
	return new_piece_out, pixel_piece_out


# I decided to drop this idea, as it creates images that are pixelated. Instead I'm shrinking the images on the other side
# of the analysis in matlab
def scaleImage(factor, base_to_scale, pixel_to_scale):
	new_scaled_base = Image.new('RGB', (base_to_scale.size[0]*factor, base_to_scale.size[1]*factor))
	new_pixels = new_scaled_base.load()
	for i in range(base_to_scale.size[0]*factor):
		for j in range(base_to_scale.size[1]*factor):
			new_pixels[i, j] = pixel_to_scale[i/factor, j/factor]
	return new_scaled_base, new_pixels



radious = 64 # pixels




# Create the circular stimuli for all of the original pictures
for subd_index in range(len(original_subdirectories)):
	ful = os.listdir(original_texture_directory + original_subdirectories[subd_index] + "/")
	for image_index in range(len(ful)):
		full_name = ful[image_index]
		if full_name == ".DS_Store":
			continue
		this_image = original_texture_directory + original_subdirectories[subd_index] + "/" + full_name
		base = Image.open(this_image, 'r')
		pixel_base = base.load()
		X = base.size[0]
		Y = base.size[1]
		xCircles = X / (radious)
		yCircles = Y / (radious)
		write_image = Image.new('RGB', (X, Y))
		write_pixels = write_image.load()
		for i in range(X):
			for j in range(Y):
				values = pixel_base[i, j]
				if isinstance(values, tuple):
					write_pixels[i, j] = values
				if isinstance(values, int):
					write_pixels[i, j] = (values, values, values)
		circle_pics = []
		## go ahead and cut all the pieces you need
		for i in range(xCircles - 1):
			for j in range(yCircles - 1):
				new_piece_out, pixel_piece_out = cutImageCirlce([i*radious + radious, j*radious + radious], radious, write_image, write_pixels)
				circle_pics += [new_piece_out]
		for pic_index in range(len(circle_pics)):
			base = circle_pics[pic_index]
			name_wo_ext = full_name[:-4]
			base.save(ready_stimuli + "/" + original_subdirectories[subd_index] + "/original/" + str(image_index) + "_" + str(pic_index) + ".bmp")










# Create the circular stimuli for all of the *synthetic* pictures.
for subd_index in range(len(synthesized_subdirectories)):
	ful = os.listdir(synthesized_texture_directory + synthesized_subdirectories[subd_index] + "/")
	sub_0 = 0
	sub_1 = 0
	sub_2 = 0
	for image_index in range(len(ful)):
		full_name = ful[image_index]
		if full_name == ".DS_Store":
			continue
		this_image = synthesized_texture_directory + synthesized_subdirectories[subd_index] + "/" + full_name
		type_of_image = ""
		number_to_track = 0
		if original_subdirectories[0] in full_name:
			type_of_image = original_subdirectories[0]
			number_to_track = sub_0
			sub_0 += 1
		if original_subdirectories[1] in full_name:
			type_of_image = original_subdirectories[1]
			number_to_track = sub_1
			sub_1 += 1
		if original_subdirectories[2] in full_name:
			type_of_image = original_subdirectories[2]
			number_to_track = sub_2
			sub_2 += 1
		base = Image.open(this_image, 'r')
		pixel_base = base.load()
		X = base.size[0]
		Y = base.size[1]
		xCircles = X / (radious)
		yCircles = Y / (radious)
		write_image = Image.new('RGB', (X, Y))
		write_pixels = write_image.load()
		for i in range(X):
			for j in range(Y):
				values = pixel_base[i, j]
				if isinstance(values, tuple):
					write_pixels[i, j] = values
				if isinstance(values, int):
					write_pixels[i, j] = (values, values, values)
		circle_pics = []
		## go ahead and cut all the pieces you need
		for i in range(xCircles - 1):
			for j in range(yCircles - 1):
				new_piece_out, pixel_piece_out = cutImageCirlce([i*radious + radious, j*radious + radious], radious, write_image, write_pixels)
				circle_pics += [new_piece_out]
		for pic_index in range(len(circle_pics)):
			base = circle_pics[pic_index]
			base.save(ready_stimuli + "/" + type_of_image + "/" + synthesized_subdirectories[subd_index] + "/" +  str(number_to_track) + "_" + str(pic_index) + ".bmp")









######################


# When you only want one picture

example_picture = "structured_elevator-panel_c.jpg"



base = Image.open(original_texture_directory + original_subdirectories[1] + "/" + example_picture, 'r')
pixel_base = base.load()

base, pixel_image = scaleImage(4, base, pixel_base)
pixel_base = base.load()

X = base.size[0]
Y = base.size[1]
center = [70,70]

write_image = Image.new('RGB', (X, Y))
write_pixels = write_image.load()

for i in range(X):
	for j in range(Y):
		values = pixel_base[i, j]
		if isinstance(values, tuple):
			write_pixels[i, j] = values
		if isinstance(values, int):
			write_pixels[i, j] = (values, values, values)



new_piece_out, pixel_piece_out = cutImageCirlce([300, 300], 64, write_image, write_pixels)
new_piece_out.show()
write_image.show()


## Reset the write_pixels
for i in range(X):
	for j in range(Y):
		values = pixel_base[i, j]
		if isinstance(values, tuple):
			write_pixels[i, j] = values
		if isinstance(values, int):
			write_pixels[i, j] = (values, values, values)


xCircles = X / (2*radious)
yCircles = Y / (2*radious)


circle_pics = []

## Here you
for i in range(xCircles):
	for j in range(yCircles):
		new_piece_out, pixel_piece_out = cutImageCirlce([i*2*radious + radious, j*2*radious + radious], radious, write_image, write_pixels)
		circle_pics += [new_piece_out]

for pic_index in range(len(circle_pics)):
	circle_pics[pic_index]


### How to make a PIL picture
base.save(pics_directory + "example_pic_3.bmp")






















lisa giocoiomo - neurobiology
mark schnitzer