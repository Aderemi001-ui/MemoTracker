document.addEventListener('DOMContentLoaded', function() {
    const memoInput = document.getElementById('memo-input');
    const addBtn = document.getElementById('add-btn');
    const memoList = document.getElementById('memo-list');
    const searchInput = document.getElementById('search-input');

    let memos = [];
    try {
        memos = JSON.parse(localStorage.getItem('memos')) || [];
    } catch (e) {
        memos = [];
        localStorage.setItem('memos', JSON.stringify(memos));
    }

    // Render all memos
    function renderMemos(memosToRender = memos) {
        memoList.innerHTML = '';
        memosToRender.forEach((memo, index) => {
            const li = document.createElement('li');
            li.className = 'memo-item';
            li.style.width = '280px';
            li.style.borderRadius = '10px';

            const memoContent = document.createElement('div');
            if (memo.isEditing) {
                // Edit mode
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.className = 'edit-input';
                editInput.value = memo.text;
                editInput.style.width = '160px';
                editInput.style.height = '40px';

                const saveBtn = document.createElement('button');
                saveBtn.className = 'edit-btn';
                saveBtn.textContent = 'Save';
                saveBtn.style.border = 'none';
                saveBtn.style.width = '70px';
                saveBtn.style.height = '40px';
                saveBtn.style.backgroundColor = 'green';
                saveBtn.style.borderRadius = '10px';
                saveBtn.addEventListener('click', () => saveMemo(index, editInput.value));

                memoContent.appendChild(editInput);
                li.appendChild(memoContent);
                li.appendChild(saveBtn);
            } else {
                // Normal mode
                memoContent.innerHTML = `
                    <div>${memo.text}</div>
                    <div class="timestamp">${new Date(memo.timestamp).toLocaleString()}</div>
                `;

                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.textContent = 'Edit';
                editBtn.style.width = '70px';
                editBtn.style.height = '40px';
                editBtn.style.backgroundColor = 'white';
                editBtn.style.border = 'none';
                editBtn.style.borderRadius = '10px';
                editBtn.addEventListener('click', () => startEditing(index));

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Delete';
                deleteBtn.style.width = '70px';
                deleteBtn.style.height = '40px';
                deleteBtn.style.backgroundColor = 'red';
                deleteBtn.style.border = 'none';
                deleteBtn.style.borderRadius = '10px';
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
        if (!text) {
            alert('Memo cannot be empty!');
            return;
        }
        const newMemo = {
            text,
            timestamp: Date.now(),
            isEditing: false
        };
        memos.unshift(newMemo);
        localStorage.setItem('memos', JSON.stringify(memos));
        memoInput.value = '';
        renderMemos();
    }

    // Delete a memo
    function deleteMemo(index) {
        memos.splice(index, 1);
        localStorage.setItem('memos', JSON.stringify(memos));
        renderMemos();
    }

    // Start editing a memo
    function startEditing(index) {
        // Only one memo can be in editing mode
        memos = memos.map((memo, i) => ({
            ...memo,
            isEditing: i === index
        }));
        localStorage.setItem('memos', JSON.stringify(memos));
        renderMemos();
    }

    // Save edited memo
    function saveMemo(index, newText) {
        if (!newText.trim()) {
            alert('Memo cannot be empty!');
            return;
        }
        memos[index].text = newText.trim();
        memos[index].timestamp = Date.now();
        memos[index].isEditing = false;
        localStorage.setItem('memos', JSON.stringify(memos));
        renderMemos();
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