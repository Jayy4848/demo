# ATEX Zone 0 Certified Robot Website

A professional, modern website showcasing ATEX Zone 0 Certified Robot technology for hazardous confined space operations.

## Design Inspiration

This website is designed with inspiration from:
- **Unibose.com** - Clean, modern industrial design
- **Arhamoil.com** - Professional service presentation

## Features

### 🎨 Design Elements
- Modern, clean interface with smooth animations
- Responsive design for all devices
- Professional color scheme inspired by industrial standards
- Interactive 3D robot presentation viewer
- Smooth scrolling navigation

### 📋 Sections
1. **Hero Section** - Powerful introduction with call-to-action
2. **Stats Section** - Key metrics and achievements
3. **Product Showcase** - 3D robot presentation with detailed specifications
4. **Features Section** - Key innovations and capabilities
5. **Applications Section** - Industry use cases
6. **CTA Section** - Strong call-to-action
7. **Contact Section** - Contact form and information
8. **Footer** - Additional links and information

### 🤖 Robot Specifications Display
Comprehensive technical specifications including:
- Safety & Certification details
- Physical dimensions
- Performance capabilities
- Technology features
- Applications

## Setup Instructions

### 1. Add Your Robot Image
Place your robot image (the ATEX Zone 0 Certified Robot photo) in the project root directory and name it:
- `robot.jpg`

### 2. Add Logo Images (Optional)
Create or add these optional logo files:
- `atex-logo.png` - ATEX certification logo
- `atex-icon.svg` - ATEX icon for badges
- `iecex-icon.svg` - IECEx icon for badges

### 3. Open the Website
Simply open `index.html` in your web browser to view the website.

## File Structure

```
project/
│
├── index.html          # Main HTML file
├── styles.css          # All styles and responsive design
├── script.js           # Interactive functionality
├── README.md           # This file
│
└── images/ (to be added)
    ├── robot.jpg       # Main robot image
    ├── atex-logo.png   # ATEX logo
    ├── atex-icon.svg   # ATEX badge icon
    └── iecex-icon.svg  # IECEx badge icon
```

## Key Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations, gradients, and flexbox/grid
- **Vanilla JavaScript** - Interactive features without dependencies
- **Intersection Observer API** - Scroll-triggered animations
- **CSS Grid & Flexbox** - Responsive layouts

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #1a1a1a;
    --accent-color: #ff6b35;
    /* ... more colors */
}
```

### Content
All content can be edited directly in `index.html`:
- Company name
- Robot specifications
- Contact information
- Feature descriptions

### Images
Replace placeholder images with your actual images:
1. Robot main image: `robot.jpg`
2. Certification logos
3. Application images (optional)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Features Highlights

### Interactive Elements
- ✅ Smooth scroll navigation
- ✅ Animated counters for statistics
- ✅ Hover effects on cards and buttons
- ✅ Parallax hero section
- ✅ View selector for robot display
- ✅ Intersection Observer animations
- ✅ Form validation and submission

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop full experience
- ✅ Touch-friendly buttons

## Performance

The website is optimized for performance:
- Minimal dependencies (no frameworks)
- Optimized CSS
- Efficient animations using CSS transforms
- Lazy-loaded animations via Intersection Observer

## Deployment

### Local Development
1. Place all files in a directory
2. Add your robot image as `robot.jpg`
3. Open `index.html` in a browser

### Production Deployment
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect to Git repository
- **GitHub Pages**: Push to `gh-pages` branch
- **Traditional hosting**: Upload via FTP

## Customization Guide

### Update Company Information
Edit the following in `index.html`:
- Line 18: Company name in navbar
- Lines 36-39: Hero title and subtitle
- Lines 251-269: Contact information

### Update Robot Specifications
Edit specifications in the `.specifications` section (lines 87-175 in index.html)

### Add More Features
Add feature cards in the `.features-grid` section (lines 181-235)

### Modify Colors
Update CSS variables in `styles.css` (lines 9-22)

## License

This is a custom website design. Modify and use as needed for your project.

## Credits

- Design inspired by modern industrial robotics websites
- Icons and emojis: Unicode characters
- Fonts: Inter font family from Google Fonts

## Support

For questions or customization needs, refer to the code comments in each file.

---

**Note**: Remember to replace the placeholder robot image with your actual ATEX Zone 0 Certified Robot image by saving it as `robot.jpg` in the project root directory.
