# ITZFIZZ // McLaren 720S Scroll-Driven Hero Section Animation

A high-performance, scroll-driven interactive hero section animation inspired by McLaren hypercar aerodynamics and modern telemetry dashboards. Built with **React 19**, **GSAP (ScrollTrigger)**, **Tailwind CSS**, and the **Web Audio API**.

---

## 🏎️ Live Demo & Reference

- **Original Reference Demo:** [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)
- **Built for:** Frontend Animation & Interaction Design Assignment

---

## ✨ Key Features & Functional Requirements

### 1. Hero Section Layout (Above the Fold)
- **Letter-Spaced Headline:** Sleek modern typography displaying `W E L C O M E   I T Z F I Z Z` in Google Font Orbitron with subtle letter spacing and atmospheric lighting.
- **Impact Metrics / Statistics Cards:**
  - `58%` Increase in pick-up point use (Stage 01 • Cyber Lime/Yellow)
  - `23%` Decrease in customer phone calls (Stage 02 • Electric Monaco Cyan)
  - `27%` Increase in delivery turnaround (Stage 03 • Carbon Slate)
  - `40%` Reduction in dispatch latency (Stage 04 • Papaya Orange)
- **Collision-Free Vertical Tiers:** Structured into dedicated tiers (Top Headline → Upper Stat Tier → Central Road Runway → Lower Stat Tier → Bottom Telemetry HUD) preventing any card or text collisions across screen resolutions.

### 2. Initial Load Animation
- Staggered entrance timeline powered by GSAP:
  - Letters of the headline reveal with a staggered upward slide (`y: 25 -> 0`, `opacity: 0 -> 1`).
  - Stat cards animate in sequentially with subtle delays.
  - Numbers dynamically count up from `0%` to their target percentages (`58%`, `23%`, `27%`, `40%`) via numeric interpolation.
  - The McLaren 720S accelerates onto the starting line with illuminated headlight projection.

### 3. Scroll-Based Animation (Core Feature)
- **Pinned Track Scrubbing:** The hero section pins (`pin: true`) across a multi-screen scroll track using GSAP `ScrollTrigger` with inertial dampening (`scrub: 0.8`).
- **Dynamic Runway Letters Reveal:** As the McLaren travels horizontally along the road, the runway letters `W E L C O M E   I T Z F I Z Z` dynamically ignite into solid black typography right behind the vehicle over the expanding neon green trail (`#45db7d`).
- **Active Metric Checkpoints:** As the car crosses milestone scroll points (28%, 50%, 74%, 94%), each statistic card highlights with an active pulse, glowing halo ring, and active status badge.
- **Smooth Interpolation:** Position calculations use continuous scroll progress rather than time-based autoplay, allowing full bi-directional scrubbing forward and backward.

### 4. Motion & Performance Guidelines
- **Hardware-Accelerated CSS Transforms:** Movement strictly utilizes GPU-composited `transform: translate3d(...)` and `scale`, preventing expensive DOM layout reflows and repaints.
- **Will-Change Optimization:** Critical animated layers promote to dedicated compositor layers.
- **React Context Isolation:** GSAP animations are initialized inside `gsap.context()`, guaranteeing complete cleanup and preventing memory leaks.
- **Fully Responsive:** Seamlessly adapts from 4K ultrawide monitors down to 390px mobile screens without text clipping or horizontal layout overflow.

### 5. Extra Supercharged Features
- 🎨 **Dynamic Livery Studio:** Switch exterior car finishes on the fly (Papaya Spark Orange, Cyber Lime, Monaco Cyan, Ultra Violet, Obsidian Stealth).
- 🔊 **Synthesized V8 Engine Acoustics:** Interactive Web Audio API engine rumble with real-time throttle pitch modulation tied to scroll velocity (zero external audio files).
- 📊 **Live Telemetry Matrix HUD:** Real-time speedometer (0-212 MPH), tachometer (8,500 RPM redline), active gear transmission indicator (N through 6), and downforce calculation.
- 🎚️ **Manual Scrub Slider:** Interactive slider allowing evaluators to preview the exact scroll scrub progression without touching the trackpad.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React.js 19** | Component architecture, state management, and lifecycle hooks |
| **GSAP 3.12** | Timeline orchestration and initial load micro-animations |
| **GSAP ScrollTrigger** | Scroll-driven pinned track, inertial scrub, and milestone callbacks |
| **Tailwind CSS** | Utility-first responsive design, typography, and glassmorphism |
| **Vite** | Blazing-fast development environment and optimized bundle builder |
| **Web Audio API** | Real-time procedural V8 engine audio synthesizer |
| **Lucide React** | Lightweight icons for telemetry indicators and UI controls |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd Scroll-animation

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Building for Production & GitHub Pages

To create an optimized production build:

```bash
npm run build
```

The output bundle will be located in the `dist/` directory.

### Deploying to GitHub Pages
A pre-configured GitHub Actions workflow is provided in `.github/workflows/deploy.yml`.

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete scroll-driven hero section animation"
   git push -u origin main
   ```
2. In your GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The workflow will automatically build and deploy your site to `https://<username>.github.io/<repo-name>/`.

---

## 📂 Project Architecture

```
Scroll-animation/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment automation
├── public/
│   └── mclaren.png             # High-resolution McLaren 720S top-view PNG
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header, livery selector & audio controls
│   │   ├── HeroSection.jsx     # Pinned GSAP ScrollTrigger hero animation
│   │   ├── SpeedometerHUD.jsx  # Live telemetry matrix & manual scrub slider
│   │   ├── SpecsSection.jsx    # McLaren powertrain specifications & livery studio
│   │   ├── ArchitectureInfo.jsx# Code snippets & performance documentation
│   │   └── Footer.jsx          # Footer & scroll-to-top button
│   ├── utils/
│   │   └── soundEngine.js      # Procedural Web Audio API engine sound generator
│   ├── App.jsx                 # Main application state and layout container
│   ├── index.css               # Design system, asphalt textures, and Tailwind directives
│   └── main.jsx                # Application root entry
├── index.html                  # HTML entry with Google Fonts (Orbitron, Plus Jakarta Sans)
├── tailwind.config.js          # Custom theme configuration
├── vite.config.js              # Vite config with relative base path
└── package.json                # Dependencies and scripts
```
