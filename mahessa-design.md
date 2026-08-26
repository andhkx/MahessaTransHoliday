# DESIGN.md — Mahessa Trans Holiday

> Inspiration: Dibikinin.com (typography, spacing, clean aesthetic) + Hitou.my.id (glasmorphism navbar)
> Color source: Mahessa logo extraction
> Mobile-first, professional, trustworthy vibe

---

## 🎨 COLOR PALETTE

### Primary Colors (From Mahessa Logo)
- **Primary Blue (Dark):** `#004B96` (main brand color, navbar, headings, primary buttons)
- **Primary Blue (Medium):** `#0052A3` (alternative, hover states)
- **Accent Orange:** `#F39C12` (CTA buttons, highlights, accents, WhatsApp)
- **Light Blue (for accents):** `#0066CC` (secondary accents, links)

### Neutral Colors
- **Black:** `#000000` (text, primary content)
- **Dark Gray:** `#1A1A1A` (text, secondary content)
- **Medium Gray:** `#4D5156` (subtext, helper text)
- **Light Gray:** `#D8E2DC` (borders, dividers)
- **Lighter Gray:** `#F1F3F4` (backgrounds, subtle sections)
- **White:** `#FFFFFF` (main background)

### Status Colors
- **Success Green:** `#25D366` (confirmation, success states)
- **Warning Yellow:** `#FFC107` (alerts, cautions)
- **Error Red:** `#E74C3C` (errors, cancellations)

---

## 🔤 TYPOGRAPHY

### Font Family
**Primary:** `"Plus Jakarta Sans", sans-serif`
- Modern, clean, profesional
- Available on Google Fonts: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800

### Typography Scale

| Element | Size | Weight | Line-Height | Letter-Spacing | Usage |
|---------|------|--------|-------------|-----------------|-------|
| **H1** | 48px | 800 | 56px | -0.5px | Hero heading, main title |
| **H2** | 36px | 700 | 44px | -0.3px | Section title, page heading |
| **H3** | 28px | 700 | 36px | -0.2px | Subsection title, card title |
| **H4** | 24px | 600 | 32px | -0.1px | Feature title, bold text |
| **H5** | 20px | 600 | 28px | 0px | Medium heading |
| **H6** | 16px | 600 | 24px | 0px | Small heading |
| **Body Large** | 18px | 400 | 28px | 0px | Long-form text, descriptions |
| **Body Regular** | 16px | 400 | 24px | 0px | Default body text, paragraph |
| **Body Small** | 14px | 400 | 20px | 0px | Helper text, captions |
| **Caption** | 12px | 500 | 16px | 0.4px | Labels, tags, small info |
| **Button** | 16px | 600 | 24px | 0px | Button text, CTA labels |
| **Link** | 16px | 500 | 24px | 0px | Navigation links, inline links |

### Font Weights Used
- **400** — Regular (body text)
- **500** — Medium (links, small headings)
- **600** — Semibold (headings, buttons, emphasis)
- **700** — Bold (section titles, important text)
- **800** — Extrabold (hero heading)

---

## 🎯 COMPONENT SPECIFICATIONS

### NAVBAR
```
Structure:
├── Left: Logo Mahessa (image only, ~40px height)
├── Center: Menu items (Desktop only)
│   ├── Beranda (link)
│   ├── Armada (link)
│   ├── Paket (link)
│   ├── Galeri (link)
│   ├── FAQ (link)
│   └── Kontak (link)
└── Right: WhatsApp CTA Button (Desktop & Mobile)

Style:
- Background: Glassmorphism effect
  - Background color: rgba(255, 255, 255, 0.7)
  - Backdrop blur: 10px
  - Border: 1px solid rgba(0, 75, 150, 0.1)
  - Box shadow: 0 4px 30px rgba(0, 0, 0, 0.05)
- Height: 70px (desktop), 60px (mobile)
- Padding: 0 24px (desktop), 0 16px (mobile)
- Position: Sticky top
- Z-index: 1000

Menu Item:
- Font size: 16px / weight: 500
- Color: #000000
- Hover color: #004B96
- Transition: 0.2s ease

WhatsApp Button:
- Background: #F39C12 (orange)
- Color: #FFFFFF
- Padding: 10px 20px
- Border radius: 8px
- Font size: 16px / weight: 600
- Hover: Background #E67E22 (darker orange)
- Transition: 0.2s ease

Mobile Menu (Hamburger):
- Icon size: 24px
- Color: #000000
- Click opens full-screen menu overlay
- Menu overlay background: rgba(0, 0, 0, 0.95)
- Close button in top-right
```

