function adicionaTarefaNaLista(){

    const novatarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novatarefa)
}

function criaNovoItemDaLista(textodatarefa){

    const listaTarefas = document.getElementById('lista_de_tarefa')
    let qtdtarefas = listaTarefas.children.length

    const novoitem = document.createElement('li')

    novoitem.innerText = textodatarefa
    novoitem.id = `tarefa_id_${qtdtarefas++}` 

    novoitem.appendChild(criaInputCheckBoxTarefa(novoitem.id))
    novoitem.appendChild(criaBotaoAtualizarTarefa(novoitem.id))
    listaTarefas.appendChild(novoitem)
}

function criaInputCheckBoxTarefa(idTarefa){
    
    const inputTarefa = document.createElement('input')
    inputTarefa.type = 'checkbox'
    inputTarefa.setAttribute('onclick',`mudaEstadoTarefas('${idTarefa}')`)
    return inputTarefa
}

function criaBotaoAtualizarTarefa(idTarefa) {
    const buttonUpdate = document.createElement('input')
    buttonUpdate.type = 'button'
    buttonUpdate.setAttribute('onclick', `updateTarefa('${idTarefa}')`)
    
    buttonUpdate.style.backgroundColor = 'black'
   
    return buttonUpdate;
}

function updateTarefa(idTarefa) {
    let tarefa = document.getElementById(idTarefa)
    let newText = prompt("Qual a sua tarefa?", tarefa.innerText)
    tarefa.innerText = newText;
    tarefa.appendChild(criaInputCheckBoxTarefa(idTarefa))
    tarefa.appendChild(criaBotaoAtualizarTarefa(idTarefa))

}

var isHidden = false;

function mudaEstadoTarefas(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)

    if (tarefaSelecionada.style.textDecoration === 'line-through') {
        tarefaSelecionada.style.textDecoration = 'none'
    } else {
        tarefaSelecionada.style.textDecoration = 'line-through'
        if(isHidden == true)
        tarefaSelecionada.style.display = 'none';
    }
}

function escondeTarefa() {
    console.log("isHidden:", isHidden)
    isHidden = !isHidden;

    if (isHidden === true) {
        let listaTarefas = document.getElementById('lista_de_tarefa');
        for (let index = 0; index < listaTarefas.children.length; index++) {
            let tarefa = document.getElementById(`tarefa_id_${index}`);

            if (tarefa.style.textDecoration === 'line-through')
                tarefa.style.display = 'none';
        }
    }
}







