@echo off
echo Starting SmartFund AI System...
echo Backend: Port 8004
echo Frontend: Port 3016

cd backend
start "Backend" cmd /k "python main.py"

timeout /t 3 /nobreak > nul

cd ../frontend
start "Frontend" cmd /k "npm start"

echo System started successfully!
pause