module.exports = {
    src: {
        assets: './src/assets/cache.manifest',
        bowerLibs: './src/lib/',
        components: './src/components/**',
        css: {
            files: './src/css/*.css',
            root: './src/css'
        },
        images: "./src/img*/**",
        less: './src/less/*.less',
        lessComponents: './src/less/components/*.less'
    },
    dest: {
        root: './dist/static/',
        components: './dist/static/components',
        css: './dist/static/css',
        images: './dist/static/img',
        lib: './dist/static/lib'
    }
};