#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time
import csv

GPIO.setmode(GPIO.BOARD)

mypin = 7

def rc_time(mypin):
        count = 0

        GPIO.setup(mypin, GPIO.OUT)
        GPIO.output(mypin, GPIO.LOW)
        time.sleep(0.1)

        GPIO.setup(mypin, GPIO.IN)

        while (GPIO.input(mypin) == GPIO.LOW):
                count += 1
        return count

min_val = 1000
max_val = 0

try:
        while True:
                brightness = rc_time(mypin)
                max_val = max(brightness,max_val)
                min_val = max(brightness,min_val)
                # print(brightness)

except KeyboardInterrupt:
        pass

finally:
        writer = csv.writer("config.csv")
        writer.writerow([max_val,min_val])
        print("Max value : %i \t Min value: %i" % (max_val,min_val))
        GPIO.cleanup()
