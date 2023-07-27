package stu.recruitmentweb.photographer.service;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.photographer.domain.payload.response.AdvertisementResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.photographer.domain.payload.response.UserDetailResponse;

public interface AdminService {
    Page<JobDetailResponse> getPageJobOfRecruiters(Integer pageNo, Integer pageSize);

    Page<UserDetailResponse> getPageAccountManager(Integer pageNo, Integer pageSize);

    void lockAccountOfRecruiterAndJobseeker(Long id);

    //ADVERTISEMENT
    String addAdvertisement(String title,
                            MultipartFile image,
                            String description);

    Page<AdvertisementResponse> getPageAdvertisement(String title, Integer pageNo, Integer pageSize);

    void deleteAdvertisement(Long id);

    AdvertisementResponse getAdvertisementById(Long id);

    void updateAdvertisement(Long id,String title, MultipartFile image, String description);
}