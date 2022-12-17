package itmo.model.data;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(name = "points")
public class Point {
    @JsonView(Views.PointWithId.class)
    private @Id @GeneratedValue Long id;

    @JsonView(Views.Point.class)
    private Double x;
    @JsonView(Views.Point.class)
    private Double y;
    @JsonView(Views.Point.class)
    private Double r;
    @JsonView(Views.Point.class)
    private Boolean result;

    @JsonView(Views.FullPoint.class)
    private @ManyToOne User user;

    public Point() {}

    public Point(double x, double y, double r, boolean result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
