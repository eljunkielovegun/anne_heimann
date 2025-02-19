'use client';
import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('frosted-berries');

  const themes = [
    { id: 'frosted-berries', name: 'Frosted Berries' },
    { id: 'chocolate-chip', name: 'Chocolate Chip Delight' },
    { id: 'milky-stream', name: 'Milky Stream' },
    { id: 'ramp-it-up', name: 'Ramp It Up' }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="px-4 py-2 rounded-md border border-primary/20 bg-background text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {themes.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;