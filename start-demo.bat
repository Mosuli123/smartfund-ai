@echo off
echo Starting SmartFund AI Demo...
echo.

echo Installing backend dependencies...
cd backend
py -m pip install -r requirements.txt
echo.

echo Starting backend server...
start "SmartFund AI Backend" py main.py
echo Backend started on http://localhost:8000
echo.

echo Installing frontend dependencies...
cd ..\frontend
call npm install
echo.

echo Starting frontend server...
start "SmartFund AI Frontend" npm start
echo Frontend will open on http://localhost:3000
echo.

echo Demo is ready!
echo Login with: demo / password123
pause