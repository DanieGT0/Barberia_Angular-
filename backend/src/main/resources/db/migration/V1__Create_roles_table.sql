-- Create roles table
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    permissions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_roles_name ON roles(name);
CREATE INDEX idx_roles_is_active ON roles(is_active);

-- Insert default roles
INSERT INTO roles (name, description, permissions) VALUES
('ADMIN', 'Administrador del sistema con acceso completo', 'ALL'),
('BARBERO', 'Barbero con acceso a gestión de citas y servicios', 'APPOINTMENTS,SERVICES'),
('VISITA', 'Cliente con acceso a reservas y perfil personal', 'PROFILE,BOOKINGS');