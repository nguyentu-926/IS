function vigenereEncrypt(plaintext, key) {
    let ciphertext = '';
    let keyIndex = 0;

    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];
        if (char.match(/[a-zA-Z]/)) {
            let baseCode = char === char.toLowerCase() ? 97 : 65; // Xác định A-Z hay a-z
            let charCode = char.charCodeAt(0) - baseCode;
            let keyCharCode = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
            let encryptedCharCode = (charCode + keyCharCode) % 26;
            ciphertext += String.fromCharCode(encryptedCharCode + baseCode);
            keyIndex++;
        } else {
            ciphertext += char;
        }
    }

    return ciphertext;
}

// Giải mã Vigenère
function vigenereDecrypt(ciphertext, key) {
    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];
        if (char.match(/[a-zA-Z]/)) {
            let baseCode = char === char.toLowerCase() ? 97 : 65;
            let charCode = char.charCodeAt(0) - baseCode;
            let keyCharCode = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
            let decryptedCharCode = (charCode - keyCharCode + 26) % 26;
            decryptedText += String.fromCharCode(decryptedCharCode + baseCode);
            keyIndex++;
        } else {
            decryptedText += char;
        }
    }

    return decryptedText;
}

// Hàm tạo khóa 
function generateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@.-';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

// Xử lý tạo khóa tự động
document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const key = generateRandomKey(8); 
    document.getElementById('encryptionKey').value = key;
});

// Xử lý mã hóa văn bản
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('encryptionKey').value;
    const ciphertext = vigenereEncrypt(plaintext, key);
    document.getElementById('ciphertext').value = ciphertext;
});

// Xử lý giải mã văn bản
document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    const key = document.getElementById('decryptionKey').value;
    const decryptedText = vigenereDecrypt(ciphertext, key);
    document.getElementById('decryptedText').value = decryptedText;
});

// Hàm mã hóa file
function handleFileEncrypt(file, key) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        const ciphertext = vigenereEncrypt(fileContent, key);

        const blob = new Blob([ciphertext], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'encrypted_file.txt';
        link.click();
    };
    reader.readAsText(file);
}

// Hàm giải mã file
function handleFileDecrypt(file, key) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        const decryptedText = vigenereDecrypt(fileContent, key);

        const blob = new Blob([decryptedText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'decrypted_file.txt';
        link.click();
    };
    reader.readAsText(file);
}

// Xử lý mã hóa file
document.getElementById('fileInputEncrypt').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const key = document.getElementById('encryptionKey').value;
    if (file && key) {
        handleFileEncrypt(file, key);
    }
});

// Xử lý giải mã file
document.getElementById('fileInputDecrypt').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const key = document.getElementById('decryptionKey').value;
    if (file && key) {
        handleFileDecrypt(file, key);
    }
});

// Lưu bản rõ sau khi giải mã
document.getElementById('saveBtn').addEventListener('click', function() {
    const decryptedText = document.getElementById('decryptedText').value;
    if (decryptedText) {
        const blob = new Blob([decryptedText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'decrypted_text.txt';
        link.click();
    }
});

// Xóa nội dung
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptedText').value = '';
});
