package com.barberia.shared;

public final class Constants {

    private Constants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

    public static final class Roles {
        public static final String ADMIN = "ADMIN";
        public static final String BARBERO = "BARBERO";
        public static final String VISITA = "VISITA";
    }

    public static final class Permissions {
        public static final String ALL = "ALL";
        public static final String APPOINTMENTS = "APPOINTMENTS";
        public static final String SERVICES = "SERVICES";
        public static final String PROFILE = "PROFILE";
        public static final String BOOKINGS = "BOOKINGS";
    }

    public static final class Auth {
        public static final String BEARER_PREFIX = "Bearer ";
        public static final String AUTHORIZATION_HEADER = "Authorization";
    }
}