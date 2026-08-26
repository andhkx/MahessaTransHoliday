# DESIGN.md — Mahessa Trans Holiday v2

> Modern, bold, professional rental/travel aesthetic
> Color palette: Deep blue + sky blue theme
> Mobile-first, attention-grabbing design
> Inspiration: Dibikinin (clean spacing) + modern rental sites

---

## 🎨 COLOR PALETTE

### Primary Colors (Mahessa Blue Palette)
- **Dark Navy:** `#1B262C` (navbar bg, dark sections, text, strong contrast)
- **Primary Blue:** `#0F4C75` (buttons, headings, links, primary CTA)
- **Secondary Blue:** `#3282B8` (secondary elements, highlights, borders)
- **Light Sky Blue:** `#BBE1FA` (backgrounds, hover states, accents, light sections)

### Neutral Colors
- **Black:** `#000000` (body text, strong emphasis)
- **Dark Gray:** `#2C3E50` (secondary text, muted content)
- **Medium Gray:** `#7F8C8D` (helper text, captions, muted)
- **Light Gray:** `#ECF0F1` (subtle backgrounds, borders)
- **White:** `#FFFFFF` (main background, cards, contrast)

### Accent & Status
- **Green (Success):** `#27AE60` (confirmations, success states)
- **Yellow (Warning):** `#F39C12` (alerts, important notices)
- **Red (Error):** `#E74C3C` (errors, cancellations, danger)

---

## 🔤 TYPOGRAPHY

### Font Family
**Primary:** `"Plus Jakarta Sans", sans-serif`
- Weights: 400, 500, 600, 700, 800
- Google Fonts: https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800

### Typography Scale

| Element | Desktop Size | Mobile Size | Weight | Line-Height | Usage |
|---------|--------------|-------------|--------|-------------|-------|
| **H1** | 52px | 36px | 800 | 1.2 | Hero heading, page title (BOLD) |
| **H2** | 40px | 32px | 700 | 1.2 | Section heading (PROMINENT) |
| **H3** | 32px | 28px | 700 | 1.3 | Subsection heading |
| **H4** | 24px | 20px | 600 | 1.3 | Card title, feature heading |
| **H5** | 20px | 18px | 600 | 1.4 | Small heading |
| **H6** | 16px | 14px | 600 | 1.4 | Label, tag heading |
| **Body Large** | 18px | 16px | 400 | 1.6 | Long-form text, descriptions |
| **Body Regular** | 16px | 15px | 400 | 1.6 | Default text, paragraphs |
| **Body Small** | 14px | 13px | 400 | 1.5 | Helper text, captions, meta |
| **Caption** | 12px | 11px | 500 | 1.4 | Labels, tags, tiny info |
| **Button** | 16px | 14px | 600 | 1 | Button text, CTA labels |

### Font Weights Used
- **400** — Regular (body text, descriptions)
- **500** — Medium (links, secondary text)
- **600** — Semibold (button text, headings, emphasis)
- **700** — Bold (section titles, important text)
- **800** — Extrabold (hero heading, massive impact)

---

## 🎯 COMPONENT SPECIFICATIONS

### NAVBAR (AGGRESSIVE DESIGN)
```
Background:
- Color: #1B262C (dark navy)
- No transparency, solid & bold
- Box shadow: 0 2px 8px rgba(0, 0, 0, 0.15)

Structure:
├── Left: Logo Mahessa (40px height, white)
├── Center: Menu items (desktop only)
└── Right: WhatsApp CTA Button

Height: 72px (desktop), 64px (mobile)
Padding: 0 32px (desktop), 0 16px (mobile)
Position: Sticky top
Z-index: 1000

Menu Items:
- Font size: 15px / weight: 500
- Color: #FFFFFF (white, high contrast on dark)
- Hover: Color #BBE1FA (light blue), smooth transition
- Transition: 0.3s ease
- Gap between items: 24px (desktop)

WhatsApp Button (RIGHT):
- Background: #0F4C75 (primary blue)
- Color: #FFFFFF
- Padding: 12px 24px
- Border radius: 8px
- Font size: 15px / weight: 600
- Box shadow: 0 4px 12px rgba(15, 76, 117, 0.3)
- Hover:
  - Background: #3282B8 (secondary blue, lighter)
  - Box shadow: 0 6px 16px rgba(15, 76, 117, 0.4)
  - Transform: translateY(-2px)
- Active: Background #0A2F47 (darker)
- Transition: all 0.3s ease

Mobile Menu (Hamburger):
- Icon color: #FFFFFF
- Click opens overlay: Background rgba(0, 0, 0, 0.95)
- Menu items full-width, large touch targets
- Close button top-right
```

