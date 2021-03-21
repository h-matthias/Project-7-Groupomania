module.exports = {
    
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": true
    },

    projects: [
        "./frontend",
        {
            root: "./frontend",
            package: "./package.json",
            jsconfig: "./jsconfig.json",
            snippetFolder: "./.vscode/vetur/snippets",
        }
    ]

}