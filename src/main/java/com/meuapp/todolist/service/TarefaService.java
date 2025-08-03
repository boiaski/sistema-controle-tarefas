package com.meuapp.todolist.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.meuapp.todolist.model.Tarefa;
import com.meuapp.todolist.repository.TarefaRepository;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    public Tarefa adicionarTarefa(Tarefa tarefa) {
        tarefa.setDataCriacao(LocalDate.now());
        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> listarTarefasPendentes() {
        return tarefaRepository.findByConcluidaFalse();
    }

    public List<Tarefa> listarTarefasConcluidas() {
        return tarefaRepository.findByConcluidaTrue();
    }

    public Tarefa marcarComoConcluida(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow();
        tarefa.setConcluida(true);
        tarefa.setDataConclusao(LocalDate.now());
        return tarefaRepository.save(tarefa);
    }

    public void excluirTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }
}
