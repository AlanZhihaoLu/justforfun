import time
import sys

def helloWorld():
    print("Hello World!")

if __name__ == '__main__':
    print("Initializing...")
    time.sleep(1)
    helloWorld()
    time.sleep(1)
    print("Exiting...")
    time.sleep(1)
    sys.exit()
