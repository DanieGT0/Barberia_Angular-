# Guía de Instalación - Sistema de Barbería

## 📋 Prerrequisitos

### Software Requerido:
- **Java 17** (OpenJDK o Oracle JDK)
- **Node.js 18+** y npm
- **PostgreSQL 17** (instalación local)
- **Maven 3.9+**
- **Angular CLI 18**
- **Git**

### Verificar Instalaciones:
```bash
java -version          # Debe mostrar Java 17+
node --version         # Debe mostrar Node 18+
npm --version          # Debe mostrar npm 8+
psql --version         # Debe mostrar PostgreSQL 17+
mvn --version          # Debe mostrar Maven 3.9+
ng version             # Debe mostrar Angular CLI 18+
```

## 🗄️ Configuración de PostgreSQL

### 1. Crear Base de Datos

**Windows:**
1. Abrir pgAdmin o conectar via psql:
```bash
psql -U postgres
```

2. Ejecutar comandos SQL:
```sql
CREATE DATABASE barberia;
-- La base de datos está lista para usar con el usuario 'postgres'
```

**Linux/macOS:**
```bash
sudo -u postgres psql
CREATE DATABASE barberia;
\q
```

### 2. Verificar Conexión
```bash
psql -U postgres -d barberia -h localhost -p 5432
```

## 🔐 Configuración de Auth0

### 1. Crear Aplicación en Auth0

1. Ir a [Auth0 Dashboard](https://manage.auth0.com)
2. Crear nueva aplicación tipo "Single Page Application"
3. Configurar URLs:
   - **Allowed Callback URLs**: `http://localhost:4200`
   - **Allowed Logout URLs**: `http://localhost:4200`
   - **Allowed Web Origins**: `http://localhost:4200`

### 2. Crear API en Auth0

1. Ir a APIs → Create API
2. Configurar:
   - **Name**: Barberia API
   - **Identifier**: `https://barberia-api`
   - **Signing Algorithm**: RS256

### 3. Configurar Scopes (Permisos)

En la API creada, agregar estos scopes:
- `admin` - Permisos de administrador
- `barbero` - Permisos de barbero
- `visita` - Permisos de cliente

### 4. Crear Regla para Asignar Roles

En Auth0 Dashboard → Rules → Create Rule:

```javascript
function (user, context, callback) {
  const namespace = 'https://barberia-api/';

  // Asignar roles por defecto
  context.accessToken[namespace + 'permissions'] = ['visita'];

  // Asignar roles específicos basados en email (para testing)
  if (user.email === 'admin@barberia.com') {
    context.accessToken[namespace + 'permissions'] = ['admin', 'barbero', 'visita'];
  } else if (user.email && user.email.includes('barbero')) {
    context.accessToken[namespace + 'permissions'] = ['barbero', 'visita'];
  }

  callback(null, user, context);
}
```

## ⚙️ Configuración del Proyecto

### 1. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=barberia
DB_USERNAME=postgres
DB_PASSWORD=123321

# Auth0 Configuration (reemplazar con valores reales)
AUTH0_DOMAIN=tu-dominio.auth0.com
AUTH0_CLIENT_ID=tu-client-id
AUTH0_CLIENT_SECRET=tu-client-secret
AUTH0_AUDIENCE=https://barberia-api

# Application Configuration
SERVER_PORT=8080
CORS_ORIGINS=http://localhost:4200
SPRING_PROFILES_ACTIVE=dev
```

### 2. Configurar Frontend

Editar `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  auth0: {
    domain: 'tu-dominio.auth0.com',
    clientId: 'tu-client-id',
    audience: 'https://barberia-api',
    redirectUri: window.location.origin,
    errorPath: '/error'
  },
  api: {
    baseUrl: 'http://localhost:8080/api'
  }
};
```

## 🚀 Ejecutar la Aplicación

### 1. Iniciar Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 2. Iniciar Frontend

```bash
cd frontend
npm install
ng serve
```

El frontend estará disponible en: `http://localhost:4200`

## 🧪 Probar la Aplicación

### 1. Verificar Backend

```bash
curl http://localhost:8080/actuator/health
```

Debe responder: `{"status":"UP"}`

### 2. Verificar Base de Datos

Las tablas se crearán automáticamente al iniciar el backend (Flyway).

Verificar en PostgreSQL:
```sql
\c barberia
\dt
-- Debe mostrar: roles, users, user_roles
```

### 3. Probar Autenticación

1. Abrir `http://localhost:4200`
2. Hacer clic en "Iniciar Sesión"
3. Autenticarse con Auth0
4. Verificar redirección al dashboard correcto según el rol

## 🔧 Solución de Problemas

### Error de Conexión a PostgreSQL

```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Verificar puerto
netstat -an | grep 5432
```

### Error de Auth0

1. Verificar configuración en `environment.ts`
2. Verificar URLs en Auth0 Dashboard
3. Verificar que la API esté configurada correctamente

### Error de CORS

Verificar que `CORS_ORIGINS` en `.env` incluya `http://localhost:4200`

### Error de Flyway

```bash
# Limpiar base de datos si es necesario
psql -U postgres -d barberia -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

## 📊 Estructura de Datos Inicial

El sistema incluye roles por defecto:

| Role | Description | Permissions |
|------|-------------|-------------|
| ADMIN | Administrador del sistema | ALL |
| BARBERO | Barbero con gestión de citas | APPOINTMENTS,SERVICES |
| VISITA | Cliente del sistema | PROFILE,BOOKINGS |

## 🔄 Flujo de Autenticación

1. Usuario hace login en Auth0
2. Auth0 devuelve JWT con claims
3. Frontend envía JWT en headers de API
4. Backend valida JWT y extrae roles
5. Sistema sincroniza usuario en base de datos
6. Usuario es redirigido al dashboard según rol

## 📝 Próximos Pasos

1. Configurar datos de prueba
2. Implementar funcionalidades específicas por rol
3. Agregar tests automatizados
4. Configurar CI/CD para despliegue

## 📞 Soporte

Para problemas o dudas:
1. Verificar logs del backend: `tail -f logs/spring.log`
2. Verificar consola del navegador para errores de frontend
3. Consultar documentación de Auth0: https://auth0.com/docs