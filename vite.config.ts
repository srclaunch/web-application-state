import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { name, version } from './package.json';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      fileName: 'index',
      formats: ['es', 'cjs'],
      name: 'web-application-state',
    },
    sourcemap: true,
    outDir: './dist',
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: [
        '@reduxjs/toolkit',
        '@srclaunch/exceptions',
        '@srclaunch/http-client',
        '@srclaunch/i18n',
        '@srclaunch/logger',
        '@srclaunch/themes',
        '@srclaunch/types',
        '@srclaunch/validation',
        'amazon-cognito-identity-js',
        'crypto-js',
        'history',
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'react-router-dom',
        'redux',
        'styled-components',
      ],
      output: {
        // Global vars to use in UMD build for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: [],
    include: [],
  },
  define: {
    pkgJson: { name, version },
    window: {},
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  // @ts-ignore
  plugins: [
    // react({
    //   babel: {
    //     plugins: [
    //       [
    //         'babel-plugin-styled-components',
    //         {
    //           displayName: true,
    //           fileName: false,
    //         },
    //       ],
    //     ],
    //   },
    // }),
  ],
});
