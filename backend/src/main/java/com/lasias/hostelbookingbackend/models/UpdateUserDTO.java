package com.lasias.hostelbookingbackend.models;

public record UpdateUserDTO(
        String name, String password, String email) {
}
