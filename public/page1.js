document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email }),
    });

    if (response.ok) {
        alert('Дякуємо! Дані відправлено.');
        e.target.reset();
    } else {
        alert('Помилка відправки.');
    }
});
