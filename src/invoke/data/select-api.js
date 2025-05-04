/**
 * [Nyxia 🖤]
 * Hechizo de Exploración Dimensional:
 * Este invocador rastrea los ecos olvidados de portales WordPress,
 * buscando rutas v2 o v3 entre las grietas del Multiverso.
 * Solo los sabios eligen el camino correcto, evitando sendas aún prohibidas y selladas.
 */

import axios from 'axios' // 🌌 Invocador de Corrientes Remotas
import enquirer from 'enquirer' // 📣 Oráculo de Decisiones
import { RitualSelector } from '../../../bin/index.js' // 🔮 Portal de Regreso al Grimorio Principal

const { prompt, Select } = enquirer

/**
 * ✨ Explorador de Portales API (v2/v3)
 * Descubre qué rutas están abiertas en el portal objetivo.
 *
 * @param {string} domain - Dominio del Portal WordPress a explorar.
 * @returns {Promise<'v2' | 'grimorio'>} Ruta elegida para continuar el ritual.
 */
export async function SelectApi(domain) {
	console.log('\n🔍 Explorando los portales API disponibles...\n')

	let apiOptions = []
	const maxRetries = 3 // 🔁 Intentos máximos de reexploración
	let retries = 0

	/**
	 * 🔎 Detección de portales v2 y v3
	 */
	async function detectApis() {
		apiOptions = []

		try {
			const v2 = await axios.get(`${domain}/wp-json/wp/v2`, { timeout: 5000 })
			if (v2.status === 200) apiOptions.push('v2')
		} catch (_) {} // Silencio ritual: ignorar portales muertos

		try {
			const v3 = await axios.get(`${domain}/wp-json/wc/v3`, { timeout: 5000 })
			if (v3.status === 200) apiOptions.push('v3')
		} catch (_) {}
	}

	await detectApis()

	// 🔁 Retry automático si solo detectamos v3
	while (apiOptions.length === 1 && apiOptions[0] === 'v3' && retries < maxRetries) {
		console.log('\n⚠️ Solo se detectó v3, reintentando apertura de portales olvidados...\n')
		retries++
		await detectApis()
	}

	// ❌ Si no detectamos ningún portal
	if (apiOptions.length === 0) {
		console.log('\n❌ Ningún portal API responde en las Tierras Olvidadas.\n')

		const { decision } = await prompt({
			type: 'select',
			name: 'decision',
			message: '👉 ¿Qué senda deseas recorrer?',
			choices: [
				{ name: 'retry', message: '🔄 Reintentar exploración de portales' },
				{ name: 'grimorio', message: '🌀 Volver al Grimorio de Hechizos' },
			],
		})

		if (decision === 'retry') {
			return await SelectApi(domain)
		} else {
			await RitualSelector()
			return 'grimorio'
		}
	}

	// 🧿 Mostrar selección de APIs disponibles
	const { selectedApi } = await prompt({
		type: 'select',
		name: 'selectedApi',
		message: '🔮 Se han abierto portales... elige sabiamente:',
		choices: apiOptions.map((api) => ({
			name: api,
			message: api === 'v2' ? '📜 Portal Antiguo v2 (Acceso Libre)' : '🗝️ Portal Sellado v3 (Requiere Llaves Místicas)',
		})),
	})

	// ⚠️ Si selecciona v3, advertimos que aún es territorio prohibido
	if (selectedApi === 'v3') {
		console.log('\n⚠️ El portal v3 exige Llaves Arcanas (API Keys) para ser cruzado.')
		console.log('⚠️ Este Grimorio aún no posee la sabiduría necesaria para invocar v3.\n')

		const { decision } = await prompt({
			type: 'select',
			name: 'decision',
			message: '👉 ¿Qué senda deseas recorrer ahora?',
			choices: [
				{ name: 'retry', message: '🔄 Reintentar detección de portales' },
				{ name: 'grimorio', message: '🌀 Volver al Grimorio de Hechizos' },
			],
		})

		if (decision === 'retry') {
			return await SelectApi(domain)
		} else {
			await RitualSelector()
			return 'grimorio'
		}
	}

	// ✔️ Si elige v2, seguimos el Ritual
	console.log('\n✔ El Portal v2 ha respondido al llamado.\n')
	return 'v2'
}
