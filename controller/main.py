import requests
import csv
from tools.sensor import Sensor
from tools.ledmanager import LEDManager

led_gpio = 14


def main():
    # initialize
    sensor = Sensor()
    led = LEDManager(led_gpio,sensor)

    # main function loop

    while True:
        sensor.update()
        led.update()

if "__main__" == __name__:
    pass