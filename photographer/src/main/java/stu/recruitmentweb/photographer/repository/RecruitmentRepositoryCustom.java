package stu.recruitmentweb.photographer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stu.recruitmentweb.photographer.domain.models.Recruitment;

import java.time.LocalDateTime;

public interface RecruitmentRepositoryCustom {
    Page<Recruitment> getRecruitmentOfRecruiter(Pageable pageable, String createAt,Long jobseekerId, Long recruiterId,Boolean isAnswer, String jobName);
}
