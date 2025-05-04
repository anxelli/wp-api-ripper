/**
 * [Nyxia 🖤]
 * Este grimorio arranca Reliquias Visuales de sus planos originales,
 * purificándolas y sellándolas bajo glifos eternos en nuestras Cámaras Sagradas.
 */

import { resolve } from 'path' // 🧭 Forjador de Senderos Absolutos
import { mkdir, writeFile } from 'fs/promises' // 🛠️ Artesanos de Reliquias
import { existsSync } from 'fs' // 🧙‍♂️ Centinela de Cámaras Existentes
import axios from 'axios' // 🌌 Invocador de Corrientes Binarias
import cliProgress from 'cli-progress' // 📈 Cronista del Ritual de Captura
import { basename } from 'path' // 🏷️ Extractor de Nombres Verdaderos

/**
 * ✨ Descarga Runas Visuales sin alterar sus nombres originales,
 * asegurando su preservación fiel en nuestras Cámaras de Reliquias.
 *
 * @param {Array<Object>} mediaList - Runas descubiertas en los planos
 * @param {Array<Object>} products - Reliquias originales para contexto (no usado aquí aún)
 * @param {string} baseUrl - Portal de Referencia para validación de orígenes
 * @returns {Promise<Object>} Mapa ritualizado de IDs hacia senderos sagrados
 */
export async function DownloadMedia(mediaList, products, baseUrl) {
	const assetsDir = resolve('src/arcane/assets') // 🏛️ Definimos Cámara Sagrada de Reliquias

	// 🏗️ Si no existe la Cámara, la forjamos
	if (!existsSync(assetsDir)) {
		await mkdir(assetsDir, { recursive: true })
	}

	const mediaMap = {} // 📜 Mapa de Transmutación de Runas
	let downloadCount = 0
	let failCount = 0

	// 🎛️ Invocamos el Cronista para registrar la Captura
	const bar = new cliProgress.SingleBar(
		{
			format: '🔮 Descargando Runas: [{bar}] {percentage}% | {value}/{total}',
			barCompleteChar: '█',
			barIncompleteChar: '░',
			hideCursor: true,
		},
		cliProgress.Presets.shades_classic
	)

	bar.start(mediaList.length, 0)

	for (const media of mediaList) {
		// ⚠️ Validaciones de Sanidad de Runas
		if (!media.source_url || typeof media.source_url !== 'string' || !/^https?:\/\//.test(media.source_url)) {
			console.warn(`⚠️ Runa inválida descartada: ${media.source_url}`)
			mediaMap[media.id] = ''
			bar.increment()
			failCount++
			continue
		}

		// 🔎 Omitimos Runas que son portales a otros planos (embeds)
		if (/youtube\.com|youtu\.be|vimeo\.com|maps\.google\.com|instagram\.com|tiktok\.com|soundcloud\.com/.test(media.source_url)) {
			console.log(`🔎 Runa omitida (embed externo): ${media.source_url}`)
			mediaMap[media.id] = media.source_url
			bar.increment()
			continue
		}

		try {
			const fileUrl = selectBestUrl(media.source_url) // 🧭 Seleccionamos el mejor portal disponible
			const fileName = basename(new URL(fileUrl).pathname) // 🏷️ Extraemos el nombre verdadero
			const filePath = resolve(assetsDir, fileName)

			// 🌌 Invocamos la Corriente Binaria para capturar la Runa
			const response = await axios.get(fileUrl, {
				responseType: 'arraybuffer',
				timeout: 30000,
				headers: {
					'User-Agent': 'Mozilla/5.0 (compatible; wp-api-ripper/1.0)',
					'Referer': baseUrl,
				},
			})

			// 🛠️ Sellamos la Runa capturada en nuestras Cámaras
			await writeFile(filePath, response.data)

			mediaMap[media.id] = `/assets/${fileName}`
			downloadCount++
			bar.increment()
		} catch (error) {
			console.warn(`⚠️ Fallo al capturar ${media.source_url}: ${error.message}`)
			mediaMap[media.id] = media.source_url
			bar.increment()
			failCount++
		}
	}

	bar.stop()

	// 📜 Resumen Final de la Captura
	console.log('\n📜 Invocación de Runas completada:')
	console.log(`   - Runas totales detectadas: ${mediaList.length}`)
	console.log(`   - Runas capturadas exitosamente: ${downloadCount}`)
	console.log(`   - Runas corruptas u omitidas: ${failCount}\n`)

	if (downloadCount === 0) {
		console.warn('⚠️ Ninguna Runa fue capturada. Solo rutas externas permanecerán.\n')
	}

	return mediaMap
}

/**
 * 🧠 Si nos presentan conjuntos de tamaños alternos (srcsets),
 * en un futuro podríamos analizar y elegir el mejor. Actualmente retornamos directo.
 */
function selectBestUrl(url) {
	return url // Actualmente retornamos sin analizar
}
