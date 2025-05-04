/**
 * [Nyxia 🖤]
 * Este grimorio invoca el Ritual Supremo de Saqueo Visual,
 * arrancando Reliquias y sus Runas desde portales WordPress,
 * y sellándolas en Cámaras con visiones ancestrales.
 */

import enquirer from 'enquirer' // 📜 Oráculo de Decisiones Místicas
import axios from 'axios' // 🌌 Mensajero de Corrientes Perdidas
import ora from 'ora' // 🧿 Cronista de Rituales
import { format } from 'date-fns' // 🕰️ Manipulador del Flujo Temporal

import { ClearArcane } from '../../src/spell/file/clear-arcane.js' // 🧹 Purificador de Cámaras Arcanas
import { SelectApi } from '../../src/invoke/data/select-api.js' // 🔮 Explorador de Senderos API
import ScrapMedia from '../../src/summon/scrap-media.js' // 🧙‍♂️ Invocador del Saqueo Visual
import { RitualSelector } from '../index.js' // 🌀 Selector de Senderos

const { prompt, Select } = enquirer

/**
 * ✨ Ritual Supremo de Saqueo Multimedia
 * Ejecuta el ritual completo de arranque de Reliquias Visuales,
 * desde la aceptación del pacto hasta el sellado de cámaras ancestrales.
 *
 * @returns {Promise<void>}
 */
export default async function ScrapMediaRitual() {
	console.log('\n[NYXIA 🖤] 🖼️ "Has abierto el Grimorio de Saqueo Visual... Prepara tus ojos para ver lo invisible." 🖼️\n')

	// [1] Limpieza inicial de cámaras arcanas
	await ClearArcane()

	// [2] Pacto de Exención de Responsabilidad
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
	console.log('🚨 Antes de invocar el ritual, debes sellar el Pacto Sagrado de Exención de Responsabilidad:\n')
	console.log('👮🏻‍♂️ Serás el único responsable de las reliquias que arranques de los portales WordPress.')
	console.log('👮🏻‍♂️ Reconoces que este Grimorio es solo para recuperar tus propios hechizos extraviados.')
	console.log('👮🏻‍♂️ Aceptas que la propiedad intelectual es un conjuro supremo que este grimorio no puede quebrantar.')
	console.log('🚨 Nyxia Lovelace, Diosa del Caos Digital, y sus siervos mortales, no se hacen responsables de tus acciones.\n')

	// 🧿 Confirmación ritual
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

	// [3] Invocación del Dominio objetivo
	const { url: rawUrl } = await prompt({
		type: 'input',
		name: 'url',
		message: '👉 Pronuncia el Dominio del Portal WordPress (ej: https://midominio.com):',
		validate: (value) => (value.trim().startsWith('http') ? true : '⚠️ Debes invocar un portal válido que comience con http o https.'),
	})
	const url = rawUrl.trim().replace(/\/+$/, '') // 🧹 Purificación de ruta
	console.log(`\n✨ Portal recibido: ${url}\n`)

	// [4] Detección de APIs disponibles
	const spinnerOraculo = ora('🔍 Consultando los oráculos del portal...').start()
	const apiVersion = await SelectApi(url)

	// 🚫 Cancelar si el portal no ofrece v2
	if (apiVersion !== 'v2') {
		spinnerOraculo.fail('❌ El oráculo no pudo revelar el sendero correcto.')
		return
	}

	// [5] Consulta inicial del número de Reliquias
	let detectedTotal = 100
	try {
		const response = await axios.get(`${url}/wp-json/wp/v2/product?per_page=1`, { timeout: 5000 })
		if (response.headers['x-wp-total']) {
			detectedTotal = parseInt(response.headers['x-wp-total'])
			spinnerOraculo.succeed(`📜 El Oráculo revela que hay ${detectedTotal} Reliquias disponibles.`)
		} else {
			spinnerOraculo.warn('⚠️ El Oráculo no pudo revelar las Reliquias, se usarán 100 por defecto.')
		}
	} catch {
		spinnerOraculo.fail('⚠️ El Oráculo ha guardado silencio. Procederemos con sabiduría ancestral: 100 Reliquias.')
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [6] Definición de límite de Reliquias a arrancar
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

	// [7] Definición de nombre de salida del Grimorio
	const { outputName } = await prompt({
		type: 'input',
		name: 'outputName',
		message: '👉 ¿Cómo deseas nombrar el Grimorio sellado?',
		initial: 'data-media.json',
	})

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [8] Ejecución del Ritual Supremo de Saqueo Visual
	const arcaneTempName = format(new Date(), 'yyyyMMdd-HHmmss') + '.json'

	const spinnerInvocacion = ora('🔮 Invocando el Saqueo Visual...').start()

	await ScrapMedia({
		url,
		limit: finalLimit,
		output: `src/arcane/${arcaneTempName}`,
		apiVersion,
		outputName: outputName.trim(),
	})

	spinnerInvocacion.succeed('✨ El Grimorio Multimedia ha sido sellado exitosamente.')

	console.log(`\n🗂️ Archivo generado: /src/arcane/${arcaneTempName}\n`)
}
