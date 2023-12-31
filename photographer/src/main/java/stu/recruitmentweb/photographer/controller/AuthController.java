package stu.recruitmentweb.photographer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import stu.recruitmentweb.photographer.domain.payload.request.LoginRequest;
import stu.recruitmentweb.photographer.domain.payload.request.SignUpRequest;
import stu.recruitmentweb.photographer.domain.payload.response.ApiResponse;
import stu.recruitmentweb.photographer.domain.payload.response.AuthResponse;
import stu.recruitmentweb.photographer.service.AuthService;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(new AuthResponse(authService.login(loginRequest)));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.created(authService.registerAccount(signUpRequest))
                .body(new ApiResponse(true, "User registered successfully@"));
    }
    
}
