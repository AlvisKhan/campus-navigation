import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function getFileMeta(file, fullPath, stats) {
  const ext = path.extname(file).toLowerCase().replace('.', '')
  let title = ''
  let category = 'other'
  let icon = '📎'

  if (ext === 'html' || ext === 'htm') {
    category = 'web'
    icon = '📄'
    try {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const titleMatch = content.match(/<title>([^<]*)<\/title>/i)
      if (titleMatch) title = titleMatch[1].trim()
    } catch (e) {
      // ignore
    }
  } else if (ext === 'pdf') {
    category = 'pdf'
    icon = '📕'
  } else if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) {
    category = 'word'
    icon = '📘'
  } else if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) {
    category = 'spreadsheet'
    icon = '📊'
  } else if (['ppt', 'pptx', 'odp'].includes(ext)) {
    category = 'presentation'
    icon = '📙'
  } else if (['txt', 'md', 'markdown'].includes(ext)) {
    category = 'document'
    icon = '📝'
  } else if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'bmp'].includes(ext)) {
    category = 'image'
    icon = '🖼️'
  } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    category = 'archive'
    icon = '📦'
  } else if (['ipynb', 'py', 'cpp', 'java', 'js', 'json'].includes(ext)) {
    category = 'code'
    icon = '💻'
  }

  if (!title) {
    const base = path.basename(file, path.extname(file))
    title = base.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim()
  }

  const folder = path.dirname(file) !== '.' ? path.dirname(file) : ''

  return {
    filename: file,
    folder: folder,
    title: title || file,
    extension: ext.toUpperCase(),
    category,
    icon,
    sizeBytes: stats.size,
    sizeFormatted: stats.size > 1024 * 1024 
      ? `${(stats.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(stats.size / 1024)} KB`,
    lastModified: stats.mtime.toISOString(),
  }
}

function alvisDirectoryPlugin() {
  const generateIndex = () => {
    const alvisDir = path.resolve(process.cwd(), 'public/alvis')
    if (!fs.existsSync(alvisDir)) return

    const ignoredFiles = new Set(['index.html', 'files.json', '.ds_store'])

    const scanDirectory = (currentDir) => {
      let results = []
      try {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true })
        for (const entry of entries) {
          if (entry.name.startsWith('.')) continue
          const fullPath = path.join(currentDir, entry.name)
          if (entry.isDirectory()) {
            results = results.concat(scanDirectory(fullPath))
          } else if (entry.isFile()) {
            if (ignoredFiles.has(entry.name.toLowerCase())) continue
            const relPath = path.relative(alvisDir, fullPath).replace(/\\/g, '/')
            const stats = fs.statSync(fullPath)
            results.push(getFileMeta(relPath, fullPath, stats))
          }
        }
      } catch (err) {
        console.error('Error scanning directory:', currentDir, err)
      }
      return results
    }

    const files = scanDirectory(alvisDir)
      // Sort recently updated or alphabetical
      .sort((a, b) => b.lastModified.localeCompare(a.lastModified))

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
      const alvisDir = path.resolve(process.cwd(), 'public/alvis')
      if (fs.existsSync(alvisDir)) {
        server.watcher.add(alvisDir)
        server.watcher.on('all', (event, file) => {
          if (file.includes('public/alvis') && !file.endsWith('index.html') && !file.endsWith('files.json')) {
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
