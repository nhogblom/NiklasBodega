package com.lasias.hostelbookingbackend.repositories;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookingEntity, Long> {

    boolean existsByUser(AppUser user);

    List<BookingEntity> findByUser(AppUser user);

    Optional<BookingEntity> findByBookingNumber(String bookingNumber);

    /*TODO We don't use this, crashes the application since we don't have "Date" in database. Either add @Query annotaion to make it clear what it should do
        or change the name findAvailableRoomIdByCheckIn or something.
     */
    //List<Integer> findAvailableRoomIdByDate(LocalDateTime checkIn, LocalDateTime checkOut);
}
