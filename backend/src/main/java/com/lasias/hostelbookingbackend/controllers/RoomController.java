package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.services.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @reqargumentsconst
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<RoomEntity> getRooms() {
        return roomService.getRooms();
    }

    @GetMapping
    public List<RoomEntity> getRoomsByUser() {
        return roomService.getRooms();
    }

    @PostMapping
    public List<RoomEntity> addRoom(@RequestBody RoomEntity room) {
        return roomService.addRoom(room);
    }

    @GetMapping("/{id}")
    public RoomEntity getRoom(@PathVariable Long id) {
        return roomService.getRoomsById(id);
    }

    @PutMapping("/{id}")
    public List<RoomEntity> updateRoom(@PathVariable Long id, @RequestBody RoomEntity updatedRoom) {
        return roomService.updateRoom(id, updatedRoom);
    }

    @DeleteMapping("/{id}")
    public List<RoomEntity> deleteRoom(@PathVariable Long id) {
        return roomService.deleteRoom(id);
    }
}
