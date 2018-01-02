#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time

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
                if brightness > max_val:
                    max_val = brightness
                if brightness < min_val:
                    min_val = brightness
                print(brightness)

except KeyboardInterrupt:
        pass

finally:
        print("Max value : %i \t Min value: %i" % (max_val,min_val))
        GPIO.cleanup()
