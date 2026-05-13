package com.lasias.hostelbookingbackend.repositories;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    boolean existsByUser(AppUser user);

    List<BookingEntity> findByUser(AppUser user);
}