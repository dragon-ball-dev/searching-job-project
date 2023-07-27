package stu.recruitmentweb.photographer;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import stu.recruitmentweb.photographer.config.AppProperties;
import stu.recruitmentweb.photographer.config.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class,AppProperties.class})
public class PhotographerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhotographerApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
