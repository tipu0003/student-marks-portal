// Encryption Key (Use a strong key and keep it secret)
const SECRET_KEY = 'your-very-secure-key'; // Replace with a strong key

// Function to encrypt data using CryptoJS
function encrypt(data) {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// Function to decrypt data using CryptoJS
function decrypt(data) {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Example Marks Data (Encrypted)
const marksData = {
    'ENR001': {
        lastname: encrypt('Smith'),
        marks: encrypt('Subject A: 85\nSubject B: 90')
    },
    'ENR002': {
        lastname: encrypt('Johnson'),
        marks: encrypt('Subject A: 78\nSubject B: 88')
    },
    'ENR003': {
        lastname: encrypt('Williams'),
        marks: encrypt('Subject A: 92\nSubject B: 87')
    },
    // Add more student data as needed
};

document.getElementById('marksForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const enrollment = document.getElementById('enrollment').value.trim();
    const lastname = document.getElementById('lastname').value.trim();

    if (marksData.hasOwnProperty(enrollment)) {
        const storedLastName = decrypt(marksData[enrollment].lastname).toLowerCase();
        const enteredLastName = lastname.toLowerCase();

        if (storedLastName === enteredLastName) {
            const marks = decrypt(marksData[enrollment].marks);
            document.getElementById('marksDisplay').innerText = marks;
            document.getElementById('result').classList.remove('hidden');
        } else {
            alert('Incorrect Last Name.');
        }
    } else {
        alert('Enrollment Number not found.');
    }
});
