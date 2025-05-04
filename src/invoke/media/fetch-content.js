/**
 * [Nyxia 🖤]
 * Este grimorio sumerge sus garras en el Flujo de Contenido Renderizado,
 * extrayendo Runas Perdidas y Sellos Visuales ocultos en la vasta neblina HTML,
 * distinguiendo entre Reliquias Internas, Ecos Externos y Runas de Poder.
 */

import { decode } from 'html-entities' // 🧹 Decodificador de Runas Ocultas
import { IsInOurDomain } from '../../spell/media/is-in-our-domain.js' // 🛡️ Centinela de Jurisdicción Dimensional

// 📜 Patrones de Exploración de Reliquias
const extractionPatterns = [
	{ tag: 'img', attr: 'src' },
	{ tag: 'img', attr: 'srcset' },
	{ tag: 'a', attr: 'href' },
	{ tag: 'video', attr: 'src' },
	{ tag: 'audio', attr: 'src' },
	{ tag: 'source', attr: 'src' },
	{ tag: 'iframe', attr: 'src' },
]

/**
 * ✨ Extrae Runas Visuales de los Grimorios de Contenido Renderizado.
 *
 * @param {Array<Object>} relics - Reliquias que contienen HTML corrompido.
 * @param {string} baseUrl - Dominio raíz de nuestro plano.
 * @returns {Promise<Array<Object>>} Runas encontradas en el contenido.
 */
export async function FetchContent(relics, baseUrl) {
	console.log('🔍 Explorando Runas embebidas en el contenido de Reliquias...')

	const mediaFromContent = []
	const cleanBase = baseUrl.replace(/\/$/, '')

	for (const relic of relics) {
		const content = relic.content?.rendered || ''

		for (const { tag, attr } of extractionPatterns) {
			const regex = new RegExp(`<${tag}[^>]+${attr}=['"]([^'"]+)['"]`, 'gi')
			let match

			while ((match = regex.exec(content)) !== null) {
				let url = sanitizeUrl(match[1])
				if (!url) continue

				// 📸 Si es srcset (múltiples tamaños), seleccionamos la mejor Runa
				if (attr === 'srcset') {
					const candidates = url.split(',').map((u) => u.trim().split(' ')[0])
					url = candidates[candidates.length - 1] || candidates[0]
					url = sanitizeUrl(url)
				}

				const media = createMediaObject(url, relic, cleanBase)
				if (media) mediaFromContent.push(media)
			}
		}
	}

	if (!mediaFromContent.length) {
		console.log('⚠️ No se detectaron Runas Visuales en el contenido de las Reliquias.\n')
	} else {
		console.log(`🔎 ${mediaFromContent.length} Runas Visuales encontradas en contenido HTML.\n`)
	}

	return mediaFromContent
}

/**
 * 🧼 Sanitiza una URL eliminando vestigios corruptos.
 */
function sanitizeUrl(rawUrl) {
	if (!rawUrl || typeof rawUrl !== 'string') return ''
	const decoded = decode(rawUrl.trim())
	const cleaned = decoded.split('?')[0].split('#')[0]
	return cleaned
		.replace(/\/{2,}/g, '/')
		.replace(/^https:\//, 'https://')
		.replace(/^http:\//, 'http://')
}

/**
 * 🔮 Crea un Objeto Runa a partir de una URL detectada.
 */
function createMediaObject(url, relic, baseUrl) {
	if (!url || typeof url !== 'string') return null

	url = decode(url.trim()).split('?')[0].split('#')[0]

	// 🛡️ Normalizamos Caminos Relativos a Absolutos
	if (!/^https?:\/\//i.test(url)) {
		if (url.startsWith('/')) {
			url = `${baseUrl}${url}`
		} else if (url.startsWith('wp-content') || url.startsWith('uploads') || /^\d{4}\//.test(url)) {
			url = `${baseUrl}/wp-content/${url.replace(/^\/+/, '')}`
		} else {
			console.warn(`⚠️ URL rechazada por no poder inferirse: ${url}`)
			return null
		}
	}

	try {
		new URL(url)
	} catch {
		console.warn(`⚠️ URL inválida descartada: ${url}`)
		return null
	}

	const extension = url.split('.').pop().toLowerCase()
	const mimeType = inferMimeType(extension)
	const type = inferType(extension, url)

	if (!type) return null

	const isInternal = IsInOurDomain(url, baseUrl)

	return {
		id: `content-${relic.id}-${crypto.randomUUID().slice(0, 8)}`,
		source_url: url,
		mime_type: mimeType,
		title: relic.title?.rendered || `relic-${relic.id}`,
		isInternal,
		type,
	}
}

/**
 * 📜 Infiera el tipo MIME desde la extensión de una Runa.
 */
function inferMimeType(ext) {
	const mimes = {
		jpg: 'image/jpeg',
		jpeg: 'image/jpeg',
		png: 'image/png',
		webp: 'image/webp',
		gif: 'image/gif',
		bmp: 'image/bmp',
		svg: 'image/svg+xml',
		tiff: 'image/tiff',
		pdf: 'application/pdf',
		doc: 'application/msword',
		docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		ppt: 'application/vnd.ms-powerpoint',
		pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		xls: 'application/vnd.ms-excel',
		xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		csv: 'text/csv',
		mp4: 'video/mp4',
		webm: 'video/webm',
		mov: 'video/quicktime',
		avi: 'video/x-msvideo',
		mkv: 'video/x-matroska',
		mp3: 'audio/mpeg',
		wav: 'audio/wav',
		flac: 'audio/flac',
		ogg: 'audio/ogg',
		zip: 'application/zip',
		rar: 'application/vnd.rar',
		'7z': 'application/x-7z-compressed',
	}
	return mimes[ext] || 'application/octet-stream'
}

/**
 * 🧬 Infiera el tipo de Runa (imagen, documento, video, etc) desde la extensión o el URL.
 */
function inferType(ext, url) {
	if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'tiff'].includes(ext)) return 'image'
	if (['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv'].includes(ext)) return 'document'
	if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) return 'video'
	if (['mp3', 'wav', 'flac', 'ogg', 'aac', 'm4a'].includes(ext)) return 'audio'
	if (['zip', 'rar', '7z', 'tar.gz', 'tar', 'gz'].includes(ext)) return 'archive'
	if (/youtube\.com|vimeo\.com|maps\.google|instagram\.com|tiktok\.com|soundcloud\.com/.test(url)) return 'embed'
	return 'other'
}
