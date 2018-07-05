class LEDManager:
    def __init__(self,led_gpio):
        pass

    def extrapolate(data,env_point):
        lower = [x for x in data if x["env_brightness"] <= env_point]
        higher = [x for x in data if x["env_brightness"] > env_point]
        if lower == []:
            return(0)
        if higher == []:
            return(max([x["led_brightness"] for x in data]))
        lower = [x for x in lower if x["env_brightness"] == max([i["env_brightness"] for i in lower])][0]
        higher = [x for x in higher if x["env_brightness"] == min([i["env_brightness"] for i in higher])][0]
