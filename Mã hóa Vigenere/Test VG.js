// Hàm mã hóa Vigenère
function vigenereEncrypt(plaintext, key) {
    let ciphertext = '';
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];
        if (char.match(/[A-Z]/)) {
            let charCode = char.charCodeAt(0) - 65;
            let keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 65;
            let encryptedCharCode = (charCode + keyCharCode) % 26;
            ciphertext += String.fromCharCode(encryptedCharCode + 65);
            keyIndex++;
        } else {
            ciphertext += char;
        }
    }

    return ciphertext;
}

// Hàm giải mã Vigenère
function vigenereDecrypt(ciphertext, key) {
    let decryptedText = '';
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];
        if (char.match(/[A-Z]/)) {
            let charCode = char.charCodeAt(0) - 65;
            let keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 65;
            let decryptedCharCode = (charCode - keyCharCode + 26) % 26;
            decryptedText += String.fromCharCode(decryptedCharCode + 65);
            keyIndex++;
        } else {
            decryptedText += char;
        }
    }

    return decryptedText;
}

// Hàm tạo khóa tự động
function generateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}

// Hàm xử lý file
function handleFileEncrypt(file, key) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result.toUpperCase();
        const ciphertext = vigenereEncrypt(fileContent, key);
        // Tạo file mới với nội dung đã mã hóa
        const blob = new Blob([ciphertext], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'encrypted_file.txt';
        link.click();
    };
    reader.readAsText(file);
}

function handleFileDecrypt(file, key) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result.toUpperCase();
        const decryptedText = vigenereDecrypt(fileContent, key);
        // Tạo file mới với nội dung đã giải mã
        const blob = new Blob([decryptedText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'decrypted_file.txt';
        link.click();
    };
    reader.readAsText(file);
}

// Xử lý sự kiện tạo khóa tự động
document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const key = generateRandomKey(8); // Tạo khóa ngẫu nhiên với độ dài 8 ký tự
    document.getElementById('encryptionKey').value = key;
});

// Xử lý sự kiện mã hóa văn bản
document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value;
    const key = document.getElementById('encryptionKey').value;
    const ciphertext = vigenereEncrypt(plaintext, key);
    document.getElementById('ciphertext').value = ciphertext;
});

// Xử lý sự kiện giải mã văn bản
document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;
    const key = document.getElementById('decryptionKey').value;
    const decryptedText = vigenereDecrypt(ciphertext, key);
    document.getElementById('decryptedText').value = decryptedText;
});

// Xử lý sự kiện mã hóa file
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const key = document.getElementById('encryptionKey').value;
    if (file && key) {
        handleFileEncrypt(file, key);
    }
});

// Xử lý sự kiện giải mã file
document.getElementById('decryptBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const key = document.getElementById('decryptionKey').value;
    if (fileInput.files.length > 0 && key) {
        const file = fileInput.files[0];
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
