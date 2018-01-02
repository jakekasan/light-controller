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
    #writer = csv.writer(open(path,'w'))
    print(myjson)
    return


while 1:
    clt_conn, clt_addr = s.accept()
    print("======================")
    print("Client connected!\n\n")
    request = str(clt_conn.recv(4024))
    try:
        request = json.loads("[" + request[request.find("[")+1:request.find("]")] + "]")
    except:
        print("Error: could not parse raw HTTP")
        request = []
    if request == []:
        print("Error: JSON is empty")
    else:
        write_file('data.csv',request)

    print("\n\n")

    response_data = 'HTTP/1.1 200 OK \n\n' + str(read_file('data.csv'))

    mod_res = response_data.encode('utf-8')

    clt_conn.sendall(mod_res)
    clt_conn.close()
    print("Client served and disconnected!")
    print("\n\n")
