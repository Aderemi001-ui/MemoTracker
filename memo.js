document.addEventListener('DOMContentLoaded', function() {
    const memoInput = document.getElementById('memo-input');
    const addBtn = document.getElementById('add-btn');
    const memoList = document.getElementById('memo-list');
    const searchInput = document.getElementById('search-input');
    
    let memos = JSON.parse(localStorage.getItem('memos')) || [];
    
    // Render all memos
    function renderMemos(memosToRender = memos) {
        memoList.innerHTML = '';
        
        memosToRender.forEach((memo, index) => {
            const li = document.createElement('li');
            li.className = 'memo-item';
            
            const memoContent = document.createElement('div');
            if (memo.isEditing) {
                // Show input field and save button when editing
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.className = 'edit-input';
                editInput.value = memo.text;
                
                const saveBtn = document.createElement('button');
                saveBtn.className = 'edit-btn';
                saveBtn.textContent = 'Save';
                saveBtn.addEventListener('click', () => saveMemo(index, editInput.value));
                
                memoContent.appendChild(editInput);
                li.appendChild(memoContent);
                li.appendChild(saveBtn);
            } else {
                // Show memo text, timestamp, edit, and delete buttons
                memoContent.innerHTML = `
                    <div>${memo.text}</div>
                    <div class="timestamp">${new Date(memo.timestamp).toLocaleString()}</div>
                `;
                
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', () => startEditing(index));
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => deleteMemo(index));
                
                li.appendChild(memoContent);
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
            }
            
            memoList.appendChild(li);
        });
    }
    
    // Add a new memo
    function addMemo() {
        const text = memoInput.value.trim();
        if (text) {
            const newMemo = {
                text,
                timestamp: Date.now(),
                isEditing: false
            };
            
            memos.unshift(newMemo); // Add to beginning of array
            localStorage.setItem('memos', JSON.stringify(memos));
            memoInput.value = '';
            renderMemos();
        }
    }
    
    // Delete a memo
    function deleteMemo(index) {
        memos.splice(index, 1);
        localStorage.setItem('memos', JSON.stringify(memos));
        renderMemos();
    }
    
    // Start editing a memo
    function startEditing(index) {
        memos[index].isEditing = true;
        localStorage.setItem('memos', JSON.stringify(memos));
        renderMemos();
    }
    
    // Save edited memo
    function saveMemo(index, newText) {
        if (newText.trim()) {
            memo[index].text = newText.trim();
            memos[index].timestamp = Date.now(); // Update timestamp
            memos[index].isEditing = false;
            localStorage.setItem('memos', JSON.stringify(memos));
            renderMemos();
        }
    }
    
    // Filter memos based on search input
    function filterMemos() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMemos = memos.filter(memo => 
            memo.text.toLowerCase().includes(searchTerm)
        );
        renderMemos(filteredMemos);
    }
    
    // Event listeners
    addBtn.addEventListener('click', addMemo);
    memoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addMemo();
        }
    });
    searchInput.addEventListener('input', filterMemos);
    
    // Initial render
    renderMemos();
});