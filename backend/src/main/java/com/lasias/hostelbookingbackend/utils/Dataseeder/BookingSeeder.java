package com.lasias.hostelbookingbackend.utils.Dataseeder;

import com.lasias.hostelbookingbackend.enums.BookingStatus;
import com.lasias.hostelbookingbackend.enums.RoomBadge;
import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.models.BookingEntity;
import com.lasias.hostelbookingbackend.models.RoomEntity;
import com.lasias.hostelbookingbackend.models.RoomType;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import com.lasias.hostelbookingbackend.repositories.BookingRepository;
import com.lasias.hostelbookingbackend.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Component
@Order(4)
public class BookingSeeder implements CommandLineRunner {

    private final BookingRepository bookingRepository;
    private final AppUserRepository appUserRepository;
    private final RoomRepository roomRepository;

    @Override
    public void run(String... args) throws Exception {
        if (bookingRepository.count() == 0) {
            bookingRepository.saveAll(bookingsToAdd());
            log.info("Successfully added {} bookings.",bookingsToAdd().size());
        } else {
            log.info("Bookings already exists in database");
        }
    }

    private List<BookingEntity> bookingsToAdd() {

        AppUser user2 = appUserRepository.findById(2L).get();
        AppUser  user3 = appUserRepository.findById(3L).get();

        List<RoomEntity> rooms = roomRepository.findAllById(
                List.of(1L,2L,3L,4L,5L,6L,7L,8L,9L,10L)
        );

        List<BookingEntity> bookings = new ArrayList<>();
        LocalDate baseDate = LocalDate.of(2027, 1, 1);

        for (int i = 0; i < rooms.size(); i++) {

            AppUser user = (i % 2 == 0) ? user2 : user3;

            bookings.add(createBooking(
                    user,
                    rooms.get(i),
                    baseDate.plusDays(i * 2),
                    baseDate.plusDays(i * 2 + 2),
                    i % 3 == 0,
                    BookingStatus.CONFIRMED
            ));
        }

        // All rooms booked on 2028-01-01 to 2028-01-05
        for (int i = 0; i < rooms.size(); i++) {

            bookings.add(createBooking(
                    user2,
                    rooms.get(i),
                    LocalDate.of(2028, 1, 1),
                    LocalDate.of(2028, 1, 5),
                    i % 3 == 0,
                    BookingStatus.CONFIRMED
            ));
        }

        //All but room id 10 booked on 2028-02-01 to 2028-02-05
        for (int i = 0; i < rooms.size() - 1; i++) {

            bookings.add(createBooking(
                    user2,
                    rooms.get(i),
                    LocalDate.of(2028, 2, 1),
                    LocalDate.of(2028, 2, 5),
                    i % 3 == 0,
                    BookingStatus.CONFIRMED
            ));
        }

        return bookings;
    }

    private BookingEntity createBooking(AppUser user,
                                        RoomEntity room,
                                        LocalDate checkIn,
                                        LocalDate checkOut,
                                        boolean extraBed,
                                        BookingStatus status) {

        BookingEntity booking = new BookingEntity();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setExtraBed(extraBed);
        booking.setStatus(status);

        return booking;
    }
}
