/**
 * [Nyxia 🖤]
 * Ritual Supremo del Saqueo Visual Completo:
 * Desde la invocación de Reliquias hasta su captura, limpieza, purificación
 * y sellado final en Cámaras Eternas. Solo para invocadores que desafían la entropía.
 */

import path, { resolve } from 'path'
import ora from 'ora'
import { FetchProducts } from '../invoke/data/fetch-products.js' // 🧙‍♂️ Invocador de Reliquias Brutas
import { FetchFeatured } from '../invoke/media/fetch-featured.js' // 📸 Saqueador de Runas Destacadas
import { FetchContent } from '../invoke/media/fetch-content.js' // 📜 Explorador de Runas Embebidas
import { FetchGallery } from '../invoke/media/fetch-gallery.js' // 🖼️ Saqueador de Galerías Perdidas
import { SaveArcane } from '../spell/json/save-arcane.js' // 🏛️ Forjador de Cámaras Temporales
import { SealResult } from '../spell/json/seal-result.js' // 🔏 Guardián del Sello Final
import { AnalyzeMedia } from '../spell/media/analize-media.js' // 🔮 Analizador de Reliquias Visuales
import { ConfirmMedia } from '../spell/media/confirm-media.js' // 📣 Oráculo de Captura
import { UpdateAssets } from '../spell/json/update-assets.js' // 🛠️ Refactorizador de Reliquias Visuales
import { DownloadMedia } from '../spell/media/download-media.js' // 📥 Capturador de Runas Visuales
import { ZipFolder } from '../spell/media/zip-folder.js' // 🗜️ Sellador de Cámaras Sagradas
import { copyFile, mkdir, cp, readdir } from 'fs/promises'
import cliProgress from 'cli-progress'
import enquirer from 'enquirer'

const { prompt, Select } = enquirer

/**
 * ✨ Ritual Supremo de Saqueo Visual Completo
 */
export default async function ScrapMedia({ url, limit, output, apiVersion, outputName }) {
	try {
		console.log('\n🔮 Invocando Reliquias del Portal...\n')

		const spinnerFetch = ora('🔍 Despertando Reliquias olvidadas...').start()
		const relics = await FetchProducts(url, apiVersion, limit)
		spinnerFetch.succeed('✨ Reliquias invocadas exitosamente.\n')

		if (!relics.length) {
			console.log('⚠️ El portal yace vacío... No se encontraron Reliquias.\n')
			return
		}

		console.log(`✔ Se han capturado ${relics.length} Reliquias. Procediendo al Encapsulamiento...\n`)

		const spinnerSave = ora('⌛ Sellando Reliquias en Cámara Temporal...').start()
		await SaveArcane(output, relics)
		spinnerSave.succeed('✨ El Grimorio Temporal ha sido sellado...\n')

		console.log('🔍 Explorando Runas Visuales ocultas en las Reliquias...\n')

		const featuredMedia = await FetchFeatured(relics, url)
		const galleryMedia = await FetchGallery(relics, url)
		const contentMedia = await FetchContent(relics, url)

		const allMedia = [...featuredMedia, ...galleryMedia, ...contentMedia]

		// 🚨 Filtrar runas corruptas
		const cleanedMedia = allMedia.filter((m) => m.source_url && typeof m.source_url === 'string' && /^https?:\/\//.test(m.source_url))

		const spinnerAnalyze = ora('🔮 Analizando Runas Visuales...').start()
		const mediaReport = await AnalyzeMedia(cleanedMedia)
		spinnerAnalyze.succeed('✨ Runas Visuales analizadas.\n')

		const wantsToDownload = await ConfirmMedia(mediaReport)

		let mediaMap = {}

		if (!wantsToDownload) {
			console.log('\n🛠️ Actualizando Grimorio con rutas reales sin descarga...\n')

			mediaMap = cleanedMedia.reduce((acc, media) => {
				acc[media.id] = media.source_url
				return acc
			}, {})

			const spinnerUpdate = ora('🔮 Actualizando Reliquias con nuevas Runas...').start()
			await UpdateAndSeal(relics, mediaMap, outputName)
			spinnerUpdate.succeed('\n✨ Grimorio purificado y sellado sin descargas.\n')
			return
		}

		console.log('\n📥 Iniciando captura física de Runas...\n')

		mediaMap = await DownloadMedia(cleanedMedia, relics, url)

		console.log('\n🛠️ Actualizando Grimorio con senderos internos...\n')

		const spinnerUpdate = ora('🔮 Actualizando Reliquias con Runas internas...').start()
		await UpdateAndSeal(relics, mediaMap, outputName)
		spinnerUpdate.succeed('\n✨ Grimorio actualizado con senderos internos.\n')

		console.log('\n🎁 Preparando Cámara Final...\n')

		const shouldZip = await AskZip()

		if (shouldZip) {
			const files = await readdir('src/arcane/assets').catch(() => [])
			if (!files.length) {
				console.warn('\n⚠️ No hay Reliquias en la Cámara Temporal para sellar. Nada será comprimido.\n')
				await CopyAssetsAndResult(outputName)
				return
			}

			const zipPath = `src/arcane/assets.zip`
			await ZipFolderWithProgress('src/arcane/assets', zipPath)
			await MoveResults(zipPath, outputName)

			console.log('\n✅ Cámara Sagrada sellada y transferida exitosamente.\n')
		} else {
			await CopyAssetsAndResult(outputName)
			console.log('\n✅ Cámara de Reliquias copiada exitosamente.\n')
		}
	} catch (error) {
		console.error('\n❌ El Ritual Supremo fue interrumpido:')
		console.error(error.stack || error.message)
		throw error
	}
}

/**
 * 🔧 Actualiza Reliquias con nuevas rutas y sella el Grimorio final.
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

	const tempOutput = resolve('src/arcane', 'temp-final.json')
	await SaveArcane(tempOutput, updatedRelics)

	const finalName = outputName.endsWith('.json') ? outputName : `${outputName}.json`
	await SealResult(tempOutput, finalName)
}

/**
 * 🧿 Consulta si el Invocador desea sellar en .zip o no.
 */
async function AskZip() {
	const selector = new Select({
		name: 'zipIt',
		message: '👉 ¿Cómo deseas sellar el resultado?',
		choices: [
			{ name: 'zip', message: '📦 En una Cámara Sagrada .zip' },
			{ name: 'folder', message: '📂 Solo copiar los archivos normales' },
		],
	})

	const decision = await selector.run()
	return decision === 'zip'
}

/**
 * 📦 Copia de activos y Grimorio sellado hacia Cámara Final.
 */
async function CopyAssetsAndResult(outputName) {
	await mkdir('results', { recursive: true })
	await cp('src/arcane/assets', 'results/assets', { recursive: true })
	const finalName = outputName.endsWith('.json') ? outputName : `${outputName}.json`
	await copyFile(`src/arcane/temp-final.json`, `results/${finalName}`)
}

/**
 * 🚚 Movimiento de Cámara sellada (.zip) hacia Cámara Final.
 */
async function MoveResults(zipPath, outputName) {
	await mkdir('results', { recursive: true })
	await copyFile(zipPath, `results/${path.basename(zipPath)}`)
	const finalName = outputName.endsWith('.json') ? outputName : `${outputName}.json`
	await copyFile(`src/arcane/temp-final.json`, `results/${finalName}`)
}

/**
 * 🗜️ Compresión de la Cámara Temporal en una Cámara Sagrada .zip
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
