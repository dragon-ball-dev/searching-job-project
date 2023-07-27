package stu.recruitmentweb.photographer.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import stu.recruitmentweb.photographer.domain.models.Advertisement;

public interface AdvertisementRepositoryCustom {
    Page<Advertisement> searchingForAdvertisement(String name,Pageable pageable);
}
