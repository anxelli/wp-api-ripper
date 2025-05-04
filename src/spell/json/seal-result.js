/**
 * [Nyxia 🖤]
 * Este grimorio transporta Reliquias selladas desde la Cámara Arcana
 * hacia la Cámara de Resultados, sorteando colisiones de destinos
 * y forjando nuevos sellos si los caminos ya están ocupados.
 */

import { copyFile, mkdir } from 'fs/promises' // 🛠️ Forjadores de Sendas Sagradas
import { resolve, extname } from 'path' // 🧭 Arquitectos de Portales
import { existsSync } from 'fs' // 🧙‍♂️ Centinela de Realidades Existentes
import { format } from 'date-fns' // 🕰️ Cronomante de Sellos Temporales
import enquirer from 'enquirer' // 📣 Vocero de las Decisiones de los Espíritus
import { SluggifyName } from './sluggify-name.js' // ✨ Purificador de Reliquias Nominales

const { prompt } = enquirer // 📣 La Voz del Más Allá

/**
 * ✨ Sella un Grimorio definitivo en la Cámara de Resultados, manejando colisiones, reescrituras,
 * y otorgando un nuevo destino a cada Reliquia que intenta establecerse en el Caos organizado.
 *
 * @param {string} tempPath - Sendero temporal del Grimorio
 * @param {string} originalName - Nombre deseado para el Grimorio final
 * @returns {Promise<string>} Sendero final donde quedó sellado
 */
export async function SealResult(tempPath, originalName) {
	try {
		const resultsDir = resolve('results')

		// 🛡️ Forjamos la Cámara de Resultados si aún no existe en este plano
		if (!existsSync(resultsDir)) {
			await mkdir(resultsDir, { recursive: true })
		}

		// 🧙‍♂️ Si el nombre original está vacío o inválido, forjamos uno automático basado en tiempo
		let baseName = originalName.trim()
		if (!baseName) {
			const timestamp = format(new Date(), 'yyyyMMdd-HHmmss')
			baseName = `grimorio-${timestamp}.json`
		}

		// ✨ Siempre purificamos el nombre antes de sellarlo
		let finalName = SluggifyName(baseName, 'json', 1, 'json')
		let finalPath = resolve(resultsDir, finalName)

		// 🛡️ Detectamos colisiones de Grimorios ya existentes
		if (existsSync(finalPath)) {
			console.log(`⚠️ El Grimorio "${finalName}" ya existe en la Cámara de Resultados.`)

			const { conflictAction } = await prompt({
				type: 'select',
				name: 'conflictAction',
				message: '👉 ¿Qué deseas hacer?',
				choices: [
					{ name: 'overwrite', message: '⚡ Sobrescribir el Grimorio existente' },
					{ name: 'rename', message: '✨ Crear uno nuevo con otro nombre' },
				],
			})

			if (conflictAction === 'rename') {
				const { newName } = await prompt({
					type: 'input',
					name: 'newName',
					message: '👉 Escribe el nuevo nombre para el Grimorio (déjalo vacío si quieres que se genere uno automático)',
				})

				// ✍️ Si se proporciona un nuevo nombre, lo purificamos también
				if (newName && newName.trim() !== '') {
					finalName = SluggifyName(newName.trim(), 'json', 1, 'json')
				} else {
					// 🕰️ Si no, generamos un nombre basado en el tiempo ritual
					const ext = extname(finalName) || '.json'
					const baseName = finalName.replace(ext, '')
					const timestamp = format(new Date(), 'yyyyMMdd-HHmmss')
					finalName = `${baseName}-${timestamp}${ext}`
				}

				finalPath = resolve(resultsDir, finalName)
			}
			// Si conflictAction es overwrite, seguimos con el finalPath actual
		}

		// 🔥 Sellamos el Grimorio trasladándolo a su Cámara definitiva
		await copyFile(tempPath, finalPath)

		// 🏁 Devolvemos el sendero final sellado
		return finalPath
	} catch (error) {
		// ❌ Fallo catastrófico durante el Sellado
		throw new Error(`❌ No se pudo sellar el Grimorio final: ${error.message}`)
	}
}
