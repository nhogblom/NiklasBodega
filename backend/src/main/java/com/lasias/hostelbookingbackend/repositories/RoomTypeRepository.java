package com.lasias.hostelbookingbackend.repositories;

import com.lasias.hostelbookingbackend.models.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
}
