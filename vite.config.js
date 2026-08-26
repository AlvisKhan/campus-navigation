import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function alvisDirectoryPlugin() {
  const generateIndex = () => {
    const alvisDir = path.resolve(process.cwd(), 'public/alvis')
    if (!fs.existsSync(alvisDir)) return

    const files = fs.readdirSync(alvisDir)
      .filter((file) => file.endsWith('.html') && file !== 'index.html')
      .map((file) => {
        const fullPath = path.join(alvisDir, file)
        const stats = fs.statSync(fullPath)
        const content = fs.readFileSync(fullPath, 'utf-8')
        const titleMatch = content.match(/<title>([^<]*)<\/title>/i)
        const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.html$/, '')

        return {
          filename: file,
          title: title || file,
          sizeBytes: stats.size,
          sizeFormatted: stats.size > 1024 * 1024 
            ? `${(stats.size / (1024 * 1024)).toFixed(1)} MB` 
            : `${Math.round(stats.size / 1024)} KB`,
          lastModified: stats.mtime.toISOString(),
        }
      })

    const outputPath = path.join(alvisDir, 'files.json')
    fs.writeFileSync(outputPath, JSON.stringify(files, null, 2))
  }

  return {
    name: 'alvis-directory-indexer',
    buildStart() {
      generateIndex()
    },
    configureServer(server) {
      generateIndex()
      const alvisDir = path.resolve(__dirname, 'public/alvis')
      if (fs.existsSync(alvisDir)) {
        server.watcher.add(alvisDir)
        server.watcher.on('all', (event, file) => {
          if (file.includes('public/alvis') && file.endsWith('.html') && !file.endsWith('index.html')) {
            generateIndex()
          }
        })
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), alvisDirectoryPlugin()],
})

