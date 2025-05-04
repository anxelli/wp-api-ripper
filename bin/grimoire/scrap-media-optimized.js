/**
 * [Nyxia 🖤]
 * Este grimorio invoca el Ritual Supremo de Saqueo Visual (Optimizado),
 * arrancando Reliquias y sus Runas desde portales WordPress,
 * y sellándolas en Cámaras con visiones purificadas, libres de corrupción binaria.
 */

import enquirer from 'enquirer' // 📜 Oráculo de Decisiones
import axios from 'axios' // 🌌 Mensajero de Corrientes Perdidas
import ora from 'ora' // 🧿 Cronista de Rituales
import { format } from 'date-fns' // 🕰️ Maestro del Tiempo Ancestral

import { ClearArcane } from '../../src/spell/file/clear-arcane.js' // 🧹 Purificador de Cámaras
import { SelectApi } from '../../src/invoke/data/select-api.js' // 🔮 Explorador de Senderos API
import ScrapMediaOptimized from '../../src/summon/scrap-media-optimized.js' // 🧙‍♂️ Invocador de Saqueo Visual Optimizado
import { RitualSelector } from '../index.js' // 🌀 Selector de Senderos Grimorianos

const { prompt, Select } = enquirer

/**
 * ✨ Ritual Supremo de Saqueo Visual Optimizado
 * Lanza todo el flujo de extracción, análisis y sellado de reliquias visuales optimizadas.
 *
 * @returns {Promise<void>}
 */
export default async function ScrapMediaOptimizedRitual() {
	console.log(
		'\n[NYXIA 🖤] 🧹 "Has abierto el Grimorio de Saqueo Visual (Optimizado)... Prepara tus ojos para reliquias purificadas." 🧹\n'
	)

	// [1] Limpieza inicial de residuos arcanos
	await ClearArcane()

	// [2] Sellado del Pacto de Responsabilidad
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
	console.log('🚨 Antes de invocar el ritual, debes sellar el Pacto Sagrado de Exención de Responsabilidad:\n')
	console.log('👮🏻‍♂️ Serás el único responsable de las reliquias que arranques de los portales WordPress.')
	console.log('👮🏻‍♂️ Reconoces que este Grimorio es solo para recuperar tus propios hechizos extraviados.')
	console.log('👮🏻‍♂️ Aceptas que la propiedad intelectual es un conjuro supremo que este grimorio no puede quebrantar.')
	console.log('🚨 Nyxia Lovelace, Diosa del Caos Digital, y sus siervos mortales, no se hacen responsables de tus acciones.\n')

	// 🧿 Decisión ritual: aceptar o abandonar
	const selector = new Select({
		name: 'terms',
		message: '👉 ¿Aceptas esta carga ancestral?',
		choices: [
			{ name: 'obvi', message: '😒 Sí, acepto aunque no haya leído nada... (Como siempre)' },
			{ name: 'nel', message: '🤬 No, yo sí leí todo... ¡Me voy ALV!' },
		],
	})

	const decision = await selector.run()
	if (decision === 'nel') return await RitualSelector()

	// [3] Invocación del Portal objetivo
	const { url: rawUrl } = await prompt({
		type: 'input',
		name: 'url',
		message: '👉 Pronuncia el Dominio del Portal WordPress (ej: https://midominio.com):',
		validate: (value) => (value.trim().startsWith('http') ? true : '⚠️ Debes invocar un portal válido que comience con http o https.'),
	})

	const url = rawUrl.trim().replace(/\/+$/, '') // 🧼 Purificación de la ruta
	console.log(`\n✨ Portal recibido: ${url}\n`)

	// [4] Consulta de disponibilidad de API
	const spinnerOraculo = ora('🔍 Consultando los oráculos del portal...').start()
	const apiVersion = await SelectApi(url)

	// 🚫 Cancelar ritual si no es v2
	if (apiVersion !== 'v2') {
		spinnerOraculo.fail('❌ El oráculo no pudo revelar el sendero correcto.')
		return
	}

	// [5] Descubrimiento de la cantidad de Reliquias
	let detectedTotal = 100
	try {
		const response = await axios.get(`${url}/wp-json/wp/v2/product?per_page=1`, { timeout: 5000 })
		if (response.headers['x-wp-total']) {
			detectedTotal = parseInt(response.headers['x-wp-total'])
			spinnerOraculo.succeed(`📜 El Oráculo revela que existen ${detectedTotal} Reliquias disponibles.`)
		} else {
			spinnerOraculo.warn('⚠️ El Oráculo no pudo revelar las Reliquias, se usarán 100 por defecto.')
		}
	} catch {
		spinnerOraculo.fail('⚠️ El Oráculo ha guardado silencio. Procederemos con sabiduría ancestral: 100 Reliquias.')
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [6] Definición de cuántas Reliquias arrancar
	const { limit } = await prompt({
		type: 'input',
		name: 'limit',
		message: '👉 ¿Cuántas Reliquias deseas arrancar del portal?',
		initial: detectedTotal.toString(),
		validate: (value) => (/^[0-9]+$/.test(value) ? true : 'Debes inscribir un número válido.'),
	})

	let finalLimit = parseInt(limit)
	if (finalLimit > detectedTotal) {
		console.log(`\n⚠️ No jodas... solo existen ${detectedTotal} Reliquias disponibles.\n`)
		finalLimit = detectedTotal
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [7] Definición del nombre del Grimorio sellado
	const { outputName } = await prompt({
		type: 'input',
		name: 'outputName',
		message: '👉 ¿Cómo deseas nombrar tu invocación final?',
		initial: 'data-media-optimized.json',
	})

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [8] Lanzamiento del Ritual de Saqueo Visual Optimizado
	const arcaneTempName = format(new Date(), 'yyyyMMdd-HHmmss') + '.json'

	const spinnerInvocacion = ora('🔮 Invocando el Saqueo Visual Optimizado...').start()

	await ScrapMediaOptimized({
		url,
		limit: finalLimit,
		output: `src/arcane/${arcaneTempName}`,
		apiVersion,
		outputName: outputName.trim(),
	})

	spinnerInvocacion.succeed('✨ El Grimorio Multimedia ha sido sellado (Optimizado).')

	console.log(`\n🗂️ Archivo generado: /src/arcane/${arcaneTempName}\n`)
}
