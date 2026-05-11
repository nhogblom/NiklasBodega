package com.lasias.hostelbookingbackend.models;

import com.lasias.hostelbookingbackend.enums.RoomBadge;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "RoomType")
@RequiredArgsConstructor
@Getter
@Setter
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String type;
    String description;
    Double price;
    Integer size;
    Integer capacity;

    @Enumerated(EnumType.STRING)
    RoomBadge badge;

    boolean featured;
    String imageUrl;

}
