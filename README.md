# TATU LMS - Ta'lim boshqaruv tizimi

Django 5 da yaratilgan ta'lim boshqaruv tizimi.

## O'rnatish

1. Loyihani klonlash:
\`\`\`bash
git clone https://github.com/yourusername/tatu-lms.git
cd tatu-lms
\`\`\`

2. Virtual muhitni yaratish va faollashtirish:
\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
\`\`\`

3. Kerakli paketlarni o'rnatish:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Migratsiyalarni qo'llash:
\`\`\`bash
python manage.py migrate
\`\`\`

5. Superuser yaratish:
\`\`\`bash
python manage.py createsuperuser
\`\`\`

6. Serverni ishga tushirish:
\`\`\`bash
python manage.py runserver
\`\`\`

## Tizim imkoniyatlari

- Talaba va o'qituvchilar uchun alohida interfeyslar
- Fanlar va dars jadvali
- Vazifalar va imtihonlar
- Davomat nazorati
- Yangiliklar bo'limi
- Profil boshqaruvi

## Demo foydalanuvchilar

- Talaba: demo_student / tatu2025
- O'qituvchi: demo_teacher / tatu2025

## Texnologiyalar

- Django 5.0
- Bootstrap 5
- JavaScript
- SQLite (ishlab chiqish uchun)
