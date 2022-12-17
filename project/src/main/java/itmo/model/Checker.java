package itmo.model;

import itmo.model.data.Point;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;


@Component
public class Checker {
    private final List<Double> values= Arrays.asList(-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0);

    private boolean isInArea(double x, double y, double r) {
        if (r > 0) {
            boolean triangle = x >= 0 && y <= 0 && y >= (x - r) / 2;
            boolean square = x <= 0 && y <= 0 && x >= -r / 2 && y >= -r;
            boolean sector = x <= 0 && y >= 0 && Math.sqrt(x*x + y*y) <= r;
            return triangle || square || sector;
        } else {
            boolean triangle = x <= 0 && y >= 0 && y <= (x - r) / 2;
            boolean square = x >= 0 && y >= 0 && x <= -r / 2 && y <= -r;
            boolean sector = x >= 0 && y <= 0 && Math.sqrt(x*x + y*y) <= Math.abs(r);
            return triangle || square || sector;
        }
    }

    public boolean isInArea(Point point) {
        return isInArea(point.getX(), point.getY(), point.getR());
    }

    public boolean check(Point point){
        try{
            return values.contains(point.getX()) && values.contains(point.getR()) &&
                    point.getY() >= -3 && point.getY() <= 3 ;
        } catch (Exception e) { return false;}
    }
}
