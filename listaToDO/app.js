function adicionaTarefaNaLista(){

    const novatarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novatarefa)
   
    salvarDadosLocalStorage()
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
   
    return buttonUpdate
}

function updateTarefa(idTarefa) {
    let tarefa = document.getElementById(idTarefa)
    let newText = prompt("Qual a sua tarefa?", tarefa.innerText)
    tarefa.innerText = newText;
    tarefa.appendChild(criaInputCheckBoxTarefa(idTarefa))
    tarefa.appendChild(criaBotaoAtualizarTarefa(idTarefa))

    salvarDadosLocalStorage()

}

var isHidden = false;

function mudaEstadoTarefas(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)

    if (tarefaSelecionada.style.textDecoration === 'line-through') {
        tarefaSelecionada.style.textDecoration = 'none'
    } else {
        tarefaSelecionada.style.textDecoration = 'line-through'
        if(isHidden == true)
        tarefaSelecionada.style.display = 'none'
    }
    salvarDadosLocalStorage()
}

function escondeTarefa() {
    console.log("isHidden:", isHidden)
    isHidden = !isHidden

    if (isHidden === true) {
        let listaTarefas = document.getElementById('lista_de_tarefa')
        for (let index = 0; index < listaTarefas.children.length; index++) {
            let tarefa = document.getElementById(`tarefa_id_${index}`)

            if (tarefa.style.textDecoration === 'line-through')
                tarefa.style.display = 'none'
        }
    salvarDadosLocalStorage()
    }
}

function salvarDadosLocalStorage() {   //salvar dados no local storage do nagevador
    const listaTarefas = document.getElementById('lista_de_tarefa')
    let dadosTarefas = []
    for (let index = 0; index < listaTarefas.children.length; index++) {  
    let tarefa = document.getElementById(`tarefa_id_${index}`)
    let dadosTarefa = {  //extraçao de dados da tarefa
        id: tarefa.id,
        texto: tarefa.innerText,
        concluida: tarefa.style.textDecoration === 'line-through' ? true : false
 }
    dadosTarefas.push(dadosTarefa)
 }
    const dadosJSON = JSON.stringify(dadosTarefas)
    localStorage.setItem('listaDeTarefas', dadosJSON)
 }

function carregarDadosLocalStorage() {
    if (localStorage.getItem('listaDeTarefas')) {
    const dadosJSON = localStorage.getItem('listaDeTarefas')     //verifica se ha dados salvos no local storage
    const dadosTarefas = JSON.parse(dadosJSON)   //os dados sao recuperados e transformados em array
    dadosTarefas.forEach((dadosTarefa) => {     //para cada taerfa e criado um elemento li
         const novoItem = document.createElement('li')
         novoItem.id = dadosTarefa.id
         novoItem.innerText = dadosTarefa.texto
     if (dadosTarefa.concluida) {
         novoItem.style.textDecoration = 'line-through'
}
    novoItem.appendChild(criaInputCheckBoxTarefa(dadosTarefa.id))
    novoItem.appendChild(criaBotaoAtualizarTarefa(dadosTarefa.id))
    document.getElementById('lista_de_tarefa').appendChild(novoItem)
})
}
}

carregarDadosLocalStorage()  //carregar os dados do local storage assim que a pagina e carregada

