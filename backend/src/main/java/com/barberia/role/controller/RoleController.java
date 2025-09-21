package com.barberia.role.controller;

import com.barberia.base.BaseController;
import com.barberia.role.entity.Role;
import com.barberia.role.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController extends BaseController<Role, RoleService> {

    public RoleController(RoleService service) {
        super(service);
    }

    @Override
    public ResponseEntity<List<Role>> findAll() {
        return super.findAll();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Role> findByName(@PathVariable String name) {
        Optional<Role> role = service.findByName(name);
        return role.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Role> create(@RequestBody Role role) {
        return super.create(role);
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Role> update(@PathVariable Long id, @RequestBody Role role) {
        return super.update(id, role);
    }

    @Override
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return super.delete(id);
    }
}