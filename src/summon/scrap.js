/**
 * [Nyxia 🖤]
 * Este grimorio mayor convoca a los Espectros del Saqueo,
 * arranca Reliquias ocultas desde Portales WordPress,
 * y las sella primero en Cámaras Temporales antes de su Transferencia a la Eternidad.
 */

import path from 'path' // 🧭 Navegador de Senderos Antiguos
import ora from 'ora' // 🧿 Invocador de Spinners Místicos

import { FetchProducts } from '../invoke/data/fetch-products.js' // 🧙‍♂️ Invocador de Reliquias Caídas
import { SaveArcane } from '../spell/json/save-arcane.js' // 🏛️ Forjador de Cámaras Temporales
import { SealResult } from '../spell/json/seal-result.js' // 🔏 Guardián del Sello Final

/**
 * ✨ Ejecuta el Ritual de Saqueo de Reliquias desde el Portal objetivo.
 *
 * @param {Object} params - Parámetros de la Invocación
 * @param {string} params.url - Portal base del cual arrancar Reliquias
 * @param {number} params.limit - Número máximo de Reliquias a capturar
 * @param {string} params.output - Sendero donde sellar la Cámara Temporal
 * @param {string} params.apiVersion - Versión del Portal API (v2 o v3)
 * @param {string} params.outputName - Nombre final deseado para el Grimorio sellado
 */
export default async function Scrap({ url, limit, output, apiVersion, outputName }) {
	try {
		// 🔮 Invocación de Espectros para el Saqueo
		const spinnerFetch = ora('🔮 Despertando Espectros para saquear Reliquias olvidadas...').start()
		const relics = await FetchProducts(url, apiVersion, limit)
		spinnerFetch.succeed('✨ Los Espectros han respondido al llamado.')

		// 🧹 Validación de Reliquias obtenidas
		if (!relics.length) {
			console.log('⚠️ El portal yace vacío... No hay Reliquias que saquear.')
			return
		}

		console.log(`✔ Se han capturado ${relics.length} Reliquias. Procediendo al Sellado Temporal...\n`)

		// 📜 Encapsulamiento Temporal en Cámara Arcana
		const spinnerSave = ora('⌛ Encapsulando Reliquias en Cámaras Temporales...').start()
		await SaveArcane(output, relics)
		spinnerSave.succeed('✨ El Grimorio Temporal ha sido sellado...\n')

		// 🔏 Sellado Final del Grimorio en Cámara Eterna
		const spinnerSeal = ora('⌛ Sellando Grimorio Final en Cámara Sagrada...').start()
		const tempName = path.basename(output)
		const finalPath = await SealResult(output, outputName)
		spinnerSeal.succeed(`📜 El Grimorio Final ha sido sellado en: \n${finalPath}\n`)
	} catch (error) {
		// ❌ Fallo en el Ritual: Interrupción detectada
		console.error('\n❌ El Ritual del Saqueo fue interrumpido:')
		console.error(error.stack || error.message)
		throw error
	}
}
