package com.lasias.hostelbookingbackend.utils.Dataseeder;

import com.lasias.hostelbookingbackend.models.AppUser;
import com.lasias.hostelbookingbackend.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Component
@Order(3)
public class UserSeeder implements CommandLineRunner {

    private final AppUserRepository appUserRepository;

    @Override
    public void run(String... args) throws Exception {
        if (appUserRepository.count() == 0) {
            appUserRepository.saveAll(usersToAdd());
            log.info("Successfully added {} Users.",usersToAdd().size());
        } else {
            log.info("Users already exists in database");
        }
    }

    private List<AppUser> usersToAdd() {
        return List.of(
                createUser("Admin User", "admin@test.com", "admin123", "ADMIN"),
                createUser("John Doe", "john@test.com", "password123", "USER"),
                createUser("Jane Smith", "jane@test.com", "password123", "USER"),
                createUser("Manager Mike", "manager@test.com", "manager123", "MANAGER")
        );
    }

    private AppUser createUser(String name, String email, String rawPassword, String role) {
        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(rawPassword);
        user.setRole(role);
        user.setAuthProvider(null); // or AuthProvider.LOCAL if you use it
        return user;
    }}
