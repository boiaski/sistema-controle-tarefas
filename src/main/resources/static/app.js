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
    .then(() => {
        listarTarefasPendentes();
        listarTarefasConcluidas();
    });
}

function listarTarefasPendentes() {
    fetch('/api/tarefas/pendentes')
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar tarefas pendentes');
        return response.json();
    })
    .then(tarefas => {
        tarefasPendentesUl.innerHTML = '';
        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            li.textContent = tarefa.nome;
            li.addEventListener('click', () => concluirTarefa(tarefa.id));
            // Botão de excluir
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.style.marginLeft = '10px';
            btnExcluir.onclick = (e) => {
                e.stopPropagation();
                excluirTarefa(tarefa.id);
            };
            li.appendChild(btnExcluir);
            tarefasPendentesUl.appendChild(li);
        });
    })
    .catch(error => {
        console.error(error);
        tarefasPendentesUl.innerHTML = '<li>Erro ao carregar tarefas pendentes</li>';
    });
}

function concluirTarefa(id) {
    fetch(`/api/tarefas/${id}/concluir`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(() => {
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

function excluirTarefa(id) {
    fetch(`/api/tarefas/${id}`, { method: 'DELETE' })
        .then(() => {
            listarTarefasPendentes();
            listarTarefasConcluidas();
        });
}

// Inicializa listas ao carregar a página
listarTarefasPendentes();
listarTarefasConcluidas();
