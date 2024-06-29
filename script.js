document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const rawTextArea = document.getElementById('rawTextArea');
            const editTextArea = document.getElementById('editTextArea');
            rawTextArea.value = content;
            editTextArea.value = content;
            document.getElementById('fileContent').classList.remove('hidden');
        };
        
        if (file.type === "application/json" || file.type === "text/plain") {
            reader.readAsText(file);
        } else {
            alert("Unsupported file type!");
        }
    } else {
        alert("No file selected!");
    }
});

document.getElementById('saveButton').addEventListener('click', function() {
    const editTextAreaContent = document.getElementById('editTextArea').value;
    const blob = new Blob([editTextAreaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited_file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById('createButton').addEventListener('click', function() {
    const fileType = document.getElementById('fileType').value;
    const createTextAreaContent = document.getElementById('createTextArea').value;
    let blob;
    if (fileType === 'json') {
        try {
            const jsonObj = JSON.parse(createTextAreaContent);
            blob = new Blob([JSON.stringify(jsonObj, null, 2)], { type: 'application/json' });
        } catch (e) {
            alert("Invalid JSON content!");
            return;
        }
    } else {
        blob = new Blob([createTextAreaContent], { type: 'text/plain' });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileType === 'json' ? 'new_file.json' : 'new_file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
