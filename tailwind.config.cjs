/** إعداد Tailwind — ملف CSS واحد يُبنى مسبقاً بدل CDN بطيء في المتصفح. */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./404.html", "./assets/**/*.js"],
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#1e293b",
          950: "#020617",
        },
      },
      fontFamily: {
        cairo: ["Cairo", "system-ui", "sans-serif"],
        outfit: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
