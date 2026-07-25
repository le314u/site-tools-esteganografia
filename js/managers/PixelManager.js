export class PixelManager {
    
    getPixel(image, x, y) {

        const index = (y * image.cols + x) * image.channels();

        return {
            r: image.data[index],
            g: image.data[index + 1],
            b: image.data[index + 2]
        };

    }

    setPixel(image, x, y, r, g, b) {
        const index = (y * image.cols + x) * image.channels();

        image.data[index]     = r; // R
        image.data[index + 1] = g; // G
        image.data[index + 2] = b; // B

    }

    resetPixel(image,x,y) {
        const channels = image.channels();
        const index = (y * image.cols + x) * channels;

        image.data[index] &= 0xFE;         // R ou Gray

        if (channels > 1) {
            image.data[index + 1] &= 0xFE; // G
            image.data[index + 2] &= 0xFE; // B
        }

        // Se houver canal alpha (RGBA), ele não é alterado.
    }

    getLSB(valor) {
        return valor & 1;
    }

    setLSB(valor, bit) {
        return (valor & 254) | bit;
    }


    log(image,x,y){
        const pixel = this.getPixel(image, x, y);

        console.log("Decimal:");
        console.log("R =", pixel.r);
        console.log("G =", pixel.g);
        console.log("B =", pixel.b);

        console.log("");

        console.log("Binário:");
        console.log("R =", pixel.r.toString(2).padStart(8, "0"));
        console.log("G =", pixel.g.toString(2).padStart(8, "0"));
        console.log("B =", pixel.b.toString(2).padStart(8, "0"));
    }

}