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
        
try:
        while True:
                print(rc_time(mypin))

except KeyboardInterrupt:
        pass

finally:
        GPIO.cleanup()
