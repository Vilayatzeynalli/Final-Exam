const BASE="http://localhost:8000/users";
const row=document.querySelector(".all-cards");
const  inputSearch=document.querySelector("#inputSearch");
const sortBtn=document.querySelector("#sortBtn");

 function getData(array) {
    console.log("arr", array);
    row.innerHTML="";
    array.forEach(element => {
        row.innerHTML+=`
        <div class="col-12 col-md-4 mb-4 text-center">
                <div class="card" style="width: 20rem;">
                    <img src="${element.photo}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.name}</h5>
                      <span>${element.year}</span><br><br>
                      <button type="button" onclick=deleteBtn("${element.id}") class="btn btn-primary">Delete</button>
                      <a href="../assets/add.html?id=${element.id}" class="btn btn-warning">Edit</a>
                      <a href="../assets/details.html?id=${element.id}" class="btn btn-danger">Details</a>
                      <a href="#" onclick=addFav(${element.id}) class="btn btn-warning">Fav</a>
                    </div>
                  </div>
            </div>`
    });
}

axios(BASE).then((res)=>getData(res.data));

//delete
async function deleteBtn(userId){
    axios.delete(`${BASE}/${userId}`);
    getData();
};

//search
inputSearch.addEventListener("input",function(e){
    axios(BASE).then((res)=>{
        const filtered=res.data.filter((item)=>item.name.toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase()));
        getData(filtered);
    })
})

//sort
sortBtn.addEventListener("click",function(){
  
    if(this.innerHTML=="Ascending"){
        axios(BASE).then((res)=>{
            let sorted=res.data.sort((a,b)=>a.year-b.year)
            getData(sorted)
        })
        this.innerHTML="Descending";
    }else if(this.innerHTML=="Descending"){
        axios(BASE).then((res)=>{
            let sorted=res.data.sort((a,b)=>b.year-a.year)
             getData(sorted)
        })
        this.innerHTML="Default";
    }else{
        axios(BASE).then((res)=>{
          let sorted=res.data
          getData(sorted)
        })
        this.innerHTML="Ascending"   
    } 
})

///Favorites
const FAV_URL = "http://localhost:8000/favorites";

async function addFav(id) {
  let res = await axios(`${BASE}/${id}`);
  let obj = await res.data;
  console.log('faav',obj);
  axios.post(`${FAV_URL}`, obj);
  window.location = "favorite.html";
};