### HERO SECTION
```
Layout:
├── Left (50% desktop, 100% mobile):
│   ├── H1 Heading (48px)
│   ├── Subtext (16px, medium gray)
│   └── CTA Buttons (2 buttons stacked on mobile, side-by-side on desktop)
└── Right (50% desktop, hidden on mobile):
    └── Hero Image (car photo, high quality)

H1 Heading:
- Text: "Perjalanan nyaman, kendaraan siap menemani."
- Font size: 48px (desktop), 32px (mobile)
- Font weight: 800
- Color: #000000
- Line height: 56px (desktop), 40px (mobile)
- Letter spacing: -0.5px
- Max width: 500px

Subtext:
- Font size: 18px (desktop), 16px (mobile)
- Color: #4D5156
- Line height: 28px
- Max width: 550px
- Margin top: 16px

CTA Buttons:
- Primary Button (WhatsApp):
  - Background: #F39C12 (orange)
  - Color: #FFFFFF
  - Padding: 16px 32px
  - Border radius: 8px
  - Font size: 16px / weight: 600
  - Box shadow: 0 4px 12px rgba(243, 156, 18, 0.3)
  - Hover: Background #E67E22, shadow grow
  - Transition: 0.2s ease

- Secondary Button (Lihat Armada):
  - Background: transparent
  - Color: #004B96
  - Border: 2px solid #004B96
  - Padding: 14px 30px
  - Border radius: 8px
  - Font size: 16px / weight: 600
  - Hover: Background rgba(0, 75, 150, 0.1)
  - Transition: 0.2s ease

Layout (Desktop):
- Buttons side-by-side, gap: 12px

Layout (Mobile):
- Buttons stacked vertically
- Full width, gap: 12px
- Margin top: 24px

Hero Image:
- Border radius: 12px
- Box shadow: 0 10px 40px rgba(0, 0, 0, 0.1)
- Object fit: cover
- Aspect ratio: 4/3 (mobile), 16/9 (desktop)
```

### CARD (Service/Feature Card)
```
Structure:
├── Icon (48x48px)
├── Heading (H4)
├── Description (Body small, 14px)
└── Link/CTA ("Lihat Detail →", link color)

Background: #FFFFFF
Border radius: 12px
Padding: 24px
Box shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
Transition: all 0.3s ease
Hover state:
  - Box shadow: 0 8px 20px rgba(0, 75, 150, 0.12)
  - Transform: translateY(-4px)

Border: 1px solid #F1F3F4

Icon:
- Size: 48px
- Color: #F39C12 (orange)
- Margin bottom: 16px

Heading:
- Font size: 20px
- Font weight: 600
- Color: #000000
- Margin bottom: 12px

Description:
- Font size: 14px
- Color: #4D5156
- Line height: 20px
- Margin bottom: 16px

Link:
- Font size: 14px
- Color: #004B96
- Font weight: 500
- Display: flex + align items
- Gap: 6px
- Hover: Color #0052A3
```

### VEHICLE/PACKAGE CARD
```
Structure:
├── Image (top, 100% width)
├── Body:
│   ├── Name/Title (H4)
│   ├── Meta info (specs, duration, capacity)
│   ├── Price (prominent, orange accent)
│   └── CTA Button (WhatsApp)

Background: #FFFFFF
Border radius: 12px
Box shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
Overflow: hidden
Transition: all 0.3s ease
Hover: 
  - Box shadow: 0 8px 20px rgba(0, 75, 150, 0.12)
  - Transform: translateY(-4px)

Image:
- Height: 200px (mobile), 220px (desktop)
- Object fit: cover
- Width: 100%

Body Padding: 16px (mobile), 20px (desktop)

Title:
- Font size: 18px
- Font weight: 600
- Color: #000000
- Margin bottom: 8px

Meta info:
- Font size: 13px
- Color: #4D5156
- Display: flex
- Gap: 8px
- Margin bottom: 12px

Price:
- Font size: 20px (mobile), 22px (desktop)
- Font weight: 700
- Color: #F39C12 (orange)
- Margin bottom: 12px

CTA Button:
- Same as "Button" section below
- Width: 100%
- Text: "Tanya via WhatsApp"
```

### BUTTON

