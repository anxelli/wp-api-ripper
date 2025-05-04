/**
 * [Nyxia 🖤]
 * Hechizo de Purificación de Producto:
 * Transmuta una Reliquia cruda de WordPress en un Objeto Sagrado,
 * destilando su esencia verdadera, limpiando sus venenos visuales,
 * y forjándolo en una forma funcional para invocaciones futuras.
 */

import { SanitizeHtml } from './html-sanitize.js' // 🧹 Purificador de Reliquias Visuales
import { OptimizeHtml } from './html-optimize.js' // 🧠 Estructurador Semántico de Reliquias Textuales

/**
 * ✨ Limpia una Reliquia de Producto corrompida,
 * devolviendo un objeto puro, funcional y listo para ser sellado o invocado.
 *
 * @param {Object} product - Reliquia bruta extraída del Abismo WordPress
 * @param {Object} categoryMap - Mapa de categorías para transmutar IDs en nombres visibles
 * @returns {Object} Reliquia purificada y funcional
 */
export default function CleanProduct(product, categoryMap = {}) {
	return {
		id: product.id, // 🏷️ Identificador eterno de la Reliquia
		title: product.title?.rendered || '', // 📜 Título purificado o vacío si corrupto
		slug: product.slug, // 🔗 Glifo de invocación universal
		category: (product.product_cat || []).map((id) => categoryMap[id]).filter(Boolean), // 🗺️ Transmutación de Categorías de ID a Nombre
		content: SanitizeHtml(product.content?.rendered || ''), // 🧹 Purificación de Contenido Visual
		excerpt: SanitizeHtml(product.excerpt?.rendered || ''), // 🧹 Purificación de Extracto Visual
		content_json: OptimizeHtml(product.content?.rendered || ''), // 🧠 Estructuración Semántica de Contenido
		excerpt_json: OptimizeHtml(product.excerpt?.rendered || ''), // 🧠 Estructuración Semántica de Extracto
		featured_img: product.featured_media_url || '', // 🖼️ Ruta de la Reliquia Visual Principal
		gallery: product.gallery || [], // 🖼️ Reliquias visuales adicionales
		status: product.status === 'publish', // 📡 Estado de Manifestación Pública
		type: product.type, // 🧬 Tipo de Reliquia
		createdAt: product.date, // 🕰️ Fecha de Creación
		updatedAt: product.modified, // 🔄 Fecha de Última Transmutación
	}
}
