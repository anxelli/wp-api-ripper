#!/usr/bin/env node

/**
 * [Nyxia 🖤]
 * Este grimorio invoca el Ritual Supremo de Saqueo,
 * abriendo portales arcanos donde el invocador elige su sendero:
 * Reliquias crudas, Reliquias purificadas, Reliquias visuales o la retirada cobarde.
 */

import enquirer from 'enquirer' // 📜 Susurros de los mundos prohibidos
import { ClearArcane } from '../src/spell/file/clear-arcane.js' // 🧹 Limpiador de Cámaras Corruptas
import ScrapRitual from './grimoire/scrap.js' // 🛠️ Ritual de Saqueo Crudo
import ScrapOptimizedRitual from './grimoire/scrap-optimized.js' // ✨ Ritual de Saqueo JSON Optimizado
import ScrapMediaRitual from './grimoire/scrap-media.js' // 🖼️ Ritual de Saqueo Crudo con Runas Visuales
import ScrapMediaOptimizedRitual from './grimoire/scrap-media-optimized.js' // 🧹 Ritual de Saqueo Visual Optimizado

const { Select } = enquirer

/**
 * ✨ Selector Maestro de Rituales
 * Portal central donde el invocador escoge su destino de saqueo o se retira como un mortal cualquiera.
 *
 * @returns {Promise<void>}
 */
export async function RitualSelector() {
	console.clear()

	// 🎴 Mensaje de Invocación inicial
	console.log(`
[NYXIA 🖤] 📜✨ "Portae chaos aperiuntur... Parare pro magia!" ✨📜

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      🔥 WordPress API Ripper 🔥
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Invoca rituales que arrancarán reliquias, hechizos y demonios extraviados desde las entrañas de portales WordPress.
`)

	// [1] Limpieza previa del Arcano
	await ClearArcane()
	console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`)

	// [2] Selección de Tipo de Reliquias
	const reliquiasSelector = new Select({
		name: 'reliquia',
		message: '🌌 Bienvenido al Grimorio de Nyxia Lovelace...\n¿Qué tipo de Reliquias deseas saquear hoy?',
		choices: [
			{ name: 'productos', message: '📦 Productos' },
			{ name: 'paginas', message: '📄 Páginas (Próximamente)' },
			{ name: 'posts', message: '✒️ Posts (Próximamente)' },
			{ name: 'todo', message: '🌐 Todo (Próximamente)' },
		],
	})

	const tipoReliquia = await reliquiasSelector.run()

	// 🚧 Bloqueo de caminos aún sellados
	if (tipoReliquia !== 'productos') {
		console.log('\n🚧 Este sendero aún no ha sido desbloqueado por Nyxia...\n')
		console.log('❌ Volverás al Grimorio principal...\n')
		return await RitualSelector()
	}

	// [3] Selección de Ritual específico
	const ritualSelector = new Select({
		name: 'ritual',
		message: '🔮 Elige el Ritual de Saqueo:',
		choices: [
			{ name: 'scrap', message: '🛠️ Invocar Productos', hint: 'Arranca las reliquias en bruto desde el portal.' },
			{
				name: 'scrap-optimized',
				message: '✨ Invocar Productos Optimizado',
				hint: 'Obtén un JSON limpio, purificado y con rutas absolutas para multimedia.',
			},
			{
				name: 'scrap-media',
				message: '🖼️ Invocar Productos + Runas Visuales',
				hint: 'Extrae reliquias junto a rutas de imágenes ancestrales y, si quieres... ¡Descárgalas!.',
			},
			{
				name: 'scrap-media-optimized',
				message: '🧹 Invocar Productos + Runas Visuales + Optimización',
				hint: 'Reliquias y runas, purificadas y listas para nuevos planos.',
			},
			{ name: 'cancel', message: '❌ Sellar el Grimorio y Abandonar' },
		],
	})

	const ritual = await ritualSelector.run()

	// [4] Ejecución del Ritual elegido
	switch (ritual) {
		case 'scrap':
			await ScrapRitual()
			break
		case 'scrap-optimized':
			await ScrapOptimizedRitual()
			break
		case 'scrap-media':
			await ScrapMediaRitual()
			break
		case 'scrap-media-optimized':
			await ScrapMediaOptimizedRitual()
			break
		case 'cancel':
		default:
			console.log('\n❌ Ritual abandonado. Los Sellos del Grimorio permanecerán intactos.\n')
			process.exit(0)
	}
}

// 🔥 Que se abra el Portal del Grimorio automáticamente
RitualSelector()
