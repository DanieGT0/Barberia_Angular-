package com.barberia.user.repository;

import com.barberia.base.BaseRepository;
import com.barberia.user.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User> {

    Optional<User> findByAuth0Id(String auth0Id);

    Optional<User> findByAuth0IdAndIsActiveTrue(String auth0Id);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndIsActiveTrue(String email);

    boolean existsByAuth0Id(String auth0Id);

    boolean existsByEmail(String email);
}