#### Primary Button (CTA, Orange)
```
Background: #F39C12
Color: #FFFFFF
Padding: 12px 24px (small), 14px 28px (medium), 16px 32px (large)
Border radius: 8px
Font size: 14px (small), 16px (medium), 18px (large)
Font weight: 600
Border: none
Cursor: pointer
Box shadow: 0 4px 12px rgba(243, 156, 18, 0.3)
Transition: all 0.2s ease

Hover:
- Background: #E67E22
- Box shadow: 0 6px 16px rgba(243, 156, 18, 0.4)

Active:
- Background: #D35400
- Box shadow: 0 2px 8px rgba(243, 156, 18, 0.2)

Disabled:
- Background: #CCCCCC
- Color: #7B8B84
- Cursor: not-allowed
```

#### Secondary Button (Outline, Blue)
```
Background: transparent
Color: #004B96
Border: 2px solid #004B96
Padding: 10px 22px (small), 12px 26px (medium), 14px 30px (large)
Border radius: 8px
Font size: 14px (small), 16px (medium), 18px (large)
Font weight: 600
Cursor: pointer
Transition: all 0.2s ease

Hover:
- Background: rgba(0, 75, 150, 0.05)
- Border color: #0052A3
- Color: #0052A3

Active:
- Background: rgba(0, 75, 150, 0.1)
```

#### Text Link Button
```
Background: transparent
Color: #004B96
Font size: 16px
Font weight: 500
Cursor: pointer
Text decoration: none
Transition: 0.2s ease
Display: inline-flex
Align items: center
Gap: 6px

Hover:
- Color: #0052A3
- Text decoration: underline

Icon (if any):
- Size: 16px
- Margin left: 6px
```

### SECTION SPACING
```
Section padding (desktop):
- Top/bottom: 80px (large section), 60px (medium)
- Left/right: 40px

Section padding (mobile):
- Top/bottom: 48px
- Left/right: 16px

Container max-width: 1280px
Centered with margin: 0 auto
```

### SPACING SYSTEM
```
Base unit: 4px

Scale:
- 2px = 0.5 unit
- 4px = 1 unit
- 8px = 2 units
- 12px = 3 units
- 16px = 4 units
- 24px = 6 units
- 32px = 8 units
- 40px = 10 units
- 48px = 12 units
- 64px = 16 units
- 80px = 20 units

Default element gaps:
- Heading to subtext: 12px
- Section to section: 60px (desktop), 48px (mobile)
- Card to card: 20px (desktop), 16px (mobile)
```

### BORDER RADIUS
```
Small (icons, small elements): 4px
Medium (cards, moderate): 8px
Large (major sections): 12px
Rounded (pills, special): 9999px
Square (no radius): 0px
```

### SHADOWS
```
Subtle (borders, light elements):
- Box shadow: 0 1px 3px rgba(0, 0, 0, 0.05)

Card shadow (default):
- Box shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

Hover shadow (cards):
- Box shadow: 0 8px 20px rgba(0, 75, 150, 0.12)

Elevated shadow (modals, dropdowns):
- Box shadow: 0 10px 30px rgba(0, 0, 0, 0.15)

Button shadow (CTA):
- Box shadow: 0 4px 12px rgba(243, 156, 18, 0.3)
```

### TRANSITIONS & ANIMATIONS
```
Default transition: 0.2s ease
Hover/focus transition: all 0.2s ease

Easing:
- ease (default)
- ease-in-out (smoother)
- cubic-bezier(0.4, 0, 0.2, 1) (material design)

No animations should distract from content.
Keep animations subtle and purposeful.

Hover effects:
- Buttons: color change + shadow grow
- Cards: shadow grow + 4px translateY up
- Links: color change + underline
- Icons: slight scale or color change
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile-first approach:
- Base: 320px – 767px (mobile)
- Tablet: 768px – 1024px
- Desktop: 1025px+

Breakpoints in Tailwind/CSS:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Mobile adjustments:
- Font sizes: -2px to -4px smaller
- Padding: -8px to -16px less
- Margins: -8px to -12px less
- Full width elements: 100vw or 100%
- Single column layouts for cards/grid
```

---

## 🎬 SPECIFIC SECTIONS STYLING

### Quick Service Cards (4 cards)
```
Desktop: 4 columns grid
Tablet: 2 columns grid
Mobile: 1 column

Card count visible at once:
- Desktop: 4
- Tablet: 2
- Mobile: 1 (scroll)

Gap: 20px (desktop), 16px (mobile)
```

### Armada/Vehicle List
```
Desktop: 4 columns grid (carousel optional)
Tablet: 2 columns grid
Mobile: 1 column (horizontal scroll optional)

Show featured: 4-6 vehicles
"Lihat Semua →" button links to full list page

Carousel (if used):
- Smooth scroll
- Prev/next buttons (desktop only)
- Dots navigation (mobile optional)
```

