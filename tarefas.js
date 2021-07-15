/* -- EXERCICIO 0 -- */
const tarefas = [
  {
    nome: 'Comprar leite',
    categoria: 'compras',
    realizada: false
  }, {
    nome: 'Escutar chimbinha',
    categoria: 'lazer',
    realizada: true
  }
]

/* -- Add mais tarefas. -- */
tarefas.push({ nome: 'Fazer jiu-jitsu', categoria: 'lazer', realizada: true })
tarefas.push({ nome: 'Estudar ingles', categoria: 'estudos', realizada: true })
tarefas.push({ nome: 'Fazer o TP de Web', categoria: 'estudos', realizada: false })
tarefas.push({ nome: 'Comprar marshmallow', categoria: 'compras', realizada: false })

/* -- EXERCICIO 1 -- */
const insereTarefaNaPagina = tarefa => {
    /* -- Pega o ul para listar as tarefas. -- */
    const listaTarefasEl = document.querySelector('#lista-tarefas')

    let marcado = ''

    /* -- Verificação da tarefa. -- */
    if (tarefa.realizada === true) {
        marcado = 'marcado'
    } 

    /* -- Geração do li. -- */
    let template = `<li class='item-tarefa ${marcado} categoria-${tarefa.categoria}'>${tarefa.nome}</li>`

    /* -- EXERCICIO 5 -- */
    const userEventsEl = document.createRange().createContextualFragment(template)
    
    userEventsEl.querySelector('li').addEventListener('click', e => {
        e.target.realizada = !e.target.realizada
        e.target.classList.toggle('marcado')
    })

    listaTarefasEl.appendChild(userEventsEl)

    //ANTES DO EXERCICIO 1 - listaTarefasEl.innerHTML += template 
}

tarefas.forEach(insereTarefaNaPagina)

/* -- EXERCICIO 2 -- */

document.querySelector('#incluir-nova-tarefa').addEventListener('click', e => {
    let novaTarefa = { realizada: false }
    const tarefaNomeEl = document.querySelector('#nova-tarefa-nome')
    const tarefaCategoriaEl = document.querySelector('#nova-tarefa-categoria')

    novaTarefa.nome = tarefaNomeEl.value
    novaTarefa.categoria = tarefaCategoriaEl.value

    insereTarefaNaPagina(novaTarefa)
        
    /* -- Limpa os campos. -- */
    tarefaNomeEl.value = ''
    tarefaCategoriaEl.value = ''

    /* -- Devolve o foco. --*/
    tarefaNomeEl.focus()
})
  
/* -- EXERCICIO 3 -- */

document.querySelector('#filtro-de-categoria').addEventListener('change', e => {
    
    document.querySelectorAll('.item-tarefa').forEach( item => {
        if (e.currentTarget.value !== '') {
            if (item.classList.contains(`categoria-${e.currentTarget.value}`) === false) {
                item.classList.add('retido-no-filtro')

            } else {
                item.classList.remove('retido-no-filtro')
            }

        } else {
            item.classList.remove('retido-no-filtro')
        }
    })
})

/* -- EXERCICIO 4 -- */

document.querySelector('#nova-tarefa-nome').addEventListener('keyup', e => {
    let novaTarefa = { executed: false }

    if (e.key == 'Enter' && e.target.value != '') {
        const categoriaEl = document.querySelector('#nova-tarefa-categoria')
    
        novaTarefa.nome = e.target.value
        novaTarefa.categoria = categoriaEl.value
    
        insereTarefaNaPagina(novaTarefa)
    
        /* -- Limpa os campos. -- */
        e.target.value = ''
        categoriaEl.value = 'lazer'

        /* -- Devolve o foco. --*/
        e.target.focus()
    }
})