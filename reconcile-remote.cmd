@echo off
chcp 65001 >nul
title دمج التزامات GitHub مع مشروعك
cd /d "%~dp0"

echo.
echo ==========================================================
echo   دمج التزامات GitHub مع مشروعك
echo ==========================================================
echo.
echo   السبب: المستودع البعيد فيه ملف وُلد في تاريخ مستقل
echo   عن تاريخ مشروعك (README أو .gitignore مثلاً)،
echo   وGit لا يدمج تاريخين مستقلين تلقائياً.
echo.
echo   لن يُفقد أي شيء: ملفات مشروعك تبقى كما هي،
echo   ويُضاف إليها ما هو موجود على GitHub فقط.
echo.

echo [1/4] جلب التزامات GitHub...
git fetch origin
if errorlevel 1 goto :fetchfail

set REMOTE=origin/main
git rev-parse --verify --quiet origin/main >nul
if errorlevel 1 set REMOTE=origin/master
git rev-parse --verify --quiet %REMOTE% >nul
if errorlevel 1 goto :nobranch
echo       الفرع البعيد: %REMOTE%

echo.
echo [2/4] دمج بلا ربط تاريخين...
git merge %REMOTE% --allow-unrelated-histories --no-edit
if not errorlevel 1 goto :done

echo.
echo [3/4] ظهر تعارض — إعادة المحاولة مع تفضيل ملفات مشروعك...
git merge --abort >nul 2>&1
git merge %REMOTE% --allow-unrelated-histories --no-edit -X ours
if errorlevel 1 goto :mergefail

:done
echo.
echo ==========================================================
echo   تم الدمج بنجاح
echo ==========================================================
echo.
echo   ارجع الآن إلى GitHub Desktop واضغط:  Push origin
echo.
echo   آخر الالتزامات:
git log --oneline -3
echo.
pause
exit /b 0

:fetchfail
echo.
echo   فشل الجلب — تحقق من اتصالك بالإنترنت.
echo   إن كان GitHub Desktop مفتوحاً وطلب منك Fetch، اضغط Fetch أولاً ثم أعد تشغيل هذا الملف.
echo.
pause
exit /b 1

:nobranch
echo.
echo   لا أجد فرعاً بعيداً باسم main ولا master.
echo   افتح المستودع على GitHub وتأكد أنه لم يُنشأ فارغاً تماماً.
echo.
pause
exit /b 1

:mergefail
echo.
echo   تعذّر الدمج.
echo   انسخ نص الخطأ أعلاه وأرسله لي.
echo   ولإلغاء أي حالة دمج معلّقة نفّذ:  git merge --abort
echo.
pause
exit /b 1
