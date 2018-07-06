import smbus
import asyncio
import requests

class SensorReader:
    def __init__(self,gpio,server_addr="http://localhost:6666"):
        self.values = []
        self.gpio = gpio

    def get_env_light(self,value_to_get="Visible"):
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

        # send data to server
        #requests.post(self.SERVER_ADDR,data=obj)
        return obj
        if value_to_get not in obj.keys():
            return(obj)
        else:
            return(obj[value_to_get])

    def get_latest_corrected_value():
        latest_value = self.correct_light_value(self.values[-1])
        return 

    def correct_light_value(self,value):
        all_light_values = map(lambda x: return x["Visible"],self.values)
        max_light = max(all_light_values)
        min_light = min(all_light_values)
        corrected_value = ((value-min_light)/(max_light-min_light))*max_light+min_light
        return corrected_value

    def update(self):
        self.values.append(get_env_light())
        pass