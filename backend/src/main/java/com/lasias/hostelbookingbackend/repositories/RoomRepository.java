package com.lasias.hostelbookingbackend.repositories;

import com.lasias.hostelbookingbackend.models.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
}
