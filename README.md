# RedHawks - Burger & Kebab Restaurant Website

A beautiful, modern React website for RedHawks restaurant, featuring a dark theme with red accents, smooth animations, and a fully responsive design.

## Features

- 🎨 **Modern Design**: Dark theme with elegant red accents and smooth animations
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🎯 **Interactive Menu**: Filter menu items by category (Burgers, Kebabs, Sides)
- 🎭 **Smooth Animations**: Hover effects and transitions throughout
- 📧 **Newsletter Signup**: Functional newsletter subscription form
- 🗺️ **Location Map**: Embedded Google Maps with custom styling

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library
- **Google Fonts** - Oswald (headings) & Inter (body)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
RedHawks/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar with mobile menu
│   │   ├── Hero.jsx         # Hero section with main heading
│   │   ├── Story.jsx        # "The Origin" story section
│   │   ├── Menu.jsx         # Menu with filtering functionality
│   │   ├── Journal.jsx      # Blog/journal articles section
│   │   ├── Newsletter.jsx   # Newsletter subscription form
│   │   └── Footer.jsx       # Footer with map and links
│   ├── data/
│   │   └── menuItems.js     # Menu items data
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and Tailwind imports
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Customization

### Menu Items

Edit `src/data/menuItems.js` to add, remove, or modify menu items.

### Colors & Styling

The design uses Tailwind CSS with custom colors. Main colors:
- Background: `stone-950` (#0c0a09)
- Accent: `red-600/700` (#dc2626)
- Text: `stone-200-400` (various shades)

### Fonts

Fonts are loaded from Google Fonts:
- **Oswald**: Used for headings (uppercase)
- **Inter**: Used for body text

## Features in Detail

### Menu Filtering

The menu section includes interactive filtering:
- Click category buttons to filter items
- "All Items" shows everything
- Categories: Burgers, Kebabs, Sides

### Mobile Menu

The navigation includes a responsive mobile menu that toggles on smaller screens.

### Newsletter

The newsletter form includes basic validation and can be connected to your email service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For questions or support, contact: hello@redhawks.com

