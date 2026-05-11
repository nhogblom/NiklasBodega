package com.lasias.hostelbookingbackend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "RoomType")
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
    String badge;
    boolean featured;
    String imageUrl;

}
