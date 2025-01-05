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

    // عرض رسالة "الحساب آمن، لا داعي للقلق" بعد تأخير وهمي
    setTimeout(() => {
        Swal.fire('نجاح', 'تم الفحص بنجاح!', 'success');
        document.getElementById('result-message').textContent = "الحساب آمن، لا داعي للقلق.";
        document.getElementById('result').classList.remove('hidden');
    }, 2000); // تأخير وهمي لمدة 2 ثانية
}

// إضافة معالجات الأحداث
document.getElementById('instagram-btn').addEventListener('click', () => toggleForm('instagram'));
document.getElementById('twitter-btn').addEventListener('click', () => toggleForm('twitter'));
document.getElementById('facebook-btn').addEventListener('click', () => toggleForm('facebook'));

document.getElementById('instagram-check').addEventListener('click', () => checkSecurity('instagram'));
document.getElementById('twitter-check').addEventListener('click', () => checkSecurity('twitter'));
document.getElementById('facebook-check').addEventListener('click', () => checkSecurity('facebook'));
