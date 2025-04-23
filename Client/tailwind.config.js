module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",  // Bleu moderne
        secondary: "#10B981", // Vert
        dark: "#1F2937",      // Fond sombre
        light: "#F9FAFB",     // Fond clair
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Police moderne
      },
    },
  },
  plugins: [],
}