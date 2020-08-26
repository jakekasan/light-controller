def typed_wrap(fn):
    """
    Wraps a functions with type checking.
    """
    pass

class InterfaceMeta(type):
    def __new__(cls, name, bases, dct):
        print(f"""InterfaceMeta(
            {cls},
            {name},
            {bases},
            {dct})""")
        if bases is None:
            return super().__new__(cls, name, dct)
        return super().__new__(cls, name, bases, dct)

class Interface(metaclass = InterfaceMeta):

    @classmethod
    def __init_subclass__(cls, **kwargs):
        print(f"{cls}.__init_subclass__({kwargs})", )
        return super().__init_subclass__(**kwargs)

class Foo(Interface):

    def test1(self, a, b):
        return a + b

    @classmethod
    def __init_subclass__(cls, **kwargs):
        print(f"{cls}.__init_subclass__({kwargs})", )
        return super().__init_subclass__(**kwargs)

class Bar(Foo):
    def __init__(self):
        return 

class Baz(Bar):
    def b(self):
        return