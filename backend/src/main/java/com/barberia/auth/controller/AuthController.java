package com.barberia.auth.controller;

import com.barberia.auth.service.AuthService;
import com.barberia.user.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();

            String auth0Id = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            String name = jwt.getClaimAsString("name");
            String picture = jwt.getClaimAsString("picture");

            User user = authService.createOrUpdateUser(auth0Id, email, name, picture);

            Map<String, Object> profile = new HashMap<>();
            profile.put("id", user.getId());
            profile.put("auth0Id", user.getAuth0Id());
            profile.put("email", user.getEmail());
            profile.put("name", user.getName());
            profile.put("picture", user.getPicture());
            profile.put("roles", user.getRoles());
            profile.put("isActive", user.getIsActive());

            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/sync")
    public ResponseEntity<Map<String, Object>> syncUser(Authentication authentication) {
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();

            String auth0Id = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            String name = jwt.getClaimAsString("name");
            String picture = jwt.getClaimAsString("picture");

            User user = authService.createOrUpdateUser(auth0Id, email, name, picture);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User synchronized successfully");
            response.put("user", user);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        try {
            User user = authService.getCurrentUser(authentication);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}