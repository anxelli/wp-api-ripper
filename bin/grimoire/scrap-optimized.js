/**
 * [Nyxia 🖤]
 * Este grimorio invoca el Ritual Supremo de Saqueo Optimizado,
 * arrancando Reliquias purificadas desde portales WordPress,
 * conservando rutas absolutas para nuevos planos de existencia
 * sin requerir llaves prohibidas ni descargas físicas innecesarias.
 */

import enquirer from 'enquirer' // 📜 Oráculo de Decisiones
import axios from 'axios' // 🌌 Mensajero de Corrientes Perdidas
import ora from 'ora' // 🧿 Cronista de Rituales Progresivos
import { format } from 'date-fns' // 🕰️ Manipulador de Tiempos Ancestrales

import { ClearArcane } from '../../src/spell/file/clear-arcane.js' // 🧹 Purificador de Cámaras Temporales
import { SelectApi } from '../../src/invoke/data/select-api.js' // 🔮 Explorador de Senderos API
import ScrapOptimized from '../../src/summon/scrap-optimized.js' // 🧙‍♂️ Ejecutor del Ritual Optimizado
import { RitualSelector } from '../index.js' // 🌀 Devolución a Selector de Grimorios

const { prompt, Select } = enquirer

/**
 * ✨ Ritual Supremo de Saqueo Optimizado
 * Ejecuta el flujo completo de arranque de Reliquias de manera optimizada,
 * desde la aceptación del Pacto hasta el sellado final del Grimorio.
 */
export default async function ScrapOptimizedRitual() {
	console.log('\n[NYXIA 🖤] ✨ "Has abierto el Grimorio de Saqueo Optimizado... Afila tu mente, Saqueador del Caos." ✨\n')

	// [1] Limpieza previa de reliquias corruptas
	await ClearArcane()

	// [2] Pacto de Exención de Responsabilidad
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
	console.log('🚨 Antes de invocar el ritual, debes sellar el Pacto Sagrado de Exención de Responsabilidad:\n')
	console.log('👮🏻‍♂️ Serás el único responsable de las reliquias que arranques de los portales WordPress.')
	console.log('👮🏻‍♂️ Reconoces que este Grimorio es solo para recuperar tus propios hechizos extraviados.')
	console.log('👮🏻‍♂️ Aceptas que la propiedad intelectual es un conjuro supremo que este grimorio no puede quebrantar.')
	console.log('🚨 Nyxia Lovelace, Diosa del Caos Digital, y sus siervos mortales, no se hacen responsables de tus acciones.\n')

	// 🧿 Pregunta para aceptar el pacto
	const selector = new Select({
		name: 'terms',
		message: '👉 ¿Aceptas esta carga ancestral?',
		choices: [
			{ name: 'obvi', message: '😒 Sí, acepto aunque no haya leído nada... (Como siempre)' },
			{ name: 'nel', message: '🤬 No, yo sí leí todo... ¡Me voy ALV!' },
		],
	})

	const decision = await selector.run()
	if (decision === 'nel') return await RitualSelector() // 🚪 Si no acepta, volver al selector

	// [3] Solicitar Dominio objetivo
	const { url: rawUrl } = await prompt({
		type: 'input',
		name: 'url',
		message: '👉 Pronuncia el Dominio del Portal WordPress (ej: https://midominio.com):',
		validate: (value) => (value.trim().startsWith('http') ? true : '⚠️ Debes invocar un portal válido que comience con http o https.'),
	})

	const url = rawUrl.trim().replace(/\/+$/, '') // 🧼 Purificación del dominio
	console.log(`\n✨ Portal recibido: ${url}\n`)

	// [4] Detección de la versión API disponible
	const spinnerOraculo = ora('🔍 Consultando los oráculos del portal...').start()
	const apiVersion = await SelectApi(url)

	// 🚫 Si no se detecta v2, cancelar
	if (apiVersion !== 'v2') {
		spinnerOraculo.fail('❌ El oráculo no pudo revelar el sendero correcto.')
		return
	}

	// [5] Consulta del total de Reliquias disponibles
	let detectedTotal = 100 // Valor predeterminado
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

	// [6] Definir el límite de Reliquias a arrancar
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

	// [7] Definir nombre del archivo de salida
	const { outputName } = await prompt({
		type: 'input',
		name: 'outputName',
		message: '👉 ¿Cómo deseas nombrar tu invocación final?',
		initial: 'data-optimized.json',
	})

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [8] Ejecutar el Ritual de Saqueo Optimizado
	const arcaneTempName = format(new Date(), 'yyyyMMdd-HHmmss') + '.json'

	const spinnerInvocacion = ora('🔮 Invocando el Saqueo Optimizado...').start()

	await ScrapOptimized({
		url,
		limit: finalLimit,
		output: `src/arcane/${arcaneTempName}`,
		apiVersion,
		outputName: outputName.trim(),
	})

	spinnerInvocacion.succeed('✨ El Grimorio ha sido sellado (Optimizado).')

	console.log(`\n🗂️ Archivo generado: /src/arcane/${arcaneTempName}\n`)
}
