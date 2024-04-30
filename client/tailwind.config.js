/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#B18B5E",
                accent: "#F9F7F2",
                secondary: "#EDE6D8",
                "dark-brown": "#1e1813",
                "brown-accent" : "#b18b5e",
                "brown-secondary": "#806142"
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "spin-slow": "spin 8s linear infinite",
            },
        },
    },
    plugins: [],
};
