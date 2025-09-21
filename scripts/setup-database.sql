-- Configuracion inicial de base de datos para Barberia
-- Ejecutar con: psql -U postgres -f setup-database.sql

-- Crear base de datos (si no existe)
SELECT 'CREATE DATABASE barberia'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'barberia')\gexec

-- Conectar a la base de datos barberia
\c barberia

-- Verificar que las tablas se crearan automaticamente con Flyway
-- Las siguientes consultas son para verificar el estado

-- Mostrar tablas existentes
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Mostrar datos de roles (si existen)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'roles') THEN
        RAISE NOTICE 'Roles existentes:';
        PERFORM (SELECT name FROM roles);
    ELSE
        RAISE NOTICE 'La tabla roles aun no existe. Se creara automaticamente al iniciar el backend.';
    END IF;
END $$;

-- Verificar configuracion de conexion
SELECT
    current_database() as database_name,
    current_user as current_user,
    inet_server_addr() as server_address,
    inet_server_port() as server_port;

-- Crear usuario de aplicacion (opcional, usando postgres por defecto)
-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'barberia_user') THEN
--         CREATE USER barberia_user WITH PASSWORD 'barberia_password';
--         GRANT ALL PRIVILEGES ON DATABASE barberia TO barberia_user;
--         RAISE NOTICE 'Usuario barberia_user creado exitosamente';
--     ELSE
--         RAISE NOTICE 'Usuario barberia_user ya existe';
--     END IF;
-- END $$;

VACUUM ANALYZE;

-- Mensaje final
SELECT 'Base de datos configurada correctamente. Ejecutar el backend para crear las tablas automaticamente.' as status;