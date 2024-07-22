package com.server.todo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/todo")
@RestController
public class TodoController {
    @GetMapping
    public String getTodo(){
        return "This is todo";
    }
}
