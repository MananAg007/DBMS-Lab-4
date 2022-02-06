# Steps to run the Website->
1) Clone the repository
2) Create a .env file in the server directory and add:
  
  PORT = 3006 <br/>
  PGUSER= {dbusername} <br/>
  PGHOST= 127.0.0.1 <br/>
  PGPASSWORD={dbpassword} <br/>
  PGDATABASE={database} <br/>
  PGPORT=5432 <br/>
  
  You need to enter your login credentials in the {} fields, and copy the rest exactly. <br/>
  In case you need to clear the process on port 3006, use command : npx kill-port 3006

3) Initialise the auto-incrementing key value using "Select setval('auto_increment_id_seq', {some value} );" in your postgres database.
4) On two separate terminals inside the backend and frontend directory, do: npm install && npm start


# References->
1) PERN Stack Tutorial - https://youtu.be/J01rYl9T3BU
2) Chartjs Tutorial - https://www.chartjs.org/docs/latest/
3) Bootstrap - https://getbootstrap.com/
