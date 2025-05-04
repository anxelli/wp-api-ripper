/**
 * [Nyxia 🖤]
 * Este grimorio escudriña las Runas de las Reliquias extraídas,
 * clasificándolas según su esencia visual, auditiva, documental o ancestral,
 * para preparar su captura o liberación.
 */

import { extname } from 'path' // 📜 Lector de Glifos Ancestrales

// 📜 Definimos los tipos de Runas y sus extensiones de esencia
const extensionsByType = {
	images: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg', 'tiff', 'avif'], // 🖼️ Reliquias Visuales
	videos: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'], // 🎥 Reliquias de Movimiento
	audios: ['mp3', 'wav', 'flac', 'ogg', 'aac', 'm4a'], // 🎵 Reliquias Sonoras
	docs: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'txt'], // 📚 Reliquias del Conocimiento
	archives: ['zip', 'rar', '7z', 'tar.gz', 'tar', 'gz'], // 📦 Reliquias Selladas
}

/**
 * ✨ Clasifica y organiza Runas (medios) por tipo de esencia detectada.
 *
 * @param {Array<Object>} mediaUrls - Runas detectadas en los planos digitales
 * @returns {Object} Reporte ritualizado con las Reliquias clasificadas
 */
export async function AnalyzeMedia(mediaUrls) {
	const report = {
		images: [], // 🖼️ Reliquias Visuales
		videos: [], // 🎥 Reliquias de Movimiento
		audios: [], // 🎵 Reliquias Sonoras
		docs: [], // 📚 Reliquias Textuales
		archives: [], // 📦 Reliquias Selladas
		embeds: [], // 🔗 Portales a otros Planos
		others: [], // ❓ Entidades Inclasificables
	}

	for (const media of mediaUrls) {
		const url = media.source_url || ''
		const ext = extname(url).slice(1).toLowerCase()

		// 🔗 Detectamos primero portales embed
		if (
			media.type === 'embed' ||
			/youtube\.com|youtu\.be|vimeo\.com|maps\.google|instagram\.com|tiktok\.com|soundcloud\.com/.test(url)
		) {
			report.embeds.push(media)
		}
		// 🖼️ Clasificamos Reliquias Visuales
		else if (extensionsByType.images.includes(ext)) {
			report.images.push(media)
		}
		// 🎥 Clasificamos Reliquias de Movimiento
		else if (extensionsByType.videos.includes(ext)) {
			report.videos.push(media)
		}
		// 🎵 Clasificamos Reliquias Sonoras
		else if (extensionsByType.audios.includes(ext)) {
			report.audios.push(media)
		}
		// 📚 Clasificamos Reliquias de Conocimiento
		else if (extensionsByType.docs.includes(ext)) {
			report.docs.push(media)
		}
		// 📦 Clasificamos Reliquias Selladas
		else if (extensionsByType.archives.includes(ext)) {
			report.archives.push(media)
		}
		// ❓ Clasificación fallida: Runas desconocidas
		else {
			report.others.push(media)
		}
	}

	// ✨ Entregamos el reporte completo del escudriñamiento
	return report
}
