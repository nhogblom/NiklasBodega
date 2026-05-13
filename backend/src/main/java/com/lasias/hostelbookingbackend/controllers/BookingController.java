package com.lasias.hostelbookingbackend.controllers;
import com.lasias.hostelbookingbackend.dtos.BookingResponseDTO;
import com.lasias.hostelbookingbackend.dtos.CreateBookingRequestDTO;
import com.lasias.hostelbookingbackend.dtos.UpdateBookingRequestDTO;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody CreateBookingRequestDTO request, @AuthenticationPrincipal AppUser user) {
        BookingResponseDTO response = bookingService.createBooking(request,user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(@PathVariable Long id) {
        BookingResponseDTO response = bookingService.getBookingById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> updateBooking(
            @PathVariable Long id,
            @RequestBody UpdateBookingRequestDTO request
    ) {
        BookingResponseDTO response = bookingService.updateBooking(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}