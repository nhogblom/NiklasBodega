package com.lasias.hostelbookingbackend.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    private List<String> roles;
    @CreatedDate
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String token;
    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;
    private String authProviderId;
    //private List<Bookings> listOfBookings;

}
