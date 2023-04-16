import sass from 'sass';
import { defineConfig } from "vite";
import liveReload from 'vite-plugin-live-reload';
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssNesting from "postcss-nesting";
import sassGlobImports from 'vite-plugin-sass-glob-import';
import path from "path";

const themePath = process.env.NODE_ENV === 'development' ? '/wp-content/themes/tsuruten-web.com' : '';
const assets = process.env.NODE_ENV === 'development' ? '/assets/' : '../';

export default defineConfig({
	plugins: [
		liveReload(__dirname + '/index.html'),
		sassGlobImports(),
	],
	root: '',
	base: process.env.NODE_ENV === 'development' ? './' : '/dist/',
	build: {
		outDir: path.resolve(__dirname, './dist'),
		emptyOutDir: true,
		manifest: true,
		target: 'es2018',
		rollupOptions: {
			input: {
				main: path.resolve(__dirname + '/main.js'),
			},
			output: {
				entryFileNames: 'assets/js/[name].js',
				chunkFileNames: 'assets/js/[name].js',
				assetFileNames: ({ name }) => {
					if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(name ?? '')) {
						return 'assets/images/[name].[ext]';
					}
					if (/\.css$/.test(name ?? '')) {
						return 'assets/css/[name].[ext]';
					}
					if (/\.js$/.test(name ?? '')) {
						return 'assets/js/[name].[ext]';
					}
					return 'assets/[name].[ext]';
				},
			},
		},
		assetsInlineLimit: 0,
		minify: false,
		write: true,
	},
	server: {
		cors: true,
		strictPort: true,
		port: 3000,
		https: false,
		hmr: {
			host: 'localhost',
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `$base-dir: '` + themePath + assets + `';`,
			},
		},
		postcss: {
			plugins: [
				postcssNesting,
				autoprefixer,
				tailwindcss,
			],
		},
	},
});