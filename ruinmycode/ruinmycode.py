import os
import argparse
import sys
import random as rdm
import string
from select_file import select_file

def ruinmycode(filepath):
    with open(filepath) as f:
        lines = f.readlines()
        for i in range(len(lines)):
            if (len(lines[i]) == 0):
                lines[i] = ' '
            for j in range(rdm.randrange(max(len(lines[i])-3,0),len(lines[i]))):
                rdmidx = rdm.randrange(len(lines[i]))
                lines[i] = lines[i][:rdmidx] + rdm.choice(string.printable) + lines[i][rdmidx:]
    with open(filepath,'w') as f:
        f.writelines(lines)

if __name__ == '__main__':
    if (len(sys.argv) < 2):
        path_to_code = select_file()
    else:
        aParser = argparse.ArgumentParser(description='Ruin a code file')
        aParser.add_argument('Path',
                metavar='path',
                type=str,
                help='path to file')
        args = aParser.parse_args()
        input_path = args.Path
        curr_path = os.path.dirname(os.path.realpath(__file__))
        path_to_code = os.path.join(curr_path, input_path)

        if not os.path.isfile(path_to_code):
            print('The file specified does not exist')
            sys.exit()

    ruinmycode(path_to_code)
