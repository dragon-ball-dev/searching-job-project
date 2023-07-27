package stu.recruitmentweb.photographer.service;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.photographer.domain.payload.request.PhoneRequest;
import stu.recruitmentweb.photographer.domain.payload.response.CurriculumVitaeResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobseekerResponse;
import stu.recruitmentweb.photographer.domain.payload.response.RecruitmentResponse;

import java.math.BigDecimal;
import java.util.List;

public interface JobseekerService {
    String editJobseekerInformation(PhoneRequest phoneRequest);

    JobseekerResponse getJobseekerByToken();

    Page<JobDetailResponse> getPageForJobseeker( Integer pageNo,
                                                 Integer pageSize,
                                                 BigDecimal minSalary,
                                                 BigDecimal maxSalary,
                                                 String companyName,
                                                 String jobName,
                                                 String level);

    String addCV(String name, MultipartFile fileCv);

    void changeStatusCV (Long id);

    Page<CurriculumVitaeResponse> getAllCvOfJobseeker();

    void deleteCvById(Long id);

    void submitRecruitment(Long jobId);

    Page<RecruitmentResponse> getRecruitmentOfSeeker(String createAt, Boolean isAnswer, String jobName, Integer pageNo, Integer pageSize);

    void deleteRecruitmentById(Long id);

    JobDetailResponse getJobById(Long id);
}
