/**
 * [Nyxia 🖤]
 * Este grimorio arranca Reliquias estructuradas desde los Portales WordPress,
 * explorando múltiples sendas ocultas para encontrar tesoros perdidos de Productos.
 */

import axios from 'axios' // 🌌 Mensajero del Abismo de Peticiones Binarias
import cliProgress from 'cli-progress' // 📈 Cronista de Progresos Dimensionales

/**
 * ✨ Extrae Reliquias desde un Portal WordPress, respetando la senda de la versión elegida.
 *
 * @param {string} baseUrl - Dominio del Portal WordPress.
 * @param {string} apiVersion - Versión de la API a invocar (actualmente solo v2).
 * @param {number} limit - Número máximo de Reliquias que se desean arrancar.
 * @returns {Promise<Array>} Colección de Reliquias obtenidas.
 */
export async function FetchProducts(baseUrl, apiVersion, limit) {
	const cleanBase = baseUrl.replace(/\/$/, '') // 🧼 Purificación del Portal Base

	// 🚫 Bloqueo Místico: Versión v3 aún prohibida
	if (apiVersion === 'v3') {
		throw new Error('⚠️ El Grimorio aún no ha descifrado los secretos de v3. Ritual cancelado.')
	}

	// 🛤️ Caminos posibles para localizar Reliquias (en orden de prioridad)
	const possiblePaths = [
		'/wp-json/wp/v2/product',
		'/wp-json/wp/v2/products',
		'/wp-json/wp/v2/productos',
		'/wp-json/wp/v2/producto',
		'/wp-json/wp/v2/wc_product',
	]

	for (const path of possiblePaths) {
		const products = [] // 📦 Almacén de Reliquias
		let remaining = limit // 📉 Reliquias restantes por invocar
		let page = 1 // 🧮 Página inicial del portal

		// 🔮 Preparamos Cronista de Progresos
		const totalPages = Math.ceil(limit / 100)
		const bar = new cliProgress.SingleBar(
			{
				format: '📦 Scrapeando Reliquias: [{bar}] {percentage}% | Página {value}/{total}',
				barCompleteChar: '█',
				barIncompleteChar: '░',
			},
			cliProgress.Presets.shades_classic
		)
		bar.start(totalPages, 0)

		try {
			// 🔁 Ritual de Extracción Paginada
			while (remaining > 0) {
				const perPage = Math.min(remaining, 100)
				const fullUrl = `${cleanBase}${path}?per_page=${perPage}&page=${page}`

				const response = await axios.get(fullUrl, { timeout: 30000 })

				if (Array.isArray(response.data)) {
					products.push(...response.data)

					bar.update(page)

					if (response.data.length < perPage) {
						// 🚪 No hay más Reliquias en este Sendero
						break
					}

					remaining -= response.data.length
					page++
				} else {
					// 🚫 Formato inesperado: cerramos este sendero
					break
				}
			}

			bar.stop()

			// 🧿 Si encontramos Reliquias, sellamos el éxito
			if (products.length) {
				return products
			}
		} catch (error) {
			bar.stop()
			// 🔕 Silenciamos errores normales (sendero inexistente)
		}
	}

	// ❌ Si ninguna senda reveló Tesoros, lanzamos Advertencia Final
	throw new Error('⚠️ Ninguna senda reveló Reliquias de productos en este portal.')
}
