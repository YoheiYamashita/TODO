const form = document.getElementById("form");
const input= document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));//ローカルストレージのtodosデータ（JSONファイル）をtodosとして呼び出す。

if(todos){//todosはtodoリスト全体
    todos.forEach(todo=>//todosの個々のデータをtodoとして、すべてのtodoにadd関数を行う。
        add(todo))
};

form.addEventListener("submit",function(event){//submitつまりEnterが押された時、下を実行
    event.preventDefault();//エンターで画面がリロードされる（デフォルト）を防ぐ
    add();//input.valueをliとしてul内に追加
})

function add(todo){//

    let todoText=input.value;

    if(todo){

        todoText=todo.text;
    }
    if(todoText){
        const litodo = document.createElement("li");//li要素を追加して、litodoという変数に
        litodo.className="litodo";//変数のlitodoをclass名にする
        litodo.innerText= todoText;//
        litodo.classList.add("list-group-item");//litodoをlist-group-itemというクラスに追加する

        if(todo&&todo.completed){//todoがcompleteだった場合
            litodo.classList.add("text-decoration-line-through");//線を追加して完了状態にする
        };

        litodo.addEventListener("contextmenu",function(event){//右クリックを押した時
            event.preventDefault();
            litodo.remove();//litodoを削除
            saveData();
        });

        litodo.addEventListener("click",function(){//左クリックを押したとき
            litodo.classList.toggle("text-decoration-line-through");//線を引く.ただしtoggleによって、線が引かれてる時に押すと線が消えるようになる
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

        let todo={//ここでtodoを宣言
            text:list.innerText,
            completed:list.classList.contains("text-decoration-line-through")
        };
        todos.push(todo);//todos配列内にlistのテキスト情報をいれる
    });
    localStorage.setItem("todos",JSON.stringify(todos));//todosとしてローカルストレージに保存.todosはJSONファイルとする.
}

