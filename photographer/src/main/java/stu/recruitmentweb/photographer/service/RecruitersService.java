package stu.recruitmentweb.photographer.service;

import org.springframework.data.domain.Page;
import stu.recruitmentweb.photographer.domain.payload.request.JobRequest;
import stu.recruitmentweb.photographer.domain.payload.request.RecruiterUpdateRequest;
import stu.recruitmentweb.photographer.domain.payload.request.SendEmailRequest;
import stu.recruitmentweb.photographer.domain.payload.response.JobResponse;
import stu.recruitmentweb.photographer.domain.payload.response.RecruiterResponse;
import stu.recruitmentweb.photographer.domain.payload.response.RecruitmentResponse;

import javax.mail.MessagingException;
import java.io.IOException;
import java.time.LocalDateTime;

public interface RecruitersService {
    RecruiterResponse getRecruiterInfo();

    String editProfileOfRecruiter(RecruiterUpdateRequest recruiterUpdateRequest);

    String recruiterAddJob(JobRequest jobRequest);

    Page<JobResponse> getAllJobOfRecruiter(Integer pageNo, Integer pageSize);

    JobResponse getJobOfRecruiterById(Long id);

    String editJobInfo(Long id, JobRequest jobRequest);

    void deleteJob(Long id);

    String contactWithJobseeker(Long id, SendEmailRequest sendEmailRequest) throws MessagingException, IOException;

    Page<RecruitmentResponse> getRecruitmentOfRecruiter(String createAt,Boolean isAnswer, String jobName, Integer pageNo, Integer pageSize);
}
