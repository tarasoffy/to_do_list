let input = document.querySelector('.input-to-do');

let btnAdd = document.querySelector('.btn-add-list');

let list = document.querySelector('.list ul');

let listToDo = [];

btnAdd.addEventListener('click', () => {
    if(input.value === ''){
        alert('Заполните текстовое поле')
    } else {
        addToList();
    }
})

function showList() {
    listToDo.map( item => {
        if(item.done === true) {
            list.insertAdjacentHTML('beforeend', 
            `<li class = "li-done">
                - ${item.text}
                <span class="span-done">V</span>
                <span class="span-delete">Х</span>
            </li>`
            )
        } else {
            list.insertAdjacentHTML('beforeend', 
            `<li>
                - ${item.text}
                <span class="span-done">V</span>
            <span class="span-delete">Х</span>
            </li>`
            )
        } 
    })
}

showList()

function styleList() {

    let li = document.querySelectorAll('li');

    let spanDone = document.querySelectorAll('.span-done');

    let spanDelete = document.querySelectorAll('.span-delete');  

    li.forEach((item) => {
        item.style.position = 'relative'
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
    })

    spanDone.forEach((item) => {
        item.style.position = 'absolute'
        item.style.right = 20 + 'px'
        item.style.color = 'green'
        item.style.cursor = 'pointer';
    })

    spanDelete.forEach((item) => {
        item.style.color = 'red'
        item.style.cursor = 'pointer';
    })
}

styleList()

function addToList() {
    let val = input.value;
    listToDo.push({text: val, done: false});
    input.value = '';
    fnCall()
}

function cleanUl() {
    let li = document.querySelectorAll('li');
    li.forEach((item) => {
        item.remove();
    })
}

function findSpanDelete() {
    let spanDelete = document.querySelectorAll('.span-delete');

    spanDelete.forEach((item) => {
        item.addEventListener('click', (e) => {
            let target = e.target.parentElement.firstChild.textContent.trim();
            let targetSplice = target.slice(2);
            deleteInListArr(targetSplice);
        })
    })
}

findSpanDelete()

function findSpanDone() {
    let spanDone = document.querySelectorAll('.span-done');

    spanDone.forEach((item) => {
        item.addEventListener('click', (e) => {
            let target = e.target.parentElement.firstChild.textContent.trim();
            let targetSplice = target.slice(2);
            for(let i = 0; i < listToDo.length; i++) {
                if(listToDo[i].text === targetSplice) {
                    listToDo[i].done = true;
                };
            }
            fnCall()
        })
    })
}

findSpanDone()

function deleteInListArr(target) {
    for(let i = 0; i < listToDo.length; i++) {
        if(listToDo[i].text === target) {
            listToDo.splice(i, 1)
        }; 
    }
    fnCall()
}

function fnCall() {
    cleanUl();
    showList();
    styleList();
    findSpanDelete();
    findSpanDone();
}