### HERO SECTION (BOLD & STRIKING)
```
Layout (Desktop):
├── Left (55%): Content
│   ├── H1 Heading (52px, bold, dark blue or navy)
│   ├── Subtext (18px, medium gray)
│   └── CTA Buttons (2 buttons, side-by-side)
└── Right (45%): Image (large, high quality car photo)

Layout (Mobile):
├── Content (full width)
└── Image (below content, full width)

H1 Heading:
- Size: 52px (desktop), 36px (mobile)
- Weight: 800 (BOLD, high impact)
- Color: #0F4C75 (primary blue) or #1B262C (dark navy)
- Letter spacing: -1px (compact, bold look)
- Line height: 1.1 (tight for impact)
- Max width: 550px
- Text: "Perjalanan nyaman, kendaraan siap menemani."

Subtext:
- Size: 18px (desktop), 16px (mobile)
- Color: #2C3E50 (dark gray)
- Weight: 400
- Line height: 1.6 (readable)
- Max width: 600px
- Margin top: 20px

CTA Buttons Container:
- Display: flex
- Gap: 16px
- Margin top: 32px

Button 1 (Primary - WhatsApp):
- Background: #0F4C75 (primary blue)
- Color: #FFFFFF
- Padding: 16px 36px (LARGER, more clickable)
- Border radius: 10px (slightly rounded)
- Font size: 16px / weight: 600
- Box shadow: 0 6px 20px rgba(15, 76, 117, 0.4) (PROMINENT)
- Hover:
  - Background: #3282B8 (secondary blue)
  - Box shadow: 0 8px 28px rgba(15, 76, 117, 0.5)
  - Transform: translateY(-3px)
- Transition: all 0.3s ease

Button 2 (Secondary):
- Background: transparent
- Color: #0F4C75 (primary blue)
- Border: 2.5px solid #0F4C75 (BOLD border)
- Padding: 14px 34px
- Border radius: 10px
- Font size: 16px / weight: 600
- Hover:
  - Background: #BBE1FA (light blue bg)
  - Border color: #0F4C75
  - Transform: translateY(-3px)
- Transition: all 0.3s ease

Mobile Button Layout:
- Stack vertically, full width
- Gap: 12px

Hero Image:
- Border radius: 16px
- Box shadow: 0 12px 40px rgba(0, 0, 0, 0.15) (STRONG shadow)
- Object fit: cover
- Aspect ratio: 4/3 (mobile), 16/9 (desktop)
- Margin top: 40px (mobile), 0 (desktop)
```

### QUICK SERVICE CARDS (4 CARDS - BOLD)
```
Layout:
- Desktop: 4 columns (grid)
- Tablet: 2 columns
- Mobile: 1 column (scrollable or stacked)
- Gap: 24px (desktop), 16px (mobile)

Card Style:
- Background: #FFFFFF (white)
- Border radius: 14px (more rounded)
- Padding: 32px 24px (spacious, not cramped)
- Box shadow: 0 4px 12px rgba(0, 0, 0, 0.08) (subtle)
- Border: 2px solid #BBE1FA (light blue border - adds personality)
- Transition: all 0.3s ease

Hover State:
- Box shadow: 0 12px 32px rgba(15, 76, 117, 0.2) (STRONG shadow on hover)
- Border color: #0F4C75 (darker blue border)
- Transform: translateY(-6px) (lift effect)
- Background: #F8FAFB (very subtle bg change)

Icon:
- Size: 56px
- Color: #0F4C75 (primary blue) — use icon font or SVG
- Margin bottom: 20px

Heading (H4):
- Font size: 24px / weight: 600
- Color: #1B262C (dark navy)
- Margin bottom: 12px

Description:
- Font size: 15px / weight: 400
- Color: #2C3E50 (dark gray)
- Line height: 1.6
- Margin bottom: 20px

Link/CTA:
- Font size: 15px / weight: 600
- Color: #0F4C75 (primary blue)
- Display: inline-flex + align items
- Gap: 8px
- Hover: Color #3282B8, underline appears
- Arrow icon: Slides right on hover (animation)

Container padding: 40px 24px (desktop), 24px 16px (mobile)
```

