package com.barberia.user.service;

import com.barberia.base.BaseService;
import com.barberia.user.entity.User;
import com.barberia.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService extends BaseService<User, UserRepository> {

    public UserService(UserRepository repository) {
        super(repository);
    }

    public Optional<User> findByAuth0Id(String auth0Id) {
        return repository.findByAuth0IdAndIsActiveTrue(auth0Id);
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmailAndIsActiveTrue(email);
    }

    public boolean existsByAuth0Id(String auth0Id) {
        return repository.existsByAuth0Id(auth0Id);
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }
}