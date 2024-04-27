document.addEventListener("DOMContentLoaded", function (event) {
link = document.createElement('a')
link.setAttribute('href', '/students/create')
link.textContent = 'Create Students'
listStudents = document.querySelector('ul')
listStudents.append(link)
button = document.querySelector('#test')
button.addEventListener('click', (e)=>{
alert("Iki coucou! CLICKED!")
});
});
