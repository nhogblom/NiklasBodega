package com.lasias.hostelbookingbackend.dtos;

import com.lasias.hostelbookingbackend.models.RoomType;
import lombok.Getter;

@Getter
public class RoomResponseDTO {

    private Long id;
    private Long roomNumber;
    private boolean extraBed;
    private RoomType roomType;

    public RoomResponseDTO(Long id, Long roomNumber, boolean extraBed, RoomType roomType) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.extraBed = extraBed;
        this.roomType = roomType;
    }
}