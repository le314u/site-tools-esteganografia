export class Base64Manager {

    static BASE64 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    static BASE64_MAP = Object.fromEntries(
        Base64Manager.BASE64
            .split("")
            .map((c, i) => [c, i])
    );

    //====================================================
    // TEXTO
    //====================================================

    static textoParaBase64(texto) {
        return btoa(unescape(encodeURIComponent(texto)));
    }

    static base64ParaTexto(base64) {
        return decodeURIComponent(escape(atob(base64)));
    }

    //====================================================
    // ARQUIVO
    //====================================================

    static async arquivoParaBase64(file) {
        
        if (!(file instanceof Blob)) {
            throw new Error("Esperado File/Blob, mas recebeu outro tipo");
        }

        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    static base64ParaArquivo(base64, mime = "application/octet-stream") {

        const binario = atob(base64);

        const bytes = new Uint8Array(binario.length);

        for (let i = 0; i < binario.length; i++) {
            bytes[i] = binario.charCodeAt(i);
        }

        return new Blob([bytes], { type: mime });
    }

    //====================================================
    // BITS
    //====================================================

    static bitsParaBase64(bits) {

        let base64 = "";

        for (let i = 0; i + 6 <= bits.length; i += 6) {

            const chunk = bits.slice(i, i + 6);

            const value = parseInt(chunk, 2);

            base64 += Base64Manager.BASE64[value];
        }

        return base64;
    }

    static base64ParaBits(base64) {

        let bits = "";

        for (const char of base64) {

            if (char === "=")
                continue;

            const value = Base64Manager.BASE64_MAP[char];

            if (value === undefined)
                continue;

            bits += value.toString(2).padStart(6, "0");
        }

        return bits;
    }

}