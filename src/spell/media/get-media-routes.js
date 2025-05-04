/**
 * [Nyxia 🖤]
 * Hechizo de Invocación de Portales Visuales:
 * Localiza Reliquias Visuales en el Abismo WordPress,
 * trazando caminos absolutos hacia sus manifestaciones físicas
 * mediante el portal API v2.
 */

import axios from 'axios' // 🌌 Invocador de Corrientes de Datos

/**
 * ✨ Obtiene las rutas absolutas de Reliquias Visuales usando sus IDs como glifos de acceso.
 *
 * @param {Array<number|string>} ids - IDs de medios sellados en WordPress.
 * @param {string} baseUrl - Portal base (ej: https://midominio.com).
 * @param {Object} bar - (Opcional) Cronista de progreso ritual para actualizaciones visuales.
 * @returns {Promise<Object>} Mapa de IDs hacia rutas absolutas: { id: source_url }
 */
export async function GetMediaRoutes(ids = [], baseUrl = '', bar) {
	if (!ids.length) return {} // 🚫 Si no se proveen Reliquias, retornamos un vacío absoluto

	const mediaMap = {} // 📜 Mapa ritualizado de IDs hacia Portales Visuales

	for (const id of ids) {
		try {
			// 🌐 Invocamos el portal API para localizar la Reliquia
			const response = await axios.get(`${baseUrl}/wp-json/wp/v2/media/${id}`, {
				timeout: 5000, // 🕰️ Tolerancia ritual de 5 segundos
			})

			// 📥 Si la Reliquia responde con un source_url válido, la registramos
			if (response.data && response.data.source_url) {
				mediaMap[id] = response.data.source_url
			}
		} catch (error) {
			// ⚠️ Si el portal falla, registramos el fallo sin interrumpir el flujo
			console.warn(`⚠️ No se pudo obtener el media ID ${id}: ${error.message}`)
		} finally {
			// 📈 Si existe Cronista, incrementamos el conteo ritual
			if (bar) {
				bar.increment()
			}
		}
	}

	// 🔮 Retornamos el Mapa de Portales trazados
	return mediaMap
}
