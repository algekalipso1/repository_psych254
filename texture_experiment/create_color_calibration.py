from PIL import Image, ImageFilter, ImageDraw

X = 128
Y = 128


file_to_save = "/Users/andesgomez/Documents/Stanford/Winter2015/Psych254/hello/texture_experiment/images/after_script/calibration/"

# Red
r_image = Image.new('RGB', (X, Y))
r_pixels = r_image.load()

for i in range(X):
	for j in range(Y):
		r_pixels[i, j] = (255, 255, 255)
		if ((i - 63)**2 + (j-63)**2)**.5 <= 64:
			r_pixels[i, j] = (255, 0, 0)

r_image.show()
r_image.save(file_to_save + "r.bmp")


# Green
g_image = Image.new('RGB', (X, Y))
g_pixels = g_image.load()

for i in range(X):
	for j in range(Y):
		g_pixels[i, j] = (255, 255, 255)
		if ((i - 63)**2 + (j-63)**2)**.5 <= 64:
			g_pixels[i, j] = (0, 255, 0)

g_image.show()
g_image.save(file_to_save + "g.bmp")


# Blue
b_image = Image.new('RGB', (X, Y))
b_pixels = b_image.load()

for i in range(X):
	for j in range(Y):
		b_pixels[i, j] = (255, 255, 255)
		if ((i - 63)**2 + (j-63)**2)**.5 <= 64:
			b_pixels[i, j] = (0, 0, 255)

b_image.show()
b_image.save(file_to_save + "b.bmp")




# Grey
for gv in range(10, 255, 10):
	name = 'gr' + str(gv)
	gy_image = Image.new('RGB', (X, Y))
	gy_pixels = gy_image.load()
	for i in range(X):
		for j in range(Y):
			gy_pixels[i, j] = (255, 255, 255)
			if ((i - 63)**2 + (j-63)**2)**.5 <= 64:
				gy_pixels[i, j] = (gv, gv, gv)
	gy_image.show()
	gy_image.save(file_to_save + name +".bmp")
