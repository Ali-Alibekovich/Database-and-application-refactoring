package itmo.repositories;

import itmo.model.data.Point;
import itmo.model.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

public interface PointRepository extends JpaRepository<Point, Long> {
    Collection<Point> findPointsByUser(User user);

    Point findPointById(Long id);

    @Transactional
    void deletePointsByUser(User user);
}
