/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "rgba(24, 24, 24, 1)",
        black_05: "rgba(24, 24, 24, 0.5)",
        white: "rgba(245, 245, 245, 1)",
        white05: "rgba(245, 245, 245, 0.5)",
        white01: "rgba(245, 245, 245, 0.1)",
        green: "rgba(30, 215, 96, 1)",
        green08: "rgba(30, 215, 96, 0.8)",
        green06: "rgba(30, 215, 96, 0.6)",
        green_top: "rgba(26, 173, 78, 1)",
      },
      animation: {
        slideUp: "slideUp 1s ease-in-out",
        slideUp2: "slideUp .5s ease-in-out",
      },
   
    keyframes: {
      slideUp: {
        from: { opacity: 0, transform: "translateY(25%)" },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
     },
    },
  },
  plugins: [],
};
