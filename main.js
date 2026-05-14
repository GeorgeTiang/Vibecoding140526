/**
 * ThemeToggle Component
 * Handles switching between light and dark themes with persistence.
 */
class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupTheme();
  }

  setupTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      this.updateIcon(true);
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateIcon(isDark);
  }

  updateIcon(isDark) {
    const btn = this.shadowRoot.querySelector('.theme-btn');
    btn.innerHTML = isDark ? this.moonIcon() : this.sunIcon();
  }

  sunIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></svg>`;
  }

  moonIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .theme-btn {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          color: var(--text-primary);
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-speed);
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(8px);
        }
        .theme-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-deep);
          border-color: var(--accent-primary);
        }
        .theme-btn:active {
          transform: translateY(0);
        }
        svg {
          stroke: var(--accent-primary);
        }
      </style>
      <button class="theme-btn" aria-label="Toggle Theme">
        ${this.sunIcon()}
      </button>
    `;
    this.shadowRoot.querySelector('.theme-btn').addEventListener('click', () => this.toggleTheme());
  }
}

/**
 * RandomNumberGenerator Component
 * Modernized with vibrant displays and animations.
 */
class RandomNumberGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  generateNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    numbers.sort((a, b) => a - b);
    this.displayNumbers(numbers);
  }

  displayNumbers(numbers) {
    const resultDiv = this.shadowRoot.querySelector('.result-container');
    resultDiv.innerHTML = '';
    
    numbers.forEach((num, index) => {
      const ball = document.createElement('div');
      ball.className = 'number-ball';
      ball.textContent = num;
      ball.style.animationDelay = `${index * 0.1}s`;
      resultDiv.appendChild(ball);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 2.5rem;
          text-align: center;
          box-shadow: var(--shadow-deep);
          backdrop-filter: blur(12px);
          transition: transform var(--transition-speed), border-color var(--transition-speed);
        }
        .card:hover {
          border-color: var(--accent-glow);
        }
        .generate-btn {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 16px;
          cursor: pointer;
          transition: all var(--transition-speed);
          box-shadow: 0 4px 15px var(--accent-glow);
          margin-bottom: 2rem;
          letter-spacing: 0.02em;
        }
        .generate-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px var(--accent-glow);
        }
        .generate-btn:active {
          transform: scale(0.98);
        }
        .result-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          min-height: 80px;
        }
        .number-ball {
          width: 60px;
          height: 60px;
          background: var(--bg-secondary);
          border: 2px solid var(--accent-primary);
          color: var(--text-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
          box-shadow: var(--shadow-soft);
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          transition: all var(--transition-speed);
        }
        .placeholder {
          color: var(--text-secondary);
          font-style: italic;
          opacity: 0.7;
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 480px) {
          .number-ball {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
          .card {
            padding: 1.5rem;
          }
        }
      </style>
      <div class="card">
        <button class="generate-btn">Generate Toto Numbers</button>
        <div class="result-container">
          <p class="placeholder">Click the button to reveal your numbers</p>
        </div>
      </div>
    `;
    this.shadowRoot.querySelector('.generate-btn').addEventListener('click', () => this.generateNumbers());
  }
}

// Register Components
customElements.define('theme-toggle', ThemeToggle);
customElements.define('random-number-generator', RandomNumberGenerator);

// Initial Theme Check (Immediate application to body)
(function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
  }
})();
