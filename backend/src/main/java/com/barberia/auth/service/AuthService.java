package com.barberia.auth.service;

import com.barberia.role.entity.Role;
import com.barberia.role.repository.RoleRepository;
import com.barberia.user.entity.User;
import com.barberia.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User is not authenticated");
        }

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String auth0Id = jwt.getSubject();

        return userRepository.findByAuth0IdAndIsActiveTrue(auth0Id)
                .orElseThrow(() -> new IllegalStateException("User not found"));
    }

    public User createOrUpdateUser(String auth0Id, String email, String name, String picture) {
        Optional<User> existingUser = userRepository.findByAuth0Id(auth0Id);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setEmail(email);
            user.setName(name);
            user.setPicture(picture);
            user.setIsActive(true);
            return userRepository.save(user);
        } else {
            User newUser = new User(auth0Id, email, name);
            newUser.setPicture(picture);

            Role defaultRole = roleRepository.findByNameAndIsActiveTrue("VISITA")
                    .orElseThrow(() -> new RuntimeException("Default role VISITA not found"));
            newUser.addRole(defaultRole);

            return userRepository.save(newUser);
        }
    }

    public void assignRole(Long userId, String roleName) {
        User user = userRepository.findByIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByNameAndIsActiveTrue(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        user.addRole(role);
        userRepository.save(user);
    }

    public void removeRole(Long userId, String roleName) {
        User user = userRepository.findByIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByNameAndIsActiveTrue(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));

        user.removeRole(role);
        userRepository.save(user);
    }
}