const form=document.querySelector("form");
const inputFile=document.querySelector("#inputFile");
const inputName=document.querySelector("#inputName");
const inputYear=document.querySelector("#inputYear");
const addBtn=document.querySelector("#addBtn");

let id=new URLSearchParams(window.location.search).get("id");
let BASE="http://localhost:8000/users";


if (id){
    addBtn.innerHTML="EDIT";

    axios(`${BASE}/${id}`).then((res)=>{
        inputName.value=res.data.name;
        inputYear.value=res.data.year;
    })
}


form.addEventListener("submit",function(e){
    e.preventDefault();
    let card={
        id:Date.now(),
        photo:`../Image/${inputFile.value.split("\\")[2]}`,
        name:inputName.value,
        year:inputYear.value,
    }
    if(!id){
        fetch(`http://localhost:8000/users`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(card),
    }).then(()=>{
        window.location.href="./index.html"
    })
    }else{
        fetch(`http://localhost:8000/users/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(card),
    }).then(()=>{
        window.location.href="./index.html"
    }) 
    }
});