### Paket/Package List
```
Desktop: 3-4 columns grid
Tablet: 2 columns
Mobile: 1 column

Show featured: 3-4 packages
"Lihat Semua →" button links to full list page

Card layout (compact):
- Image: 160px height
- No carousel, just grid
```

### FAQ Accordion
```
Each item:
- Header (clickable): 16px bold, full width
- Body (expandable): 14px regular, smooth open/close animation
- Icon (chevron): rotate on expand/collapse
- Divider: 1px solid #F1F3F4 between items

Expand animation:
- Max-height transition: 0.3s ease
- Opacity transition: 0.2s ease
- Padding animation: 0.2s ease

Expanded state:
- Background: rgba(0, 75, 150, 0.03) (very subtle blue)
- Icon rotates 180deg
```

### Gallery Section
```
Featured image:
- Aspect ratio: 16/9 (desktop), 4/3 (mobile)
- Border radius: 12px
- Box shadow: 0 10px 40px rgba(0, 0, 0, 0.1)
- Max width: 600px
- Margin: 0 auto 24px

Grid below:
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns
- Gap: 16px
- Image aspect ratio: 1/1 (square)
- Border radius: 12px
- Hover: Slight scale (1.05), shadow grow

"Lihat Galeri Lengkap →" link at bottom
```

### Galeri Full Page
```
Masonry layout:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 16px

Image size: Vary (some 2x2 in masonry for visual interest)
Aspect ratio: Mixed (1/1, 4/3, 3/4)
Lightbox on click (optional, fancy)
```

### Contact Form (if added)
```
Form fields:
- Input: border-radius 8px, border 1px solid #D8E2DC, padding 12px 16px
- Focus: border color #004B96, box shadow 0 0 0 3px rgba(0, 75, 150, 0.1)
- Placeholder: color #7B8B84
- Font size: 16px
- Line height: 24px

Textarea:
- Min height: 120px
- Resize: vertical only
- Same styling as input

Submit button:
- Primary button style (orange)
- Full width on mobile
- Auto width on desktop
- Margin top: 24px
```

---

## 🔍 COLOR USAGE GUIDELINES

| Color | Usage |
|-------|-------|
| **#004B96 (Primary Blue)** | Navbar bg, headings, primary text, links, secondary buttons |
| **#F39C12 (Orange)** | CTA buttons, WhatsApp, accents, highlights, price tags |
| **#000000 (Black)** | Body text, main content, heavy text |
| **#4D5156 (Medium Gray)** | Subtext, descriptions, helper text |
| **#D8E2DC (Light Gray)** | Borders, dividers, subtle lines |
| **#F1F3F4 (Lighter Gray)** | Section backgrounds, subtle bg fill |
| **#FFFFFF (White)** | Main background, card backgrounds, contrast |
| **#25D366 (Green)** | Success states, confirmations |
| **#FFC107 (Yellow)** | Warnings, alerts |
| **#E74C3C (Red)** | Errors, cancellations, danger states |

---

## 🎨 QUICK REFERENCE CHEAT SHEET

```
Brand Color: #004B96 (Mahessa Blue)
Accent Color: #F39C12 (Mahessa Orange)
Text: #000000
Secondary Text: #4D5156
Backgrounds: #FFFFFF, #F1F3F4

Font: Plus Jakarta Sans
Heading: 48px (H1), 36px (H2), 28px (H3), 24px (H4), 20px (H5)
Body: 16px (regular), 14px (small), 18px (large)

Border radius: 8px (cards), 12px (large), 4px (small)
Shadow: 0 2px 8px rgba(0,0,0,0.08) (default), 0 8px 20px (hover)
Spacing: 16px (standard padding), 24px (larger), 12px (smaller)

Navbar: Glassmorphic, 70px height, sticky
Buttons: Orange primary, blue secondary, text links
Cards: White bg, rounded, subtle shadow, hover effect
```

---

## 📐 IMPLEMENTATION NOTES

- Use **Tailwind CSS** for rapid styling
- Apply `@apply` for reusable component classes
- Leverage CSS variables for colors (for easy future changes)
- Mobile-first design approach (start with mobile, expand upward)
- Test all components on actual devices (not just browser devtools)
- Ensure **at least 4.5:1 contrast ratio** for accessibility
- Use **Next.js Image component** for optimized images
- Lazy load below-fold images
- Optimize PNGs/JPGs before upload (TinyPNG, ImageOptim)

---

**Last Updated:** 2026-08-26  
**Version:** 1.0  
**For:** Mahessa Trans Holiday website (Next.js + Tailwind)
