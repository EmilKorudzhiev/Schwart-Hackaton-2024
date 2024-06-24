package dev.uktcteam.hackathon.repositories;

import dev.uktcteam.hackathon.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByEmailEqualsIgnoreCase(@NonNull String email);

}
