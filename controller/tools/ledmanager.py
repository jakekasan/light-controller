import requests
import RPi.GPIO as GPIO

class LEDManager:
    def __init__(self,sensor,led_gpio=14,SERVER_ADDR="http://localhost"):
        self.log = []
        self.pwm,self.GPIO = self.create_pwm(led_gpio)
        self.SERVER_ADDR = SERVER_ADDR
        self.data = self.get_data_from_server()

    def extrapolate(data,env_point):
        lower = [x for x in data if x["env"] <= env_point]
        higher = [x for x in data if x["env"] > env_point]
        if lower == []:
            return(0)
        if higher == []:
            return(max([x["led"] for x in data]))
        lower = [x for x in lower if x["env"] == max([i["env"] for i in lower])][0]
        higher = [x for x in higher if x["env"] == min([i["env"] for i in higher])][0]
        return (env-lower["env"])/(higher["env"]-lower["env"])*(higher["led"]-lower["led"])+lower["led"]


    def get_data_from_server(self):
        r = requests.get(self.SERVER_ADDR+"/data")
        if r.status_code == 200:
            return r.json()
        else:
            if len(self.data) > 0:
                return self.data
            else:
                return default_data

    def create_pwm(self,led_id):
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(led_id,GPIO.OUT)
        GPIO.output(led_id,GPIO.HIGH)
        pwm = GPIO.PWM(led_id,1000)
        pwm.start(0)
        return(pwm,GPIO)


    def set_led_level(self,value):
        self.pwm.ChangeDutyCycle(value)
        

    def update(self):
        # get new data from server
        self.data = get_data_from_server()

        # get light value from sensor
        current_light_value = sensor.get_latest_corrected_value()

        # adjust LED power accordingly

        current_led_value = self.extrapolate(self.data,current_light_value)

        self.set_led_level(current_led_value)


    def cleanup(self):
        self.GPIO.cleanup()

default_data = [
    {
        "env":100,
        "led":100
    },
    {
        "env":75,
        "led":75
    },
    {
        "env":50,
        "led":50
    },
    {
        "env":25,
        "led":25
    },
    {
        "env":0,
        "led":0
    }
]