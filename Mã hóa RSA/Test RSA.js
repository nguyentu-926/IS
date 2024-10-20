document.getElementById('generateKeyBtn').addEventListener('click', function() {
    const p = parseInt(document.getElementById('pInput').value);
    const q = parseInt(document.getElementById('qInput').value);

    if (!p || !q || p <= 1 || q <= 1) {
        alert('Vui lòng nhập các giá trị p và q là các số nguyên tố lớn hơn 1.');
        return;
    }

    const n = p * q; 
    const phi = (p - 1) * (q - 1); 

    let e = 3;
    while (gcd(e, phi) !== 1) {
        e += 2; 
    }

    const d = modInverse(e, phi); 
    document.getElementById('encryptionKey').value = `e: ${e}, n: ${n}`;
    document.getElementById('decryptionKey').value = `d: ${d}, n: ${n}`;
});

document.getElementById('encryptBtn').addEventListener('click', function() {
    const plaintext = document.getElementById('plaintext').value.toUpperCase();
    const publicKey = document.getElementById('encryptionKey').value;
    const [e, n] = publicKey.match(/\d+/g).map(Number);

    // Mã hóa theo RSA
    const ciphertextArray = [];
    for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i) - 65; // Chuyển ký tự thành mã A=0
        const encryptedChar = modPow(charCode, e, n); 
        ciphertextArray.push(encryptedChar);
    }
    const ciphertext = ciphertextArray.join(' ');
    document.getElementById('ciphertext').value = ciphertext;
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value.trim();
    const privateKey = document.getElementById('decryptionKey').value;
    const [d, n] = privateKey.match(/\d+/g).map(Number);

    if (!ciphertext || !privateKey) {
        alert('Vui lòng nhập bản mã và khóa giải mã!');
        return;
    }

    const ciphertextArray = ciphertext.split(' ').map(Number); // Chuyển đổi bản mã thành các số

    // Giải mã RSA
    const decryptedArray = ciphertextArray.map(c => {
        const decryptedCharCode = modPow(c, d, n); 
        return String.fromCharCode(decryptedCharCode + 65); // Chuyển ngược thành ký tự A=0,
    });

    const decryptedText = decryptedArray.join('');
    document.getElementById('decryptedText').value = decryptedText;
});

document.getElementById('saveBtn').addEventListener('click', function() {
    const ciphertext = document.getElementById('ciphertext').value;

    if (!ciphertext) {
        alert('Không có bản mã để lưu!');
        return;
    }

    const blob = new Blob([ciphertext], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rsa-encrypt.dat';
    link.click();
});

// Hàm tính GCD (Ước số chung lớn nhất)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Hàm tính (a^b) % c sử dụng luỹ thừa theo modul
function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) result = (result * base) % mod;
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

// Hàm tính nghịch đảo modulo (tính khóa riêng tư d)
function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
}
