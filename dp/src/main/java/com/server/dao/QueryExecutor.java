package com.server.dao;

import com.server.mapper.MapperInterface;
import com.server.mapper.UserMapper;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class QueryExecutor {
    private final static Connection conn = ConnectionSingleton.getConnection();

    private static String toSQLString(Object origin) {
        if (origin instanceof String) return "'" + origin + "'";
        else return String.valueOf(origin);
    }

    public <T> ArrayList<T> selectAll(TableEnum tableName, MapperInterface<T> mapper) throws SQLException {
        String sql = MessageFormat.format("SELECT * FROM {0};", tableName.getTableName());
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        ArrayList<T> entities = mapper.fromResultSet(rs);
        stmt.close();
        return entities;
    }

    public int insert(TableEnum tableName, List<String> fieldList, List<Object> valueList) throws SQLException {
        if (fieldList.size() != valueList.size()) throw new SQLException("FIELD OR VALUE FORMAT IS INCORRECT");
        String fields = fieldList
                .stream()
                .collect(Collectors.joining(", ", "(", ")"));
        String values = valueList
                .stream()
                .map(QueryExecutor::toSQLString)
                .collect(Collectors.joining(", ", "(", ")"));
        String sql = MessageFormat.format("INSERT INTO {0}{1} VALUES {2}", tableName, fields, values);
        Statement stmt = conn.createStatement();
        int result = stmt.executeUpdate(sql);
        stmt.close();
        return result;
    }
}
