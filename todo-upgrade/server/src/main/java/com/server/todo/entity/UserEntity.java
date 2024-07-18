package com.server.todo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
    private String nickname;
    private String email;
    private String gender;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String userKey;
}
