@echo off

:: Paths to your frontend and backend directories
set FRONTEND_DIR=.\frontend
set BACKEND_DIR=.\backend
set SHARED_DIR=.\shared

:: Start MongoDB
echo Starting MongoDB...
start "" "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"

:: Check if MongoDB started
timeout /t 3 > nul
echo MongoDB should be running now.

:: Start the backend
echo Starting backend...
cd %BACKEND_DIR%
if not exist node_modules (
    echo Installing backend dependencies...
    npm install
)
start "" npm run dev
cd ..

:: Start the frontend
echo Starting frontend...
cd %FRONTEND_DIR%
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)
start "" npm start
cd ..

:: Reminder that everything is running
echo ----------------------------------------
echo All services are now running:
echo - MongoDB
echo - Backend
echo - Frontend
echo ----------------------------------------
echo Press any key to close this window.
pause
