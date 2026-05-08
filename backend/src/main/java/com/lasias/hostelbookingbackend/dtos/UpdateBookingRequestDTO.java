package com.lasias.hostelbookingbackend.dtos;

import java.time.LocalDate;

public class UpdateBookingRequestDTO {

    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private boolean extraBed;

    public Long getRoomId() {
        return roomId;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public boolean isExtraBed() {
        return extraBed;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public void setExtraBed(boolean extraBed) {
        this.extraBed = extraBed;
    }
}