### VEHICLE/PACKAGE CARDS (ATTRACTIVE)
```
Structure:
├── Image (top, full width)
├── Content body:
│   ├── Badge/tag (optional - "Populer", "Best seller")
│   ├── Name/Title (H4)
│   ├── Meta info (specs, capacity, duration)
│   ├── Price (PROMINENT)
│   └── CTA Button

Card Style:
- Background: #FFFFFF
- Border radius: 14px
- Box shadow: 0 4px 16px rgba(0, 0, 0, 0.09) (noticeable)
- Overflow: hidden
- Transition: all 0.3s ease

Hover State:
- Box shadow: 0 16px 40px rgba(15, 76, 117, 0.2) (STRONG lift)
- Transform: translateY(-8px) (aggressive lift)

Image:
- Height: 220px (mobile), 240px (desktop)
- Width: 100%
- Object fit: cover
- Background: #ECF0F1 (light gray placeholder)

Badge (if applicable):
- Background: #0F4C75 (primary blue)
- Color: #FFFFFF
- Padding: 6px 14px
- Border radius: 20px (pill shape)
- Font size: 12px / weight: 600
- Position: absolute top-right, margin: 12px
- z-index: 10

Body Padding: 20px (mobile), 24px (desktop)

Title (H4):
- Font size: 22px / weight: 700
- Color: #1B262C (dark navy)
- Margin bottom: 10px

Meta Info:
- Font size: 14px / weight: 500
- Color: #7F8C8D (medium gray)
- Display: flex + gap: 12px
- Examples: "7 seats" · "Automatic" · "24 jam"
- Margin bottom: 16px
- Use separator dots or icons

Price:
- Font size: 26px (desktop), 24px (mobile)
- Font weight: 700
- Color: #0F4C75 (primary blue) — BOLD COLOR
- Margin bottom: 16px
- Display: flex + align items
- Text: "Mulai Rp350.000 / 24 jam" (include "Mulai dari" for clarity)

CTA Button:
- Background: #0F4C75 (primary blue)
- Color: #FFFFFF
- Width: 100%
- Padding: 14px 16px
- Border radius: 10px
- Font size: 15px / weight: 600
- Border: none
- Cursor: pointer
- Hover:
  - Background: #3282B8 (lighter blue)
  - Box shadow: 0 4px 12px rgba(15, 76, 117, 0.3)
  - Transform: scale(1.02)
- Transition: all 0.2s ease
```

### BUTTONS (PRIMARY)
```
Primary Button (Blue CTA):
- Background: #0F4C75 (primary blue)
- Color: #FFFFFF
- Padding: 14px 28px (medium), 16px 36px (large)
- Border radius: 10px
- Font size: 15px / weight: 600
- Border: none
- Cursor: pointer
- Box shadow: 0 4px 12px rgba(15, 76, 117, 0.3)
- Transition: all 0.3s ease

Hover:
- Background: #3282B8 (secondary blue, lighter)
- Box shadow: 0 6px 20px rgba(15, 76, 117, 0.4)
- Transform: translateY(-2px)

Active/Pressed:
- Background: #0A2F47 (darker)
- Box shadow: 0 2px 8px rgba(15, 76, 117, 0.2)
- Transform: translateY(0)

Disabled:
- Background: #BDC3C7 (light gray)
- Color: #7F8C8D (muted text)
- Cursor: not-allowed
- Box shadow: none
```

### BUTTONS (SECONDARY)
```
Secondary Button (Outline Blue):
- Background: transparent
- Color: #0F4C75 (primary blue)
- Border: 2.5px solid #0F4C75 (BOLD border)
- Padding: 12px 26px (medium), 14px 34px (large)
- Border radius: 10px
- Font size: 15px / weight: 600
- Cursor: pointer
- Transition: all 0.3s ease

Hover:
- Background: #BBE1FA (light blue bg)
- Border color: #0F4C75
- Color: #1B262C
- Transform: translateY(-2px)

Active:
- Background: #3282B8
- Color: #FFFFFF
- Border color: #0F4C75
```

### SPACING SYSTEM
```
Base unit: 4px

Scale:
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px

Default gaps:
- Section padding: 40px (desktop), 24px (mobile)
- Card gap: 24px (desktop), 16px (mobile)
- Element gap: 12px (small), 16px (medium), 20px (large)
- Button gaps: 12px

Headings:
- Heading to subheading: 12px
- Heading to body: 16px
- Section to section: 64px (desktop), 48px (mobile)
```

### BORDER RADIUS
```
Small (inputs, small buttons): 6px
Medium (cards, buttons): 10px
Large (hero sections, large cards): 14px-16px
Pill (badges, tags): 9999px
```

