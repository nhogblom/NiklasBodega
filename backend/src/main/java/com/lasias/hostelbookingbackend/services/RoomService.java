package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<RoomEntity> getRooms() {
        return null;
    }

    public List<RoomEntity> addRoom(RoomEntity room) {
        return null;
    }

    public RoomEntity getRoomsById(Long id) {
        return null;
    }

    public List<RoomEntity> updateRoom(Long id, RoomEntity updatedRoom) {
        return null;
    }

    public List<RoomEntity> deleteRoom(Long id) {
        return null;
    }
}
