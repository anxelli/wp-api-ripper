/**
 * [Nyxia 🖤]
 * Este grimorio arranca Runas Visuales selladas en las Galerías Perdidas de las Reliquias,
 * extrayendo sus vestigios dispersos y preparándolos para ser sellados en Cámaras Eternas.
 */

import axios from 'axios' // 🌌 Mensajero de Reliquias Visuales

/**
 * ✨ Extrae Runas Visuales desde las Galerías Encadenadas en Reliquias WordPress v2.
 *
 * @param {Array<Object>} relics - Reliquias que contienen ID de Galerías Selladas.
 * @param {string} baseUrl - Portal de origen de las Reliquias.
 * @returns {Promise<Array<{ productId: number, urls: string[] }>>} Mapa de Reliquias y sus Rutas Visuales.
 */
export async function FetchGallery(relics, baseUrl) {
	console.log('🔍 Buscando imágenes en galerías...')

	const cleanBase = baseUrl.replace(/\/$/, '') // 🧹 Limpieza ritual del Portal Base
	const productGalleryMap = []

	for (const relic of relics) {
		const galleryIds = relic.gallery || relic.gallery_images || []

		// 🚫 Si no existen Runas en la Reliquia, continuamos
		if (!Array.isArray(galleryIds) || galleryIds.length === 0) continue

		const urls = []

		for (const id of galleryIds) {
			try {
				// 🧿 Invocamos la Runa específica por su ID
				const media = await fetchMediaById(cleanBase, id)
				if (media.source_url) urls.push(media.source_url)
			} catch (err) {
				// ⚠️ Advertencia de Runa omitida
				console.warn(`⚠️ Imagen de galería ${id} omitida: ${err.message}`)
			}
		}

		// 📜 Si encontramos Runas válidas, las sellamos al mapa
		if (urls.length) {
			productGalleryMap.push({
				productId: relic.id,
				urls,
			})
		}
	}

	// 📣 Resultado Final del Ritual
	if (!productGalleryMap.length) {
		console.log('⚠️ No se encontraron imágenes de galería en ninguna Reliquia.\n')
	} else {
		console.log(`🔎 Galerías procesadas para ${productGalleryMap.length} Reliquias.\n`)
	}

	return productGalleryMap
}

/**
 * 🔮 Invoca una Runa Visual por su ID desde el Portal WordPress.
 */
async function fetchMediaById(base, id) {
	const url = `${base}/wp-json/wp/v2/media/${id}`
	const response = await axios.get(url, { timeout: 15000 })
	const data = response?.data

	// 🚫 Validación de la existencia de la Runa
	if (!data?.source_url) throw new Error('No se encontró la source_url')

	// 🧿 Devolvemos la Runa ritualizada
	return {
		id,
		source_url: data.source_url,
	}
}
