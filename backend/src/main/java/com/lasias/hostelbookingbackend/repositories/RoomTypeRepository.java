package com.lasias.hostelbookingbackend.repositories;

import com.lasias.hostelbookingbackend.dtos.RoomTypeDTO;
import com.lasias.hostelbookingbackend.models.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
    Optional<RoomType> findByType(String type);

    @Query("""
    SELECT DISTINCT rt FROM RoomType rt
    JOIN RoomEntity r ON r.roomType = rt
    WHERE NOT EXISTS (
        SELECT b FROM BookingEntity b
        WHERE b.room = r
        AND b.status <> com.lasias.hostelbookingbackend.enums.BookingStatus.CANCELLED
        AND b.checkInDate < :checkOut
        AND b.checkOutDate > :checkIn
    )
""")
    List<RoomType> findAllByAvailability(
            @Param("checkIn") LocalDateTime checkIn,
            @Param("checkOut") LocalDateTime checkOut
    );}
