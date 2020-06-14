class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// Getting IDs of the element
const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const tbody = document.getElementById('tbody');
const myForm = document.getElementById('myForm');
const fieldSet = document.getElementsByTagName('fieldSet')[0];
let arrObj = [];


////////////////Adding, Getting and Displaying from Local Storage///////////

//Creating a instance of Book
myForm.addEventListener('submit', (e)=>{
e.preventDefault();

//Validating Before Submission
function validate(){
if ((title.value && author.value && isbn.value) === ''){
  let el = document.createElement('p');
  el.textContent = "Please Fill in all the fieldset.";
  el.classList.add('field-class');
  fieldSet.insertBefore(el, fieldSet.childNodes[1]);
  setTimeout(function(){
    el.remove();
  }, 2000);
  exit(1);
}
let valBooks = JSON.parse(localStorage.getItem("myBookApp"));
valBooks.forEach((item)=>{
  if (isbn.value === item.isbn){
    let el = document.createElement('p');
    el.textContent = "The ISBN already exists.";
    el.classList.add('field-class');
    fieldSet.insertBefore(el, fieldSet.childNodes[1]);
    setTimeout(function(){
      el.remove();
    }, 2000);
    exit(1);
  }
});
}
validate();

var book = new Book(title.value, author.value, isbn.value);
arrObj.push(book);
console.log(arrObj);

//Creating <tr> element and adding data with <td> and appending to <tbody>
let newElement = document.createElement('tr');
newElement.innerHTML =
  `<td>${title.value}</td>
  <td>${author.value}</td>
  <td>${isbn.value}</td>
  <td><button class="close">x</button></td></tr>`;
tbody.appendChild(newElement);

//Getting and Adding data to Local Storage using getItem and setItem
let oldBooks;
if (localStorage.getItem("myBookApp")=== null){
  localStorage.setItem("myBookApp", JSON.stringify(arrObj));
}else{
  oldBooks = JSON.parse(localStorage.getItem("myBookApp"));
  oldBooks.push(book);
  localStorage.setItem("myBookApp", JSON.stringify(oldBooks));
}
});

//Displaying The Books even after User reloads the page
document.addEventListener('DOMContentLoaded', (e)=>{
  let oldBooks;
  if (localStorage.getItem("myBookApp")=== null){
    oldBooks = [];
  }else{
    oldBooks = JSON.parse(localStorage.getItem("myBookApp"));
    oldBooks.forEach((item)=>{
    let newElement = document.createElement('tr');
    newElement.innerHTML =
      `<td>${item.title}</td>
      <td>${item.author}</td>
      <td>${item.isbn}</td>
      <td><button class="close">x</button></td></tr>`;
    tbody.appendChild(newElement);
  });
  }
});



///////////////////////Removing When User Clicks//////////////////
var closeClass = document.getElementsByClassName('close');
tbody.addEventListener('click', (e)=>{

  if (e.target.classList.contains('close')){
    let parEl = e.target.parentElement.parentElement;
    tbody.removeChild(parEl);

    //Displaying Green Messsage After Deletion
    let el = document.createElement('p');
    el.textContent = "Item Successfully Deleted.";
    el.classList.add('field-class-green');
    fieldSet.insertBefore(el, fieldSet.childNodes[1]);
    setTimeout(function(){
      el.remove();
    }, 2000);

      //Removing from local localStorage
    let elTarVal = e.target.parentElement.previousElementSibling.textContent;
    let oldBooks;
    oldBooks = JSON.parse(localStorage.getItem("myBookApp"));
    oldBooks.forEach((item, index)=>{
      if (elTarVal === item.isbn){
        oldBooks.splice(index, 1);
      }
    });
    localStorage.setItem("myBookApp", JSON.stringify(oldBooks));
}
});
