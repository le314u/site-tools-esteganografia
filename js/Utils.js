export class Utils {

    static bitsToBytes(bits) {
        const bytes = new Uint8Array(
            Math.floor(bits.length / 8)
        );

        for (let i = 0; i < bytes.length; i++) {

            const grupo = bits.slice(
                i * 8,
                i * 8 + 8
            );

            bytes[i] = parseInt(grupo, 2);
        }
        return bytes;
    }




    //=========================================
    // Limita um valor entre min e max
    //=========================================

    static clamp(valor, min = 0, max = 255) {

        return Math.max(min, Math.min(max, valor));

    }

    //=========================================
    // Divide uma string em blocos
    //=========================================

    static chunk(str, tamanho) {

        const resultado = [];

        for (let i = 0; i < str.length; i += tamanho) {
            resultado.push(str.slice(i, i + tamanho));
        }

        return resultado;

    }

    //=========================================
    // Número -> Binário
    //=========================================

    static toBinary(numero, bits = 8) {

        return numero.toString(2).padStart(bits, "0");

    }

    //=========================================
    // Binário -> Número
    //=========================================

    static fromBinary(binario) {

        return parseInt(binario, 2);

    }

    static isEven(valor) {
        return (valor & 1) === 0;
    }

    static isOdd(valor) {
        return (valor & 1) === 1;
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async gerarHash(texto){
        const encoder = new TextEncoder();

        const dados = encoder.encode(texto);

        const hashBuffer = await crypto.subtle.digest(
            "SHA-256",
            dados
        );

        const hashArray = Array.from(
            new Uint8Array(hashBuffer)
        );

        return hashArray
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    //====================================================
    // Utils
    //====================================================
    static bitsToArrayBuffer(bits) {

        const bytes = new Uint8Array(
            Math.floor(bits.length / 8)
        );

        for (let i = 0; i < bytes.length; i++) {

            const grupo = bits.slice(
                i * 8,
                i * 8 + 8
            );

            bytes[i] = parseInt(grupo, 2);
        }

        return bytes.buffer;
    }

    static arrayBufferToBits(arrayBuffer) {

        const bytes = new Uint8Array(arrayBuffer);

        let bits = "";

        for (const byte of bytes) {
            bits += byte.toString(2).padStart(8, "0");
        }

        return bits;
    }
}