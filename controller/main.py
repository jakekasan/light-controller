import requests
import csv
from tools import Sensor,LEDManager

led_gpio = 14


def main():
    sensor = Sensor()
    led = LEDManager(sensor)

    # main function loop

    while True:
        sensor.update()
        led.update()

if "__main__" == __name__:
    pass