@echo off

REM Start Docker Desktop
echo Starting Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

REM Wait for Docker Desktop to start (adjust the timeout if needed)
echo Waiting for Docker to initialize...
timeout /t 30 /nobreak > nul

REM Check if Docker is running
docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not running. Please check Docker Desktop.
    pause
    exit /b 1
)

REM Check if the application is running on http://localhost:3000
echo Checking if application is already running...
powershell -Command "try { (Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing).StatusCode } catch { exit 1 }" >nul 2>&1

if %ERRORLEVEL% NEQ 0 (
    echo Application is not running. Starting docker-compose services...
    docker-compose up -d
) else (
    echo Application is already running.
)

REM Open browser to localhost:3000
echo Opening browser to http://localhost:3000...
start "" http://localhost:3000

echo Done!
pause
