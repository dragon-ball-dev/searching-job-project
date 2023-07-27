package stu.recruitmentweb.photographer.domain.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class JobRequest {
    @NotNull
    private String jobTitle;
    @NotNull
    private String level;
    @NotNull
    private String typesOfCV;
    private String address;
    @NotNull
    private BigDecimal minSalary;
    @NotNull
    private BigDecimal maxSalary;
    @NotNull
    private String description;
    @NotNull
    private String requireJob;
    private String welfare;
    private String language;
    @NotNull
    private LocalDateTime deadline;
}
