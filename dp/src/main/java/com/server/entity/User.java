package com.server.entity;

import java.util.List;

public class User {
    Integer userId;
    String username;
    Integer age;

    static public List<String> getFields() {
        return List.of("user_id", "username", "age");
    }

    public List<Object> getValues(){
        return List.of(this.userId, this.username, this.age);
    }

    public User(Integer userId, String username, Integer age) {
        this.userId = userId;
        this.username = username;
        this.age = age;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
