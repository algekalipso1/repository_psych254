import sys

def cat(x):
  sys.stdout.write(x)

in_regular = True

if len(sys.argv) < 2:
  print "Usage: python de-answer.py [filename]"
  sys.exit(1)

filename = sys.argv[1]

with open(filename, "r") as f:
  for line in f:
    if "ANSWER-START" in line:
      in_regular = False
      
    if in_regular:
      cat(line)

    if "ANSWER-END" in line:
      in_regular = True