### SHADOWS (PROMINENT)
```
Subtle (borders): 0 1px 3px rgba(0, 0, 0, 0.05)
Card (default): 0 4px 12px rgba(0, 0, 0, 0.08)
Card hover: 0 12px 32px rgba(15, 76, 117, 0.2)
Button shadow: 0 4px 12px rgba(15, 76, 117, 0.3)
Elevated (modals): 0 10px 40px rgba(0, 0, 0, 0.15)
Hero image: 0 12px 40px rgba(0, 0, 0, 0.15)
```

### TRANSITIONS
```
Default: 0.3s ease
Fast: 0.2s ease
Slow: 0.4s ease-in-out

Transform transitions: scale, translateY, translateX
Color transitions: background, color, border-color
Shadow transitions: box-shadow

No animations should be jarring. Keep smooth & professional.
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile-first approach:
- Mobile: 320px – 767px (base)
- Tablet: 768px – 1024px
- Desktop: 1025px+

Tailwind breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

Mobile adjustments:
- Font sizes: -2px to -4px smaller
- Padding: -8px to -12px less
- Margins: -8px to -12px less
- Full-width layouts for single column
- Touch targets: minimum 44px height
```

---

## 🎬 SECTION-SPECIFIC STYLING

### HERO SECTION
```
Container:
- Min height: 100vh (desktop), 80vh (mobile)
- Display: flex / align items center
- Padding: 80px 40px (desktop), 48px 24px (mobile)
- Max width: 1280px / centered

Left column (55% desktop):
- Flex: 1

Right column (45% desktop):
- Display: none (mobile)
- Flex: 1
- Image container

Image:
- Max width: 100%
- Border radius: 16px
- Box shadow: 0 12px 40px rgba(0, 0, 0, 0.15)
```

### QUICK SERVICE SECTION
```
Container padding: 60px 40px (desktop), 40px 24px (mobile)
Background: #FFFFFF
Grid: 4 columns (desktop), 2 (tablet), 1 (mobile)
Gap: 24px (desktop), 16px (mobile)

Heading (H2):
- Margin bottom: 40px
- Text align: center or left
```

### ARMADA/VEHICLES SECTION
```
Container padding: 60px 40px (desktop), 40px 24px (mobile)
Background: #F8FAFB (very light gray, subtle change)

Heading with "Lihat Semua" link:
- Display: flex / justify-between
- Margin bottom: 40px
- Responsive: Stack on mobile

Grid/Carousel:
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column + horizontal scroll (optional)
- Gap: 24px (desktop), 16px (mobile)

Show 4-6 vehicles in featured section
Link to full /armada page for rest
```

### PAKET/PACKAGES SECTION
```
Container padding: 60px 40px (desktop), 40px 24px (mobile)
Background: #FFFFFF

Heading:
- Margin bottom: 40px

Grid:
- Desktop: 3-4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px (desktop), 16px (mobile)

Show 3-4 packages featured
Link to /paket for full list
```

### KENAPA MAHESSA SECTION
```
Container padding: 60px 40px (desktop), 40px 24px (mobile)
Background: #BBE1FA (light sky blue - use for accent)

Heading (centered):
- Text align: center
- Margin bottom: 50px
- Color: #1B262C (dark navy)

Grid of 4 benefits:
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 20px (desktop), 12px (mobile)

Each benefit card:
- Background: #FFFFFF
- Padding: 28px
- Border radius: 12px
- Text align: center or left
- Box shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
- No hover effect (static info)
```

### GALERI SECTION
```
Container padding: 60px 40px (desktop), 40px 24px (mobile)
Background: #FFFFFF

Heading + CTA link:
- Display: flex / justify-between / align items center
- Margin bottom: 40px

Featured image:
- Aspect ratio: 16/9 (desktop), 4/3 (mobile)
- Border radius: 16px
- Box shadow: 0 10px 40px rgba(0, 0, 0, 0.12)
- Max width: 100%
- Margin bottom: 32px

Grid below featured:
- Desktop: 4 columns
- Tablet: 3 columns
- Mobile: 2 columns
- Gap: 16px
- Image aspect ratio: 1/1 (square)
- Border radius: 12px
- Hover:
  - Scale: 1.05
  - Box shadow: 0 8px 20px rgba(0, 0, 0, 0.1)
  - Cursor: pointer (indicates clickable)
```

