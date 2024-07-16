package com.server.dao;

public enum TableEnum {
    USER("user"),
    ORDER("order"),
    PRODUCT("product"),
    ORDER_RESULT("order_result");

    private final String tableName;

    TableEnum(String tableName){
        this.tableName = tableName;
    }

    public String getTableName() {
        return tableName;
    }
}
