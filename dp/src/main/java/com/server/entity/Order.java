package com.server.entity;

public class Order {
    Integer id;
    Integer userId;
    Integer productId;
    Integer count;

    public Order(Integer id, Integer userId, Integer productId, Integer count) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.count = count;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
