package com.server;

import com.server.db.ConnectionSingleton;

import java.sql.Connection;

public class Main {
    public static void main(String[] args) {
        Connection conn = ConnectionSingleton.getConnection();
    }
}