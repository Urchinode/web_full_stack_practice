package com.server.todo.security;

public enum TokenKey {
    ACCESS_TOKEN("accessToken"),
    REFRESH_TOKEN("refreshToken");

    private final String key;

    TokenKey(String key) {
        this.key = key;
    }

    public String getName(){
        return key;
    }
}
