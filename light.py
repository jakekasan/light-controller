#!/usr/bin/env python3

import time
import smbus
import RPi.GPIO as GPIO
import random
import requests

practice_data = [
    {
        "env_brightness":100,
        "led_brightness":100
    },
    {
        "env_brightness":80,
        "led_brightness":60
    },
    {
        "env_brightness":60,
        "led_brightness":40
    },
    {
        "env_brightness":40,
        "led_brightness":20
    },
    {
        "env_brightness":0,
        "led_brightness":0
    }
]

GPIO.setmode(GPIO.BOARD)
LED_PIN_ID = 11

def setup_led(led_id=11):
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(led_id,GPIO.OUT)
    GPIO.output(led_id,GPIO.HIGH)
    pwm = GPIO.PWM(led_id,1000)
    pwm.start(0)
    return(pwm,GPIO)

def get_env_light(value_to_get="Visible"):
    bus = smbus.SMBus(1)
    bus.write_byte_data(0x39, 0x00 | 0x80, 0x03)
    bus.write_byte_data(0x39, 0x01 | 0x80, 0x02)
    data = bus.read_i2c_block_data(0x39, 0x0C | 0x80, 2)
    data1 = bus.read_i2c_block_data(0x39, 0x0E | 0x80, 2)
    ch0 = data[1] * 256 + data[0]
    ch1 = data1[1] * 256 + data1[0]
    ch2 = ch0 - ch1
    obj = {
        "Full Spectrum": ch0,
        "Infrared": ch1,
        "Visible": ch2
    }

    if value_to_get==None:
        return(obj)
    else:
        return(obj[value_to_get])
    return(obj)


# extrapolate closest points
def extrapolate(data,env_point):
    lower = [x for x in data if x["env_brightness"] <= env_point]
    higher = [x for x in data if x["env_brightness"] > env_point]
    if lower == []:
        return(0)
    if higher == []:
        return(max([x["led_brightness"] for x in data]))
    lower = [x for x in lower if x["env_brightness"] == max([i["env_brightness"] for i in lower])][0]
    higher = [x for x in higher if x["env_brightness"] == min([i["env_brightness"] for i in higher])][0]


    # (d - c)/(b - a) * env_point

    return(int(((higher["led_brightness"]-lower["led_brightness"])/(higher["env_brightness"] - lower["env_brightness"]))*(env_point-lower["env_brightness"])))

def set_led_light(data,env_value,pwm):
    led_value = max(0,min(100,extrapolate(data,env_value)))
    pwm.ChangeDutyCycle(led_value)
    return
