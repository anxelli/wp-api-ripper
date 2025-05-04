/**
 * [Nyxia 🖤]
 * Ritual Supremo de Saqueo Visual Optimizado:
 * Desde la captura de Reliquias hasta su purificación arcana,
 * sellando Grimorios sin descargas físicas innecesarias,
 * optimizando recursos, invocaciones y sellados.
 */

import path, { resolve } from 'path' // 🧭 Navegador de Senderos Ancestrales
import ora from 'ora' // 🧿 Invocador de Spinners Místicos
import { FetchProducts } from '../invoke/data/fetch-products.js' // 🧙‍♂️ Saqueador de Reliquias Brutas
import { FetchFeatured } from '../invoke/media/fetch-featured.js' // 📸 Cazador de Runas Destacadas
import { FetchContent } from '../invoke/media/fetch-content.js' // 📜 Explorador de Runas Embebidas
import { FetchGallery } from '../invoke/media/fetch-gallery.js' // 🖼️ Saqueador de Galerías Olvidadas
import { SaveArcane } from '../spell/json/save-arcane.js' // 🏛️ Forjador de Cámaras Temporales
import { SealResult } from '../spell/json/seal-result.js' // 🔏 Sello Final de Grimorios
import { AnalyzeMedia } from '../spell/media/analize-media.js' // 🔮 Analizador de Reliquias Visuales
import { ConfirmMedia } from '../spell/media/confirm-media.js' // 📣 Oráculo de Decisión de Captura
import { UpdateAssets } from '../spell/json/update-assets.js' // 🛠️ Refactorizador de Senderos Visuales
import { DownloadMedia } from '../spell/media/download-media.js' // 📥 Capturador de Runas
import { ZipFolder } from '../spell/media/zip-folder.js' // 🗜️ Compresor de Cámaras Sagradas
import { CleanProductList } from '../invoke/json/clean-json.js' // 🧹 Purificador de Reliquias Saqueadas
import { FetchCategories } from '../invoke/data/fetch-categories.js' // 📜 Invocador de Castas Textuales
import { copyFile, mkdir, cp, readdir } from 'fs/promises' // 🛠️ Artesanos de Cámaras
import cliProgress from 'cli-progress' // 📈 Cronista de Progresos
import enquirer from 'enquirer' // 📣 Oráculo de Decisiones

const { Select } = enquirer

/**
 * ✨ Función Principal:
 * Ejecuta el ritual de saqueo visual optimizado, permitiendo descarga opcional,
 * actualización de Reliquias, sellado de resultados y manejo flexible de outputs.
 */
