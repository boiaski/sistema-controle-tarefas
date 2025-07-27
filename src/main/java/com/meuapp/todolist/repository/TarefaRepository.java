package com.meuapp.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.meuapp.todolist.model.Tarefa;
import java.util.List;


public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    List<Tarefa> findByConcluidaFalse();

    List<Tarefa> findByConcluidaTrue();
}
