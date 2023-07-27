package stu.recruitmentweb.photographer.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stu.recruitmentweb.photographer.domain.models.Advertisement;
import stu.recruitmentweb.photographer.domain.models.User;
import stu.recruitmentweb.photographer.domain.payload.response.AdvertisementResponse;
import stu.recruitmentweb.photographer.domain.payload.response.JobDetailResponse;
import stu.recruitmentweb.photographer.domain.payload.response.UserDetailResponse;
import stu.recruitmentweb.photographer.repository.AdvertisementRepository;
import stu.recruitmentweb.photographer.repository.AdvertisementRepositoryCustom;
import stu.recruitmentweb.photographer.repository.JobRepository;
import stu.recruitmentweb.photographer.repository.UserRepository;
import stu.recruitmentweb.photographer.service.AdminService;
import stu.recruitmentweb.photographer.service.BaseService;
import stu.recruitmentweb.photographer.service.FileStorageService;
import stu.recruitmentweb.photographer.utils.MapperUtils;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl extends BaseService implements AdminService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final MapperUtils mapper;
    private final AdvertisementRepository advertisementRepository;
    private final FileStorageService fileStorageService;
    private final AdvertisementRepositoryCustom advertisementRepositoryCustom;

    @Override
    public Page<JobDetailResponse> getPageJobOfRecruiters(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        List<JobDetailResponse> list = mapper.convertToResponseList(jobRepository.findAll(), JobDetailResponse.class);
        return new PageImpl<>(list, pageable, list.size());
    }

    @Override
    public Page<UserDetailResponse> getPageAccountManager(Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        List<UserDetailResponse> list = mapper.convertToResponseList(
                userRepository.findAll().stream().filter(i -> !i.getEmail().equals("master@gmail.com"))
                        .collect(Collectors.toList()), UserDetailResponse.class);
        return new PageImpl<>(list, pageable, list.size());
    }

    @Override
    public void lockAccountOfRecruiterAndJobseeker(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        if (user.getIsLocked().equals(true)) {
            user.setIsLocked(false);
        } else {
            user.setIsLocked(true);
        }

        userRepository.save(user);
    }

    @Override
    public String addAdvertisement(String title,
                                   MultipartFile image,
                                   String description) {
        String imageFile = fileStorageService.storeFile(image);
        Advertisement advertisement = new Advertisement(title, imageFile ,description, getUser());
        advertisementRepository.save(advertisement);
        return "Thêm quảng cáo thành công";
    }

    @Override
    public Page<AdvertisementResponse> getPageAdvertisement(String title, Integer pageNo, Integer pageSize) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);

        return mapper.convertToResponsePage(
                advertisementRepositoryCustom.searchingForAdvertisement(title,pageable),
                AdvertisementResponse.class, pageable
        );
    }

    @Override
    public void deleteAdvertisement(Long id) {
        advertisementRepository.deleteById(id);
    }

    @Override
    public AdvertisementResponse getAdvertisementById(Long id) {
        return mapper.convertToResponse(advertisementRepository.findById(id).orElseThrow(),AdvertisementResponse.class);
    }

    @Override
    public void updateAdvertisement(Long id , String title, MultipartFile image, String description) {
        String imageFile = fileStorageService.storeFile(image);

        Advertisement advertisement = advertisementRepository.findById(id).orElseThrow();
        advertisement.setDescription(description);
        advertisement.setImage(imageFile);
        advertisement.setTitle(title);

        advertisementRepository.save(advertisement);
    }

    private User getUser(){
        return userRepository.findById(getUserId()).orElseThrow(() -> new IllegalArgumentException("Tài khoản không tồn tại!!!!"));
    }
}
