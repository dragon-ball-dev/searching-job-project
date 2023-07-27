package stu.recruitmentweb.photographer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stu.recruitmentweb.photographer.domain.models.Company;


@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
}
