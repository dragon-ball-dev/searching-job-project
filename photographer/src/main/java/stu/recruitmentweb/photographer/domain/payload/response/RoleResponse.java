package stu.recruitmentweb.photographer.domain.payload.response;

import lombok.Getter;
import lombok.Setter;
import stu.recruitmentweb.photographer.domain.enums.RoleName;

import javax.persistence.*;

@Getter
@Setter
public class RoleResponse {

    private Long id;

    private RoleName name;
}
