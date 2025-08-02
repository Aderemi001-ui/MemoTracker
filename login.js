let email=document.querySelector('#email')
let password=document.querySelector('#password')
let eval=email.value
let pval=password.value
let p= document.querySelectorAll('.p')
function submit1(){
   
 if(email.value===''){
email.style.border='1px solid red'
p[0].style.color='red'
p[0].innerHTML='*This field is required'


 
 }
   }
   
   
 let evalsave= localStorage.getItem('mailsave')
   let pvalsave=localStorage.getItem('passcodesave')
   console.log(evalsave)
   console.log(pvalsave)

 email.value=evalsave
 password.value=pvalsave

 


function submit2(){
    if(password.value===''){
        password.style.border='1px solid red'
p[1].style.color='red'
p[1].innerHTML='*This field is required'
    }
}