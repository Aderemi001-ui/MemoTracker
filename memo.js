document.addEventListener('DOMContentLoaded',function(){
    const memoInput=document.getElementById('memo-input')
    const addBtn=document.getElementById('add-btn')
    const memoList=document.getElementById('memo-list')
    const searchInput=document.getElementById('search-input')


    let memos=JSON.parse(localStorage.getItem('memos')) || []
    function renderMemos(memosToRender=memos){
        memoList.innerHTML=''

        memosToRender.forEach((memo,index) => {
            const li=document.createElement('li')
li.className='memo-item'
            const memoContent=document.createElement('div')
            memoContent.innerHTML=`<div>${memo.text}</div>
            
            <div class='timestamp'>${new
                Date(memo.timestamp).toLocaleString()}</div>`
            
            const deleteBtn=document.createElement('button')
            deleteBtn.className='delete-btn'
            deleteBtn.textContent='delete'
            deleteBtn.style.border='none'
            deleteBtn.style.borderRadius='10px'
            deleteBtn.style.width='100px'
             deleteBtn.style.height='40px'
             deleteBtn.style.backgroundColor='red'

            deleteBtn.addEventListener('click',()=>deleteMemo(index))
            li.appendChild(memoContent)
            li.appendChild(deleteBtn)
            memoList.appendChild(li)
        });
    }
    function  addMemo(){
        const text  =memoInput.value.trim()
        if(text){
            const newMemo={
                text,timestamp:Date.now()
            }
             memos.unshift(newMemo)
             localStorage.setItem('memos',JSON.stringify(memos))
             memoInput.value=''
             renderMemos()
        }
    }
    function deleteMemo(index){
memos.splice(index,1)
localStorage.setItem('memos',JSON.stringify(memos))
renderMemos()
    }
function filterMemos(){
    const searchTerm=searchInput.value.toLowerCase()
    const filteredMemos=memos.filter(memo=>memo.text.toLowerCase().includes(searchTerm))
    renderMemos(filteredMemos)

}
addBtn.addEventListener('click',addMemo)
memoInput.addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        addMemo()
    }
})
searchInput.addEventListener('input',filterMemos)
renderMemos()
})

 