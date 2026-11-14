/**
 * Custom Tailwind CSS Configuration
 * Defines custom font families (Inter & JetBrains Mono) and navy color palette tokens.
 */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                navy: {
                    950: '#0B1120',
                    900: '#111827',
                    800: '#1E293B',
                    700: '#334155',
                }
            }
        }
    }
};