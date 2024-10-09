function generateKey(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return key;
}

function substitutionEncrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*';
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = alphabet.indexOf(char);
        if (index !== -1) {
            const newChar = key[index % key.length];
            encryptedText += newChar;
        } else {
            encryptedText += char;  
        }
    }
    return encryptedText;
}

function substitutionDecrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%&*@';
    let decryptedText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = key.indexOf(char);
        if (index !== -1) {
            const originalChar = alphabet[index % alphabet.length];
            decryptedText += originalChar;
        } else {
            decryptedText += char; 
        }
    }
    return decryptedText;
}

document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const key = generateKey();
    document.getElementById('encryptionKey').value = key;
});

document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    let key = document.getElementById('encryptionKey').value;

    if (!key) {
        key = generateKey();  
        document.getElementById('encryptionKey').value = key;
    }

    if (plaintext) {
        const ciphertext = substitutionEncrypt(plaintext, key); 
        document.getElementById('ciphertext').value = ciphertext;
    } else {
        alert('Nhập bản rõ để mã hóa.');
    }
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    const key = document.getElementById('decryptionKey').value; 

    if (!key) {
        alert('Nhập khóa để giải mã.');
        return;
    }

    if (ciphertext) {
        try {
            const decryptedText = substitutionDecrypt(ciphertext, key);  
            document.getElementById('decryptedText').value = decryptedText;
        } catch (e) {
            alert('Bản mã hoặc khóa không hợp lệ!');
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
    document.getElementById('encryptionKey').value = '';
    document.getElementById('decryptionKey').value = '';
    document.getElementById('saveClearText').checked = false;
});
kk