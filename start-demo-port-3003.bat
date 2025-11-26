@echo off
echo Starting SmartFund AI on ports 3003/8003...

start "Backend Server" cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo Frontend: http://localhost:3003
echo Backend: http://localhost:8003
pause