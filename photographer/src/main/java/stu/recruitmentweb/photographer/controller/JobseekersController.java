package stu.recruitmentweb.photographer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.photographer.domain.payload.request.PhoneRequest;
import stu.recruitmentweb.photographer.domain.payload.response.CurriculumVitaeResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.photographer.domain.payload.response.MessageResponse;
import stu.recruitmentweb.photographer.service.JobseekerService;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/jobseeker")
@RequiredArgsConstructor
public class JobseekersController {

    private final JobseekerService jobseekerService;


    @GetMapping
    private ResponseEntity<?> getJobseekerInfo(){
        return ResponseEntity.ok(jobseekerService.getJobseekerByToken());
    }
    @PutMapping
    private ResponseEntity<?> editPhoneOfJobseeker(@Valid @RequestBody PhoneRequest phoneRequest) {
        return new ResponseEntity<>(jobseekerService.editJobseekerInformation(phoneRequest), HttpStatus.ACCEPTED);
    }


    @GetMapping("/job-search")
    private ResponseEntity<Page<JobDetailResponse>> getPageForJobseeker(@RequestParam Integer pageNo,
                                                        @RequestParam(required = false) Integer pageSize,
                                                        @RequestParam(required = false) BigDecimal minSalary,
                                                        @RequestParam(required = false) BigDecimal maxSalary,
                                                        @RequestParam(required = false) String companyName,
                                                        @RequestParam(required = false) String jobName,
                                                        @RequestParam(required = false) String level){
        return ResponseEntity.ok(jobseekerService.getPageForJobseeker(pageNo, pageSize, minSalary, maxSalary, companyName, jobName, level));
    }

    @GetMapping("/job-detail/{id}")
    private ResponseEntity<JobDetailResponse> getById(@PathVariable Long id){
        return ResponseEntity.ok(jobseekerService.getJobById(id));
    }

    @PostMapping("/add-cv")
    private ResponseEntity<String> addNewCv(@RequestParam String name, @RequestParam MultipartFile cv){
        return new ResponseEntity<>(jobseekerService.addCV(name, cv), HttpStatus.CREATED);
    }

    @GetMapping("/cv")
    private ResponseEntity<Page<CurriculumVitaeResponse>> cvManager(){
        return ResponseEntity.ok(jobseekerService.getAllCvOfJobseeker());
    }


    @PostMapping("/cv/{id}")
    private ResponseEntity<String> changeStatusOfCv(@PathVariable Long id){
        jobseekerService.changeStatusCV(id);
        return ResponseEntity.ok("Đã thay đổi CV chính");
    }

    @DeleteMapping("/cv/{id}")
    private ResponseEntity<String> deleteCv(@PathVariable Long id){
        jobseekerService.deleteCvById(id);
        return ResponseEntity.ok("Xóa CV thành công!!");
    }


    @PostMapping("/submit-recruitment/{jobId}")
    private ResponseEntity<MessageResponse> submitRecruiter(@PathVariable Long jobId){
        jobseekerService.submitRecruitment(jobId);
        return ResponseEntity.ok(MessageResponse.builder().message("Nộp đơn ứng tuyển thành công!!!").build());
    }

    @DeleteMapping("/delete-recruitment/{id}")
    private ResponseEntity<String> deleteRecruitment(@PathVariable Long id) {
        jobseekerService.deleteRecruitmentById(id);
        return ResponseEntity.ok("Xóa đơn ứng tuyển thành công!!!");

    }

}
