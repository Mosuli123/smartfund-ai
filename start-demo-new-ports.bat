@echo off
echo Starting SmartFund AI on new ports...
echo Backend: http://localhost:8001
echo Frontend: http://localhost:3001

start "Backend Server" cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo Both servers starting...
echo Backend will be available at: http://localhost:8001
echo Frontend will be available at: http://localhost:3001
pause