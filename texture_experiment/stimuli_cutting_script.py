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
ready_stimuli =  "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/after_script/"


original_texture_directory = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/"
original_subdirectories = ["asymmetric", "structured", "pseudoperiodic"]
synthesized_texture_directory = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/"
synthesized_subdirectories = ["full_set", "local_phase", "magnitude_corr", "marginals", "subband_corr"]

ex_dir = os.listdir(synthesized_texture_directory + synthesized_subdirectories[0])


ex_dir[5][:4]




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
					pixel_to_cut[i + center[0], j + center[1]] = (0, 0, 0)
	return new_piece_out, pixel_piece_out



radious = 64 # pixels




# Create the circular stimuli for all of the original pictures
for subd_index in range(len(original_subdirectories)):
	ful = os.listdir(original_texture_directory + original_subdirectories[subd_index] + "/")
	for image_index in range(len(ful)):
		full_name = ful[image_index]
		this_image = original_texture_directory + original_subdirectories[subd_index] + "/" + full_name
		base = Image.open(this_image, 'r')
		pixel_base = base.load()
		X = base.size[0]
		Y = base.size[1]
		xCircles = X / (2*radious)
		yCircles = Y / (2*radious)
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
		for i in range(xCircles):
			for j in range(yCircles):
				new_piece_out, pixel_piece_out = cutImageCirlce([i*2*radious + radious, j*2*radious + radious], radious, write_image, write_pixels)
				circle_pics += [new_piece_out]
		for pic_index in range(len(circle_pics)):
			base = circle_pics[pic_index]
			name_wo_ext = full_name[:-4]
			base.save(ready_stimuli + "/" + original_subdirectories[subd_index] + "/original/" + str(image_index) + "_" + str(pic_index) + ".bmp")










# Create the circular stimuli for all of the *synthetic* pictures
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
		xCircles = X / (2*radious)
		yCircles = Y / (2*radious)
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
		for i in range(xCircles):
			for j in range(yCircles):
				new_piece_out, pixel_piece_out = cutImageCirlce([i*2*radious + radious, j*2*radious + radious], radious, write_image, write_pixels)
				circle_pics += [new_piece_out]
		for pic_index in range(len(circle_pics)):
			base = circle_pics[pic_index]
			base.save(ready_stimuli + "/" + type_of_image + "/" + synthesized_subdirectories[subd_index] + "/" +  str(number_to_track) + "_" + str(pic_index) + ".bmp")






# So far the "structured" set works really well. I don't know why 





######################


# When you only want one picture

example_picture = "33-peacock-black-whijpg_0.bmp"



base = Image.open(picture_directory + example_picture, 'r')
pixel_base = base.load()
X = base.size[0]
Y = base.size[1]
center = [70,70]

write_image = Image.new('RGB', (X, Y))
write_pixels = write_image.load()

for i in range(X):
	for j in range(Y):
		write_pixels[i, j] = (pixel_base[i, j], pixel_base[i, j], pixel_base[i, j])



new_piece_out, pixel_piece_out = cutImageCirlce([100, 100], 100, write_image, write_pixels)
new_piece_out.show()
write_image.show()


## Reset the write_pixels
for i in range(X):
	for j in range(Y):
		write_pixels[i, j] = (pixel_base[i, j], pixel_base[i, j], pixel_base[i, j])


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