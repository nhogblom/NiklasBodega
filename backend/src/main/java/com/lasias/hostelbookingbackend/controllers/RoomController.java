package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.RoomDTO;
import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomEntity>> getRooms() {
        return ResponseEntity.ok(roomService.getRooms());
    }

    @PostMapping
    public void addRoom(@RequestBody RoomDTO room) {
        roomService.addRoom(room);
    }

    @GetMapping("/user")
    public List<RoomEntity> getRoomsByUser() {
        return roomService.getRooms();
    }

    @GetMapping("/{id}")
    public RoomEntity getRoom(@PathVariable Long id) {
        return roomService.getRoomsById(id);
    }

    @PutMapping("/{id}")
    public RoomDTO updateRoom(@PathVariable Long id, @RequestBody RoomDTO roomDTO) {
        return roomService.updateRoom(id, roomDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }
}
