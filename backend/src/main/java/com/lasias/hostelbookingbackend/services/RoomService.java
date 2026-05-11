package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.dtos.RoomDTO;
import com.lasias.hostelbookingbackend.exceptions.RoomNotFoundException;
import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<RoomEntity> getRooms() {
        return roomRepository.findAll();
    }

    public RoomDTO addRoom(RoomDTO room) {
        return roomToRoomDTO(roomRepository.save(roomToRoomEntity(room)));
    }

    public RoomEntity getRoomsById(Long id) {
        return roomRepository.findAll().stream().filter(room -> room.getId().equals(id)).findFirst().
                orElse(null);
    }

    public RoomDTO updateRoom(Long id, RoomDTO roomRequestDTO) {
        RoomEntity room = roomRepository.findById(id).orElseThrow(RoomNotFoundException::new);
        room.setRoomNumber(roomRequestDTO.getRoomNumber());
        room.setRoomType(roomRequestDTO.getRoomType());
        room.setExtraBed(roomRequestDTO.isExtraBed());
        return roomToRoomDTO(room);
    }

    private RoomDTO roomToRoomDTO(RoomEntity room) {
        return RoomDTO.builder()
                .roomNumber(room.getRoomNumber())
                .roomType(room.getRoomType())
                .extraBed(room.isExtraBed())
                .build();
    }

    private RoomEntity roomToRoomEntity(RoomDTO roomRequestDTO) {
        return RoomEntity.builder()
                .roomNumber(roomRequestDTO.getRoomNumber())
                .roomType(roomRequestDTO.getRoomType())
                .extraBed(roomRequestDTO.isExtraBed())
                .build();
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
