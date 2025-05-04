/**
 * [Nyxia 🖤]
 * Este grimorio purifica los nombres de Reliquias o Grimorios,
 * sellándolos con glifos eternos, preservando su esencia,
 * y asegurando su permanencia a través de los corredores prohibidos del caos digital.
 */

import slugify from 'slugify' // 📜 Ritualizador de Nombres Profanos y Sellador de Identidades Estructurales

/**
 * ✨ Purifica un nombre base en un sendero seguro y eterno,
 * permitiendo que la Reliquia sobreviva las tormentas del tiempo digital sin corrupción ni colisiones.
 *
 * @param {string} baseName - El nombre base a purificar (ej: título, nombre de output)
 * @param {string} extension - La extensión esperada del archivo (ej: jpg, png, json)
 * @param {number} index - Número incremental para reliquias múltiples (solo en media)
 * @param {string} type - Tipo de purificación: 'media' (añade index) o 'json' (no añade index)
 * @returns {string} El sendero purificado y sellado (ej: "producto-01.jpg" o "mi-archivo.json")
 */
export function SluggifyName(baseName, extension = '', index = 1, type = 'media') {
	if (!baseName || typeof baseName !== 'string') return '' // 🚫 Protección contra Reliquias Corruptas

	let nameOnly = baseName.trim()
	let ext = ''

	// 🔍 Detectamos si el nombre base ya porta una extensión incrustada
	const lastDotIndex = baseName.lastIndexOf('.')
	if (lastDotIndex > 0) {
		nameOnly = baseName.substring(0, lastDotIndex).trim() // ✂️ Extraemos el verdadero Nombre del Alma
		ext = baseName.substring(lastDotIndex + 1).toLowerCase() // 📜 Extraemos la Extensión Fantasma
	}

	// 📦 Determinamos la extensión final si no fue explícitamente declarada
	if (!extension) {
		extension = ext || (type === 'json' ? 'json' : '')
	}

	extension = extension.replace(/^\./, '') // 🧹 Purificación de caracteres parásitos (puntos innecesarios)

	// 🧙‍♂️ Invocamos el ritual de Sluggificación para crear el Glifo Eterno
	const slug = slugify(nameOnly, {
		lower: true,
		strict: true,
		remove: /[*+~.()'"!:@¿?¡=%,;]/g, // 🚫 Eliminamos Símbolos de Caos Indeseado
	})

	let finalName = slug

	// 🔮 Si la Reliquia es de tipo media, agregamos su Marca de Serie
	if (type === 'media') {
		const formattedIndex = String(index).padStart(2, '0') // 🔢 Uniformizamos la Numeración Ritual
		finalName = `${slug}-${formattedIndex}`

		if (!extension) {
			extension = 'NoTeniaExtAveriguaOBorrame' // 👻 Extensión placeholder para Reliquias Incompletas
		}
	}

	// 🛠️ Ensamblamos el nombre final, sellando su destino
	return `${finalName}.${extension}`
}
