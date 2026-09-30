@echo off
chcp 65001 >nul
title رفع موقع L.COM.LY إلى GitHub
cd /d "%~dp0"

echo.
echo ==========================================================
echo   رفع موقع L.COM.LY إلى GitHub
echo ==========================================================
echo.
echo   المجلد  : %CD%
echo   المستودع: https://github.com/Gamingmonster2/l-com-ly
echo   الفرع   : main
echo.
echo   الطريقة الموصى بها: GitHub Desktop
echo     File  -^>  Add Local Repository  -^>  اختر هذا المجلد
echo     ثم اضغط  Push origin
echo.
echo   هذا الملف بديل يعمل من الطرفية.
echo ----------------------------------------------------------
pause

git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
  echo ==========================================================
  echo   تم الرفع بنجاح
  echo ==========================================================
  echo.
  echo   الخطوة التالية - فعّل الموقع:
  echo   Settings  -^>  Pages  -^>  Source: GitHub Actions
  echo   ثم تبويب Actions لمتابعة البناء والنشر.
  echo.
  echo   الرابط بعد دقيقتين:
  echo   https://gamingmonster2.github.io/l-com-ly/
) else (
  echo ==========================================================
  echo   لم ينجح الرفع
  echo ==========================================================
  echo.
  echo   إن ظهرت رسالة أن الفرع متأخر، فالريبو البعيد فيه ملف
  echo   ^(مثل README^). شغّل هذا الأمر أولاً ثم أعد المحاولة:
  echo       git pull origin main --allow-unrelated-histories
  echo.
  echo   أو من GitHub Desktop: اضغط Pull origin ثم Push origin.
)
echo.
pause
