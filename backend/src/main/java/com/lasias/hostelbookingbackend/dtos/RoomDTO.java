package com.lasias.hostelbookingbackend.dtos;

import com.lasias.hostelbookingbackend.models.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long id;
    private Long roomNumber;
    private RoomType roomType;
    private boolean extraBed;
}
