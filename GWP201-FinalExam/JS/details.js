let id=new URLSearchParams(window.location.search).get("id");
const BASE="http://localhost:8000/users";
const row=document.querySelector(".all-cards");

async function allData(){
    let res= await axios(`${BASE}/${id}`);
    let element=await res.data;
        row.innerHTML+=`
        <div class="col-12 col-md-6">
        <div class="card" style="width: 20rem;">
            <img src="${element.photo}" class="card-img-top" alt="...">
          </div>
    </div>
    <div class="col-12 col-md-6">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <span>${element.year}</span>
          </div>
    </div>
`
    };
    allData();

    const back=document.querySelector("#back");

    back.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href="./index.html"
    })


    
  
