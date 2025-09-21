@echo off
echo ========================================
echo Iniciando Backend de Barberia
echo ========================================

cd backend

echo Verificando Maven...
mvn --version
if errorlevel 1 (
    echo ERROR: Maven no esta instalado o no esta en el PATH
    pause
    exit /b 1
)

echo.
echo Compilando proyecto...
mvn clean compile
if errorlevel 1 (
    echo ERROR: Fallo la compilacion
    pause
    exit /b 1
)

echo.
echo Ejecutando migraciones de base de datos...
mvn flyway:migrate
if errorlevel 1 (
    echo WARNING: Error en migraciones de base de datos
    echo Continuando con la ejecucion...
)

echo.
echo Iniciando aplicacion Spring Boot...
echo Backend estara disponible en: http://localhost:8080
echo Presiona Ctrl+C para detener
echo.

mvn spring-boot:run

pause