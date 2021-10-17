import tkinter as tk
from tkinter import filedialog
import sys

def select_file():
    root = tk.Tk()
    root.withdraw()
    file_path = filedialog.askopenfilename()
    root.destroy()
    return file_path

if __name__ == '__main__':
    print("Don't run this on CLI you donut.")
    sys.exit()
