class Pwm:
    def __init__(self,led_pin,power,verbose=False):
        self.led_pin = led_pin
        self.power = power
        self.verbose = verbose
        self.cycle = 0

    def start(self,value):
        self.cycle = value

    def ChangeDutyCycle(self,value):
        if self.verbose:
            print("Changing pwm power value")
        self.cycle = value

class GPIO:
    def __init__(self):
        pass

    def cleanup(self):
        print("Cleaning GPIO")