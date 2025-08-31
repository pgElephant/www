# pgelephant.com

The official website for pgelephant - PostgreSQL High Availability Made Easy.

## 🚀 Features

- **Modern Design**: Clean, professional SaaS-style website
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Next.js 14 and optimized for performance
- **SEO Optimized**: Proper meta tags, Open Graph, and structured data
- **Accessible**: WCAG compliant with proper ARIA labels
- **Interactive**: Smooth animations and micro-interactions

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pgelephant/pgelephant.com.git
   cd pgelephant.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
pgelephant.com/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage component
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features showcase
│   ├── Architecture.tsx   # Architecture diagram
│   ├── Comparison.tsx     # Comparison table
│   ├── Download.tsx       # Download section
│   ├── Community.tsx      # Community links
│   └── Footer.tsx         # Footer component
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#0ea5e9) - Main brand color
- **Elephant**: Gray scale (#64748b) - Neutral colors
- **Success**: Green (#10b981) - Positive states
- **Warning**: Yellow (#f59e0b) - Caution states
- **Error**: Red (#ef4444) - Error states

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Scale**: Responsive typography with Tailwind classes

### Components
- **Buttons**: Primary and secondary variants with hover states
- **Cards**: Consistent spacing and shadow system
- **Forms**: Accessible form elements with proper focus states
- **Navigation**: Responsive navigation with mobile menu

## 📱 Responsive Design

The website is built with a mobile-first approach:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Custom domain can be configured in Vercel dashboard

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy to Netlify

### GitHub Pages
1. Add `next export` to build script
2. Configure GitHub Actions for deployment
3. Set up custom domain in repository settings

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended configuration
- **Prettier**: Automatic code formatting
- **Components**: Functional components with hooks

## 📄 Content Management

The website content is currently hardcoded in the components. For a CMS solution, consider:

- **Netlify CMS**: Git-based CMS
- **Contentful**: Headless CMS
- **Sanity**: Real-time collaborative CMS
- **Strapi**: Self-hosted headless CMS

## 🔗 Links

- **Website**: [pgelephant.com](https://pgelephant.com)
- **Documentation**: [docs.pgelephant.com](https://docs.pgelephant.com)
- **GitHub**: [github.com/pgelephant/pgelephant](https://github.com/pgelephant/pgelephant)
- **Discord**: [discord.gg/pgelephant](https://discord.gg/pgelephant)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **PostgreSQL** community for inspiration

---

Made with ❤️ for the PostgreSQL community
