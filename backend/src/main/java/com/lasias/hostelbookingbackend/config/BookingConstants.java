package com.lasias.hostelbookingbackend.config;

import java.time.LocalTime;

public class BookingConstants {

    public static final LocalTime CHECK_IN_TIME = LocalTime.of(11, 00);
    public static final LocalTime CHECK_OUT_TIME = LocalTime.of(13, 00);

    private BookingConstants() {}
}
