@echo off
echo Starting SmartFund AI on ports 3004/8004...

start "Backend Server" cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo Frontend: http://localhost:3004
echo Backend: http://localhost:8004
pause