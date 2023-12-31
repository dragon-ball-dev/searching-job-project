package stu.recruitmentweb.photographer.domain.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class RecruiterUpdateRequest {
    private String recruiterAddress;
    private String recruiterPhone;
    private String skypeAccount;
    private String workplace;
    private String companyAddress;
    private String companyName;
    private String description;
    private String image;
    private Integer personalSize;
    private String website;
}
