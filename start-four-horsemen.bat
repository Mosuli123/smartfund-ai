@echo off
echo.
echo ================================================
echo    FOUR HORSEMEN TECHNOLOGIES - SmartFund AI
echo ================================================
echo    Enterprise Funding Intelligence Platform
echo ================================================
echo.

echo [1/3] Starting Backend Server (Port 8500)...
cd backend
start "Four Horsemen Backend" cmd /c "python main-enterprise.py"
echo Backend server starting on http://localhost:8500
timeout /t 3

echo.
echo [2/3] Starting Frontend Application (Port 3500)...
cd ..\frontend
start "Four Horsemen Frontend" cmd /c "set PORT=3500 && npm start"
echo Frontend application starting on http://localhost:3500
timeout /t 3

echo.
echo [3/3] Opening Four Horsemen Technologies Demo...
timeout /t 10
start http://localhost:3500

echo.
echo ================================================
echo    FOUR HORSEMEN TECHNOLOGIES - READY!
echo ================================================
echo    Frontend: http://localho3500st:
echo    Backend:  http://localhost:8500
echo    Status:   Enterprise Mode Active
echo ================================================
echo.
echo Press any key to continue monitoring...
pause >nul