package com.server.entity;

public enum OrderStatus {
    COMPLETED("COMPLETED"),
    CANCELLED("CANCELLED");

    private final String status;

    OrderStatus(String status) {
        this.status = status;
    }

    public String getStatus(){
        return this.status;
    }
}
