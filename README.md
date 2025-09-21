# 💈 Barbería - Sistema de Gestión Integral

## 📋 Descripción del Proyecto

Sistema completo de gestión para barbería con **arquitectura modular**, **roles diferenciados** y **máxima reutilización de código**. Implementa autenticación Auth0, dashboards adaptativos por rol y una base sólida para escalabilidad.

### ✨ Características Principales

- 🔐 **Autenticación Auth0** con JWT y roles dinámicos
- 👥 **3 Roles**: Admin, Barbero, Visita con permisos específicos
- 🎨 **Angular Material 18** con diseño responsive
- ⚡ **Código ultra-optimizado** con clases base y herencia
- 🗄️ **PostgreSQL 17** con migraciones automáticas Flyway
- 🛡️ **Seguridad robusta** con guards y interceptors
- 📱 **PWA-ready** con standalone components

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Versión |
|------------|------------|---------|
| **Backend** | Spring Boot | 3.2+ |
| **Frontend** | Angular | 18 |
| **Base de Datos** | PostgreSQL | 17 |
| **Autenticación** | Auth0 | Latest |
| **UI Framework** | Angular Material | 18 |
| **Build Tool** | Maven | 3.9+ |
| **Runtime** | Java | 17 |

## 🏗️ Arquitectura del Proyecto

```
📁 Barberia/
├── 🗄️ backend/           # Spring Boot con arquitectura modular
│   ├── 📦 base/           # Clases base reutilizables (Entity, Service, Controller)
│   ├── 🔐 auth/           # Módulo de autenticación Auth0
│   ├── 👤 user/           # Gestión de usuarios
│   ├── 🛡️ role/           # Gestión de roles y permisos
│   ├── ⚙️ config/         # Configuraciones de seguridad
│   └── 🗃️ db/migration/   # Scripts Flyway para BD
├── 🎨 frontend/          # Angular 18 con standalone components
│   ├── 🎯 core/          # Services, Guards, Interceptors (singleton)
│   ├── 🔄 shared/        # Componentes 100% reutilizables
│   ├── 📊 features/      # Dashboards por rol (herencia)
│   └── 🌍 environments/  # Configuraciones por ambiente
├── 📚 docs/             # Documentación técnica completa
├── 🛠️ scripts/          # Scripts de automatización
└── 📖 README.md         # Este archivo
```

## 🚀 Configuración Rápida

### 📋 Prerrequisitos

```bash
# Verificar instalaciones
java -version    # Java 17+
node --version   # Node 18+
psql --version   # PostgreSQL 17
mvn --version    # Maven 3.9+
ng version       # Angular CLI 18
```

### 🗄️ Base de Datos (PostgreSQL 17)

**1. Crear base de datos:**
```sql
-- Conectar como postgres con contraseña 123321
psql -U postgres
CREATE DATABASE barberia;
```

**2. El sistema usa automáticamente:**
- Usuario: `postgres`
- Contraseña: `123321`
- Base de datos: `barberia`
- Puerto: `5432`

### 🔐 Auth0 Configuración

**1. Crear Single Page Application:**
- Callback URLs: `http://localhost:4200`
- Logout URLs: `http://localhost:4200`
- Web Origins: `http://localhost:4200`

**2. Crear API:**
- Identifier: `https://barberia-api`
- Scopes: `admin`, `barbero`, `visita`

**3. Actualizar configuración:**
```typescript
// frontend/src/environments/environment.ts
export const environment = {
  auth0: {
    domain: 'tu-dominio.auth0.com',
    clientId: 'tu-client-id',
    audience: 'https://barberia-api'
  }
};
```

### ⚡ Inicio Rápido

**Windows (con scripts automáticos):**
```bash
# Terminal 1: Backend
./scripts/start-backend.bat

# Terminal 2: Frontend
./scripts/start-frontend.bat
```

**Manual:**
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend (nueva terminal)
cd frontend
npm install
ng serve
```

**✅ Acceso:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

## 🎯 Sistema de Roles

### 👑 ADMIN (Administrador)
```typescript
- ✅ Acceso total al sistema
- 👥 Gestión de usuarios y roles
- 📊 Dashboards y reportes completos
- ⚙️ Configuración del sistema
- 🔍 Auditoría y logs
```

### ✂️ BARBERO (Profesional)
```typescript
- 📅 Gestión de citas y agenda
- ✂️ Administración de servicios
- 👤 Perfil profesional
- 📈 Estadísticas personales
- 💼 Gestión de clientes
```

### 🧑‍🦱 VISITA (Cliente)
```typescript
- 🎯 Reservar citas online
- 📱 Gestión de perfil personal
- 📜 Historial de servicios
- ⭐ Valoraciones y feedback
- 🎁 Programa de fidelidad
```

## 📊 Dashboards Inteligentes

### 🎨 Dashboard Base (Reutilizable)
```typescript
export class BaseDashboardComponent {
  // Plantilla común para todos los roles
  protected abstract getStatsCards(): DashboardCard[];
  protected abstract getQuickActions(): ActionButton[];
}
```

### 📈 Dashboards Específicos
- **Admin**: Métricas del negocio, gestión de usuarios
- **Barbero**: Agenda diaria, clientes atendidos
- **Visita**: Próximas citas, historial personal

## 🛡️ Seguridad y Autenticación

### 🔐 Flujo de Autenticación
1. Usuario hace login en Auth0
2. Auth0 devuelve JWT con claims
3. Frontend envía JWT en headers automáticamente
4. Backend valida JWT y extrae roles
5. Sistema sincroniza usuario en base de datos
6. Usuario es redirigido al dashboard según rol

### 🛡️ Guards y Permisos
```typescript
// Guards reutilizables
authGuard: CanActivateFn                    // Verificar autenticación
roleGuard(['ADMIN']): CanActivateFn         // Verificar roles específicos

