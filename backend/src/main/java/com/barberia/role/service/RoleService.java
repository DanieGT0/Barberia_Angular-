package com.barberia.role.service;

import com.barberia.base.BaseService;
import com.barberia.role.entity.Role;
import com.barberia.role.repository.RoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RoleService extends BaseService<Role, RoleRepository> {

    public RoleService(RoleRepository repository) {
        super(repository);
    }

    public Optional<Role> findByName(String name) {
        return repository.findByNameAndIsActiveTrue(name);
    }

    public boolean existsByName(String name) {
        return repository.existsByName(name);
    }
}