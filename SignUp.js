let signupname = document.getElementById('exampleInputname')
let signuplastname = document.getElementById('exampleInputlastname')
let signupAge = document.getElementById('exampleInputage')
let signupEmail = document.getElementById('exampleInputEmail')
let signupPin = document.getElementById('exampleInputpin')
let signupBtn = document.getElementById('signup')
let btnCreateNewAccount = document.getElementById('create-new-account')


signupBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    window.location = "SignUp.html"
    
})