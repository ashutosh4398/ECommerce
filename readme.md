## Project explaination and demo
Please [click here](https://youtu.be/TJz_kpey5Qg) to watch proper demo
## How to install and run the project
**STEPS**
1. Clone the project on local repo
    ``` bash
        git clone https://github.com/ashutosh4398/ECommerce.git 
    ```
2. Navigate to downloaded project
    ``` bash 
        cd Ecommerce/
    ```

3. Observe that there will be a piplock file which is a virtual environment. Just install the python packages required using below command
    ``` bash 
        pipenv install
    ```
4. Now we need to install packages for frontend
    ```bash
        cd ..
        cd frontend/
        npm install
    ```
5. Now we need to setup .env file for both frontend and backend. Let's start with backend first
    ```bash
        cd ..
        cd ecom/ecom
    ```
6. Create a file named .env in this folder. The file structure will be as shown
    ```
        |-__init__.py
        |-asgi.py
        |-settings.py
        |-urls.py
        |-wsgi.py
        |-.env
    ```
7. Now open the created .env file for backend and add the following 
    ``` python
        merchant_id = <merchant_id>
        public_key = <public_key>
        private_key=<private_key>
    ```
    Login to braintree sandbox and copy and paste your credentials in this .env file
8. Now similarly we need to setup .env for frontend just to store baseurl
    ```
        cd ..
        cd ..
        cd frontend
    ```
9. Create .env file. The file directory should look something like this
    ```
        |-node_modules/
        |-pubic/
        |-src/
        |-.env
        |-.gitignore
        |-package.json
        |-package-lock.json
        |-README.md    
    ```
10. Add the following line in .env for frontend
    ```javascript
        REACT_APP_BACKEND = http://127.0.0.1:8000/api/
    ```
11. Now we are ready with all the setup. We just need to run the application.Let's start first by running frontend
    ```bash
        npm start
    ```
12. Now open the backend folder in new terminal
    ```bash
        cd ecom/
        python manage.py runserver
    ```
13. **Start testing the project!!!**

<center><b>THANK YOU</b></center>