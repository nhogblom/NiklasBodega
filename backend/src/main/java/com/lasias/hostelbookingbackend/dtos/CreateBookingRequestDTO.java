package com.lasias.hostelbookingbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class CreateBookingRequestDTO {

    private Long roomTypeId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private boolean extraBed;
}