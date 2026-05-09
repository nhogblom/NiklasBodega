package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<RoomEntity> getRooms() {
        return roomRepository.findAll();
    }

    public void addRoom(RoomEntity room) {
        roomRepository.save(room);
    }

    public RoomEntity getRoomsById(Long id) {
        return roomRepository.findAll().stream().filter(room -> room.getId().equals(id)).findFirst().
                orElse(null);
    }

    public void updateRoom(Long id, RoomEntity updatedRoom) {
        RoomEntity roomToUpdate = roomRepository.findAll().stream().filter(room -> room.getId().equals(id)).
                findFirst().orElse(null);
        if (roomToUpdate == null) {
            roomRepository.save(updatedRoom);
        }else {
            roomToUpdate.setRoomNumber(updatedRoom.getRoomNumber());
            roomToUpdate.setRoomType(updatedRoom.getRoomType());
            roomToUpdate.setExtraBed(updatedRoom.isExtraBed());
        }
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
