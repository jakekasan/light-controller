#import smbus
import requests
import random

class Sensor:
    def __init__(self,server_addr="http://localhost"):
        self.values = []
        self.SERVER_ADDR = server_addr
        self.max,self.min = self.getMaxMin()

    def getMaxMin(self):
        try:
            r = requests.get(self.SERVER_ADDR+"/data/status")
            if r.status_code == 200:
                status = r.json()
                return status["max"],status["min"]
            else:
                return 101,99
        except:
            return 101,99

    def newStatus(self,current):
        if current < self.min:
            print("newStatus: {} is less than {}".format(current,self.min))
            if current == self.max:
                current -= 10
            data = {
                "max":self.max,
                "min":current
            }
            self.min = current
            try:
                r = requests.post(self.SERVER_ADDR+"/data/status",data=data)
            except:
                print("Could not send status to server")
        if current > self.max:
            print("newStatus: {} is more than {}".format(current,self.max))
            if current == self.min:
                current += 10
            data = {
                "max":current,
                "min":self.min
            }
            self.max = current
            try:
                r = requests.post(self.SERVER_ADDR+"/data/status",data=data)
            except:
                print("Could not send status to server")


    def get_env_light(self,value_to_get="Visible"):
        # bus = smbus.SMBus(1)
        # bus.write_byte_data(0x39, 0x00 | 0x80, 0x03)
        # bus.write_byte_data(0x39, 0x01 | 0x80, 0x02)
        # data = bus.read_i2c_block_data(0x39, 0x0C | 0x80, 2)
        # data1 = bus.read_i2c_block_data(0x39, 0x0E | 0x80, 2)
        # ch0 = data[1] * 256 + data[0]
        # ch1 = data1[1] * 256 + data1[0]
        # ch2 = ch0 - ch1
        # obj = {
        #     "Full Spectrum": ch0,
        #     "Infrared": ch1,
        #     "Visible": ch2
        # }

        if len(self.values) < 1:
            obj = {
                "Full Spectrum": 1000,
                "Infrared": 300,
                "Visible": 700
            }
        else:
            obj = {
                "Full Spectrum": max(0,self.values[-1]["Full Spectrum"]+(self.values[-1]["Full Spectrum"]*(random.random()-0.5))),
                "Infrared": max(0,self.values[-1]["Infrared"]+(self.values[-1]["Infrared"]*(random.random()-0.5))),
                "Visible": max(0,self.values[-1]["Visible"]+(self.values[-1]["Visible"]*(random.random()-0.5)))
            }
        print("Getting env light")
        print(obj)
        return obj

    def get_latest_corrected_value(self):
        return self.correct_light_value(self.values[-1]["Visible"])

    def correct_light_value(self,value):
        print("Sensor :: correcting value:",value)
        max_light = self.max
        min_light = self.min
        print(max_light)
        print(min_light)
        corrected_value = ((value-min_light)/(max_light-min_light))*max_light+min_light
        return corrected_value

    def update(self):
        self.values.append(self.get_env_light())
        self.newStatus(self.values[-1]["Visible"])

    def cleanup(self):
        return