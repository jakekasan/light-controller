#!/bin/usr/env python3

import requests
import csv
from tools.sensor import Sensor
from tools.ledmanager import LEDManager

led_gpio = 11


def main():
    # set server address
    SERVER_ADDR = "http://localhost:8080"

    # initialize
    sensor = Sensor(server_addr=SERVER_ADDR)
    led = LEDManager(sensor,led_gpio)

    # main function loop
    try:
        while True:
            sensor.update()
            led.update()
    except:
        print("Encountered Problem")
    finally:
        led.cleanup()
        sensor.cleanup()
        

if "__main__" == __name__:
    main()