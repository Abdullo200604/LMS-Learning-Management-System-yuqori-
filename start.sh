#!/bin/bash

# Agar virtual muhit mavjud bo'lmasa, uni yaratish
if [ ! -d "venv" ]; then
    echo "Virtual muhit yaratilmoqda..."
    python -m venv venv
fi

# Virtual muhitni faollashtirish
source venv/bin/activate || source venv/Scripts/activate

# Kerakli paketlarni o'rnatish
echo "Kerakli paketlar o'rnatilmoqda..."
pip install -r requirements.txt

# Demo ma'lumotlarni yaratish
echo "Demo ma'lumotlarni yaratish..."
python setup.py

# Serverni ishga tushirish
echo "Server ishga tushirilmoqda..."
python manage.py runserver 0.0.0.0:8000
