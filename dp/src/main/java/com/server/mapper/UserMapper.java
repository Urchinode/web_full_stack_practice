package com.server.mapper;

import com.server.entity.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserMapper implements MapperInterface{
    public ArrayList<User> fromResultSet(ResultSet rs) throws SQLException {
        ArrayList<User> users = new ArrayList<>();
        if (rs == null) return users;
        while(rs.next()){
            Integer id = rs.getInt(1);
            String username = rs.getString(2);
            Integer age = rs.getInt(3);
            users.add(new User(id, username, age));
        }
        return users;
    }
}
