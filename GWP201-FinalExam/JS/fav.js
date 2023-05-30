const FAV_URL="http://localhost:8000/favorites";
const row=document.querySelector(".cards");
let id=new URLSearchParams(window.location.search).get("id")

async function getAllData(){
    let res=await axios(`${FAV_URL}`);
    let data=await res.data;
    row.innerHTML="";
    data.forEach(element => {
        row.innerHTML+=`
        <div class="col-12 col-md-4 hover">
                <div class="card" style="width: 20rem;">
                    <img src="${element.photo}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${element.name}</h5>
                      <span>${element.year}</span><br><br>
                      <button type="button" class="btn btn-primary">Delete</button>
                    </div>
                  </div>
            </div>`
    });
}
getAllData();