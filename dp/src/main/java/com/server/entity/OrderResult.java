package com.server.entity;

public class OrderResult {
    Integer id;
    Integer orderId;
    OrderStatus status;

    public OrderResult(Integer id, Integer orderId, OrderStatus status) {
        this.id = id;
        this.orderId = orderId;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
