document.getElementById('studentIdForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = event.target.name.value;
    const studentId = event.target.student_id.value;
    const course = event.target.course.value;
    
    const imageFile = event.target.image.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        document.getElementById('cardImage').src = reader.result;
        document.getElementById('cardName').innerText = `Name: ${name}`;
        document.getElementById('cardStudentId').innerText = `Student ID: ${studentId}`;
        document.getElementById('cardCourse').innerText = `Course: ${course}`;
        
        // Generate QR code with student information
        generateQRCode(name, studentId, course, reader.result);
        document.getElementById('idCard').style.display = 'block';
    };

    reader.readAsDataURL(imageFile);
});

function generateQRCode(name, studentId, course, imageData) {
    const data = `Name: ${name}\nStudent ID: ${studentId}\nCourse: ${course}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=100x100`;
    document.getElementById('qrCode').src = qrCodeUrl;
}
