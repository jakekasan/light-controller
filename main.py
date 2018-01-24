#!/usr/bin/env python 3

import csv
import time
import RPi.GPIO as GPIO
import requests

def getBrightness(rc_pin):
    count = 0
    GPIO.setup(mypin, GPIO.OUT)
    GPIO.output(mypin,GPIO.LOW)
    time.sleep(0.1)
    GPIO.setup(mypin, GPIO.IN)
    while (GPIO.input(mypin) == GPIO.LOW):
        count += 1

    return(count)

def getJSON(url):
    r = requests.get(url)
    for element in r.json:
        print(element.led_brightness,element.env_brightness)

def returnLEDlight(brightness,data):
    lower = [x for x in data if x.env_brightness < brightness]
    higher = [x for x in data if x.env_brightness > brightness]


if __name__ == "__main__":
    try:
        last_brightness = get_brightness(lightness pin)
        current_pulse = 0
        data = get_json("localhost:6666")
        
