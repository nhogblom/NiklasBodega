package com.lasias.hostelbookingbackend.dtos;

import com.lasias.hostelbookingbackend.enums.RoomBadge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomTypeDTO {
    private Long id;
    private String name;
    private String type;
    private String description;
    private Double price;
    private Integer size;
    private Integer capacity;
    private boolean extraBedAvailable;
    private RoomBadge roomBadge;
    private boolean featured;
    private String imageUrl;
}
