class Logger:
    def __init__(self):
        self.max_light = None
        self.min_light = None

    def new_value(self,value):
        if value < self.min_light:
            self.min_light = value
        elif value > self.max_light:
            self.max_light = value

    def interpolate(self,value):
        value -= self.min_light
        return value / (self.max_light - self.min_light)

    def save(self):
        with open("./log.txt","w") as file:
            file.write("max:{},min:{}".format(self.max_light,self.min_light))
            file.close()
