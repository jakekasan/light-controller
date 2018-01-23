#!/usr/bin/env python3

import csv
import time
import RPi.GPIO as GPIO
import requests

test_values = {100: 100,80: 60,40: 20, 20:10}
change_sense = 0.1
my_path = 'data.csv'

led_max = 2000
led_min = 0

## Brightness Code

GPIO.setmode(GPIO.BOARD) #!!!!

my_pin = 7
led1 = 12

# init the LED

GPIO.setup(led1, GPIO.OUT)

pwm = GPIO.PWM(led1,1000)

pwm.start(0)


def rc_time(mypin):
    count = 0
    GPIO.setup(mypin, GPIO.OUT)
    GPIO.output(mypin, GPIO.LOW)
    time.sleep(0.1)
    GPIO.setup(mypin, GPIO.IN)
    while (GPIO.input(mypin) == GPIO.LOW):
        count += 1
    count = min(int((count/max_led) * 100),100)
    return(count)

def getValues(my_path):
    my_file = csv.reader(open(my_path,'r'))
    my_file = list(my_file)
    temp = {}
    for i in my_file:
            #print("Found a value of %s at %s" % (i[1],i[0]))
            temp[int(i[0])] = int(i[1])
    # read the file and get the values
    return(temp)
    # return a list of the values

def getJSON(url):


def extrapolate(bright, mydata):
        # arrange mydata by brightness
        lower = []
        higher = []
        for key in sorted(mydata):
                #print("Comparing key: ",key,"\tto brightness: ",bright)
                if key > bright:
                        higher.append(key)
                else:
                        lower.append(key)
        #print(lower,higher)
        if lower == []:
                return(mydata[min(higher)])
        if higher == []:
                return(mydata[max(lower)])
        a = max(lower)
        b = min(higher)
        m = (mydata[b]-mydata[a])/(b - a)
        #print(a,": ",mydata[a],"\t",b,": ",mydata[b],"\t",m)
        return(m*(bright-a)+mydata[a])


check_freq = 5
checked_time = time.time() + 5

try:
        last_brightness = rc_time(my_pin)
        current_pulse = 0
        my_data = getValues(my_path)
        while True:
                if (checked_time + check_freq) < time.time():
                        print(time.ctime(),"\t---> ","Updating LED values.")
                        checked_time = time.time()
                        my_data = getValues(my_path)

                # check the current lighting condition
                current_brightness = rc_time(my_pin)
                if last_brightness*(1+change_sense) < current_brightness or last_brightness*(1-change_sense) > current_brightness:
                        print(time.ctime(),"\t---> ","Brightness exceeding tolerance")
                        current_pulse = extrapolate(current_brightness,my_data)
                        last_brightness = current_brightness
                else:
                        continue
                # set the pulse
                # fix max/min
                current_pulse = min(100,max(current_pulse,0))
                pwm.ChangeDutyCycle(current_pulse)
                print(time.ctime(),"\t--->","Brightness : ", current_brightness,"\tSetting LED at : ", current_pulse)
except KeyboardInterrupt:
        pass
finally:
        GPIO.cleanup()
