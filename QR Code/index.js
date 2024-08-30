// script.js
$(document).ready(function() {
    $('#qrForm').on('submit', function(e) {
        e.preventDefault();
        
        var fullName = $('#fullName').val();
        var college = $('#college').val();
        var course = $('#course').val();
        var year = $('#year').val();
        var section = $('#section').val();
        
        var qrData = `Name: ${fullName}\nCollege: ${college}\nCourse: ${course}\nYear: ${year}\nSection: ${section}`;

        // Generate QR code
        $('#qrCode').empty();
        $('#qrCode').qrcode({
            text: qrData + '\nImage: ' + `${$('#imageUpload').val().split('\\').pop()}`,
            width: 256,
            height: 256
        });

        // Submit form data via AJAX
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: 'save_data.php',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                $('#qrForm')[0].reset(); // Reset form fields
            }
        });
    });

    $('#imageUpload').on('change', function(e) {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            $('#uploadedImage').html('<img src="' + event.target.result + '" alt="Uploaded Image">');
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
