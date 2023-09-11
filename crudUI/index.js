const table =  document.getElementById('table')
// const baseUrl = "http://localhost:3200"
const baseUrl = "https://dummyjson.com/"

async function getData(){
    await axios.get(`${baseUrl}/products`).then((result)=>{
        let resultData = result.data.data
        // console.log(resultData)
        for (let i=0; i < resultData.length; i++){
            console.log(resultData[i])
            const tr= document.createElement("tr")
            const prd = resultData[i]
            tr.innerHTML=`
            <td>${prd._id}</td>
            <td>${prd.name}</td>
            <td>${prd.price}</td>
            <td>${prd.description}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editPrd('${prd._id}')" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="delPrd(this)">Delete</button></td>
            `
            table.appendChild(tr)
        }
        
    }).catch((error)=>{
        console.error(error)
    })
}

getData()

function delPrd(id){
  try {
    const prodId = id.parentNode?.parentElement?.children[0].textContent 

    axios.delete(`${baseUrl}/product/${prodId}`)
    .then((res)=>{
        console.log(res)

    }).catch((err)=>{
        console.log(err)
    })

    console.log(prodId)
  } catch (error){
console.error(error)
  } 

}

function editPrd(id){
  // console.log(id)
  try{
    axios.put(`${baseUrl}/product/${id}`)
    .then((result)=>{
      res.send(console.log(result))
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}