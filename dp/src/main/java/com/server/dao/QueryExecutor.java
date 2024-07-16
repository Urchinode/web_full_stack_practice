package com.server.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.MessageFormat;

public class QueryExecutor {
    private final static Connection conn = ConnectionSingleton.getConnection();

    public void selectAll(TableEnum tableName) throws SQLException {
        String sql = MessageFormat.format("SELECT * FROM {0};", tableName.getTableName());
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        stmt.close();
    }

    public int insert(TableEnum tableName) throws SQLException {
        String fields = MessageFormat.format("({0}, {1}, {2})", "user_id", "username", "age");
        String values = MessageFormat.format("({0}, {1}, {2})", 1, "'mr.han'", 25);
        String sql = MessageFormat.format("INSERT INTO {0}{1} VALUES {2}", tableName, fields, values);
        Statement stmt = conn.createStatement();
        int result = stmt.executeUpdate(sql);
        stmt.close();
        return result;
    }
}
