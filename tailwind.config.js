/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,css,less}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        t1: "var(--t1)",
        t2: "var(--t2)",
        t3: "var(--t3)",
        t4: "var(--t4)",
        b1: "var(--b1)",
        b2: "var(--b2)",
        b3: "var(--b3)",
        b4: "var(--b4)",
        border1: "var(--border1)",
        border2: "var(--border2)",
        primary: "var(--primary)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
      },
    },
  },
  plugins: [],
};
