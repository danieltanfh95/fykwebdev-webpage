let savedData = {}
let hostUrl = 'http://139.162.53.145:3000/todolist/'

// Click on a close button to hide the current list item
function setupOnClose() {
  var close = document.getElementsByClassName("close")
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement
      fetch(hostUrl+div.id, {
        method: 'delete'
      })
      .then(res=>{
        div.style.display = "none"
      })
    }
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  if(!savedData.studentId) {
    Swal.fire({
      type: "error",
      title: "No Student Id!"
    })
    return;
  }
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value
  li.innerHTML = inputValue
  if (inputValue === '') {
	  Swal.fire({
      type: "error",
      title: "You must write something!"
    })
  } else {
    fetch(hostUrl+savedData.studentId, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      body: JSON.stringify({
        "description":inputValue
      })
    })
    .then(res=>res.json())
    .then(res=>{
      document.getElementById("myUL").appendChild(li)
      document.getElementById("myInput").value = ""
      li.id = res.id
      li.innerHTML += '<span class="close">\u00D7</span>'
      setupOnClose()
    })
  }
} 

function populateElements() {
  if(!savedData.studentId) {
    Swal.fire({
      type: "error",
      title: "No Student Id!"
    })
    return;
  }
  fetch(hostUrl+savedData.studentId)
  .then(res=>res.json())
  .then(res=>{
    document.getElementById("myUL").innerHTML = res.map(item => 
      '<li id="'+item.id+'">'+item.description+'<span class="close">\u00D7</span></li>'
    );
    setupOnClose()
  })
}

function saveStudentId() {
	var inputValue = document.getElementById("studentIdInput").value;
  savedData.studentId = inputValue;
  document.getElementById("studentIdText").textContent+=inputValue;
  populateElements()
	Swal.fire({
		type: "success",
		title: 'Loaded your student id',
		animation: false,
		customClass: {
		  popup: 'animated tada'
		}
  })
}

setupOnClose()

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul')
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
	  ev.target.classList.toggle('checked')
  }
}, false)