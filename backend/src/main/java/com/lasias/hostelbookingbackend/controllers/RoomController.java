package com.lasias.hostelbookingbackend.controllers;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @reqargumentsconst
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public List<Room> getRooms() {
        return roomService.getRooms();
    }

    @GetMapping
    public List<Room> getRoomsByUser() {
        return roomService.getRooms();
    }

    @PostMapping
    public List<Room> addRoom(@RequestBody Room room) {
        return roomService.addRoom(room);
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable Long id) {
        return roomService.getRoomsById(id);
    }

    @PutMapping("/{id}")
    public List<Room> updateRoom(@PathVariable Long id, @RequestBody Room updatedRoom) {
        return roomService.updateRoom(id, updatedRoom);
    }

    @DeleteMapping("/{id}")
    public List<Room> deleteRoom(@PathVariable Long id) {
        return roomService.deleteRoom(id);
    }
}
