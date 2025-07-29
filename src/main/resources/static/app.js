const tarefaForm = document.getElementById('tarefaForm');
const nomeTarefaInput = document.getElementById('nomeTarefa');
const tarefasPendentesUl = document.getElementById('tarefasPendentes');
const tarefasConcluidasUl = document.getElementById('tarefasConcluidas');

tarefaForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeTarefa = nomeTarefaInput.value.trim();
    if (nomeTarefa) {
        adicionarTarefa(nomeTarefa);
        nomeTarefaInput.value = '';
    }
});

function adicionarTarefa(nomeTarefa) {
    const tarefa = {
        nome: nomeTarefa,
        concluida: false
    };

    fetch('/api/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
    .then(response => response.json())
    .then(tarefa => {
        listarTarefasPendentes();
    });
}

function listarTarefasPendentes() {
    fetch('/api/tarefas/pendentes')
    .then(response => response.json())
    .then(tarefas => {
        tarefasPendentesUl.innerHTML = '';
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.textContent = tarefa.nome;
            li.addEventListener('click', () => concluirTarefa(tarefa.id));
            tarefasPendentesUl.appendChild(li);
        });
    });
}

function concluirTarefa(id) {
    fetch(`/api/tarefas/${id}/concluir`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(tarefa => {
        listarTarefasPendentes();
        listarTarefasConcluidas();
    });
}

function listarTarefasConcluidas() {
    fetch('/api/tarefas/concluidas')
    .then(response => response.json())
    .then(tarefas => {
        tarefasConcluidasUl.innerHTML = '';
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.textContent = tarefa.nome;
            li.classList.add('completed');
            tarefasConcluidasUl.appendChild(li);
        });
    });
}

listarTarefasPendentes();
listarTarefasConcluidas();
