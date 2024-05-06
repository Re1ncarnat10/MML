import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "mymovielist.client";

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Admin': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Admin{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/User': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/User/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/User/register': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/User/login': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Movies': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Movies/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Movies/AddToMyList/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Movies/UpdateMyList/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Movies/MyList': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/Movies/Remove/From/My/List/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Admin': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Admin{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/User': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/User/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/User/register': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/User/login': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Movies': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Movies/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Movies/AddToMyList/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Movies/UpdateMyList/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Movies/MyList': {
                target: 'https://localhost:7020/',
                secure: false
            },
            '^/api/Movies/Remove/From/My/List/{id}': {
                target: 'https://localhost:7020/',
                secure: false
            },
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
