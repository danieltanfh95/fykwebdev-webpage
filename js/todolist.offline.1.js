// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById('myInput').value
  var li = document.createElement('li');
  li.innerHTML = inputValue
  if (inputValue === '') {
    console.error('You must write something!')
  } else {
    document.getElementById('myUL').appendChild(li)
    document.getElementById('myInput').value = ''
    li.innerHTML += '<span class="close">\u00D7</span>'
  }
} 