package com.lasias.hostelbookingbackend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterNewUserDTO(
        @NotBlank(message = "First name is required")
        @Size(min = 5, max = 70, message = "First name must be between 2 and 50 characters")
        String fullName,
        @Email(message = "Invalid email format")
        String username,
        /// username ==== email.
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$", message = "Password must be at least 8 characters long, contain special, lower, uppercase characters.")
        String password
) {
}