export default async function ScrapMediaOptimized({ url, limit, output, apiVersion, outputName }) {
	try {
		console.log('\n🔮 Invocando Reliquias del Portal...\n')

		globalThis.scrapURL = url // 🌐 Definir Dominio de trabajo globalmente

		// 🔥 Fase 1: Invocación de Reliquias
		const spinnerFetch = ora('🔍 Despertando Reliquias olvidadas...').start()
		const relics = await FetchProducts(url, apiVersion, limit)
		spinnerFetch.succeed('✨ Reliquias invocadas exitosamente.\n')

		// 🚨 Validación: Si no hay Reliquias, abortar Ritual
		if (!relics.length) {
			console.log('⚠️ El portal yace vacío... No se encontraron Reliquias.\n')
			return
		}

		console.log(`✔ Se han capturado ${relics.length} Reliquias. Procediendo al Encapsulamiento...\n`)

		// 🔥 Fase 2: Encapsulamiento Temporal de Reliquias
		const spinnerSave = ora('⌛ Sellando Reliquias en Cámara Temporal...').start()
		await SaveArcane(output, relics)
		spinnerSave.succeed('✨ El Grimorio Temporal ha sido sellado...\n')

		console.log('🔍 Explorando Runas Visuales ocultas en las Reliquias...\n')

		// 🔥 Fase 3: Exploración de Runas Visuales
		const featuredMedia = await FetchFeatured(relics, url)
		const contentMedia = await FetchContent(relics, url)
		const galleryMedia = await FetchGallery(relics, url)

		// 🔗 Asociar Galerías encontradas a sus Reliquias
		for (const relic of relics) {
			const match = galleryMedia.find((g) => g.productId === relic.id)
			if (match) relic.gallery = match.urls
		}

		const allMedia = [...featuredMedia, ...galleryMedia, ...contentMedia]

		// 🧹 Filtro de Runas corruptas o inválidas
		const cleanedMedia = allMedia.filter((m) => m.source_url && typeof m.source_url === 'string' && /^https?:\/\//.test(m.source_url))

		// 🔥 Fase 4: Análisis de Reliquias Visuales encontradas
		const spinnerAnalyze = ora('🔮 Analizando Runas Visuales...').start()
		const mediaReport = await AnalyzeMedia(cleanedMedia)
		spinnerAnalyze.succeed('✨ Runas Visuales analizadas.\n')

		// 📣 Consulta con el Invocador si desea descargar medios o no
		const wantsToDownload = await ConfirmMedia(mediaReport)

		let mediaMap = {}

		if (!wantsToDownload) {
			// 🛠️ Actualizar Reliquias solo con rutas absolutas sin descarga
			console.log('\n🛠️ Actualizando Grimorio con rutas reales sin descarga...\n')

			mediaMap = cleanedMedia.reduce((acc, media) => {
				acc[media.id] = media.source_url
				return acc
			}, {})

			const spinnerUpdate = ora('🔮 Actualizando Reliquias con nuevas Runas...').start()
			const finalPath = await UpdateAndSeal(relics, mediaMap, outputName)
			spinnerUpdate.succeed('\n✨ Grimorio purificado y sellado sin descargas.\n')

			await CopyAssetsAndResult(finalPath)
			return
		}

		// 🔥 Fase 5: Captura Física de Medios
		console.log('\n📥 Iniciando captura física de Runas...\n')

		mediaMap = await DownloadMedia(cleanedMedia, relics, url)

		console.log('\n🛠️ Actualizando Grimorio con senderos internos...\n')

		// 🔥 Fase 6: Actualización con rutas internas y sellado
		const spinnerUpdate = ora('🔮 Actualizando Reliquias con Runas internas...').start()
		const finalPath = await UpdateAndSeal(relics, mediaMap, outputName)
		spinnerUpdate.succeed('\n✨ Grimorio actualizado con senderos internos.\n')

		console.log('\n🎁 Preparando Cámara Final...\n')

		// 📣 Consulta si se desea comprimir la Cámara Final
		const shouldZip = await AskZip()

		if (shouldZip) {
			const files = await readdir('src/arcane/assets').catch(() => [])
			if (!files.length) {
				console.warn('\n⚠️ No hay Reliquias en la Cámara Temporal para sellar.\n')
				await CopyAssetsAndResult(finalPath)
				return
			}

			const zipPath = `src/arcane/assets.zip`
			await ZipFolderWithProgress('src/arcane/assets', zipPath)
			await MoveResults(zipPath, finalPath)

			console.log('\n✅ Cámara Sagrada sellada y transferida exitosamente.\n')
		} else {
			await CopyAssetsAndResult(finalPath)
			console.log('\n✅ Cámara de Reliquias copiada exitosamente.\n')
		}
	} catch (error) {
		console.error('\n❌ El Ritual Supremo fue interrumpido:')
		console.error(error.stack || error.message)
		throw error
	}
}

/**
 * 🔧 Actualiza las Reliquias y realiza el sellado final en Cámara Eterna.
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
 * 🔮 Consulta al Invocador si desea comprimir la Cámara Sagrada.
 */
async function AskZip() {
	const selector = new Select({
		name: 'zipIt',
		message: '👉 ¿Cómo deseas sellar el resultado?',
		choices: [
			{ name: 'zip', message: '📦 En una Cámara Sagrada .zip' },
			{ name: 'folder', message: '📂 Solo copia los archivos normales' },
		],
	})

	const decision = await selector.run()
	return decision === 'zip'
}

/**
 * 🗃️ Copia las Reliquias a la Cámara de Resultados.
 */
async function CopyAssetsAndResult(finalPath) {
	await mkdir('results', { recursive: true })
	await cp('src/arcane/assets', 'results/assets', { recursive: true }).catch(() => {})
	await copyFile(finalPath, `results/${path.basename(finalPath)}`)
}

/**
 * 🚚 Mueve el zip y el Grimorio sellado a resultados finales.
 */
async function MoveResults(zipPath, finalPath) {
	await mkdir('results', { recursive: true })
	await copyFile(zipPath, `results/${path.basename(zipPath)}`)
	await copyFile(finalPath, `results/${path.basename(finalPath)}`)
}

/**
 * 🗜️ Comprime la Cámara Temporal de activos en un solo .zip
 */
async function ZipFolderWithProgress(sourceDir, outputZipPath) {
	const fs = await import('fs/promises')
	const files = await fs.readdir(sourceDir)

	const bar = new cliProgress.SingleBar(
		{
			format: '📦 Comprimiendo Cámara: [{bar}] {percentage}% | {value}/{total}',
			barCompleteChar: '█',
			barIncompleteChar: '░',
		},
		cliProgress.Presets.shades_classic
	)

	bar.start(files.length, 0)

	await ZipFolder(sourceDir, outputZipPath)
	bar.update(files.length)

	bar.stop()
}
