const form = document.getElementById("form");
const input= document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo=>
        add(todo))
};

form.addEventListener("submit",function(event){
    event.preventDefault();//エンターで画面がリロードされる（デフォルト）を防ぐ
    console.log(input.value);
    add();//input.valueをliとしてul内に追加
})

function add(todo){

    let todoText=input.value;

    if(todo){

        todoText=todo.text;
    }
    if(todoText){
        const litodo = document.createElement("li");//
        litodo.className="litodo";
        litodo.innerText= todoText;
        litodo.classList.add("list-group-item");

        if(todo&&todo.completed){
            litodo.classList.add("text-decoration-line-through");
        };

        litodo.addEventListener("contextmenu",function(event){
            event.preventDefault();
            litodo.remove();
            saveData();
        });

        litodo.addEventListener("click",function(){
            litodo.classList.toggle("text-decoration-line-through");
            saveData();
        })


        ul.appendChild(litodo);//ulの子要素としてliを追加
        input.value="";
        saveData();//liの全てをローカルストレージに保存

    }
}

function saveData(){
    const lists = document.querySelectorAll(".litodo");//liの全てをlistsにする
    let todos=[];

    
    lists.forEach(list=>{//listsの個々の要素情報をlistとする

        let todo={
            text:list.innerText,
            completed:list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);//todos配列内にlistのテキスト情報をいれる
    });
    localStorage.setItem("todos",JSON.stringify(todos));//todosとしてローカルストレージに保存
}

