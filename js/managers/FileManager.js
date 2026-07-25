export class FileManager {

    //====================================================
    // File → Blob
    //====================================================

    static async fileToBlob(file) {

        if (!(file instanceof File)) {
            throw new Error("Esperado um File");
        }

        const dados = await file.arrayBuffer();

        return new Blob([dados]);
    }

    //====================================================
    // Blob → File
    //====================================================

    static blobToFile(blob, nome = "arquivo") {

        if (!(blob instanceof Blob)) {
            throw new Error("Esperado um Blob para transformar em File");
        }

        return new File(
            [blob],
            nome,
            {
                type: blob.type
            }
        );
    }

    //====================================================
    // Download
    //====================================================

    static baixarArquivo(blob, nomeArquivo = "arquivo") {
        console.log(blob)
        if (!(blob instanceof Blob)) {
            throw new Error("Esperado um Blob.");
        }

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = nomeArquivo;
        
        document.body.appendChild(a);
        a.click();
        a.remove();
        
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

    }
}