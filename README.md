# Portfolio Website

A modern, responsive portfolio website showcasing full-stack development skills and projects.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Fikre-M/portfolio25.git
cd portfolio25/portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your EmailJS credentials

# Start development server
npm run dev
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Testing**: Vitest, React Testing Library
- **Icons**: Lucide React
- **Contact**: EmailJS integration

## 📁 Project Structure

```
portfolio25/
└── portfolio/           # Main application
    ├── public/         # Static assets
    ├── src/
    │   ├── Components/ # React components
    │   ├── contexts/   # React contexts
    │   ├── data/       # Static data
    │   ├── types/      # TypeScript definitions
    │   └── utils/      # Utility functions
    ├── package.json
    └── README.md       # Detailed documentation
```

## 🌟 Features

- **Responsive Design**: Optimized for all devices
- **Dark/Light Mode**: Theme switching with smooth transitions
- **SEO Optimized**: Meta tags and structured data
- **Interactive Sections**: About, Skills, Projects, Contact
- **Problem Solving**: Algorithmic challenges with solutions
- **Working Contact Form**: EmailJS integration
- **Smooth Animations**: Engaging user interactions
- **Type Safety**: Full TypeScript implementation

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run type-check` - Run TypeScript type checking

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `portfolio/dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Import project from GitHub
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `portfolio/dist`

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the `portfolio/` directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### EmailJS Setup
1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env` file

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](portfolio/LICENSE) file for details.

## 👨‍💻 Author

**Fikremariam Kassa**
- GitHub: [@Fikre-M](https://github.com/Fikre-M)
- LinkedIn: [Fikremariam Kassa](https://www.linkedin.com/in/fikremariam-kassa-28916062/)
- Email: fikreddu@email.com

---

⭐ Star this repository if you found it helpful!
