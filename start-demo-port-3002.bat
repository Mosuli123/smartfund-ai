@echo off
echo Starting SmartFund AI on ports 3002/8002...
echo Backend: http://localhost:8002
echo Frontend: http://localhost:3002

start "Backend Server" cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo Both servers starting...
echo Backend will be available at: http://localhost:8002
echo Frontend will be available at: http://localhost:3002
pause