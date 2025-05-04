/**
 * [Nyxia 🖤]
 * Este grimorio invoca el Ritual Supremo de Arranque de Reliquias,
 * saqueando portales WordPress, sellando Grimorios Sagrados y navegando
 * entre API corruptas con la astucia de un arquimago ancestral.
 */

import enquirer from 'enquirer' // 📜 Oráculo de Decisiones Mortales
import axios from 'axios' // 🌌 Invocador de Corrientes Prohibidas
import ora from 'ora' // 🧿 Cronista de Progresos Místicos
import { format } from 'date-fns' // 🕰️ Doblador del Tiempo

import { ClearArcane } from '../../src/spell/file/clear-arcane.js' // 🧹 Purificador de Cámaras Corruptas
import { SelectApi } from '../../src/invoke/data/select-api.js' // 🔮 Explorador de Portales API
import Scrap from '../../src/summon/scrap.js' // 🧙‍♂️ Invocador del Saqueo Supremo
import { RitualSelector } from '../index.js' // 🌀 Devolución al Selector de Grimorios

const { prompt, Select } = enquirer

/**
 * ✨ Ritual Supremo de Arranque Crudo
 * Ejecuta toda la ceremonia: limpia, consulta, arranca reliquias y sella Grimorios.
 *
 * @returns {Promise<void>}
 */
export default async function ScrapRitual() {
	console.log('\n[NYXIA 🖤] 🌀 "Has abierto el Grimorio de Saqueo Crudo... Prepara tu voluntad, Saqueador del Caos." 🌀\n')

	// [1] Limpieza previa del Arcano
	await ClearArcane()

	// [2] Aceptar Responsabilidad mediante Pacto Sagrado
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
	console.log('🚨 Antes de invocar el ritual, debes sellar el Pacto Sagrado de Exención de Responsabilidad:\n')
	console.log('👮🏻‍♂️ Serás el único responsable de las reliquias que arranques de los portales WordPress.')
	console.log('👮🏻‍♂️ Reconoces que este Grimorio es solo para recuperar tus propios hechizos extraviados.')
	console.log('👮🏻‍♂️ Aceptas que la propiedad intelectual es un conjuro supremo que este grimorio no puede quebrantar.')
	console.log('🚨 Nyxia Lovelace, Diosa del Caos Digital, y sus siervos mortales, no se hacen responsables de tus acciones.\n')

	const selector = new Select({
		name: 'terms',
		message: '👉 ¿Aceptas esta carga ancestral?',
		choices: [
			{ name: 'obvi', message: '😒 Sí, acepto aunque no haya leído nada... (Como siempre)' },
			{ name: 'nel', message: '🤬 No, yo sí leí todo... ¡Me voy ALV!' },
		],
	})

	const decision = await selector.run()

	if (decision === 'nel') {
		// ⚡ Devolverse si no acepta los términos
		await RitualSelector()
		return
	}

	// [3] Pronunciar Dominio objetivo
	const { url: rawUrl } = await prompt({
		type: 'input',
		name: 'url',
		message: '👉 Pronuncia el Dominio del Portal WordPress (ej: https://midominio.com):',
		validate: (value) => (value.trim().startsWith('http') ? true : '⚠️ Debes invocar un portal válido que comience con http o https.'),
	})

	const url = rawUrl.trim().replace(/\/+$/, '') // 🧼 Purificación del portal recibido

	console.log(`\n✨ Portal recibido: ${url}\n`)

	// [4] Detección de APIs disponibles
	const spinnerOraculo = ora('🔍 Consultando los oráculos del portal...').start()
	const apiVersion = await SelectApi(url)

	if (apiVersion !== 'v2') {
		// ❌ Si no es v2, cancelamos invocación
		spinnerOraculo.fail('❌ El oráculo no pudo revelar el sendero correcto.')
		return
	}

	let detectedTotal = 100 // Valor por defecto de Reliquias
	try {
		// 🌐 Consulta real para obtener número de productos
		const apiPath = apiVersion === 'v2' ? '/wp-json/wp/v2/product' : '/wp-json/wc/v3/products'
		const response = await axios.get(`${url}${apiPath}?per_page=1`, { timeout: 5000 })

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

	// [5] Definir límite de Reliquias a arrancar
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

	// [6] Definir nombre del Grimorio de salida
	const { outputName } = await prompt({
		type: 'input',
		name: 'outputName',
		message: '👉 ¿Cómo deseas nombrar tu invocación final?',
		initial: 'data.json',
	})

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	// [7] Ejecutar el Ritual Supremo
	const arcaneTempName = format(new Date(), 'yyyyMMdd-HHmmss') + '.json'

	const spinnerInvocacion = ora('🔮 Invocando el Saqueo Ancestral...').start()

	await Scrap({
		url,
		limit: finalLimit,
		output: `src/arcane/${arcaneTempName}`,
		apiVersion,
		outputName: outputName.trim(),
	})

	spinnerInvocacion.succeed('✨ El Grimorio ha sido sellado exitosamente.')

	console.log(`\n🗂️ Archivo generado: /src/arcane/${arcaneTempName}\n`)
}
