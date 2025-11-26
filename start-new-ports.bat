@echo off
echo ========================================
echo SmartFund AI - Starting on New Ports
echo ========================================
echo Backend: http://localhost:8001
echo Frontend: http://localhost:3013
echo ========================================

echo Starting Backend Server...
start "SmartFund Backend" cmd /k "cd /d backend && python main.py"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "SmartFund Frontend" cmd /k "cd /d frontend && npm start"

echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:8001
echo Frontend: http://localhost:3013
echo ========================================
echo Press any key to exit...
pause > nul