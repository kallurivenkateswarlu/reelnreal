@import "tailwindcss";

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', 'Noto Sans Telugu', sans-serif;
  }

  h1, h2, .font-serif-display {
    font-family: 'Cinzel', serif;
  }

  .font-telugu {
    font-family: 'Noto Sans Telugu', sans-serif;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #09090b;
}

::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}

/* Glassmorphism helpers */
.glass-panel {
  background: rgba(18, 18, 22, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.gold-gradient-text {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

