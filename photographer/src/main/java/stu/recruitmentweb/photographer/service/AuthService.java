package stu.recruitmentweb.photographer.service;


import stu.recruitmentweb.photographer.domain.payload.request.LoginRequest;
import stu.recruitmentweb.photographer.domain.payload.request.SignUpRequest;

import java.net.URI;

public interface AuthService {
    URI registerAccount(SignUpRequest signUpRequest);

    String login(LoginRequest loginRequest);
}
