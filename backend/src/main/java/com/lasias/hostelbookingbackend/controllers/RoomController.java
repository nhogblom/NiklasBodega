package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.RoomDTO;
import com.lasias.hostelbookingbackend.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public List<RoomDTO> getRooms() {
        return roomService.getRooms();
    }

    @PostMapping
    public RoomDTO addRoom(@RequestBody RoomDTO room) {
        return roomService.addRoom(room);
    }

    @GetMapping("/user")
    public List<RoomDTO> getRoomsByUser() {
        return roomService.getRooms();
    }

    @GetMapping("/{id}")
    public RoomDTO getRoom(@PathVariable Long id) {
        return roomService.getRoomsById(id);
    }

    @PutMapping("/{id}")
    public RoomDTO updateRoom(@PathVariable Long id, @RequestBody RoomDTO roomDTO) {
        return roomService.updateRoom(id, roomDTO);
    }

    @DeleteMapping("/{id}")
    public RoomDTO deleteRoom(@PathVariable Long id) {
        return roomService.deleteRoom(id);
    }
}
