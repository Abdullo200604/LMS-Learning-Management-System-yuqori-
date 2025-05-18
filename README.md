# TUIT LMS - Ta'lim boshqaruv tizimi

TUIT LMS - Toshkent axborot texnologiyalari universiteti uchun ta'lim boshqaruv tizimi.

## Imkoniyatlar

- Kurslar boshqaruvi
- Talabalar va o'qituvchilar uchun alohida interfeyslar
- Davomat tizimi
- Topshiriqlar va imtihonlar
- Yangiliklar bo'limi
- Dars jadvali
- Ko'p tillilik (O'zbek, Ingliz, Rus)
- REST API
- Mobil qurilmalarga moslashgan interfeys

## Texnologiyalar

- **Backend**: Django 5.0, Django REST Framework
- **Database**: PostgreSQL
- **Frontend**: Bootstrap 5, JavaScript
- **Containerization**: Docker, Docker Compose
- **Deployment**: Nginx, Gunicorn

## O'rnatish

### Talablar

- Python 3.8+
- PostgreSQL 12+
- Docker va Docker Compose (ixtiyoriy)

### Oddiy o'rnatish

1. Loyihani yuklab oling:

\`\`\`bash
git clone https://github.com/username/lms-tuit.git
cd lms-tuit
\`\`\`

2. Virtual muhit yarating va faollashtiring:

\`\`\`bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
\`\`\`

3. Kerakli paketlarni o'rnating:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. `.env` faylini yarating:

\`\`\`
# Database settings
DB_NAME=lms_tuit
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

# Django settings
SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
\`\`\`

5. Ma'lumotlar bazasini yarating:

\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

6. Admin foydalanuvchini yarating:

\`\`\`bash
python manage.py createsuperuser
\`\`\`

7. Tarjima fayllarini kompilyatsiya qiling:

\`\`\`bash
python manage.py compilemessages
\`\`\`

8. Serverni ishga tushiring:

\`\`\`bash
python manage.py runserver
\`\`\`

9. Brauzerda http://127.0.0.1:8000 manzilini oching

### Docker bilan o'rnatish

1. Loyihani yuklab oling:

\`\`\`bash
git clone https://github.com/username/lms-tuit.git
cd lms-tuit
\`\`\`

2. `.env` faylini yarating (yuqoridagi namunaga qarang)

3. Docker Compose yordamida loyihani ishga tushiring:

\`\`\`bash
docker-compose up -d
\`\`\`

4. Admin foydalanuvchini yarating:

\`\`\`bash
docker-compose exec web python manage.py createsuperuser
\`\`\`

5. Brauzerda http://localhost:8000 manzilini oching

## Demo ma'lumotlar bilan ishga tushirish

Loyihani demo ma'lumotlar bilan tezda ishga tushirish uchun:

- Linux/Mac: `./run_demo.sh`
- Windows: `run_demo.bat`

Bu skript virtual muhitni yaratadi, kerakli paketlarni o'rnatadi, ma'lumotlar bazasini yaratadi, demo ma'lumotlarni qo'shadi va serverni ishga tushiradi.

### Demo foydalanuvchilar

- Admin: admin / admin123
- O'qituvchi: teacher1 / teacher123
- Talaba: student1 / student123

## PostgreSQL komponentlari

### pgAgent

pgAgent - PostgreSQL uchun vaqtli ishlarni bajarish tizimi. U ma'lumotlar bazasida vaqtli ishlarni rejalashtirish va bajarish imkonini beradi.

Qo'llanilishi:
- Muntazam zaxira nusxalash (backup)
- Ma'lumotlarni tozalash va arxivlash
- Hisobotlarni avtomatik yaratish

### pgBouncer

pgBouncer - PostgreSQL uchun ulanishlarni boshqarish vositasi. U ma'lumotlar bazasiga ulanishlarni saqlaydi va qayta ishlatadi, bu esa serverning yukini kamaytiradi.

Qo'llanilishi:
- Ulanishlar sonini cheklash
- Ulanishlarni qayta ishlash
- Ma'lumotlar bazasi serverining yukini kamaytirish

## Til sozlamalari

Tizim uch tilda ishlaydi: O'zbek (uz), Ingliz (en) va Rus (ru). Tilni o'zgartirish uchun sahifaning yuqori qismidagi til tanlagichdan foydalaning.

Yangi tarjimalar qo'shish uchun:

1. Tarjima fayllarini yangilang:

\`\`\`bash
python manage.py makemessages -l uz -l en -l ru
\`\`\`

2. `locale/XX/LC_MESSAGES/django.po` fayllarini tahrirlang

3. Tarjima fayllarini kompilyatsiya qiling:

\`\`\`bash
python manage.py compilemessages
\`\`\`

## API haqida

Tizim REST API orqali ham ishlaydi. API hujjatlari: http://localhost:8000/api/docs/

API token olish:

\`\`\`bash
curl -X POST -d "username=your_username&password=your_password" http://localhost:8000/api/token/
\`\`\`

## Ishlab chiqarishga o'rnatish

Ishlab chiqarish serveriga o'rnatish bo'yicha batafsil ko'rsatmalar `docs/deployment.md` faylida keltirilgan.

## Litsenziya

MIT
\`\`\`

## 6. PostgreSQL, pgAgent, pgBouncer haqida hujjat
