/**
 * [Nyxia 🖤]
 * Este grimorio arranca las Runas Visuales primarias de Reliquias invocadas de WordPress,
 * purificando sus sendas hacia rutas seguras, resistentes a corrupción de otros planos.
 */

import axios from 'axios' // 🌌 Invocador de Corrientes Binarias

/**
 * ✨ Extrae únicamente las Runas Visuales Principales (featured_media) de cada Reliquia,
 * asegurando rutas limpias, puras y resistentes a la corrupción dimensional.
 *
 * @param {Array<Object>} items - Reliquias capturadas del Abismo
 * @param {string} baseUrl - Portal WordPress origen
 * @returns {Promise<Array<Object>>} Runas Visuales purificadas y listas para sellado
 */
export async function FetchFeatured(items, baseUrl) {
	console.log('🔍 Buscando imágenes destacadas...')

	const cleanBase = baseUrl.replace(/\/$/, '') // 🧹 Limpieza ritual del Portal Base
	const mediaIds = new Set() // 📜 Almacenamiento ritual de IDs únicos de Runas

	for (const item of items) {
		if (item?.featured_media && item.featured_media !== 0) {
			// 🔎 Si la Reliquia posee Runa Destacada, la registramos
			mediaIds.add(item.featured_media)
		}
	}

	// ⚠️ Si no se detectan Runas, se aborta el ritual
	if (!mediaIds.size) {
		console.log('⚠️ No se encontraron imágenes destacadas en las Reliquias.\n')
		return []
	}

	const mediaUrls = [] // 📦 Reliquias de Runas detectadas
	let detectedCount = 0 // 🧮 Contador ritual de Runas confirmadas

	for (const id of mediaIds) {
		try {
			// 🌐 Invocación para recuperar la Runa específica
			const response = await axios.get(`${cleanBase}/wp-json/wp/v2/media/${id}`, { timeout: 15000 })
			const data = response?.data || {}

			// 🔥 Si el portal responde con source_url válido, registramos la Runa
			if (data.source_url && typeof data.source_url === 'string') {
				mediaUrls.push({
					id,
					source_url: data.source_url,
					mime_type: data.mime_type || '',
					title: data.title?.rendered || `media-${id}`,
				})
				detectedCount++
			}
		} catch (error) {
			// ⚠️ Si falla la recuperación, registramos el evento sin romper el Ritual
			console.warn(`⚠️ Fallo al recuperar featured_media ${id}: ${error.message}`)
		}
	}

	console.log(`🔎 ${detectedCount} Runas Visuales destacadas detectadas.\n`)
	return mediaUrls
}
