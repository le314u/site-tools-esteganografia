import { Utils } from "../Utils.js";

export class Steganography {

    constructor(imageManager, pixelManager) {

        this.imageManager = imageManager;
        this.pixelManager = pixelManager;

    }

    //====================================================
    // ESCONDER ARQUIVO
    //====================================================

    async esconderArquivo(blob) {

        if (!(blob instanceof Blob)) {
            throw new Error("Esperado um Blob");
        }

        const arrayBuffer = await blob.arrayBuffer();

        const bits = Utils.arrayBufferToBits(
            arrayBuffer
        );

        this.escreverBits(bits);

        this.imageManager.mostrar();
    }


    //====================================================
    // LER ARQUIVO
    //====================================================

    lerArquivo() {

        const bits = this.lerBits();

        const arrayBuffer = Utils.bitsToArrayBuffer(
            bits
        );

        return new Blob([
            arrayBuffer
        ]);
    }


    //====================================================
    // ESCREVER BITS
    //====================================================

    escreverBits(bits) {

        let indice = 0;

        const image = this.imageManager.image;
        const data = image.data;

        const channels = image.channels();

        const canais = channels === 1
            ? 1
            : 3;

        for (
            let i = 0;
            i < data.length && indice < bits.length;
            i += channels
        ) {

            for (
                let c = 0;
                c < canais && indice < bits.length;
                c++
            ) {

                data[i + c] =
                    this.pixelManager.setLSB(
                        data[i + c],
                        Number(bits[indice++])
                    );
            }
        }
    }


    //====================================================
    // LER BITS
    //====================================================

    lerBits(quantidadeBits = Infinity) {

        let bits = "";

        const image = this.imageManager.image;
        const data = image.data;

        const channels = image.channels();

        const canais = channels === 1
            ? 1
            : 3;

        for (
            let i = 0;
            i < data.length &&
            bits.length < quantidadeBits;
            i += channels
        ) {

            for (
                let c = 0;
                c < canais &&
                bits.length < quantidadeBits;
                c++
            ) {

                bits += this.pixelManager.getLSB(
                    data[i + c]
                );
            }
        }

        return bits;
    }


    //====================================================
    // RESETAR
    //====================================================

    resetData() {

        if (!this.imageManager.image)
            return;

        const width =
            this.imageManager.image.cols;

        const height =
            this.imageManager.image.rows;

        for (let y = 0; y < height; y++) {

            for (let x = 0; x < width; x++) {

                this.pixelManager.resetPixel(
                    this.imageManager.image,
                    x,
                    y
                );
            }
        }
    }
}