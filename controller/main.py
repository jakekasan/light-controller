#!/bin/usr/env python3

import requests
import csv
from tools.sensor import Sensor
from tools.ledmanager import LEDManager

led_gpio = 11


def main():
    # initialize
    sensor = Sensor(server_addr="http://localhost")
    led = LEDManager(sensor,led_gpio)

    # main function loop
    try:
        while True:
            sensor.update()
            led.update()
    except e:
        print(e)
    finally:
        led.cleanup()
        sensor.cleanup()
        

if "__main__" == __name__:
    main()