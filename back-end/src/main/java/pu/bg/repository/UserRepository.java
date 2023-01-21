package pu.bg.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pu.bg.models.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);
}
