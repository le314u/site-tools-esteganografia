import { ImageManager } from "./managers/ImageManager.js";
import { PixelManager } from "./managers/PixelManager.js";
import { Steganography } from "./steg/Steganography.js";
import { UIManager } from "./managers/UIManager.js"

class App {
    constructor() {
        this.imageManager = new ImageManager("canvas");
        this.pixelManager = new PixelManager();
        this.steg = new Steganography(
            this.imageManager,
            this.pixelManager
        );
        this.payload = null;
        this.ui = new UIManager(this);
    }
}


async function iniciarOpenCV() {
    return new Promise((resolve) => {
        function verificar() {
            if (typeof cv === "undefined") {
                setTimeout(verificar, 100);
                return;
            }
            if (!cv.imread) {
                cv.onRuntimeInitialized = resolve;
                return;
            }
            resolve();
        }
        verificar();
    });
}

await iniciarOpenCV();
const app = new App();
window.app = app