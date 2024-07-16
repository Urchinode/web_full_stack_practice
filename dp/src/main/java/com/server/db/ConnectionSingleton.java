package com.server.db;

import com.server.utils.Logger;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionSingleton {
    private ConnectionSingleton() {
    }

    private static Connection conn;
    private static final org.slf4j.Logger logger = Logger.getLogger(ConnectionSingleton.class);

    public static Connection getConnection() {
        if (conn != null) return conn;

        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306", "root", "123456");
            logger.info("DB CONNECTION COMPLETED");
        } catch (SQLException e) {
            logger.error("DB CONNECTION FAIL");
        }
        return conn;
    }
}
