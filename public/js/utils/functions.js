/**
 * Reduce la cantidad de palabras a usar por una cadena de texto
 * @param {number} maxLength Longitud de palabras a usar como máximo
 * @return El texto abreviado si se pasa de la longitud; el texto sin abreviar en el caso contrario
 */
String.prototype.shortBody = function (maxLength) {
    const words = this.split(" ");

    if (words.length <= maxLength) {
        return this;
    }

    return words.slice(0, maxLength).join(" ") + "...";
}


/**
 * Pone la primera letra de una cadena de texto en mayúscula
 * @return La cadena de texto con una mayúscula al principio
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Genera una cadena de texto aleatoria de caracteres alfanuméricos
 * @param {number} length Longitud de la cadena de texto
 * @return La cadena de texto aleatoria
*/
function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

module.exports = {
    generateRandomString
}