document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    if (plaintext) {
        const ciphertext = btoa(plaintext); 
        document.getElementById('ciphertext').value = ciphertext;
    } else {
        alert('Nhập bản rõ để mã hóa.');
    }
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    if (ciphertext) {
        const decryptedText = atob(ciphertext); 
        document.getElementById('decryptedText').value = decryptedText;
    } else {
        alert('Nhập bản mã để giải mã.');
    }
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const saveClearText = document.getElementById('saveClearText').checked;
    const plaintext = document.getElementById('decryptedText').value;

    if (saveClearText && plaintext) {
        const blob = new Blob([plaintext], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'plaintext.txt';
        link.click();
    } else {
        alert('Chọn lưu và kiểm tra bản rõ.');
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptedText').value = '';
    document.getElementById('saveClearText').checked = false;
});
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    if (plaintext) {
        const ciphertext = btoa(plaintext); 
        document.getElementById('ciphertext').value = ciphertext;
    } else {
        alert('Nhập bản rõ để mã hóa.');
    }
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    if (ciphertext) {
        try {
            const decryptedText = atob(ciphertext); 
            document.getElementById('decryptedText').value = decryptedText;
        } catch (e) {
            alert('Bản mã không hợp lệ!');
        }
    } else {
        alert('Nhập bản mã để giải mã.');
    }
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const saveClearText = document.getElementById('saveClearText').checked;
    const plaintext = document.getElementById('decryptedText').value;

    if (saveClearText && plaintext) {
        const blob = new Blob([plaintext], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'plaintext.txt';
        link.click();
    } else {
        alert('Chọn lưu và kiểm tra bản rõ.');
    }
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptedText').value = '';
    document.getElementById('saveClearText').checked = false;
});