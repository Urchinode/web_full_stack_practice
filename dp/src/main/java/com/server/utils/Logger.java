package com.server.utils;

import org.slf4j.LoggerFactory;

public class Logger {
    private Logger() {
    }

    public static org.slf4j.Logger getLogger(Class<?> clazz) {
        return LoggerFactory.getLogger(clazz.getName());
    }
}
