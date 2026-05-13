package com.lasias.hostelbookingbackend.services;

import com.lasias.hostelbookingbackend.dtos.BookingResponseDTO;
import com.lasias.hostelbookingbackend.dtos.CreateBookingRequestDTO;
import com.lasias.hostelbookingbackend.dtos.RoomResponseDTO;
import com.lasias.hostelbookingbackend.dtos.UpdateBookingRequestDTO;
import com.lasias.hostelbookingbackend.enums.BookingStatus;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.BookingEntity;
import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.repositories.BookingRepository;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(
            BookingRepository bookingRepository,
            RoomRepository roomRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    public BookingResponseDTO createBooking(CreateBookingRequestDTO request, AppUser user) {
        validateBookingDates(request.getCheckInDate(), request.getCheckOutDate());

        RoomEntity room = roomRepository.findFirstByRoomType_Id(request.getRoomTypeId())
                .orElseThrow(() -> new RuntimeException("No room found for selected room type"));

        BookingEntity booking = new BookingEntity(
                user,
                room,
                request.getCheckInDate(),
                request.getCheckOutDate(),
                request.isExtraBed()
        );

        BookingEntity savedBooking = bookingRepository.save(booking);

        return toResponseDTO(savedBooking);
    }

    public List<BookingResponseDTO> getBookingsByUser(AppUser user) {
        return bookingRepository.findByUser(user)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public BookingResponseDTO getBookingById(Long id) {
        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return toResponseDTO(booking);
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

        return toResponseDTO(savedBooking);
    }

    public void deleteBooking(Long id) {
        BookingEntity booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);

        bookingRepository.save(booking);
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

    private BookingResponseDTO toResponseDTO(BookingEntity booking) {
        RoomEntity room = booking.getRoom();

        RoomResponseDTO roomResponseDTO = new RoomResponseDTO(
                room.getId(),
                room.getRoomNumber(),
                room.isExtraBed(),
                room.getRoomType()
        );

        return new BookingResponseDTO(
                booking.getId(),
                roomResponseDTO,
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.isExtraBed(),
                booking.getStatus().name()
        );
    }
}