package com.barberia.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public abstract class BaseService<T extends BaseEntity, R extends BaseRepository<T>> {

    protected final R repository;

    protected BaseService(R repository) {
        this.repository = repository;
    }

    public List<T> findAll() {
        return repository.findByIsActiveTrue();
    }

    public Page<T> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Optional<T> findById(Long id) {
        return repository.findByIdAndIsActiveTrue(id);
    }

    public T save(T entity) {
        return repository.save(entity);
    }

    public T update(T entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        Optional<T> entity = findById(id);
        if (entity.isPresent()) {
            T entityToDelete = entity.get();
            entityToDelete.setIsActive(false);
            repository.save(entityToDelete);
        }
    }

    public boolean existsById(Long id) {
        return repository.findByIdAndIsActiveTrue(id).isPresent();
    }
}