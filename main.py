#!/usr/bin/env python 3

import csv
import time
import requests
from light import get_env_light,extrapolate,setup_led,set_led_light
from comms import get_data,post_update

SERVER_ADDR = "localhost:6666"

if __name__ == "__main__":
    # init stuff
    pwm,my_GPIO = setup_led()

    while(1):
        try:
            print(time.time(),"Start of Cycle")
            print("Getting data from server...")
            data = get_data(SERVER_ADDR)
            print("Got data: ", data)
            env_light = get_env_light(value_to_get="Visible")
            print("The light in the environment is: ",env_light)
            print("Adjusting accordingly...")
            set_led_light(data,env_light,pwm)
            print("Light adjusted. End of cycle...")
            time.sleep(2)
        except:
            print("Problem!")
        finally:
            my_GPIO.cleanup()
