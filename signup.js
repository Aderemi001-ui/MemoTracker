let first=document.querySelector('#first')
let last=document.querySelector('#last')
let email=document.querySelector('#email')
let password=document.querySelector('#password')
let p = document.querySelectorAll('.p')


function submit1(){
    if(first.value===''){
first.style.border='1px solid red'
p[0].style.color='red'
p[0].innerHTML='*This field is required'
    }
}
function submit2(){
    if(last.value===''){
last.style.border='1px solid red'
p[1].style.color='red'
p[1].innerHTML='*This field is required'
    }
}
function submit3(){
    if(email.value===''){
email.style.border='1px solid red'
p[2].style.color='red'
p[2].innerHTML='*This field is required'
    }
}
function submit4(){
    if(password.value===''){
password.style.border='1px solid red'
p[3].style.color='red'
p[3].innerHTML='*This field is required'
    }
}
function savedetails(){
    let eval=email.value
    let pval=password.value
 localStorage.setItem('mailsave',eval)
localStorage.setItem('passcodesave',pval)
   let evalsave= localStorage.getItem('mailsave')
   let pvalsave=localStorage.getItem('passcodesave')
   console.log(evalsave)
   console.log(pvalsave)
}