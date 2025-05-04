/**
 * [Nyxia 🖤]
 * Este grimorio invoca la Desintegración Absoluta sobre la Cámara Arcana,
 * erradicando Reliquias fantasmales y Vestigios corruptos.
 * Un sendero limpio para nuevos rituales debe ser forjado sin los lastres del pasado.
 */

import { readdir, unlink, lstat, rm } from 'fs/promises' // 📜 Destructor de Reliquias Fantasmales
import { resolve, join } from 'path' // 🧭 Trazador de Senderos Perdidos

/**
 * ✨ Purifica la Cámara Arcana (src/arcane),
 * desintegrando Reliquias olvidadas y limpiando cualquier corrupción latente.
 */
export async function ClearArcane() {
	try {
		// 📜 Definimos el sendero hacia la Cámara Arcana
		const arcaneDir = resolve('src/arcane')

		let files
		try {
			// 🧹 Intentamos leer las Reliquias contenidas en la Cámara
			files = await readdir(arcaneDir)
		} catch {
			// 🚫 Si no existe la Cámara Arcana, reportamos calma espiritual
			console.log('🧹 No existe Cámara Arcana que purificar.')
			return
		}

		// 🧼 Verificamos si la Cámara ya está limpia
		if (files.length === 0) {
			console.log('🧹 La Cámara Arcana ya estaba vacía.')
			return
		}

		let filesDeleted = 0 // 📜 Contador de Reliquias eliminadas
		let foldersDeleted = 0 // 🏰 Contador de Cámaras desmanteladas

		// 🔥 Iniciamos el Ritual de Purificación en paralelo
		const tasks = files.map(async (file) => {
			const fullPath = join(arcaneDir, file)
			try {
				// 🧠 Analizamos si el vestigio es un archivo o un relicario (carpeta)
				const stats = await lstat(fullPath)
				if (stats.isDirectory()) {
					// 💥 Desintegramos Cámaras completas
					await rm(fullPath, { recursive: true, force: true })
					foldersDeleted++
				} else {
					// ✂️ Eliminamos Reliquias sueltas
					await unlink(fullPath)
					filesDeleted++
				}
			} catch (err) {
				// ⚠️ Si falla la purificación de algún vestigio, reportamos su resistencia
				console.warn(`⚠️ No se pudo purificar "${file}": ${err.message}`)
			}
		})

		await Promise.all(tasks)

		// 🎉 Reportamos los frutos del Ritual
		console.log(`🧹 Limpieza completada: ${filesDeleted} Reliquias eliminadas, ${foldersDeleted} Cámaras desmanteladas.`)
	} catch (error) {
		// ❌ Fallo crítico durante la purificación de la Cámara Arcana
		console.error(`❌ Error al limpiar la Cámara Arcana: ${error.message}`)
	}
}
