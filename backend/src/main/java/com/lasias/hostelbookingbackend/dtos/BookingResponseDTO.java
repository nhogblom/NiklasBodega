package com.lasias.hostelbookingbackend.dtos;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BookingResponseDTO {

    private String bookingNumber;
    private RoomResponseDTO room;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private boolean extraBed;
    private String status;

    public BookingResponseDTO(
            String bookingNumber,
            RoomResponseDTO room,
            LocalDate checkInDate,
            LocalDate checkOutDate,
            boolean extraBed,
            String status
    ) {
        this.bookingNumber = bookingNumber;
        this.room = room;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.extraBed = extraBed;
        this.status = status;
    }
}
