package dev.uktcteam.hackathon.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserCreateRequest {
    private String username;
    private String email;
    private String password;
}
