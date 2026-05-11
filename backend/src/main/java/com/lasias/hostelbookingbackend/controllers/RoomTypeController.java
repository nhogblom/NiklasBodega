package com.lasias.hostelbookingbackend.controllers;

import com.lasias.hostelbookingbackend.dtos.RoomTypeDTO;
import com.lasias.hostelbookingbackend.services.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
