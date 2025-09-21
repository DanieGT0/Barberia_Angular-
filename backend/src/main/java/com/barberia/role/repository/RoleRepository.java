package com.barberia.role.repository;

import com.barberia.base.BaseRepository;
import com.barberia.role.entity.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends BaseRepository<Role> {

    Optional<Role> findByName(String name);

    Optional<Role> findByNameAndIsActiveTrue(String name);

    boolean existsByName(String name);
}