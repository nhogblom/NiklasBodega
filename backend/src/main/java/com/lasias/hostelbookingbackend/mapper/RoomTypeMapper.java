package com.lasias.hostelbookingbackend.mapper;

import com.lasias.hostelbookingbackend.dtos.RoomTypeDTO;
import com.lasias.hostelbookingbackend.models.RoomType;

public class RoomTypeMapper {

    private RoomTypeMapper() {}

    public static RoomType toEntity(RoomTypeDTO dto) {
        return RoomType.builder()
                .name(dto.getName())
                .type(dto.getType())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .size(dto.getSize())
                .capacity(dto.getCapacity())
                .extraBedAvailable(dto.isExtraBedAvailable())
                .badge(dto.getRoomBadge())
                .featured(dto.isFeatured())
                .imageUrl(dto.getImageUrl()).build();
    }
    public static RoomTypeDTO toResponse(RoomType roomType) {
        return new RoomTypeDTO(
                roomType.getId(),
                roomType.getName(),
                roomType.getType(),
                roomType.getDescription(),
                roomType.getPrice(),
                roomType.getSize(),
                roomType.getCapacity(),
                roomType.isExtraBedAvailable(),
                roomType.getBadge(),
                roomType.isFeatured(),
                roomType.getImageUrl()
        );
    }
}
