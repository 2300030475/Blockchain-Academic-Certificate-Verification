package com.certificate.certificate_verification_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.certificate.certificate_verification_backend.dto.LoginRequest;
import com.certificate.certificate_verification_backend.dto.LoginResponse;
import com.certificate.certificate_verification_backend.entity.User;
import com.certificate.certificate_verification_backend.service.JwtService;
import com.certificate.certificate_verification_backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://localhost:5174"
	})
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userService.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        boolean passwordMatches = userService.checkPassword(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        LoginResponse response = new LoginResponse(
                token,
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<User> findUser(@RequestParam String email) {

        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }
}