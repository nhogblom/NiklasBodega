package com.lasias.hostelbookingbackend.dtos;

public record UpdateUserDTO(
        String name, String password, String email) {
}
