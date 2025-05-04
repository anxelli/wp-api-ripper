/**
 * [Nyxia 🖤]
 * Hechizo de Jurisdicción Dimensional:
 * Determina si una Runa o Portal pertenece a nuestro Dominio,
 * validando su linaje y asegurando que no invoquemos Reliquias corruptas de otros planos.
 */

/**
 * ✨ Verifica si una URL pertenece a nuestro Dominio o está bajo nuestra Sombra.
 *
 * @param {string} url - Sendero o portal a verificar.
 * @param {string} baseUrl - Dominio raíz de nuestro plano de existencia.
 * @returns {boolean} true si la Runa está dentro del Dominio; false si es extranjera o corrupta.
 */
export function IsInOurDomain(url, baseUrl) {
	try {
		const origin = new URL(baseUrl).hostname // 🏰 Extraemos la Fortaleza Raíz
		const target = new URL(url, baseUrl).hostname // 🧭 Extraemos la posible Reliquia

		// 🔮 Condiciones de Pertenencia Ritual:
		return (
			url.startsWith('/') || // 🧷 Camino Relativo: confiable
			url.startsWith(baseUrl) || // 🌍 Camino Absoluto perteneciente
			target === origin || // 🧬 Coincidencia Exacta de Dominio
			target.endsWith(`.${origin}`) // 🔗 Subdominio Bendecido
		)
	} catch {
		// ❌ Si el ritual falla, asumimos corrupción dimensional
		return false
	}
}
