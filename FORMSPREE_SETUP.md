# Contact Form Setup Guide

Your contact form is now configured to send emails to **alexrmz2394@gmail.com** using Formspree.

## 🚀 Quick Setup (5 minutes)

### Step 1: Sign up for Formspree

1. Go to [https://formspree.io](https://formspree.io)
2. Click **"Sign Up"** (it's FREE!)
3. Sign up with your email (alexrmz2394@gmail.com recommended)

### Step 2: Create a New Form

1. After logging in, click **"+ New Form"**
2. **Form Name**: "Portfolio Contact Form" (or whatever you prefer)
3. **Email**: alexrmz2394@gmail.com (where you'll receive messages)
4. Click **"Create Form"**

### Step 3: Get Your Form ID

1. After creating the form, you'll see your **Form Endpoint**
2. It will look like: `https://formspree.io/f/xABCD1234`
3. Copy the part after `/f/` - this is your **Form ID** (e.g., `xABCD1234`)

### Step 4: Update Your Website

1. Open `index.html`
2. Find this line (around line 443):
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Form ID from Step 3
4. Example:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/xABCD1234" method="POST">
   ```

### Step 5: Push to GitHub

```powershell
git add .
git commit -m "Add Formspree contact form integration"
git push
```

### Step 6: Test It!

1. Wait a minute for GitHub Pages to update
2. Visit your website: https://repvi.github.io
3. Fill out the contact form
4. Submit it
5. **IMPORTANT**: The first time you submit, Formspree will send you a **confirmation email**
6. Click the confirmation link in that email
7. After that, all form submissions will go directly to your inbox!

## ✨ What You Get

### Free Plan Includes:
- ✅ 50 submissions per month
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads (if you add that feature)
- ✅ reCAPTCHA support
- ✅ Custom thank you page

### Email Notifications
When someone submits the form, you'll receive an email with:
- Sender's name
- Sender's email (so you can reply directly)
- Subject
- Message

## 🎨 Optional Enhancements

### Add reCAPTCHA (Prevent Spam)

In Formspree dashboard:
1. Go to your form settings
2. Enable reCAPTCHA
3. No code changes needed!

### Customize Confirmation Page

In `index.html`, you can add a custom thank you page:

```html
<form class="contact-form" id="contactForm" 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST">
    <!-- Add this hidden field -->
    <input type="hidden" name="_next" value="https://repvi.github.io/thank-you.html">
    <!-- rest of your form -->
</form>
```

Then create a `thank-you.html` page.

### Auto-reply to Sender

In Formspree dashboard:
1. Go to form settings
2. Enable "Auto-reply"
3. Customize the message sent to people who contact you

## 🔧 Alternative: EmailJS (If Formspree doesn't work)

If you prefer, you can use EmailJS instead:

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. Create an email service (connect your Gmail)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the JavaScript code (see EMAILJS_SETUP.md if needed)

## 📧 Testing Checklist

- [ ] Signed up for Formspree
- [ ] Created a new form
- [ ] Got Form ID
- [ ] Updated `index.html` with Form ID
- [ ] Pushed changes to GitHub
- [ ] Tested form submission
- [ ] Confirmed email address (first submission)
- [ ] Received test email successfully

## 🆘 Troubleshooting

### "Form not found" error
- Make sure you replaced `YOUR_FORM_ID` with your actual Form ID
- Check that the Form ID matches exactly what's in Formspree

### Not receiving emails
- Check your spam folder
- Make sure you confirmed your email (first submission)
- Verify the form is enabled in Formspree dashboard

### Form submits but no notification appears
- Check browser console for errors (F12)
- Make sure you're connected to the internet
- Try refreshing the page

## 💡 Need Help?

- Formspree Documentation: https://help.formspree.io/
- Check form submissions in Formspree dashboard
- Test emails are being sent

---

**Your email**: alexrmz2394@gmail.com  
**Current status**: Ready to configure (just need to add Form ID)
