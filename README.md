# repvi - Embedded Systems Portfolio

A professional portfolio website showcasing embedded systems projects, with a focus on ESP32 firmware development and IoT solutions.

🌐 **Live Site**: [https://repvi.github.io](https://repvi.github.io)

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional design with embedded systems theme
- **Project Showcase**: Dedicated section to display your ESP32 and IoT projects
- **Skills Section**: Comprehensive display of technical skills and expertise
- **Contact Form**: Interactive contact form for inquiries
- **Smooth Animations**: Subtle animations and transitions for better UX
- **Mobile Navigation**: Hamburger menu for mobile devices
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility

## 📁 Project Structure

```
repvi.github.io/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet
├── responsive.css          # Responsive design styles
├── script.js               # JavaScript functionality
├── projects.html           # Additional projects page (optional)
├── README.md              # This file
└── assets/
    └── images/
        ├── profile.png              # Your profile image
        ├── about-embedded.jpg       # About section image
        ├── README.md               # Image guidelines
        └── projects/
            ├── project1.jpg        # Project images
            ├── project2.jpg
            ├── project3.jpg
            ├── project4.jpg
            ├── project5.jpg
            └── project6.jpg
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `index.html` to update your personal information:

**Logo/Brand** (Line ~17):
```html
<h2 class="logo-heading">
    <i class="fas fa-microchip"></i> repvi
</h2>
```

**Hero Section** (Line ~61):
```html
<h1 class="my-heading">repvi</h1>
<h4 class="sub-heading"> 
    Embedded Systems Engineer | ESP32 Firmware Specialist
</h4>
```

**About Section** (Line ~80):
Update the paragraphs with your own story and experience.

**Contact Information** (Line ~320):
```html
<p class="contact-text">your.email@example.com</p>
```

### 2. Adding Your Projects

Each project in the Projects section follows this structure:

```html
<div class="project-card">
    <div class="project-image">
        <img src="./assets/images/projects/project1.jpg" alt="Project Name">
        <div class="project-overlay">
            <a href="https://github.com/repvi/project-repo" target="_blank" class="project-link">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        </div>
    </div>
    <div class="project-info">
        <h3 class="project-title">Your Project Name</h3>
        <div class="project-tags">
            <span class="tag">ESP32</span>
            <span class="tag">WiFi</span>
            <!-- Add more tags -->
        </div>
        <p class="project-description">
            Your project description here...
        </p>
        <div class="project-links">
            <a href="https://github.com/repvi/project-repo" target="_blank" class="btn-small">
                <i class="fab fa-github"></i> Code
            </a>
            <a href="#" class="btn-small">
                <i class="fas fa-info-circle"></i> Details
            </a>
        </div>
    </div>
</div>
```

**To add a new project:**
1. Copy an existing project card
2. Update the image source
3. Change project title and description
4. Update GitHub link
5. Adjust tags to match your project's tech stack

### 3. Updating Skills

In the Skills section, each skill card contains a list. To add/modify skills:

```html
<ul class="skill-list">
    <li>Skill 1</li>
    <li>Skill 2</li>
    <li>Skill 3</li>
</ul>
```

### 4. Adding Images

1. **Profile Image**: Save as `assets/images/profile.png`
2. **About Image**: Save as `assets/images/about-embedded.jpg`
3. **Project Images**: Save as `assets/images/projects/project1.jpg`, etc.

See `assets/images/README.md` for detailed image guidelines.

### 5. Social Links

Update social media links in the footer (Line ~380):

```html
<a class="footer-links" href="https://github.com/repvi" target="_blank">
<a class="footer-links" href="https://linkedin.com/in/yourprofile" target="_blank">
<a class="footer-links" href="mailto:your.email@example.com">
```

## 🎨 Color Customization

The color scheme is defined in `style.css` using CSS variables. To customize colors:

```css
:root {
    --primary-color: #00d4ff;      /* Main accent color */
    --secondary-color: #0066cc;    /* Secondary accent */
    --accent-color: #ff6b35;       /* Highlight color */
    --dark-bg: #0a0e27;           /* Main background */
    --darker-bg: #050814;         /* Section alternating background */
    --light-bg: #1a1f3a;          /* Card hover background */
    --text-primary: #ffffff;       /* Main text color */
    --text-secondary: #a0aec0;     /* Secondary text color */
}
```

## 📱 Responsive Breakpoints

The site is responsive with breakpoints at:
- **1024px**: Tablet landscape
- **768px**: Tablet portrait
- **480px**: Mobile
- **360px**: Small mobile

## 🚀 Deployment to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Save

2. **Your site will be available at**: `https://repvi.github.io`

3. **Custom Domain** (optional):
   - Add a `CNAME` file with your domain
   - Configure DNS settings with your domain provider

## 🔧 Local Development

To view the site locally:

1. **Simple Method**: Just open `index.html` in your browser

2. **Local Server** (recommended for testing):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
   Then visit `http://localhost:8000`

## ✨ Features Breakdown

### JavaScript Functionality (`script.js`)
- **Mobile Navigation**: Hamburger menu toggle
- **Smooth Scrolling**: Animated scroll to sections
- **Active Navigation**: Highlights current section in nav
- **Scroll Animations**: Fade-in effects for cards
- **Contact Form Validation**: Client-side form validation
- **Back to Top Button**: Smooth scroll to top
- **Notification System**: User feedback for form submission

### CSS Features (`style.css`)
- **CSS Grid & Flexbox**: Modern layout techniques
- **Custom Properties**: Easy color and spacing customization
- **Smooth Transitions**: Professional hover effects
- **Card Shadows**: Depth and hierarchy
- **Typography Scale**: Consistent text sizing

## 📝 To-Do After Setup

- [ ] Add your profile image
- [ ] Update about section with your story
- [ ] Add real project images and descriptions
- [ ] Link to your actual GitHub repositories
- [ ] Add your email and social media links
- [ ] Customize colors to your preference
- [ ] Test on different devices
- [ ] Add Google Analytics (optional)
- [ ] Set up contact form backend (optional)

## 🛠️ Optional Enhancements

### Add Google Analytics
Add to `<head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Contact Form Backend
Consider using:
- [Formspree](https://formspree.io) - Easy form backend
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- [EmailJS](https://www.emailjs.com) - Send emails from JavaScript

### Add Blog Section
Create a `blog.html` page to share tutorials and project write-ups.

## 📄 License

This portfolio template is free to use and modify for your personal portfolio.

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!

## 📞 Support

If you need help customizing this portfolio:
- Check the comments in the code files
- Review this README
- Open an issue on GitHub

---

**Built with ❤️ for embedded systems enthusiasts**

Happy coding! 🚀 
