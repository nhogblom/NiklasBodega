package com.lasias.hostelbookingbackend.models;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private boolean extraBed;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.ACTIVE;

    @ManyToOne
    private AppUser user;

    @ManyToOne
    private RoomEntity room;

    public BookingEntity() {
    }

    public BookingEntity(AppUser user, RoomEntity room, LocalDate checkInDate, LocalDate checkOutDate, boolean extraBed) {
        this.user = user;
        this.room = room;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.extraBed = extraBed;
        this.status = BookingStatus.ACTIVE;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public boolean isExtraBed() {
        return extraBed;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public AppUser getUser() {
        return user;
    }

    public RoomEntity getRoom() {
        return room;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public void setExtraBed(boolean extraBed) {
        this.extraBed = extraBed;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public void setRoom(RoomEntity room) {
        this.room = room;
    }
}