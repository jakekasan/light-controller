#!/usr/bin/env python3

import socket
import requests
import json
import csv

HOST = ''
PORT = 8000

header = {'Content-type': 'application/json'}


s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
s.bind((HOST,PORT))

s.listen(10)

def read_file(path):
    myfile = list(csv.reader(open(path,'r')))
    points = []
    for i in myfile:
        temp = {}
        temp["env_brightness"] = i[0]
        temp["led_brightness"] = i[1]
        points.append(temp)
    return(points)

def write_file(path,myjson):
    return(myjson)


while 1:
    clt_conn, clt_addr = s.accept()
    request = clt_conn.recv(4024)

    print("Client connected!\n\n")
    print(request)
    print("\n\n")

    response_data = 'HTTP/1.1 200 OK \n\n' + str(read_file('data.csv'))

    mod_res = response_data.encode('utf-8')

    clt_conn.sendall(mod_res)
    clt_conn.close()
    print("Client served and disconnected!")
