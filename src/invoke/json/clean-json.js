/**
 * [Nyxia 🖤]
 * Invocador de Limpieza Total:
 * Este grimorio purifica y transmuta JSONs crudos en Reliquias funcionales,
 * adaptando hechizos específicos según la naturaleza del fragmento:
 * productos, páginas o entradas. Todo lo que respira caos... puede ser ordenado.
 */

import CleanProduct from '../../spell/json/clean-product.js' // 🧹 Hechicero de Purificación de Productos

/**
 * 🔮 Invocación de Purificación Masiva:
 * Transforma una colección de productos crudos de WordPress
 * en objetos limpios, funcionales y aptos para ser sellados en Grimorios mayores.
 *
 * @param {Array} rawProducts - Fragmentos crudos obtenidos del Abismo WordPress.
 * @param {Object} options - Opciones adicionales para el Ritual (ej: categoryMap de transmutación).
 * @returns {Array} - Reliquias purificadas listas para invocaciones superiores.
 */
export async function CleanProductList(rawProducts, options = {}) {
	const categoryMap = options.categoryMap || {} // 📜 Mapa ritual de Categorías visibles

	// 🧹 Purificamos cada Fragmento con el hechizo adecuado
	return rawProducts.map((product) => CleanProduct(product, categoryMap))
}
