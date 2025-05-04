/**
 * [Nyxia 🖤]
 * Hechizo de Resolución de Categorías:
 * Este conjuro invoca portales WordPress para localizar las Castas de Reliquias,
 * creando un Mapa Arcano donde cada ID perdido es enlazado a su Nombre verdadero.
 */

import axios from 'axios' // 🌌 Invocador de Corrientes de Datos

/**
 * ✨ Invoca las Categorías de Productos desde el Plano WordPress,
 * transmutándolas en un Mapa Ritual de { ID: Nombre }.
 *
 * @returns {Promise<Object>} Mapa de Castas purificadas y listas para invocaciones superiores.
 */
export async function FetchCategories() {
	const url = globalThis.scrapURL || process.env.SCRAP_URL // 🌐 Localizamos el Dominio de Saqueo

	if (!url) {
		// ❌ Si no existe portal, abortamos el Ritual
		throw new Error('🌐 No se ha definido un dominio base para FetchCategories')
	}

	try {
		// 📡 Invocamos las Castas de Reliquias
		const res = await axios.get(`${url}/wp-json/wp/v2/product_cat?per_page=100`)
		const data = res.data || []

		const map = {} // 📜 Mapa de Transmutación Categórica
		for (const cat of data) {
			map[cat.id] = cat.name
		}

		// 🔮 Retornamos el Mapa Ritualizado
		return map
	} catch (err) {
		// ⚠️ Fallo durante la invocación, advertimos pero no colapsamos el Ritual completo
		console.warn('⚠️ No se pudieron obtener las categorías:', err.message)
		return {}
	}
}
