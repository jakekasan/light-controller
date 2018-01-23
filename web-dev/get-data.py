#!/usr/bin/env python3

import requests

r = requests.get("http://localhost:8888/data/json")
print(r.json())
