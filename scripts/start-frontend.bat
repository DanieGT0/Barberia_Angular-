@echo off
echo ========================================
echo Iniciando Frontend de Barberia
echo ========================================

cd frontend

echo Verificando Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    pause
    exit /b 1
)

echo Verificando Angular CLI...
ng version
if errorlevel 1 (
    echo ERROR: Angular CLI no esta instalado
    echo Instalando Angular CLI...
    npm install -g @angular/cli@18
)

echo.
echo Instalando dependencias...
npm install
if errorlevel 1 (
    echo ERROR: Fallo la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo Iniciando servidor de desarrollo...
echo Frontend estara disponible en: http://localhost:4200
echo Presiona Ctrl+C para detener
echo.

ng serve --open

pause