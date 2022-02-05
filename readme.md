Steps to run the Website->
1) Clone the repository
2) Create a .env file in the server directory and add:
  
  PORT = 3006
  PGUSER= {dbusername}
  PGHOST= 127.0.0.1
  PGPASSWORD={dbpassword}
  PGDATABASE={database}
  PGPORT=5432
  
  You need to enter your login credentials in the {} fields, and copy the rest exactly.

3) Initialise the auto-incrementing key value using "Select setval(‘auto_increment_id_seq’, {some value} );" in your postgres database.
4) On two separate terminals inside the backend and frontend directory, do: npm install && npm start


References->
1) PERN Stack Tutorial - https://youtu.be/J01rYl9T3BU
2) Chartjs Tutorial - https://www.chartjs.org/docs/latest/
3) Bootstrap - https://getbootstrap.com/
