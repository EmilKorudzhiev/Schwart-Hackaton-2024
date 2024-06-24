package dev.uktcteam.hackathon.security.auth;

import dev.uktcteam.hackathon.enums.Role;
import dev.uktcteam.hackathon.models.UserModel;
import dev.uktcteam.hackathon.repositories.UserRepository;
import dev.uktcteam.hackathon.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {
        var user = UserModel.builder()
                .username(request.getUsername())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateJwtToken(user);
        var validityOfJwtToken = jwtService.getExpirationTimeOfJwt(jwtToken);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse
                .builder()
                .accessToken(jwtToken)
                .accessTokenValidity(validityOfJwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    //For registering other roles
    public AuthenticationResponse registerWithRole(RegisterRequest request) {
        var user = UserModel.builder()
                .username(request.getUsername())
                .email(request.getEmail().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateJwtToken(user);
        var validityOfJwtToken = jwtService.getExpirationTimeOfJwt(jwtToken);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse
                .builder()
                .accessToken(jwtToken)
                .accessTokenValidity(validityOfJwtToken)
                .refreshToken(refreshToken)
                .build();
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().toLowerCase(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmailEqualsIgnoreCase(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        var jwtToken = jwtService.generateJwtToken(user);
        var validityOfJwtToken = jwtService.getExpirationTimeOfJwt(jwtToken);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse
                .builder()
                .accessToken(jwtToken)
                .accessTokenValidity(validityOfJwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse refreshToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String username; //User Email in this case (var name is username for consistency)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsernameFromRefreshToken(refreshToken);
        if(username != null) {
            var userDetails = this.userRepository.findByEmailEqualsIgnoreCase(username)
                    .orElseThrow();
            if (jwtService.isRefreshTokenValid(refreshToken, userDetails)) {

                var accessToken = jwtService.generateJwtToken(userDetails);
                var validityOfToken = jwtService.getExpirationTimeOfJwt(accessToken);

                return AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .accessTokenValidity(validityOfToken)
                        .refreshToken(refreshToken)
                        .build();
            }
        }
        return null;
    }
}
