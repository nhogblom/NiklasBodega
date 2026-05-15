//package com.lasias.hostelbookingbackend.utils.Dataseeder;
//
//import com.lasias.hostelbookingbackend.enums.RoomBadge;
//import com.lasias.hostelbookingbackend.models.BookingEntity;
//import com.lasias.hostelbookingbackend.models.RoomType;
//import com.lasias.hostelbookingbackend.repositories.BookingRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@Slf4j
//@Component
//@Order(4)
//public class BookingSeeder implements CommandLineRunner {
//
//    private final BookingRepository bookingRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//        if (bookingRepository.count() == 0) {
//            bookingRepository.saveAll(bookingsToAdd());
//            log.info("Successfully added {} bookings.",bookingsToAdd().size());
//        } else {
//            log.info("Bookings already exists in database");
//        }
//    }
//
//    private List<BookingEntity> bookingsToAdd() {
//        return List.of(
//                RoomType.builder()
//                        .name("The Bodega Luxury Suite")
//                        .type("Lux Suite")
//                        .description("Our crown jewel. A sprawling suite with panoramic Mediterranean views, a private terrace, and bespoke handcrafted furnishings.")
//                        .price(480.0)
//                        .size(85)
//                        .capacity(2)
//                        .extraBedAvailable(true)
//                        .badge(RoomBadge.SUITE)
//                        .featured(true)
//                        .imageUrl("https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200")
//                        .build(),
//                RoomType.builder()
//                        .name("Classic Single")
//                        .type("Single Room")
//                        .description("A cozy, thoughtfully appointed room for solo travellers. Warm stone walls, soft linens, and everything you need for a restful stay.")
//                        .price(95.0)
//                        .size(22)
//                        .capacity(1)
//                        .extraBedAvailable(false)
//                        .badge(RoomBadge.STANDARD)
//                        .featured(false)
//                        .imageUrl("https://images.unsplash.com/photo-1631049552057-403cdb8f0658?auto=format&fit=crop&q=80&w=800")
//                        .build(),
//
//                RoomType.builder()
//                        .name("Classic Double")
//                        .type("Double Room")
//                        .description("Perfect for couples. A generous room with a king-size bed, ensuite bathroom, and warm Mediterranean light flooding through large windows.")
//                        .price(150.0)
//                        .size(35)
//                        .capacity(2)
//                        .extraBedAvailable(true)
//                        .badge(RoomBadge.STANDARD)
//                        .featured(false)
//                        .imageUrl("https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800")
//                        .build(),
//
//                RoomType.builder()
//                        .name("Family Suite")
//                        .type("Family Suite")
//                        .description("Spacious and welcoming, with two bedrooms and a shared living area. Designed for families who refuse to compromise on comfort.")
//                        .price(280.0)
//                        .size(60)
//                        .capacity(4)
//                        .extraBedAvailable(true)
//                        .badge(RoomBadge.PREMIUM)
//                        .featured(false)
//                        .imageUrl("https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800")
//                        .build()
//        );
//    }
//}