### FAQ SECTION
```
Container padding: 60px 40px (desktop), 40px 24px (mobile)
Background: #F8FAFB (light gray)

Heading:
- Margin bottom: 40px
- Text align: center or left

Accordion container:
- Max width: 800px
- Margin: 0 auto

Each FAQ item:
- Background: #FFFFFF
- Border: 1px solid #ECF0F1
- Border radius: 10px
- Margin bottom: 12px
- Overflow: hidden

Header (clickable):
- Padding: 20px 24px
- Display: flex / justify-between / align items center
- Font size: 16px / weight: 600
- Color: #1B262C
- Cursor: pointer
- Hover: Background #F8FAFB
- Transition: 0.2s ease

Icon (chevron):
- Size: 20px
- Color: #0F4C75
- Rotate: 0deg (closed) → 180deg (open)
- Transition: 0.3s ease

Body (expandable):
- Padding: 0 24px (collapsed), 20px 24px (expanded)
- Max height: 0 (collapsed), auto (expanded)
- Overflow: hidden
- Font size: 15px / weight: 400
- Color: #2C3E50
- Line height: 1.6
- Transition: all 0.3s ease
- Background: #FFFFFF (when expanded)
```

### CTA SECTION (BEFORE FOOTER)
```
Container:
- Background: #0F4C75 (primary blue - bold!)
- Color: #FFFFFF
- Padding: 80px 40px (desktop), 48px 24px (mobile)
- Text align: center

Heading (H2):
- Color: #FFFFFF
- Margin bottom: 16px
- Font size: 40px (desktop), 28px (mobile)

Description:
- Color: #BBE1FA (light blue text for contrast on dark bg)
- Font size: 18px / weight: 400
- Max width: 700px / centered
- Margin bottom: 32px
- Line height: 1.6

Button:
- Background: #FFFFFF (white button on blue bg)
- Color: #0F4C75 (blue text)
- Padding: 16px 40px
- Border radius: 10px
- Font size: 16px / weight: 600
- Hover:
  - Background: #BBE1FA (light blue)
  - Box shadow: 0 6px 20px rgba(0, 0, 0, 0.2)
```

### FOOTER
```
Background: #1B262C (dark navy - match navbar)
Color: #FFFFFF (white text)
Padding: 60px 40px (desktop), 40px 24px (mobile)

Content:
├── Logo + tagline (left)
├── Links (center columns)
└── Contact info (right)

Grid:
- Desktop: 4-5 columns
- Tablet: 2 columns
- Mobile: 1 column (stacked)
- Gap: 40px (desktop), 24px (mobile)

Section headings (H5):
- Color: #FFFFFF
- Font size: 16px / weight: 600
- Margin bottom: 16px

Links:
- Color: #BBE1FA (light blue)
- Font size: 14px / weight: 400
- Line height: 1.8
- Hover: Color #FFFFFF, underline

Divider (top):
- Border top: 1px solid rgba(255, 255, 255, 0.1)

Copyright:
- Font size: 12px
- Color: #7F8C8D (muted gray)
- Margin top: 32px
- Text align: center
- Border top: 1px solid rgba(255, 255, 255, 0.1)
- Padding top: 24px
```

---

## 🎨 COLOR USAGE QUICK REFERENCE

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Navy | #1B262C | Navbar bg, dark sections, footer, text |
| Primary Blue | #0F4C75 | Buttons, headings, primary text, icons |
| Secondary Blue | #3282B8 | Hover states, secondary elements |
| Light Sky Blue | #BBE1FA | Light backgrounds, accents, hover fills |
| Black | #000000 | Strong body text, emphasis |
| Dark Gray | #2C3E50 | Secondary text, descriptions |
| Medium Gray | #7F8C8D | Helper text, captions, muted |
| Light Gray | #ECF0F1 | Borders, dividers, subtle bg |
| White | #FFFFFF | Main bg, cards, contrast |
| Green | #27AE60 | Success, confirmations |
| Yellow | #F39C12 | Warnings, important notices |
| Red | #E74C3C | Errors, cancellations |

---

## ✅ AGGRESSIVE DESIGN SUMMARY

✅ **Bold Typography** — H1 at 52px, weight 800 (not timid)  
✅ **Prominent Shadows** — Cards lift on hover, not subtle  
✅ **Strong Color Contrast** — Dark navy navbar + light sky blue accents  
✅ **Spacious Layouts** — Not cramped, breathing room everywhere  
✅ **Eye-Catching CTAs** — Blue buttons that pop, not muted  
✅ **Smooth Animations** — 0.3s transitions, not instant  
✅ **Professional + Modern** — Not template-y, not outdated  
✅ **Mobile-First** — Truly optimized for phones  

---

**Version:** 2.0 (New color palette)  
**Updated:** 2026-08-26  
**For:** Mahessa Trans Holiday (Next.js + Tailwind CSS)
