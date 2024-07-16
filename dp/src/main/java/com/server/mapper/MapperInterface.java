package com.server.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public interface MapperInterface<T> {
    ArrayList<T> fromResultSet(ResultSet rs) throws SQLException;
}
