package com.lasias.hostelbookingbackend.repositories;

import com.lasias.hostelbookingbackend.models.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
    Optional<RoomType> findByType(String type);
}
