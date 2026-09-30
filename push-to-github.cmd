@echo off
chcp 65001 >nul
title رفع موقع L.COM.LY إلى GitHub
cd /d "%~dp0"

set REPO=https://github.com/Gamingmonster2/l-com-ly.git

echo.
echo ==========================================================
echo   رفع موقع L.COM.LY إلى GitHub
echo ==========================================================
echo.
echo   المجلد  : %CD%
echo   المستودع: %REPO%
echo.

if not exist ".git" (
  echo [1/3] تهيئة المستودع المحلي...
  git init -b main
  git remote add origin %REPO%
) else (
  echo [1/3] المستودع المحلي موجود مسبقاً.
)

echo [2/3] إضافة الملفات...
git add -A
git commit -m "ترقية موقع L.COM.LY: نسخة ثابتة نظيفة من بلوجر" 2>nul

echo [3/3] الرفع...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
  echo ==========================================================
  echo   تم الرفع بنجاح
  echo ==========================================================
  echo.
  echo   الخطوة التالية - تفعيل الموقع:
  echo   Settings  -^>  Pages  -^>  Source: GitHub Actions
  echo.
  echo   ثم تبويب Actions لمتابعة البناء والنشر.
  echo   الرابط المؤقت:
  echo   https://gamingmonster2.github.io/l-com-ly/
) else (
  echo ==========================================================
  echo   فشل الرفع - راجع الرسالة أعلاه
  echo ==========================================================
  echo.
  echo   إن طلب تسجيل الدخول، افتح GitHub Desktop واعمل Push.
)
echo.
pause
