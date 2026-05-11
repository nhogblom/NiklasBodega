package com.lasias.hostelbookingbackend.utils.Dataseeder;

import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.models.RoomType;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import com.lasias.hostelbookingbackend.repositories.RoomTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
@Order(2)
public class RoomSeeder implements CommandLineRunner {

    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roomRepository.count() == 0) {
            roomRepository.saveAll(roomsToAdd());
            log.info("Added {} to Rooms table", roomsToAdd().size());
        } else {
            log.info("Rooms already exists in database");
        }
    }

    private List<RoomEntity> roomsToAdd() {
        RoomType lux = roomTypeRepository.findByType("Lux Suite").orElseThrow(() -> new IllegalArgumentException("Room type not found"));
        RoomType single = roomTypeRepository.findByType("Single Room").orElseThrow(() -> new IllegalArgumentException("Room type not found"));
        RoomType doubleRoom = roomTypeRepository.findByType("Double Room").orElseThrow(() -> new IllegalArgumentException("Room type not found"));
        RoomType family = roomTypeRepository.findByType("Family Suite").orElseThrow(() -> new IllegalArgumentException("Room type not found"));

        return List.of(
                RoomEntity.builder()
                        .roomNumber(11L)
                        .roomType(lux)
                        .extraBed(true)
                        .build(),

                RoomEntity.builder()
                        .roomNumber(22L)
                        .roomType(single)
                        .extraBed(true)
                        .build(),
                RoomEntity.builder()
                        .roomNumber(33L)
                        .roomType(doubleRoom)
                        .extraBed(true)
                        .build(),
                RoomEntity.builder()
                        .roomNumber(44L)
                        .roomType(family)
                        .extraBed(true)
                        .build()
        );
    }


}
