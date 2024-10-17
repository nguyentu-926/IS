const ALPHABET_SIZE = 26;
let a = 0, b = 0;

// Tạo khóa tự động từ danh sách các số coprime với 26
document.getElementById('generateKeyBtn').addEventListener('click', () => {
    const coprimes = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
    a = coprimes[Math.floor(Math.random() * coprimes.length)];
    b = Math.floor(Math.random() * ALPHABET_SIZE);
    document.getElementById('encryptionKey').value = `a = ${a}, b = ${b}`;
});

// Hàm tìm nghịch đảo modular của a theo modulo m
function modInverse(a, m) {
    const g = gcdExtended(a, m);
    if (g.gcd !== 1) {
        throw new Error('Nghịch đảo modular không tồn tại!');
    }
    return (g.x % m + m) % m; // Đảm bảo giá trị trả về luôn dương
}

// Giải thuật Euclid mở rộng để tìm gcd và hệ số x, y
function gcdExtended(a, b) {
    if (a === 0) {
        return { gcd: b, x: 0, y: 1 };
    }
    const g = gcdExtended(b % a, a);
    return {
        gcd: g.gcd,
        x: g.y - Math.floor(b / a) * g.x,
        y: g.x
    };
}

// Hàm mã hóa Affine cho văn bản
function affineEncrypt(content) {
    return content
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) { // Uppercase letters
                return String.fromCharCode(((a * (code - 65) + b) % ALPHABET_SIZE) + 65);
            } else if (code >= 97 && code <= 122) { // Lowercase letters
                return String.fromCharCode(((a * (code - 97) + b) % ALPHABET_SIZE) + 97);
            } else {
                return char; // Non-alphabet characters are not encrypted
            }
        })
        .join('');
}

// Hàm giải mã Affine cho văn bản
function affineDecrypt(content) {
    const aInverse = modInverse(a, ALPHABET_SIZE);
    return content
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) { // Uppercase letters
                return String.fromCharCode(((aInverse * (code - 65 - b + ALPHABET_SIZE)) % ALPHABET_SIZE) + 65);
            } else if (code >= 97 && code <= 122) { // Lowercase letters
                return String.fromCharCode(((aInverse * (code - 97 - b + ALPHABET_SIZE)) % ALPHABET_SIZE) + 97);
            } else {
                return char; // Non-alphabet characters are not decrypted
            }
        })
        .join('');
}

// Hàm mã hóa tệp
document.getElementById('encryptBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput').files[0];
    const plainText = document.getElementById('plaintext').value;

    if (!fileInput && !plainText) {
        alert('Vui lòng nhập văn bản hoặc chọn một tệp để mã hóa!');
        return;
    }

    // Mã hóa văn bản
    if (plainText) {
        const encryptedText = affineEncrypt(plainText);
        document.getElementById('ciphertext').value = encryptedText;
    }

    // Mã hóa tệp tin
    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result;
            const encryptedContent = affineEncrypt(fileContent);

            // Tạo file mã hóa mới
            const blob = new Blob([encryptedContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `encrypted_${fileInput.name}`;
            a.click();
        };

        reader.readAsText(fileInput);
    }
});

// Hàm giải mã tệp hoặc văn bản
document.getElementById('decryptionBtn').addEventListener('click', () => {
    const decryptionKey = document.getElementById('decryptionKey').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const cipherText = document.getElementById('ciphertext').value;

    if (!decryptionKey || (!fileInput && !cipherText)) {
        alert('Vui lòng nhập khóa giải mã và chọn tệp mã hóa hoặc nhập văn bản đã mã hóa!');
        return;
    }

    // Parse khóa a và b từ khóa nhập vào
    const keys = decryptionKey.match(/\d+/g);
    if (keys.length !== 2) {
        alert('Khóa giải mã không hợp lệ! Phải chứa 2 số (a và b).');
        return;
    }

    const keyA = parseInt(keys[0], 10);
    const keyB = parseInt(keys[1], 10);

    // Kiểm tra xem khóa nhập vào có khớp với khóa đã mã hóa không
    if (keyA === a && keyB === b) {
        // Giải mã văn bản
        if (cipherText) {
            const decryptedText = affineDecrypt(cipherText);
            document.getElementById('decryptionText').value = decryptedText;
        }

        // Giải mã tệp tin
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const encryptedContent = event.target.result;
                const decryptedContent = affineDecrypt(encryptedContent);

                // Tạo file giải mã mới
                const blob = new Blob([decryptedContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `decrypted_${fileInput.name}`;
                a.click();
            };

            reader.readAsText(fileInput);
        }
    } else {
        alert('Khóa giải mã không chính xác!');
    }
});

// Hàm để xóa kết quả và nhập lại
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('encryptionKey').value = '';
    document.getElementById('decryptionKey').value = '';
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptionText').value = '';
    document.getElementById('fileInput').value = null;
});
