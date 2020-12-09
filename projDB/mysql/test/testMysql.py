import sys
import mysql.connector

# Validate arguments
if len(sys.argv)!=3:
    print("USAGE: $ python testMYSql.py <user> <password>")
    exit()

# Connect to database
print("1. Connecting to db...")
mydb = mysql.connector.connect(
  port=3306,
  user=sys.argv[1],
  passwd=sys.argv[2]
)

print("Connected!")
print(mydb) 

# Create table and insert data
print("\n2. Testing db...")
mycursor = mydb.cursor()

print("\n2.1. Databases list is...")
mycursor.execute('SHOW DATABASES')
dblist = []
for x in mycursor.fetchall():
  print(x[0])
  dblist.append(x[0])

if 'ies_test' in dblist:
  print("\n2.2. There is no need to create ies_test for tests, as it is already created!")
else:
  print("\n2.2. Creating database ies_test...")
  mycursor.execute("CREATE DATABASE ies_test")

print("Changing context to ies_test...")
mycursor.execute("USE ies_test")

print("\n2.3. Tables list is...")
mycursor.execute("SHOW TABLES")
tableslist = []
for x in mycursor.fetchall():
  print(x[0]) 
  tableslist.append(x[0])

if 'customers' in tableslist:
  print("\n2.4. Table customers is already created!")
  print("\n2.5. Not adding sample data, as it is expected to already exist!")
else:
  print("\n2.4. Creating table customers...")
  mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))")

  print("\n2.5. Adding sample data to db...")
  mycursor.execute("INSERT INTO customers(name, address) VALUES (%s, %s)", ("Person1", "Aveiro"))
  mycursor.execute("INSERT INTO customers(name, address) VALUES (%s, %s)", ("Person2", "Coimbra"))
  mycursor.execute("INSERT INTO customers(name, address) VALUES (%s, %s)", ("Person3", "Porto"))

print("\n2.6. The data on that table is...")
mycursor.execute("SELECT * FROM customers")
for x in mycursor.fetchall():
  print(x)

mydb.commit()
print("\nALL TESTS DONE!")
mycursor.close()
mydb.close()