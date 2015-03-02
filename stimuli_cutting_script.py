from PIL import Image, ImageFilter, ImageDraw
import random
import math
import sys
import os
import visual_functions
import network_functions
from images2gif import writeGif


picture_directory =  "/Users/andesgomez/Documents/Stanford/Autumn2014-Masters/Psych209/project/visualization/"
gifs_directory =  "/Users/andesgomez/Documents/Stanford/Autumn2014-Masters/Psych209/project/example_gifs/"
pics_directory =  "/Users/andesgomez/Documents/Stanford/Autumn2014-Masters/Psych209/project/example_pics/"




### How to make a PIL picture
n = 255

base = Image.new('RGB', (n, n))
pixel_base = base.load()
for i in range(n):
	for j in range(n):
		r = (i + j) % 255
		g = (i + j) % 255
		b = (i + j) % 255
		pixel_base[i, j] = (r, g, b)

base.show()
base.save(pics_directory + "example_pic_3.bmp")


### How to make a gif

def visualize_ground(ground):
	base = Image.new('RGB', (len(ground), len(ground[0])))
	pixel_base = base.load()
	for i in range(base.size[0]):
		for j in range(base.size[1]):
			r = ground[i][j][0]
			g = ground[i][j][1]
			b = ground[i][j][2]
			pixel_base[i,j] = (r, g, b)
	return base




lisa giocoiomo - neurobiology
mark schnitzer