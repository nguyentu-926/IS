document.addEventListener("DOMContentLoaded", function() {
    const encryptionForm = document.getElementById('encryptionForm');
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    let rsa = new JSEncrypt();
    let publicKey = '';
    let privateKey = '';

    generateKeyBtn.addEventListener('click', function() {
        rsa = new JSEncrypt({ default_key_size: 1024 });
        publicKey = rsa.getPublicKey();
        privateKey = rsa.getPrivateKey();

        document.getElementById('encryptionKey').value = publicKey;
        document.getElementById('decryptionKey').value = privateKey;
        alert('Khóa RSA đã được tạo thành công!');
    });

    encryptBtn.addEventListener('click', function() {
        const plaintext = document.getElementById('plaintext').value;
        const customKey = document.getElementById('encryptionKey').value;
        
        if (!plaintext) {
            alert('Hãy nhập văn bản cần mã hóa!');
            return;
        }

        if (customKey) {
            rsa.setPublicKey(customKey);
        } else if (publicKey) {
            rsa.setPublicKey(publicKey);
        } else {
            alert('Hãy tạo khóa hoặc nhập khóa mã hóa!');
            return;
        }

        const ciphertext = rsa.encrypt(plaintext);
        document.getElementById('ciphertext').value = ciphertext || 'Mã hóa thất bại!';
    });

    decryptBtn.addEventListener('click', function() {
        const ciphertext = document.getElementById('ciphertext').value;
        const customKey = document.getElementById('decryptionKey').value;

        if (!ciphertext) {
            alert('Không có bản mã để giải mã!');
            return;
        }

        if (!customKey) {
            alert('Hãy nhập khóa giải mã!');
            return;
        }

        rsa.setPrivateKey(customKey);
        const decryptedText = rsa.decrypt(ciphertext);

        if (decryptedText) {
            document.getElementById('decryptedText').value = decryptedText;
        } else {
            document.getElementById('decryptedText').value = 'Giải mã thất bại!';
        }
    });

    saveBtn.addEventListener('click', function() {
        const plaintext = document.getElementById('plaintext').value;
        if (!plaintext) {
            alert('Không có văn bản để lưu!');
            return;
        }

        const blob = new Blob([plaintext], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'plaintext.txt';
        link.click();
    });

    clearBtn.addEventListener('click', function() {
        document.getElementById('plaintext').value = '';
        document.getElementById('encryptionKey').value = '';
        document.getElementById('ciphertext').value = '';
        document.getElementById('decryptionKey').value = '';
        document.getElementById('decryptedText').value = '';
        publicKey = '';
        privateKey = '';
    });
});
