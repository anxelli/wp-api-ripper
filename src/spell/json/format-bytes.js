/**
 * [Nyxia 🖤]
 * Hechizo de Transmutación de Fragmentos Binarios:
 * Convierte cantidades caóticas de bytes en formas legibles para mentes mortales,
 * permitiendo visualizar el verdadero tamaño de las Reliquias extraídas del Abismo Digital.
 *
 * @param {number} bytes - Fragmento crudo del Abismo Binario
 * @param {number} decimals - Cantidad de decimales visibles (default 2)
 * @returns {string} Forma legible: "4.21 MB"
 */
export function FormatBytes(bytes, decimals = 2) {
	if (!bytes || bytes < 0 || typeof bytes !== 'number') return '0 Bytes' // 🚫 Protección contra fragmentos inválidos

	const k = 1024 // 🔥 Constante Sagrada de la Red: 1 Kilobyte = 1024 Bytes
	const dm = decimals < 0 ? 0 : decimals // 🎯 Aseguramos decimales positivos
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] // 📜 Reliquias de Medición

	const i = Math.floor(Math.log(bytes) / Math.log(k)) // 🧮 Cálculo de la dimensión real de la Reliquia
	const value = bytes / Math.pow(k, i) // ✨ Transmutación del tamaño

	// 🔮 Devolvemos la forma legible ritualizada
	return `${parseFloat(value.toFixed(dm))} ${sizes[i]}`
}
