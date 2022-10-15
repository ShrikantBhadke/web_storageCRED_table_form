const submitForm = document.getElementById("submitForm");
const fnameControle = document.getElementById("fname");
const lnameControle = document.getElementById("lname");
const emailControle = document.getElementById("email");
const contactControle = document.getElementById("contact");
const tableContent = document.getElementById("tableContent");
const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")
let stdArray = [];


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const ondataEdit = (ele)=>{
console.log(ele.getAttribute('data-id'))
let getid = ele.getAttribute('data-id')
localStorage.setItem("getid",getid);
stdArray = JSON.parse(localStorage.getItem("stdArray"))
console.log(stdArray)
updateBtn.classList.remove("d-none");
submitBtn.classList.add("d-none")
let requobj = stdArray.find((obj)=>obj.id === getid)
fnameControle.value = requobj.fname;
lnameControle.value = requobj.lname;
emailControle.value = requobj.email;
contactControle.value = requobj.contact;
}

const onupdate = (event) =>{
let getid = localStorage.getItem("getid");
stdArray.forEach((ele)=>{
  if(ele.id === getid){
    ele.fname = fnameControle.value;
    ele.lname = lnameControle.value;
    ele.email = emailControle.value;
    ele.contact = contactControle.value;
  }
})
    localStorage.setItem("stdArray",JSON.stringify(stdArray))
    tamplating(stdArray)
    submitForm.reset()
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none")
}

const ondataDelete = (ele) =>{
  let getDeleteid = ele.getAttribute('data-id')
  console.log(getDeleteid)
  stdArray = stdArray.filter(ele=>{
    return ele.id != getDeleteid;
  })
  localStorage.setItem("stdArray",JSON.stringify(stdArray))
  tamplating(stdArray)
}

const createTr = (obj)=>{
  let row = document.createElement("tr");
  row.innerHTML = `
                <td>${stdArray.length}</td>
                <td>${obj.fname}</td>
                <td>${obj.lname}</td>
                <td>${obj.email}</td>
                <td>${obj.contact}</td>
                <td><button class="btn btn-primary" data-id="${obj.id}" onclick="ondataEdit(this)">Edit</button></td>
                <td><button class="btn btn-danger" data-id="${obj.id}" onclick="ondataDelete(this)">Delete</button></td>
  `;
  tableContent.append(row);
}

const onSubmitForm = (event) => {
  event.preventDefault();
  let obj = {
    fname: fnameControle.value,
    lname: lnameControle.value,
    email: emailControle.value,
    contact: contactControle.value,
    id: uuidv4()
  };
  stdArray.push(obj);
  localStorage.setItem("stdArray", JSON.stringify(stdArray));
  createTr(obj);
  event.target.reset();
};

function tamplating(newarray) {
  let result = "";
  newarray.forEach((ele, i) => {
    result += `
            <tr>
                <td>${i + 1}</td>
                <td>${ele.fname}</td>
                <td>${ele.lname}</td>
                <td>${ele.email}</td>
                <td>${ele.contact}</td>
                <td><button class="btn btn-primary" data-id="${ele.id}" onclick ="ondataEdit(this)">Edit</button></td>
                <td><button class="btn btn-danger" data-id="${ele.id}" onclick="ondataDelete(this)">Delete</button></td>
            </tr>
    `;
  });
  tableContent.innerHTML = result;
}

if (localStorage.getItem("stdArray")) {
  let stdArray = JSON.parse(localStorage.getItem("stdArray"))
  tamplating(stdArray);
}

submitForm.addEventListener("submit", onSubmitForm);
updateBtn.addEventListener("click",onupdate)


































