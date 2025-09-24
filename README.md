# pgElephant Website

A modern, responsive website built with Next.js showcasing pgElephant's high-performance database solutions including RAM (PostgreSQL clustering), RALE (distributed consensus), and FauxDB (MongoDB-compatible database).

## Features

### Products Showcased
- **RAM** - Resilient Adaptive Manager for PostgreSQL clustering with automatic failover
- **RALE** - Resilient Adaptive Leader Election for distributed consensus systems
- **FauxDB** - MongoDB-compatible document database built in Rust with PostgreSQL backend

### Website Features
- **Next.js 15** with App Router for optimal performance
- **Tailwind CSS** for responsive, modern design
- **SEO Optimized** with comprehensive meta tags, structured data, and sitemaps
- **Mobile-First** responsive design
- **Static Generation** for fast loading and SEO benefits
- **Accessibility** with proper alt text and semantic HTML
- **Analytics Ready** with Google Search Console integration

## Tech Stack

- **Framework**: Next.js 15.5.4
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Static site generation
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards

## Project Structure

```
www/
├── app/                          # Next.js App Router
│   ├── blog/                     # Blog pages
│   │   ├── [slug]/              # Dynamic blog posts
│   │   ├── rale/                # RALE blog post
│   │   ├── ram/                 # RAM blog post
│   │   └── page.tsx             # Blog listing
│   ├── docs/                     # Documentation
│   │   ├── ram/getting-started/ # RAM documentation
│   │   ├── rale/getting-started/# RALE documentation
│   │   ├── fauxdb/getting-started/ # FauxDB documentation
│   │   └── page.tsx             # Documentation landing
│   ├── ram/                      # RAM product page
│   │   ├── prometheus/          # RAM monitoring page
│   │   └── page.tsx             # RAM main page
│   ├── rale/                     # RALE product page
│   │   └── page.tsx             # RALE main page
│   ├── fauxdb/                   # FauxDB product page
│   │   └── page.tsx             # FauxDB main page
│   ├── community/                # Community page
│   ├── contact/                  # Contact page
│   ├── download/                 # Download page
│   ├── layout.tsx               # Root layout with SEO
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   ├── Hero.tsx                 # Homepage hero section
│   └── Community.tsx            # Community component
├── public/                       # Static assets
│   ├── ico/                     # Product icons
│   ├── robots.txt               # SEO robots file
│   ├── sitemap.xml              # SEO sitemap
│   └── favicon.ico              # Site favicon
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.js               # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pge/www
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Pages Overview

### Homepage (`/`)
- Hero section with product showcase
- Interactive product tabs (RAM, RALE, FauxDB)
- Feature highlights and call-to-actions

### Product Pages
- **RAM** (`/ram`) - PostgreSQL clustering solution
- **RALE** (`/rale`) - Distributed consensus system  
- **FauxDB** (`/fauxdb`) - MongoDB-compatible database

### Documentation (`/docs`)
- Getting started guides for all products
- API references and configuration examples
- Best practices and troubleshooting

### Blog (`/blog`)
- Technical articles and insights
- Product updates and announcements
- Community stories and case studies

### Additional Pages
- **Community** (`/community`) - Discord, GitHub, Forums
- **Contact** (`/contact`) - Support and inquiries
- **Download** (`/download`) - Installation packages

## Design System

### Color Palette
Based on the pgElephant brand colors:
- **Primary Teal**: `#025A6B` (iconTeal)
- **Light Teal**: `#036B7D` (iconTealLight)  
- **Dark Teal**: `#054A56` (iconTealDark)
- **Accent Colors**: Cyan, Orange, Emerald, Violet, Amber

### Typography
- **Primary Font**: Open Sans (Google Fonts)
- **Secondary Font**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Components
- Responsive grid layouts
- Gradient backgrounds
- Card-based content sections
- Interactive hover states
- Consistent spacing and typography

## SEO Features

### Meta Tags
- Comprehensive page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card optimization
- Canonical URLs

### Structured Data
- Organization schema
- Software application schemas
- Product information markup
- Breadcrumb navigation

### Technical SEO
- XML sitemap (`/sitemap.xml`)
- Robots.txt configuration
- Optimized images with alt text
- Clean, semantic HTML structure
- Fast loading with static generation

## Deployment

The website is optimized for static deployment:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Static Hosting
```bash
npm run build
npm run export
# Deploy the out folder
```

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google's ranking factors
- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: Static generation for instant page loads

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent component structure

## Content Management

### Adding New Blog Posts
1. Create new file in `app/blog/[slug]/page.tsx`
2. Add to blog listing in `app/blog/page.tsx`
3. Update sitemap.xml if needed

### Updating Product Information
- Edit respective page files in `app/ram/`, `app/rale/`, `app/fauxdb/`
- Update structured data in layout.tsx
- Refresh sitemap.xml

### SEO Updates
- Modify meta tags in individual page files
- Update structured data schemas
- Refresh robots.txt and sitemap.xml

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the pgElephant ecosystem. See the main repository for license information.

## Links

- **Website**: [https://www.pgelephant.com](https://www.pgelephant.com)
- **GitHub**: [https://github.com/pgelephant](https://github.com/pgelephant)
- **Documentation**: [https://www.pgelephant.com/docs](https://www.pgelephant.com/docs)
- **Community**: [https://www.pgelephant.com/community](https://www.pgelephant.com/community)

---

Built with care by the pgElephant team