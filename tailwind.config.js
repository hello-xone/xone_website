/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,css,less}"],
  darkMode: "class",
  theme: {
    extend: {
      data: {
        open: 'open~="true"',
      },
      colors: {
        t1: "var(--t1)",
        t2: "var(--t2)",
        t3: "var(--t3)",
        t4: "var(--t4)",
        t5: "var(--t5)",
        t6: "var(--t6)",
        t7: "var(--t7)",
        t8: "var(--t8)",
        t9: "var(--t9)",
        t10: "var(--t10)",
        b1: "var(--b1)",
        b2: "var(--b2)",
        b3: "var(--b3)",
        b4: "var(--b4)",
        b5: "var(--b5)",
        b6: "var(--b6)",
        b7: "var(--b7)",
        b8: "var(--b8)",
        b9: "var(--b9)",
        border1: "var(--border1)",
        border2: "var(--border2)",
        border3: "var(--border3)",
        border4: "var(--border4)",
        primaryButtonBg: "var(--button-bg)",
        primaryButtonText: "var(--button-text)"
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'theme': '300ms',
      }
    },
  },
  plugins: []
};
