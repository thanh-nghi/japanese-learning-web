export default [
    {
        files: ["validators.js", "tests/**/*.mjs", "script.js", "storage.js", "api.js"],
        rules: {
            "no-undef": "error",
            "no-unused-vars": "error"
        }
    },

    {
        files: ["script.js", "storage.js", "api.js"],
        languageOptions: {
            globals: {
                console: "readonly",
                localStorage: "readonly",
                document: "readonly",
                fetch: "readonly"
            }
        }
    }
]