/**
 * [Nyxia 🖤]
 * Ritual Supremo de Saqueo Optimizado:
 * Captura de Reliquias y limpieza arcana, preservando rutas absolutas,
 * sin tocar los planos físicos (no se descargan medios).
 */

import path, { resolve } from 'path' // 🧭 Navegador de Planos y Rutas Ancestrales
import ora from 'ora' // 🧿 Invocador de Spinners Místicos
import cliProgress from 'cli-progress' // 📈 Cronista de Rituales Progresivos
import { copyFile, mkdir, cp } from 'fs/promises' // 🛠️ Artesanos de Cámaras y Portales
import enquirer from 'enquirer' // 📣 Oráculo de Decisiones

import { FetchProducts } from '../invoke/data/fetch-products.js' // 🧙‍♂️ Saqueador de Reliquias Antiguas
import { SaveArcane } from '../spell/json/save-arcane.js' // 🏛️ Guardián de Cámaras Temporales
import { SealResult } from '../spell/json/seal-result.js' // 🔏 Sello Eterno de Grimorios
import { CleanProductList } from '../invoke/json/clean-json.js' // 🧹 Purificador de Reliquias Saqueadas
import { FetchCategories } from '../invoke/data/fetch-categories.js' // 📜 Invocador de Castas Antiguas
import { UpdateAssets } from '../spell/json/update-assets.js' // 🛠️ Refactorizador de Reliquias Visuales
import { GetMediaRoutes } from '../spell/media/get-media-routes.js' // 🔗 Trazador de Sendas de Runas Visuales

const { prompt, Select } = enquirer

/**
 * ✨ Ritual Supremo de Saqueo Optimizado
 */
export default async function ScrapOptimized({ url, limit, output, apiVersion, outputName }) {
	try {
		console.log('\n🔮 Despertando Reliquias ancestrales del Portal...\n')

		globalThis.scrapURL = url

		const spinnerFetch = ora('🔍 Invocando Reliquias del Portal...').start()
		const relics = await FetchProducts(url, apiVersion, limit)
		spinnerFetch.succeed('✨ Reliquias invocadas exitosamente.')

		if (!relics.length) {
			console.log('⚠️ El portal yace vacío... No se encontraron Reliquias.\n')
			return
		}

		console.log(`✔ Se han capturado ${relics.length} Reliquias. Procediendo al Encapsulamiento...\n`)

		const spinnerSave = ora('⌛ Sellando Reliquias en Cámara Temporal...').start()
		await SaveArcane(output, relics)
		spinnerSave.succeed('✨ El Grimorio Temporal ha sido sellado...\n')

		console.log('🔍 Consultando rutas reales de las Runas Visuales...\n')

		const ids = CollectMediaIdsFromRelics(relics)

		const mediaBar = new cliProgress.SingleBar(
			{
				format: '🔗 Consultando Runas: [{bar}] {percentage}% | {value}/{total}',
				barCompleteChar: '█',
				barIncompleteChar: '░',
			},
			cliProgress.Presets.shades_classic
		)
		mediaBar.start(ids.length, 0)

		const mediaMap = await GetMediaRoutes(ids, url, mediaBar)

		mediaBar.stop()

		console.log('\n🔮 Purificando Reliquias...\n')

		const spinnerUpdate = ora('🛠️ Actualizando Reliquias con nuevas Runas...').start()
		const finalPath = await UpdateAndSeal(relics, mediaMap, outputName)
		spinnerUpdate.succeed('✨ Las Reliquias han sido purificadas y actualizadas.\n')

		await CopyAssetsAndResult(finalPath)

		console.log('📜 El Grimorio Final ha sido sellado en:\n')
		console.log(`   ${finalPath}\n`)
		return
	} catch (error) {
		console.error('\n❌ El Ritual Supremo fue interrumpido:')
		console.error(error.stack || error.message)
		throw error
	}
}

/**
 * 🧲 Colector de IDs de Runas Visuales desde las Reliquias obtenidas.
 */
function CollectMediaIdsFromRelics(relics) {
	const ids = new Set()

	for (const relic of relics) {
		if (relic.featured_media && typeof relic.featured_media === 'number') {
			ids.add(relic.featured_media)
		}
		if (Array.isArray(relic.gallery)) {
			relic.gallery.forEach((img) => {
				if (img.id && typeof img.id === 'number') {
					ids.add(img.id)
				}
			})
		}
	}
	return Array.from(ids)
}

/**
 * 🔮 Actualiza las Reliquias con rutas de Runas purificadas y sella el Grimorio final.
 */
async function UpdateAndSeal(relics, mediaMap, outputName) {
	const bar = new cliProgress.SingleBar(
		{
			format: '🔮 Actualizando Reliquias: [{bar}] {percentage}% | {value}/{total}',
			barCompleteChar: '█',
			barIncompleteChar: '░',
		},
		cliProgress.Presets.shades_classic
	)

	bar.start(relics.length, 0)

	const updatedRelics = await UpdateAssets(relics, mediaMap)

	bar.update(relics.length)
	bar.stop()

	const categoryMap = await FetchCategories()
	const cleanedRelics = await CleanProductList(updatedRelics, { categoryMap })

	const tempOutput = resolve('src/arcane', 'temp-final.json')
	await SaveArcane(tempOutput, cleanedRelics)

	const finalName = outputName.endsWith('.json') ? outputName : `${outputName}.json`
	const finalPath = await SealResult(tempOutput, finalName)

	return finalPath
}

/**
 * 🧳 Copia los Activos y el Grimorio Final sellado a la Cámara de Resultados.
 */
async function CopyAssetsAndResult(finalPath) {
	await mkdir('results', { recursive: true })
	await cp('src/arcane/assets', 'results/assets', { recursive: true }).catch(() => {})
	await copyFile(finalPath, `results/${path.basename(finalPath)}`)
}
