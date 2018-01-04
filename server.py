#!/usr/bin/env python3

import time
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
    writer = csv.writer(open(path,'w'))
    for component in myjson:
        writer.writerow([int(component['env_brightness']),int(component['led_brightness'])])
    return


while 1:
    clt_conn, clt_addr = s.accept()
    print("======================\nEvent at time: ", time.ctime(),"\n")
    print("Client connected!\n\n")
    request = str(clt_conn.recv(4024))
    if "GET" in request:
        print("Received GET request\n")
        print(request)
        print("\n\n")
        response_data = 'HTTP/1.1 200 OK \n\n' + str(read_file('data.csv'))

        mod_res = response_data.encode('utf-8')

        print("Replying to client. Printing reply.\n")
        print(mod_res)
        print("\n\n")

        clt_conn.sendall(mod_res)
        clt_conn.close()
        print("Client served and disconnected!")
        print("\n\n")
    elif "POST" in request:
        print("Recieved POST request")
        try:
            if "[" not in request:
                print("No data appended. Printing request.\n")
                print(request)
                print("\n")
                request_json = []
            else:
                request_json = json.loads("[" + request[request.find("[")+1:request.find("]")] + "]")
        except:
            print("Error parsing json, printing request\n")
            print(request)
            print("\n\n")
            request_json = []
        if request_json == []:
            print("Error: JSON is empty")
        else:
            print("Request accepted. Printing JSON")
            write_file('data.csv',request_json)
        post_response = 'HTTP/1.1 200 OK \n\n'.encode('utf-8')
        print("\n\n")
        print("Client served and disconnected!")
        print("\n\n")
        clt_conn.sendall(post_response)
        clt_conn.close()
