package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.RoomTypeDTO;
import com.lasias.hostelbookingbackend.services.RoomTypeService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms/roomTypes")
public class RoomTypeController {
    private final RoomTypeService roomTypeService;

    @GetMapping
    public List<RoomTypeDTO> getAllRoomTypes() {
        return roomTypeService.getAllRoomTypes();
    }

    @GetMapping("/{id}")
    public RoomTypeDTO getRoomTypeById(@PathVariable Long id) {
        return roomTypeService.getRoomTypeById(id);
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomTypeDTO>> getAllRoomTypesByAvailability(@RequestParam LocalDate checkInDate, @RequestParam LocalDate checkOutDate) {
        return ResponseEntity.ok(roomTypeService.getAllRoomTypesByAvailability(checkInDate, checkOutDate));
    }
}
