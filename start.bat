@echo off
title CycloFlow Operational Meteorological System Launcher
color 0B

echo ===============================================================================
echo                CYCLOFLOW OPERATIONAL METEOROLOGICAL SYSTEM
echo       Multi-Source Satellite AI Identification, Classification ^& Forecaster
echo                     Smart India Hackathon (SIH) Project
echo ===============================================================================
echo.

echo [1/2] Starting FastAPI AI Inference Engine (Port 8000)...
start "CycloFlow Backend (FastAPI)" cmd /k "cd /d %~dp0backend && python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak > nul

echo [2/2] Starting React + Vite Operational Dashboard (Port 5173)...
start "CycloFlow Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm run dev -- --host 127.0.0.1 --port 5173"

echo.
echo ===============================================================================
echo  CycloFlow is now launching in your browser:
echo  - Frontend Dashboard : http://127.0.0.1:5173/
echo  - Backend API Docs   : http://127.0.0.1:8000/docs
echo ===============================================================================
echo.

timeout /t 2 /nobreak > nul
start http://127.0.0.1:5173/
pause
