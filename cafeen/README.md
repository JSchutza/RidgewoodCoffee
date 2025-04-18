# Ridgewood Coffee Website

A modern, responsive website for Ridgewood Coffee, a fictional local coffee shop in the heart of Ridgewood, NY. The site showcases the shop's brand, menu, photos, and contact information.

![Ridgewood Coffee Website Screenshot](screenshot.png)

## 📋 Overview

Ridgewood Coffee is a fictional coffee shop that prides itself on quality coffee, local sourcing, and community connections. This website serves as their digital storefront, allowing customers to explore their menu, view their space, and get in touch.

The site features:
- Responsive design that works on mobile, tablet, and desktop
- Modern UI with smooth animations and transitions
- Interactive navigation with smooth scrolling
- Detailed menu section with item categorization
- Image gallery with lightbox functionality
- Contact form with validation
- Google Maps integration

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS for utility-first styling
- **Build Tool**: Vite for fast development and optimized builds
- **Animation**: CSS animations and transitions
- **Form Handling**: React Hook Form for validation
- **UI Components**: Headless UI for accessible components
- **Scroll Effects**: React Scroll for smooth navigation
- **Intersection Observer**: React Intersection Observer for scroll animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ridgewood-coffee.git
   cd ridgewood-coffee
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## 📦 Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

The optimized build will be available in the `dist` directory.

## 🌐 Deployment

The site is deployed on Vercel and can be accessed at:

[https://ridgewood-coffee.vercel.app](https://ridgewood-coffee.vercel.app)

## 🧪 Performance & Accessibility

The website has been optimized for:
- Fast loading (< 2s on broadband)
- High Lighthouse scores (90+ for Performance, Accessibility, Best Practices)
- Keyboard navigation
- Screen reader compatibility
- Responsive design (mobile, tablet, desktop)

## 📁 Project Structure

```
ridgewood-coffee/
├── public/
│   ├── images/
│   │   ├── gallery/
│   │   └── hero-bg.jpg
│   └── coffee-favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Menu.tsx
│   │       ├── Gallery.tsx
│   │       └── Contact.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔄 Future Improvements

- Add online ordering functionality
- Implement a blog section for coffee tips and shop news
- Create an events calendar
- Add dark mode toggle
- Implement more advanced animations

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [TailwindCSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Headless UI](https://headlessui.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [React Scroll](https://github.com/fisshy/react-scroll) 