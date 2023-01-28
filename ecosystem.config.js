module.exports = {
    apps: [
        {
            name: 'rodrigogh.com',
            script: "node build",
            watch: false,
            force: true,
            env: {
                PORT: 4500
            }
        }
    ]
}