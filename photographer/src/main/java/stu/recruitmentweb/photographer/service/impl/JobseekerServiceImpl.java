package stu.recruitmentweb.photographer.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.photographer.domain.models.*;
import stu.recruitmentweb.photographer.domain.payload.request.PhoneRequest;
import stu.recruitmentweb.photographer.domain.payload.response.CurriculumVitaeResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobseekerResponse;
import stu.recruitmentweb.photographer.domain.payload.response.RecruitmentResponse;
import stu.recruitmentweb.photographer.exception.BadRequestException;
import stu.recruitmentweb.photographer.repository.*;
import stu.recruitmentweb.photographer.repository.RecruitmentRepository;
import stu.recruitmentweb.photographer.service.BaseService;
import stu.recruitmentweb.photographer.service.FileStorageService;
import stu.recruitmentweb.photographer.service.JobseekerService;
import stu.recruitmentweb.photographer.utils.MapperUtils;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobseekerServiceImpl extends BaseService implements JobseekerService {
    private final JobseekerRepository jobseekerRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    private final JobRepositoryCustom jobRepositoryCustom;
    private final FileStorageService fileStorageService;
    private final CurriculumVitaeRepository curriculumVitaeRepository;
    private final JobRepository jobRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final RecruitmentRepositoryCustom recruitmentRepositoryCustom;

    @Override
    public String editJobseekerInformation(PhoneRequest phoneRequest) {
        Jobseeker jobseeker = jobseekerRepository.findByUser(getUser())
                .orElseThrow(() -> new IllegalArgumentException("Ứng viên không tồn tại!!!"));
        jobseeker.setPhone(phoneRequest.getPhone());
        jobseekerRepository.save(jobseeker);
        return "Cập nhật thành công";
    }

    @Override
    public JobseekerResponse getJobseekerByToken() {
        return mapper.convertToResponse(jobseekerRepository.findByUser(getUser())
                .orElseThrow(() -> new IllegalArgumentException("Ứng viên không tồn tại!!!")), JobseekerResponse.class);
    }

    @Override
    public Page<JobDetailResponse> getPageForJobseeker(Integer pageNo, Integer pageSize, BigDecimal minSalary, BigDecimal maxSalary, String companyName, String jobName, String level) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapper.convertToResponsePage(jobRepositoryCustom.searchJob(pageNo, pageSize, minSalary, maxSalary, companyName, jobName, level),JobDetailResponse.class, pageable);
    }

    @Override
    public String addCV(String name, MultipartFile fileCv) {
        String file = fileStorageService.storeFile(fileCv);
        CurriculumVitae curriculumVitae = new CurriculumVitae(name,file, false, getUser().getJobseeker());
        curriculumVitaeRepository.save(curriculumVitae);
        return "Thêm mới CV thành công!!";
    }

    @Override
    public void changeStatusCV(Long id) {
        List<CurriculumVitae> list = curriculumVitaeRepository.findAllByJobseeker(getUser().getJobseeker());
        for (CurriculumVitae cv:list
             ) {
            cv.setStatus(false);
            curriculumVitaeRepository.save(cv);
        }

        CurriculumVitae curriculumVitae = curriculumVitaeRepository.findById(id).orElseThrow(() -> new BadRequestException("CV không tồn tại!!"));
        curriculumVitae.setStatus(true);
        curriculumVitaeRepository.save(curriculumVitae);
    }

    @Override
    public Page<CurriculumVitaeResponse> getAllCvOfJobseeker() {
        Pageable pageable = PageRequest.of(1, 10);
        List<CurriculumVitaeResponse> list = mapper.convertToResponseList(curriculumVitaeRepository.findAllByJobseeker(getUser().getJobseeker()),CurriculumVitaeResponse.class);
        return new PageImpl<>(list,pageable,list.size());
    }

    @Override
    public void deleteCvById(Long id) {
        curriculumVitaeRepository.deleteById(id);
    }

    @Override
    public void submitRecruitment(Long jobId) {
        if(getUser().getJobseeker().getCurriculumVitaeList().size() == 0) {
            throw new BadRequestException("Bạn cần upload CV trước khi ứng tuyển!!");
        }
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new BadRequestException("Công việc đã bị khóa!!"));
        Recruitment recruitment = new Recruitment(job, getUser());
        recruitment.setIsAnswer(false);
        for (int i = 0; getUser().getJobseeker().getCurriculumVitaeList().size() > i ; i++) {
            if (getUser().getJobseeker().getCurriculumVitaeList().get(i).getStatus()) {
                recruitment.setCv(getUser().getJobseeker().getCurriculumVitaeList().get(i).getFileCV());
            }
        }

        recruitmentRepository.save(recruitment);
    }

    @Override
    public Page<RecruitmentResponse> getRecruitmentOfSeeker(String createAt, Boolean isAnswer, String jobName, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapper.convertToResponsePage(
                recruitmentRepositoryCustom.getRecruitmentOfRecruiter(pageable,createAt, getUser().getJobseeker().getId(), null, isAnswer, jobName),
                RecruitmentResponse.class,
                pageable);
    }

    @Override
    public void deleteRecruitmentById(Long id) {
        recruitmentRepository.deleteById(id);
    }

    @Override
    public JobDetailResponse getJobById(Long id) {
        return mapper.convertToResponse(
                jobRepository.findById(id).orElseThrow(()-> new BadRequestException("Job error")), JobDetailResponse.class);
    }


    private User getUser(){
        return userRepository.findById(getUserId()).orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại!!!"));
    }
}
