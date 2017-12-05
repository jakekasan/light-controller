#!/usr/bin/env python3

import time
import MySQLdb

db = MySQLdb.connect("localhost","monitor","password","temp")
curs = db.cursor()

for _ in range(120):
        try:
                curs.execute("INSERT INTO mytable values(1, 1)")
                curs.commit()
                print("Data commited")
                time.sleep(1)
        except:
                print("Error: Rolling back...")
                db.rollback()
        
curs.execute("SELECT * FROM mytable")

for things in curs.fetchall():
        print(str(things))

db.close()
