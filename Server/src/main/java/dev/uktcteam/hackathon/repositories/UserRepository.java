package dev.uktcteam.hackathon.repositories;

import dev.uktcteam.hackathon.models.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {

    Optional<UserModel> findByEmailEqualsIgnoreCase(@NonNull String email);

}
