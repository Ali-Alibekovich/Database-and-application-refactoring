package itmo.repositories;

import itmo.model.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);

    Boolean existsByUsername(String username);
}
