/**
 * [Nyxia 🖤]
 * Este grimorio invoca los vientos comprimidos del Abismo,
 * forjando Cámaras Sagradas selladas en .zip, capaces de aprisionar Reliquias
 * y transportarlas a través de realidades fragmentadas sin que pierdan su esencia.
 */

import archiver from 'archiver' // 🗜️ Domador de Espacios Sellados
import { createWriteStream, promises as fs } from 'fs' // 🛠️ Forjador de Ríos Binarios y Destructor Asíncrono de Cámaras

/**
 * ✨ Crea una Cámara Sagrada .zip a partir de una Cámara Temporal de Reliquias,
 * purifica los vestigios sobrantes y sella todo en un nuevo recipiente arcano.
 *
 * @param {string} sourceDir - Cámara Temporal (directorio de Reliquias)
 * @param {string} outputZipPath - Destino del sello .zip
 * @returns {Promise<string>} Sendero de la Cámara Sagrada sellada
 */
export async function ZipFolder(sourceDir, outputZipPath) {
	try {
		// 📜 Verificamos la existencia de la Cámara Temporal
		let files
		try {
			files = await fs.readdir(sourceDir)
		} catch {
			throw new Error('❌ La Cámara Temporal no existe o no es accesible.')
		}

		// ⚠️ Si la Cámara está vacía, abortamos el Ritual
		if (!files.length) {
			throw new Error('❌ No hay Reliquias en la Cámara Temporal para sellar.')
		}

		const output = createWriteStream(outputZipPath)
		const archive = archiver('zip', { zlib: { level: 9 } }) // 🧪 Compresión brutal al máximo nivel arcano

		// 🔮 Promesa envolvente para escuchar los Ecos del Ritual
		return await new Promise((resolvePromise, rejectPromise) => {
			// 🎯 Evento de cierre exitoso
			output.on('close', async () => {
				console.log(`✨ Cámara Sagrada sellada: ${outputZipPath} (${archive.pointer()} bytes)`)

				// 🧹 Intentamos purificar la Cámara Temporal destruida
				try {
					await fs.rm(sourceDir, { recursive: true, force: true })
					console.log(`🧹 Cámara Temporal purificada: ${sourceDir}`)
				} catch (err) {
					console.warn(`⚠️ No se pudo limpiar Cámara Temporal: ${err.message}`)
				}

				resolvePromise(outputZipPath)
			})

			// ❌ Evento de fracaso en el Ritual
			archive.on('error', (err) => {
				rejectPromise(new Error(`❌ No se pudo sellar la Cámara Sagrada: ${err.message}`))
			})

			// 🧙‍♂️ Canalizamos las Reliquias hacia el Río Binario
			archive.pipe(output)

			// 📦 Añadimos todas las Reliquias contenidas en la Cámara
			archive.directory(sourceDir, false)

			// 🛡️ Finalizamos el Ritual de Sellado
			archive.finalize()
		})
	} catch (error) {
		throw new Error(`❌ Error durante el sellado: ${error.message}`)
	}
}
