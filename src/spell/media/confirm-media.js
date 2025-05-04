/**
 * [Nyxia 🖤]
 * Ritual de Confirmación de Cosecha:
 * Evalúa las Runas descubiertas, revela su naturaleza ante el Invocador,
 * y le otorga la elección suprema: capturarlas para su colección... o dejar que el olvido las consuma.
 */

import enquirer from 'enquirer' // 📣 Oráculo de las Decisiones
const { Select } = enquirer

/**
 * ✨ Presenta el resumen de Runas detectadas y solicita decisión ritual sobre su destino.
 *
 * @param {Object} mediaReport - Informe ritualizado de Runas clasificadas
 * @returns {Promise<boolean>} Decisión: true si desea capturarlas, false si prefiere ignorarlas
 */
export async function ConfirmMedia(mediaReport) {
	// 📜 Definición de las Castas de Runas
	const categories = {
		images: '🖼️ Imágenes',
		videos: '🎬 Videos',
		audios: '🎵 Audios',
		docs: '📄 Documentos',
		archives: '🗄️ Archivos comprimidos',
		embeds: '🧿 Embeds',
		others: '👻 Otros',
	}

	let totalFiles = 0

	// 🔍 Manifestamos el resumen de la Cosecha de Runas
	console.log(`\n🔍 Resumen de Runas detectadas:`)

	for (const [key, label] of Object.entries(categories)) {
		const count = mediaReport[key]?.length || 0
		totalFiles += count
		console.log(`${label}: ${count}`)
	}

	console.log(`\n📦 Total de Runas detectadas: ${totalFiles}\n`)

	// ⚠️ Si no hay nada digno de captura, se abandona el ritual
	if (totalFiles === 0) {
		console.log('⚠️ No hay Runas que merezcan ser capturadas.\n')
		return false
	}

	// 🧙‍♂️ Invocamos el Oráculo para la Decisión Suprema
	const selector = new Select({
		name: 'downloadDecision',
		message: '👉 ¿Qué deseas hacer con estas Runas?',
		choices: [
			{ name: 'yes', message: '📥 Sí, capturarlas hacia mi dominio' },
			{ name: 'no', message: '🧩 No, prefiero hacer todo a mano como un masoquista' },
		],
	})

	const decision = await selector.run()

	// 🔮 Resultado final del Ritual
	return decision === 'yes'
}
