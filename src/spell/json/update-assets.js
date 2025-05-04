/**
 * [Nyxia 🖤]
 * Este grimorio enlaza las Reliquias con sus Memorias Visuales verdaderas,
 * reescribiendo sus senderos hacia Cámaras Locales o Portales Externos
 * antes de ser selladas en la eternidad.
 */

import { SluggifyName } from './sluggify-name.js' // 🧙‍♂️ Ritualizador de Senderos Eternos para Reliquias

/**
 * ✨ Actualiza las Reliquias, asignándoles correctamente las rutas de sus Reliquias Visuales (medios),
 * asegurando que toda memoria ligada esté correctamente invocada antes del sellado.
 *
 * @param {Array<Object>} products - Reliquias extraídas del Abismo (productos obtenidos)
 * @param {Object} mediaMap - Mapa de IDs de media hacia rutas locales o URLs externas
 * @returns {Array<Object>} Reliquias purificadas listas para ser encerradas en Grimorios
 */
export async function UpdateAssets(products, mediaMap) {
	return products.map((product) => {
		const updated = { ...product }

		// 📸 Enlazamos la Imagen Destacada, asegurando su nuevo sendero visual
		if (updated.featured_media && mediaMap[updated.featured_media]) {
			updated.featured_media_url = mediaMap[updated.featured_media]
		}

		// 🖼️ Reconfiguramos la Galería Principal de Reliquias
		if (Array.isArray(updated.gallery)) {
			updated.gallery_urls = updated.gallery.map((id) => mediaMap[id]).filter(Boolean)
		}

		// 🖼️ Reconfiguramos la Galería Alternativa (si existe)
		if (Array.isArray(updated.gallery_images)) {
			updated.gallery_image_urls = updated.gallery_images.map((id) => mediaMap[id]).filter(Boolean)
		}

		// 🧹 Purificamos Referencias Internas en el Contenido Renderizado
		if (updated.content?.rendered) {
			let content = updated.content.rendered

			// 🔍 Para cada Reliquia ligada al contenido, reemplazamos su ID por su nuevo sendero
			Object.entries(mediaMap)
				.filter(([id]) => id.startsWith('content-'))
				.forEach(([id, newPath]) => {
					const regex = new RegExp(id, 'g')
					content = content.replace(regex, newPath)
				})

			updated.content.rendered = content
		}

		// 🧬 Si la Reliquia no tiene Slug, se genera uno mediante alquimia de nombres
		if (!updated.slug) {
			const title = updated.title?.rendered || `producto-${updated.id}`
			updated.slug = SluggifyName(title, 'json', 1, 'json').replace('.json', '')
		}

		return updated
	})
}
