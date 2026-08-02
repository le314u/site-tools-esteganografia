import { FileManager } from "./FileManager.js";
import help from "../help/driver.js"
export class UIManager {

    constructor(app) {

        this.app = app;

        this.imageInput = document.getElementById("imageInput");
        this.dataInput = document.getElementById("dataInput");
        this.saveBtn = document.getElementById("saveBtn");
        this.resetBtn = document.getElementById("resetBtn");
        this.exportBtn = document.getElementById("exportBtn");
        this.mergeBtn = document.getElementById("mergeBtn");
        this.txtContent = document.getElementById("txtContent");
        this.status = document.getElementsByClassName("status")[0];
        this.help = document.getElementById("help");

        this.imageIsLoaded = false;
        this.dataIsLoaded = false;
        this.app.payload = null;

        this.inicializarEventos();
    }

    
    inicializarEventos() {

        // ===========================
        // Carregar imagem
        // ===========================
        this.imageInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            this.imageIsLoaded = false;
            if (!file) return;
            await this.app.imageManager.carregarImagem(file);
            this.imageIsLoaded = true;
            this.setButtonEnabled(this.saveBtn,true)
            this.setButtonEnabled(this.resetBtn,true)
            this.setButtonEnabled(this.exportBtn,true)

            this.app.payload = await this.app.steg.lerArquivo();

            console.log(this.data)
            if( this.dataIsLoaded ){
                this.setButtonEnabled(this.mergeBtn,true)
            }


            const totalbytes = (this.app.imageManager.getValidBytes());
            // 2. Cria o objeto com as conversões corretas
            const size = {
                bit: totalbytes*8,
                byte: totalbytes,
                kb: totalbytes / 1024,       // Usando 1024 para precisão computacional (ou 1000 se preferir decimal)
                mb: totalbytes / (1024 * 1024)
            };

            // 3. Função auxiliar para formatar o texto de forma limpa e legível
            let footerText;
            if (size.mb >= 1) {         
                footerText = `Espaço na imagem: ${size.mb.toFixed(2)} MB (${size.byte.toLocaleString()} Bytes)`;
            } else if (size.kb >= 1) {
                footerText = `Espaço na imagem: ${size.kb.toFixed(2)} KB (${size.byte.toLocaleString()} Bytes)`;
            } else {
                footerText = `Espaço na imagem: ${size.byte} Bytes (${size.bit} bits)`;
            }
            
            this.setStatus(footerText)
        });

        // ===========================
        // Carregar Dados
        // ===========================
        this.dataInput.addEventListener("change", async (e) => {
            this.dataIsLoaded = false
            const file = e.target.files[0];
            if (!file) return;
            this.app.payload = await FileManager.fileToBlob(file);
            this.dataIsLoaded = true
            //ativa função merge
            if( this.imageIsLoaded ){
                this.setButtonEnabled(this.mergeBtn,true)
            }
        });

        // ===========================
        // Salvar imagem
        // ===========================
        this.saveBtn.addEventListener("click", () => {

            this.app.imageManager.salvarImagem();

        });

        // ===========================
        // Resetar LSB
        // ===========================
        this.resetBtn.addEventListener("click", () => {
            console.log("resetando...")
            this.app.steg.resetData();
            console.log("resetado")
            this.app.imageManager.mostrar();
        });

        // ===========================
        // Exportar texto
        // ===========================
        this.exportBtn.addEventListener("click", () => {
            FileManager.baixarArquivo(this.app.payload, "arquivo.bin");
        });

        // ===========================
        // Esconder texto na imagem
        // ===========================
        this.mergeBtn.addEventListener("click", async () => {
            console.log("resetando...")
            await this.app.steg.resetData();
            console.log("escrevendo...")
            await this.app.steg.esconderArquivo(this.app.payload);
            console.log("pronto para download")
            alert("pronto para download")
        });

        // ===========================
        // Pedir Ajuda
        // ===========================
        this.help.addEventListener("click", async () => {
            help()
        });



    }

    setButtonEnabled(button, enabled) {
        button.disabled = !enabled;
    }

    setStatus(text){
        this.status.textContent=text;
    }

}