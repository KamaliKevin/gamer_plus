/**
 * Pone la primera letra de una cadena de texto en mayúscula
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};