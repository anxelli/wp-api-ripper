/**
 * [Nyxia 🖤]
 * Hechizo de Estructuración Semántica Recursiva Avanzada:
 * Transmuta fragmentos HTML caóticos en Reliquias JSON estructuradas,
 * listas para ser invocadas en planos visuales sin perder su linaje semántico.
 */

import * as cheerio from 'cheerio' // 🧹 Custodio de Reliquias Textuales Anidadas

/**
 * ✨ Convierte HTML bruto en un árbol de bloques estructurados en JSON.
 *
 * @param {string} html - Fragmento HTML corrompido
 * @returns {Array<Object>} Lista de Reliquias semánticas listas para ensamblar en nuevos planos
 */
export function OptimizeHtml(html) {
	if (!html || typeof html !== 'string') return [] // 🚫 Protección contra invocaciones vacías

	const $ = cheerio.load(html) // 🧙‍♂️ Invocamos al Custodio del HTML
	const blocks = []

	// 🌌 Procesamos cada criatura que habita el Plano del Body
	$('body')
		.children()
		.each((_, el) => {
			const parsed = parseElement($(el), $)
			if (parsed) {
				if (Array.isArray(parsed)) blocks.push(...parsed)
				else blocks.push(parsed)
			}
		})

	return blocks
}

/**
 * 🧩 Transmuta un solo Elemento HTML en su contraparte JSON ritualizada.
 */
function parseElement($el, $) {
	const tag = $el[0].tagName?.toLowerCase()
	if (!tag) return null // 🚫 Fragmento sin identidad, no merece trascender

	switch (tag) {
		case 'p':
		case 'li':
		case 'span':
		case 'div':
			return buildBlock(tag === 'li' ? 'list_item' : 'paragraph', $el, $)

		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
			return {
				type: 'heading',
				level: parseInt(tag[1]),
				text: getTextContent($el),
				children: parseChildren($el, $),
			}

		case 'ul': {
			const items = []
			$el.children('li').each((_, li) => {
				const item = parseElement($(li), $)
				if (item) items.push(item)
			})
			return { type: 'list', items }
		}

		case 'a':
			return {
				type: 'link',
				href: $el.attr('href') || '',
				text: getTextContent($el),
				children: parseChildren($el, $),
			}

		case 'strong':
		case 'em':
		case 'b':
		case 'i': {
			const hasBlock = containsBlockElements($el)
			const text = getTextContent($el)

			if (hasBlock || !text) {
				const innerBlocks = []
				$el.find('*').each((_, child) => {
					const parsed = parseElement($(child), $)
					if (parsed) innerBlocks.push(parsed)
				})

				const mirrored = {
					type: tag,
					text: text || '',
				}

				return {
					type: 'span',
					children: [...innerBlocks, mirrored],
				}
			}

			return {
				type: tag,
				text,
				children: parseChildren($el, $),
			}
		}

		case 'img':
			return {
				type: 'image',
				src: $el.attr('src') || '',
				alt: $el.attr('alt') || '',
			}

		case 'iframe':
			return {
				type: 'iframe',
				src: $el.attr('src') || '',
			}

		case 'script':
			return {
				type: 'script',
				content: $el.html()?.trim() || '',
			}

		default:
			return {
				type: 'html',
				tag,
				content: $.html($el),
			}
	}
}

/**
 * 🧱 Construye un Bloque Estándar a partir de un Elemento Simbólico.
 */
function buildBlock(type, $el, $) {
	return {
		type,
		text: getTextContent($el),
		children: parseChildren($el, $),
	}
}

/**
 * 🌱 Recolecta los Hijos Semánticos de un Nodo.
 */
function parseChildren($parent, $) {
	const children = []

	$parent.contents().each((_, node) => {
		if (node.type === 'text') {
			const value = node.data?.trim()
			if (value) {
				children.push({ type: 'text', text: value })
			}
		} else if (node.type === 'tag') {
			const $child = cheerio.load('<root></root>')('root').append(node).children().eq(0)
			const parsed = parseElement($child, $)
			if (Array.isArray(parsed)) children.push(...parsed)
			else if (parsed) children.push(parsed)
		}
	})

	return children.length ? children : undefined
}

/**
 * ✂️ Extrae el Texto Limpio de un Nodo HTML.
 */
function getTextContent($el) {
	return $el.clone().children().remove().end().text().trim()
}

/**
 * 🛡️ Detecta si el Elemento contiene Hijos de Tipo Bloque (estructura mayor).
 */
function containsBlockElements($el) {
	const blockTags = ['p', 'ul', 'ol', 'div', 'section', 'article', 'table', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	return $el.find(blockTags.join(',')).length > 0
}
