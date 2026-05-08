package com.lasias.hostelbookingbackend.dtos;

import lombok.Getter;
import java.time.LocalDate;

@Getter
public class BookingResponseDTO {

    private Long id;
    private Long userId;
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private boolean extraBed;
    private String status;

    public BookingResponseDTO(Long id, Long userId, Long roomId, LocalDate checkInDate, LocalDate checkOutDate, boolean extraBed, String status) {
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.extraBed = extraBed;
        this.status = status;
    }
}