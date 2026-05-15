package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.config.BookingConstants;
import com.lasias.hostelbookingbackend.dtos.RoomTypeDTO;
import com.lasias.hostelbookingbackend.models.RoomType;
import com.lasias.hostelbookingbackend.repositories.RoomTypeRepository;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomTypeService {
    private final RoomTypeRepository roomTypeRepository;


    public List<RoomTypeDTO> getAllRoomTypes() {
        return roomTypeRepository.findAll().stream().map(this::roomTypeToDTO).toList();
    }

    private RoomTypeDTO roomTypeToDTO(RoomType roomType) {
        return RoomTypeDTO.builder()
                .id(roomType.getId())
                .name(roomType.getName())
                .type(roomType.getType())
                .description(roomType.getDescription())
                .price(roomType.getPrice())
                .size(roomType.getSize())
                .capacity(roomType.getCapacity())
                .extraBedAvailable(roomType.isExtraBedAvailable())
                .roomBadge(roomType.getBadge())
                .featured(roomType.isFeatured())
                .imageUrl(roomType.getImageUrl())
                .build();
    }

    public RoomTypeDTO getRoomTypeById(Long id) {
        return roomTypeRepository.findById(id).map(this::roomTypeToDTO).orElse(null);
    }

    public List<RoomTypeDTO> getAllRoomTypesByAvailability(LocalDate checkInDate, LocalDate checkOutDate) {
        LocalDateTime checkIn = LocalDateTime.of(checkInDate, BookingConstants.CHECK_IN_TIME);
        LocalDateTime checkOut = LocalDateTime.of(checkOutDate, BookingConstants.CHECK_OUT_TIME);
        return roomTypeRepository.findAllByAvailability(checkIn, checkOut).stream().map(this::roomTypeToDTO).toList();
    }
}
