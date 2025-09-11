# راهنمای دیپلوی سایت RETRO روی Vercel

## مراحل دیپلوی سایت روی دامنه retrocafebakery.ir

### 1. آماده‌سازی پروژه

پروژه شما آماده دیپلوی است. فایل‌های زیر به‌روزرسانی شده‌اند:
- ✅ `vercel.json` - تنظیمات Vercel
- ✅ `next.config.js` - بهینه‌سازی Next.js
- ✅ `src/app/layout.tsx` - متادیتای SEO
- ✅ `public/manifest.json` - PWA Manifest

### 2. نصب Vercel CLI (اختیاری)

```bash
npm i -g vercel
```

### 3. دیپلوی از طریق Vercel Dashboard

#### مرحله 1: ورود به Vercel
1. به [vercel.com](https://vercel.com) بروید
2. با GitHub/GitLab/Bitbucket وارد شوید
3. روی "New Project" کلیک کنید

#### مرحله 2: اتصال Repository
1. Repository پروژه خود را انتخاب کنید
2. Framework را "Next.js" انتخاب کنید
3. Root Directory را `./` قرار دهید
4. Build Command: `npm run build`
5. Output Directory: `.next`

#### مرحله 3: تنظیمات Environment Variables
اگر متغیرهای محیطی دارید، در بخش Environment Variables اضافه کنید.

#### مرحله 4: دیپلوی
1. روی "Deploy" کلیک کنید
2. منتظر بمانید تا دیپلوی کامل شود

### 4. تنظیم دامنه سفارشی

#### مرحله 1: اضافه کردن دامنه
1. در Vercel Dashboard، پروژه خود را انتخاب کنید
2. به تب "Settings" بروید
3. روی "Domains" کلیک کنید
4. دامنه `retrocafebakery.ir` را اضافه کنید

#### مرحله 2: تنظیم DNS
در پنل مدیریت دامنه خود، رکوردهای DNS زیر را اضافه کنید:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### مرحله 3: تأیید دامنه
1. در Vercel، روی "Verify" کلیک کنید
2. منتظر تأیید DNS بمانید (ممکن است 24 ساعت طول بکشد)

### 5. دیپلوی از طریق CLI

```bash
# ورود به Vercel
vercel login

# دیپلوی
vercel

# دیپلوی production
vercel --prod
```

### 6. تنظیمات اضافی

#### SSL Certificate
Vercel به صورت خودکار SSL certificate صادر می‌کند.

#### Performance Optimization
- ✅ Image optimization فعال است
- ✅ Compression فعال است
- ✅ Security headers تنظیم شده
- ✅ PWA manifest اضافه شده

### 7. تست سایت

بعد از دیپلوی، موارد زیر را تست کنید:
- [ ] سایت روی دامنه اصلی بارگذاری می‌شود
- [ ] فونت‌های فارسی درست نمایش داده می‌شوند
- [ ] RTL layout صحیح است
- [ ] منو و آیتم‌ها درست کار می‌کنند
- [ ] Performance score مناسب است

### 8. مشکلات رایج

#### مشکل: فونت‌ها لود نمی‌شوند
**راه حل:** مطمئن شوید که فایل‌های فونت در `public/fonts/` قرار دارند.

#### مشکل: RTL layout درست نیست
**راه حل:** بررسی کنید که `dir="rtl"` و `lang="fa"` در HTML تنظیم شده باشد.

#### مشکل: Images لود نمی‌شوند
**راه حل:** بررسی کنید که domain های image در `next.config.js` اضافه شده باشند.

### 9. پشتیبانی

اگر مشکلی داشتید:
1. Logs را در Vercel Dashboard بررسی کنید
2. Console browser را چک کنید
3. Network tab را بررسی کنید

---

**نکته مهم:** بعد از دیپلوی، حتماً سایت را روی موبایل و دسکتاپ تست کنید تا مطمئن شوید همه چیز درست کار می‌کند.
