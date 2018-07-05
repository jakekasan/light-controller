import smbus
import asyncio

class SensorReader:
    def __init__(self,GPIO):
        self.values = []

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
        if value_to_get not in obj.keys():
            return(obj)
        else:
            return(obj[value_to_get])

    def 