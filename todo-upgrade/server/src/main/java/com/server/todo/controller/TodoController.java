package com.server.todo.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/todo")
@RestController
@Tag(name = "Todo", description = "투두 데이터")
public class TodoController {
    @GetMapping
    public String getTodo(){
        return "This is todo";
    }
}
