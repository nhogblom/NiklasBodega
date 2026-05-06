package com.lasias.hostelbookingbackend.repositories;
import com.lasias.hostelbookingbackend.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}