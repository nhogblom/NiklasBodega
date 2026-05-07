package com.lasias.hostelbookingbackend.services;
import java.time.LocalDate;import com.lasias.hostelbookingbackend.dtos.UpdateBookingRequestDTO;
import com.lasias.hostelbookingbackend.dtos.BookingResponseDTO;
import com.lasias.hostelbookingbackend.dtos.CreateBookingRequestDTO;
import com.lasias.hostelbookingbackend.models.BookingEntity;
import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.repositories.BookingRepository;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final AppUserRepository appUserRepository;
    private final RoomRepository roomRepository;

    public BookingService(
            BookingRepository bookingRepository,
            AppUserRepository appUserRepository,
            RoomRepository roomRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.appUserRepository = appUserRepository;
        this.roomRepository = roomRepository;
    }

    public BookingResponseDTO createBooking(CreateBookingRequestDTO request) {
        validateBookingDates(request.getCheckInDate(), request.getCheckOutDate());
        AppUser user = appUserRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        RoomEntity room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        BookingEntity booking = new BookingEntity(
                user,
                room,
                request.getCheckInDate(),
                request.getCheckOutDate(),
                request.isExtraBed()
        );

        BookingEntity savedBooking = bookingRepository.save(booking);

        return new BookingResponseDTO(
                savedBooking.getId(),
                savedBooking.getUser().getId(),
                savedBooking.getRoom().getId(),
                savedBooking.getCheckInDate(),
                savedBooking.getCheckOutDate(),
                savedBooking.isExtraBed(),
                savedBooking.getStatus().name()
        );
    }

    private void validateBookingDates(LocalDate checkInDate, LocalDate checkOutDate) {
        if (checkInDate == null || checkOutDate == null) {
            throw new IllegalArgumentException("Check-in and check-out dates are required");
        }

        if (checkInDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Check-in date cannot be in the past");
        }

        if (!checkOutDate.isAfter(checkInDate)) {
            throw new IllegalArgumentException("Check-out date must be after check-in date");
        }
    }

    public BookingResponseDTO getBookingById(Long id) {
        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return new BookingResponseDTO(
                booking.getId(),
                booking.getUser().getId(),
                booking.getRoom().getId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.isExtraBed(),
                booking.getStatus().name()
        );
    }

    public BookingResponseDTO updateBooking(Long id, UpdateBookingRequestDTO request) {
        validateBookingDates(request.getCheckInDate(), request.getCheckOutDate());

        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        RoomEntity room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setExtraBed(request.isExtraBed());

        BookingEntity savedBooking = bookingRepository.save(booking);

        return new BookingResponseDTO(
                savedBooking.getId(),
                savedBooking.getUser().getId(),
                savedBooking.getRoom().getId(),
                savedBooking.getCheckInDate(),
                savedBooking.getCheckOutDate(),
                savedBooking.isExtraBed(),
                savedBooking.getStatus().name()
        );
    }
}