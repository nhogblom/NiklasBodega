package com.lasias.hostelbookingbackend.dtos;

import java.time.LocalDateTime;

// FYI username == email. Frontend expects var to be named username.
public record UserInformationDTO(String username, String name, String role, LocalDateTime createdAt) {
}
