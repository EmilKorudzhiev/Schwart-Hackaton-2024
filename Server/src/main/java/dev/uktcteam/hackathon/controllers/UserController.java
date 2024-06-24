package dev.uktcteam.hackathon.controllers;

import dev.uktcteam.hackathon.models.UserModel;
import dev.uktcteam.hackathon.requests.UserCreateRequest;
import dev.uktcteam.hackathon.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.print.DocFlavor;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class UserController {

    private final UserService userService;

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('admin:read', 'user:read')")
    public ResponseEntity<UserModel> getUser(@PathVariable String id) {
        Optional<UserModel> user = userService.getUser(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
