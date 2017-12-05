#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time

led1 = 18

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(led1, GPIO.OUT)
pwm = GPIO.PWM(led1,1000)

pwm.start(0)

bright = 1

try:

        for i in range(10):
                print("Brightness at %i" % (i*10))
                pwm.ChangeDutyCycle((i*10))
                time.sleep(1)

        for i in range(10):
                print("Brightness at %i" % (100-(i*10)))
                pwm.ChangeDutyCycle((100-(i*10)))
                time.sleep(1)

except:
        print("PROBLEM!")
        
finally:
        GPIO.cleanup()
