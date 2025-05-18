@echo off
echo LMS TUIT tizimini ishga tushirish...

REM Agar virtual muhit mavjud bo'lmasa, uni yaratish
if not exist venv (
    echo Virtual muhit yaratilmoqda...
    python -m venv venv
)

REM Virtual muhitni faollashtirish
call venv\Scripts\activate

REM Kerakli paketlarni o'rnatish
echo Kerakli paketlar o'rnatilmoqda...
pip install -r requirements.txt

REM Demo ma'lumotlarni yaratish
echo Demo ma'lumotlarni yaratish...
python setup.py

REM Serverni ishga tushirish
echo Server ishga tushirilmoqda...
python manage.py runserver 0.0.0.0:8000

pause
