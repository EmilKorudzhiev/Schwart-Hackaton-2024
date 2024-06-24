package dev.uktcteam.hackathon.services;

import dev.uktcteam.hackathon.models.UserModel;
import dev.uktcteam.hackathon.repositories.UserRepository;
import dev.uktcteam.hackathon.requests.UserCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<UserModel> getUser(String id) {
        return userRepository.findById(id);
    }

}
