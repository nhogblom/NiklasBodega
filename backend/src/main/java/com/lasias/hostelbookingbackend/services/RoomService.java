package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
}
