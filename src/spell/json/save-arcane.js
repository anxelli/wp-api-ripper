/**
 * [Nyxia 🖤]
 * Este grimorio encierra Reliquias arrancadas en sellos de sabiduría pura,
 * confinándolas en cámaras temporales donde el tiempo y el caos aún no las corrompen.
 */

import { writeFile, mkdir } from 'fs/promises' // 🛠️ Forjadores de Reliquias Temporales
import { dirname, resolve } from 'path' // 🧭 Arquitectos de Senderos Perdidos
import { existsSync } from 'fs' // 🧙‍♂️ Centinela de Cámaras Preexistentes

/**
 * ✨ Sella datos en un Grimorio JSON dentro de la Cámara Arcana (`src/arcane`).
 *
 * @param {string} filePath - Sendero relativo donde el Grimorio será almacenado
 * @param {any} data - Reliquias purificadas a encapsular
 */
export async function SaveArcane(filePath, data) {
	try {
		const fullPath = resolve(filePath) // 🧭 Convertimos el sendero a ruta absoluta real
		const dir = dirname(fullPath) // 🏛️ Extraemos el Directorio ancestral donde forjar la Cámara

		// 🏗️ Si no existe la Cámara Arcana, la forjamos con rituales de creación
		if (!existsSync(dir)) {
			await mkdir(dir, { recursive: true })
		}

		// 📜 Aseguramos que el sendero final sea sellado como Grimorio `.json`
		const finalPath = fullPath.endsWith('.json') ? fullPath : `${fullPath}.json`

		// 🔥 Sellamos la Reliquia en la Cámara, preservando su pureza en JSON ritualizado
		await writeFile(finalPath, JSON.stringify(data, null, 2), 'utf-8')
	} catch (error) {
		// ❌ Si el ritual falla, lanzamos una maldición formal
		throw new Error(`❌ El Grimorio no pudo ser sellado en la Cámara Arcana: ${error.message}`)
	}
}
