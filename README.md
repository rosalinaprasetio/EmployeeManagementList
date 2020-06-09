INFO:
====
- Backend: NodeJS (localhost port 4000)
- Frontend: ReactJS (localhost port 3000)
- Database: MongoDB
- Test Framework: Mocha

HOW TO INSTALL:
====
1. Download/clone git repositories
2. In the terminal, 
   - run "npm install" to install the backend 
   - run "npm run client-install" to install the frontend
3. In the terminal, run "npm run dev" to run backend and frontend conccurently. It will automatically open a browser with this url: http://localhost:3000/

HOW TO TEST:
====
1. If there is a process that is running, click ctrl+C to stop the process.
2. In the terminal, run "npm test"


----

NOTES:
====

UPLOAD FILE:
====
Criteria:
- only allow csv
- need to contain 4 columns (id,login,name,salary)
- id and login should be alphanumeric and unique
- salary should be decimal and >=0.0
- row starting with # will be ignored

Assumption: 
1. If file didn't pass the criteria above, upload will be failed.
2. If file pass all the criteria above, upload will be successful:
   - if id NOT exist and login NOT used by another record in DB, record will be created.
   - if id exist and login NOT used by another record in DB, record will be updated.
   - if id NOT exist and login used by another record in DB, record will NOT be created.
   - if id exist and login used by another record in DB, record will NOT be updated.  
   Note: After successful upload, it will show how many records updated and how many not updated based on the assumption.
3. Concurrent upload not allowed (there will be a warning to show that another file is being uploaded).


EMPLOYEES LIST:
====
Assumption:  
Frontend:
1. Show 30 employees per page.
2. Default will be showing employees list with all salary and sort by id.
3. User can filter the list by minSalary and maxSalary by adding decimal number to the textfield and click submit.
4. User can remove the salary filter by clearing the textfield and click submit.
5. User can sort the list by click on the header (id, login, name, salary)
6. User can see another page by clicking arrow > and < in the bottom of the table.

Backend:
1. Limit is fixed as 30 and no need to add in the query parameter when calling the api.
2. Sorting can be asc or desc (e.g for asc: "sort=+name" or "sort=name"; e.g for desc: "sort=-name")


CRUD:
====
Assumption:  
Frontend:
1. When plus sign is clicked, it will open a dialog window that show a form that can be filled (id, login, name, salary). After clicking submit, if successful, database will be updated, dialog window will be closed, and status success will be shown. If unsuccessful, it will show an error.
2. When pencil sign is clicked, it will open a dialog window that show a form that can be edited (login, name, salary). After clicking submit, if successful, database will be updated, dialog window will be closed, and status success will be shown. If unsuccessful, it will show an error.
3. When trash sign is clicked, it will open a dialog window that show a confirmation for deletion. If 'yes' clicked, data will be removed from database. If 'no' clicked, no changes on the database.
4. If user close the dialog window in the middle of typing, form will be reset.


UI LOCALIZATION:
====
Assumption: 
1. Language will be detected based on this order:  
['navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag']
2. Translation is located in the client/src/locale folder
3. Menubar will show current language based on language detection.
4. When the user change browser language to another language, language in the menubar will follow the language. If there is no translation, it will fall back to English. (tested in chrome)


API LIST:
====
1. Upload CSV  
Upload   : (POST) http://localhost:4000/users/upload  
HTTP multipart form

2. Get All Employee  
Read     : (GET) http://localhost:4000/users  
Example Param: ?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=+name  
Paginate : (GET) http://localhost:4000/paginate  
Example Param: ?page=0&minSalary=0&maxSalary=4000&rowsperpage=30&sort=+name

3. CRUD Employee  
Read     : (GET) http://localhost:4000/user/:id  
Create   : (POST) http://localhost:4000/user/:id  
Update   : (PATCH) http://localhost:4000/user/:id  
Delete   : (DELETE) http://localhost:4000/user/:id  
