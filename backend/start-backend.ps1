# Script para iniciar el backend con configuración SSL/TLS adecuada

# Configurar variables de entorno para Java
$env:MAVEN_OPTS = "-Dhttps.protocols=TLSv1.2 -Djavax.net.ssl.trustStore=`"$env:JAVA_HOME\lib\security\cacerts`" -Djavax.net.ssl.trustStorePassword=changeit -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true"

# Mostrar configuración
Write-Host "Iniciando backend con configuración SSL/TLS..."
Write-Host "MAVEN_OPTS: $env:MAVEN_OPTS"
Write-Host ""

# Cambiar al directorio del backend
Set-Location "C:\Users\danie\OneDrive\Desktop\Barberia Angular\backend"

# Usar Maven directamente en lugar del wrapper
mvn spring-boot:run