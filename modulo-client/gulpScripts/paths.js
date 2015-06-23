module.exports = {
    src: {
        assets: './src/cache.manifest',
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
        root: './dist/',
        components: this.root + 'components',
        css: this.root + 'css',
        images: this.root + 'img',
        lib: this.root + 'lib'
    }
};