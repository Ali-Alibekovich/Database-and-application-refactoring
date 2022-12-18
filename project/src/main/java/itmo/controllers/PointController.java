package itmo.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import itmo.model.Checker;
import itmo.model.data.Point;
import itmo.model.data.Views;
import itmo.repositories.PointRepository;
import itmo.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PointController {
    private final PointRepository pointRepository;
    private final UserRepository userRepository;
    private final Checker checker;

    public PointController(PointRepository pointRepository, UserRepository userRepository, Checker checker) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
        this.checker = checker;
    }

    @GetMapping("/points")
    @JsonView(Views.PointWithId.class)
    Collection<Point> allPoints() { return pointRepository.findPointsByUser(userRepository.findByUsername(getUsername())); }

    @PostMapping("/points")
    @JsonView(Views.PointWithId.class)
    Collection<Point> newPoints(@RequestBody Collection<Point> newPoints) {
        List<Point> result = new ArrayList<>();
        for (Point newPoint : newPoints){
            if (checker.check(newPoint)){
                newPoint.setResult(checker.isInArea(newPoint));
                newPoint.setUser(userRepository.findByUsername(getUsername()));
                result.add(pointRepository.save(newPoint));
            }
        }
        return result;
    }

    @DeleteMapping("/points")
    Collection<Long> deletePoints(@RequestParam Long[] ids) {
        List<Long> result = new ArrayList<>();
        for (Long id : ids){
            Point point = pointRepository.findPointById(id);
            if (point.getUser().getUsername().equals(getUsername())){
                pointRepository.deleteById(id);
                result.add(id);
            }
        }
        return result;
    }

    @DeleteMapping("/clear")
    void clear() { pointRepository.deletePointsByUser(userRepository.findByUsername(getUsername())); }

    @GetMapping("/points/{r}")
    @JsonView(Views.Point.class)
    Collection<Point> allPointsRecalculation(@PathVariable Double r) {
        List<Point> recalculated = new ArrayList<>();
        Collection<Point> points = pointRepository.findPointsByUser(userRepository.findByUsername(getUsername()));

        for (Point p : points) {
            Point point = new Point(p.getX(), p.getY(), r, false);
            point.setResult(checker.isInArea(point));
            recalculated.add(point);
        }

        return recalculated;
    }

    private String getUsername(){
        return ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
    }
}
