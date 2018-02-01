import requests
import time
import json

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

def get_data(url):
    try:
        r = requests.get(url)
    except:
        print("Could not connect to server")
        return(practice_data)
    #print(r.json)
    #print(json.dumps(r.json))
    return(practice_data)

def post_update(url):
    r = requests.post(url)
    pass
