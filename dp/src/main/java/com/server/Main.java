package com.server;

import com.server.dao.ConnectionSingleton;
import com.server.dao.QueryExecutor;
import com.server.dao.TableEnum;
import com.server.entity.User;
import com.server.utils.Logger;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Connection conn = ConnectionSingleton.getConnection();
        org.slf4j.Logger logger = Logger.getLogger(Main.class);
        QueryExecutor qe = new QueryExecutor();
        try {
            qe.insert(TableEnum.USER, User.getFields(), new User(4, "name", 30).getValues());
            logger.info("INSERT COMPLETED");
        } catch (SQLException e) {
            logger.error("SQL EXECUTION FAILED");
            logger.error(e.getMessage());
        }
        ConnectionSingleton.destroy();
    }
}