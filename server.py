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
    ldict = {}
    for i in myfile:
        ldict[i[0]] = i[1]
    return(ldict)

while 1:
    clt_conn, clt_addr = s.accept()
    request = clt_conn.recv(1024)

    #print(clt_addr)

    #clt_addr_h = clt_addr[0] + ':' + str(clt_addr[1])

    #print(clt_addr_h)

    response_data = 'HTTP/1.1 200 OK \n\n' + str(read_file('data.csv'))

    mod_res = response_data.encode('utf-8')

    #print(json.loads(request))
    #jresponse = json.loads(request.decode('utf-8'))
    clt_conn.sendall(mod_res)
    clt_conn.close()

    #r = requests.post(clt_addr_h,json=response_data)
