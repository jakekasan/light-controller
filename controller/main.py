#!/bin/usr/env python3

import requests
import csv
import sys
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

    while True:
        sensor.update()
        led.update()
    # try:
    #     while True:
    #         sensor.update()
    #         led.update()
    # except:
    #     mytype,value,traceback = sys.exc_info()
    #     print(mytype)
    #     print(value)
    #     print(traceback)
        

    # finally:
    #     led.cleanup()
    #     sensor.cleanup()
        

if "__main__" == __name__:
    main()