package com.barberia.user.controller;

import com.barberia.base.BaseController;
import com.barberia.user.entity.User;
import com.barberia.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController extends BaseController<User, UserService> {

    public UserController(UserService service) {
        super(service);
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<List<User>> findAll() {
        return super.findAll();
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<User> findByEmail(@PathVariable String email) {
        Optional<User> user = service.findByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/auth0/{auth0Id}")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<User> findByAuth0Id(@PathVariable String auth0Id) {
        Optional<User> user = service.findByAuth0Id(auth0Id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<User> create(@RequestBody User user) {
        return super.create(user);
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return super.update(id, user);
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}