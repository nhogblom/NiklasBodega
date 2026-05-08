package com.lasias.hostelbookingbackend.dtos;

import java.time.LocalDateTime;

public record UserInformationDTO(String email, String name, String role, LocalDateTime createdAt) {
}
