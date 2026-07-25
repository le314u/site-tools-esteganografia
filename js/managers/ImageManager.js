export class ImageManager {

    constructor(canvasId) {

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.image = null;
    }

    //=========================================
    // Carrega uma imagem
    //=========================================

    carregarImagem(file) {

        return new Promise((resolve, reject) => {

            const img = new Image();

            img.onload = () => {

                this.canvas.width = img.width;
                this.canvas.height = img.height;

                this.ctx.drawImage(img, 0, 0);

                if (this.image) {
                    this.image.delete();
                }

                this.image = cv.imread(this.canvas);

                resolve(this.image);
            };

            img.onerror = reject;

            img.src = URL.createObjectURL(file);

        });

    }


    //=========================================
    // Atualiza o Canvas
    //=========================================

    mostrar() {

        if (!this.image)
            return;

        cv.imshow(this.canvas, this.image);

    }

    //=========================================
    // Salvar imagem
    //=========================================

    salvarImagem(nome = "imagem.png") {

        this.mostrar();

        this.canvas.toBlob((blob) => {

            const a = document.createElement("a");

            a.href = URL.createObjectURL(blob);
            a.download = nome;

            a.click();

            URL.revokeObjectURL(a.href);

        }, "image/png");

    }

    //=========================================
    // Dimensões
    //=========================================

    getWidth() {
        return this.image.cols;
    }

    getHeight() {
        return this.image.rows;
    }

    getSize(){
        return this.getHeight() * this.getWidth()
    }

    getValidBytes(){
        // 1. Calcula o total de bytes (Largura x Altura x 3 canais de cores RGB)
        return (this.getSize() * 3)/8;
    }

    getMat() {
        return this.image;

    }

    
}