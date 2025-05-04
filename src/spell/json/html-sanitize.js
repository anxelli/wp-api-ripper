/**
 * [Nyxia 🖤]
 * Hechizo de Purificación Visual:
 * Erradica los ecos de corrupción visual de las Reliquias HTML,
 * despojándolas de parásitos de estilo, identidades efímeras y clases superfluas,
 * dejando intacta solo su esencia sagrada y semántica.
 */

import * as cheerio from 'cheerio' // 🧹 Custodio de Reliquias Textuales

/**
 * ✨ Sanitiza un fragmento de HTML,
 * eliminando toda corrupción visual: estilos, clases, IDs, y atributos no esenciales,
 * respetando los portales <a> hacia otros planos (enlaces).
 *
 * @param {string} html - Reliquia HTML corrompida a purificar
 * @returns {string} HTML limpio y funcional
 */
export function SanitizeHtml(html) {
	if (!html || typeof html !== 'string') return '' // 🚫 Protección contra Reliquias Vacías

	const $ = cheerio.load(html) // 🧙‍♂️ Invocamos al Custodio para manipular la Reliquia

	// 🌪️ Recorrer cada elemento y exorcizar atributos corruptos
	$('*').each((_, el) => {
		const $el = $(el)

		$el.removeAttr('style') // ❌ Extirpamos Estilos Perversos
		$el.removeAttr('class') // ❌ Aniquilamos Identidades Efímeras
		$el.removeAttr('id') // ❌ Purificamos Referencias Peligrosas

		// 🔗 Si el vestigio es un Portal (a), respetamos sus conexiones esenciales
		if (el.tagName.toLowerCase() === 'a') {
			const allowed = {}
			const href = $el.attr('href')
			const target = $el.attr('target')
			const rel = $el.attr('rel')

			if (href) allowed.href = href
			if (target) allowed.target = target
			if (rel) allowed.rel = rel

			$el.attr(allowed) // 🧷 Restauramos solo los vínculos sagrados
		}
	})

	// 🔮 Devolvemos la Reliquia purificada, lista para su nuevo destino
	return $('body').html()?.trim() || ''
}
