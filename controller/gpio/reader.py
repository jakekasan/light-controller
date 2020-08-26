from abc import ABC, abstractmethod
import time

import RPi.GPIO as GPIO

class IReader(ABC):

    @abstractmethod
    def read(self):
        pass

class GPIOReader(IReader):

    def __init__(self, pin):
        self.pin = pin

    def read(self):
        count = 0

        GPIO.setup(self.pin, GPIO.OUT)
        GPIO.output(self.pin, GPIO.LOW)
        time.sleep(0.1)

        GPIO.setup(self.pin, GPIO.IN)
    
        #Count until the pin goes high
        while (GPIO.input(self.pin) == GPIO.LOW):
            count += 1

        return count