// Interceptor automático
authInterceptor: HttpInterceptorFn          // JWT en headers automático
```

## 🗃️ Base de Datos

### 📊 Esquema Principal
```sql
📋 roles           # Roles del sistema (ADMIN, BARBERO, VISITA)
👤 users           # Usuarios sincronizados con Auth0
🔗 user_roles      # Relación Many-to-Many usuarios-roles
```

### 🔄 Migraciones Flyway
- ✅ `V1__Create_roles_table.sql` - Tabla de roles con datos iniciales
- ✅ `V2__Create_users_table.sql` - Tabla de usuarios con Auth0 ID
- ✅ `V3__Create_user_roles_table.sql` - Relación usuarios-roles

## 🎨 Frontend Modular

### 🎯 Core (Singleton Services)
- `AuthService` - Gestión de autenticación y roles
- `ApiService` - Cliente HTTP base reutilizable
- Guards y interceptors para seguridad

### 🔄 Shared (Componentes Reutilizables)
- `MainLayoutComponent` - Layout principal adaptativo
- `BaseDashboardComponent` - Dashboard base extensible
- Componentes de error y navegación

### 📊 Features (Funcionalidades por Rol)
- Dashboards específicos que extienden el dashboard base
- Componentes lazy-loaded por rol
- Rutas protegidas con guards

## 🚦 Testing

```bash
# Backend
cd backend
mvn test                    # Unit tests
mvn integration-test        # Integration tests

# Frontend
cd frontend
npm test                    # Unit tests con Jasmine/Karma
npm run e2e                 # E2E tests con Cypress (futuro)
```

## 📚 Documentación Completa

| Documento | Descripción |
|-----------|-------------|
| 📖 [SETUP.md](docs/SETUP.md) | **Guía detallada de instalación** |
| 🏗️ [ARCHITECTURE.md](docs/ARCHITECTURE.md) | **Arquitectura técnica completa** |

## 🛠️ Scripts de Automatización

```bash
📁 scripts/
├── 🖥️ start-backend.bat      # Inicia backend (Windows)
├── 🎨 start-frontend.bat     # Inicia frontend (Windows)
└── 🗄️ setup-database.sql     # Configuración inicial BD
```

## 🔧 Solución de Problemas

### ❌ Error PostgreSQL
```bash
# Verificar servicio
net start postgresql-x64-17    # Windows
brew services start postgresql # macOS
sudo systemctl start postgresql # Linux
```

### ❌ Error Auth0
1. ✅ Verificar domain y clientId en `environment.ts`
2. ✅ Confirmar URLs en Auth0 Dashboard
3. ✅ Verificar scopes en la API

### ❌ Error CORS
```env
# Verificar en .env
CORS_ORIGINS=http://localhost:4200
```

## 🚀 Próximos Pasos

### 🎯 Fase 2 - Funcionalidades
- [ ] Sistema de citas completo
- [ ] Gestión de servicios y precios
- [ ] Notificaciones push
- [ ] Reportes avanzados

### 🔧 Fase 3 - Optimización
- [ ] PWA con cache offline
- [ ] Internacionalización (i18n)
- [ ] Tests E2E con Cypress
- [ ] CI/CD con GitHub Actions

### 🚀 Fase 4 - Escalabilidad
- [ ] Microservicios
- [ ] Redis para cache
- [ ] CDN para assets
- [ ] Monitoreo con Grafana

## 🤝 Contribución

```bash
# Fork → Clone → Branch → Code → Test → PR
git checkout -b feature/nueva-funcionalidad
git commit -m "✨ feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

## 📞 Soporte

- 📧 **Issues**: GitHub Issues para bugs y features
- 📖 **Wiki**: Documentación técnica detallada
- 💬 **Discussions**: Preguntas y discusiones

---

**⭐ Sistema desarrollado con principios SOLID, DRY y arquitectura escalable**

*Barbería - Transformando la gestión tradicional con tecnología moderna* 💈