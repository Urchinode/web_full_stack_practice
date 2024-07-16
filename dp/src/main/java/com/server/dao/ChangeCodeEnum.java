package com.server.dao;

public enum ChangeCodeEnum {
    UPDATE("UPDATE"),
    INSERT("INSERT"),
    DELETE("DELETE");

    private final String changeCode;

    ChangeCodeEnum(String changeCode) {
        this.changeCode = changeCode;
    }

    public String getChangeCode() {
        return changeCode;
    }
}
