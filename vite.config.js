// import tailwindcss from '@tailwindcss/vite';
// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';

// export default defineConfig({
// 	plugins: [tailwindcss(), sveltekit()]
// });

// For reference, this is how it was initiallly

// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';

// export default defineConfig({
// 	plugins: [sveltekit()]
// });

import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

const isDev = process.env.NODE_ENV == 'development';
console.log(isDev);

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: isDev
		? {
				https: {
					key: fs.readFileSync('localhost+3-key.pem'),
					cert: fs.readFileSync('localhost+3.pem')
				},
				host: '0.0.0.0',
				port: 5173
			}
		: {}
});
