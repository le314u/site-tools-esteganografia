import { driver } from "https://cdn.jsdelivr.net/npm/driver.js/+esm";

const hints = window.driverHints.hints;

/* -------------------------------------------------------------------------- */
/*                                    TOUR                                    */
/* -------------------------------------------------------------------------- */

const step = (
    element,
    title,
    description,
    side = "left",
    align = "start"
) => ({
    element,
    popover: {
        title,
        description,
        side,
        align,
    },
});

const driverObj = driver({
    showButtons: ["next", "close"],
    showProgress: true,

    steps: [
        step(
            ".panel",
            "Painel de Visualização",
            "Área onde a imagem utilizada como suporte será exibida."
        ),

        step(
            ".panel:nth-child(2)",
            "Painel de Manipulação",
            "Área utilizada para carregar e manipular os arquivos."
        ),

        step(
            "#imageInput",
            "Carregar Imagem",
            "Selecione a imagem que servirá como suporte para armazenar os dados.",
            "bottom"
        ),

        step(
            ".status",
            "Espaço Disponível",
            "Quantidade de bits livres que podem ser utilizados para ocultar informações."
        ),

        step(
            "#dataInput",
            "Carregar Arquivo",
            "Selecione o arquivo que será ocultado dentro da imagem.",
            "bottom"
        ),

        step(
            "#mergeBtn",
            "Ocultar Informação",
            "Esconde o arquivo selecionado dentro da imagem carregada.",
            "top"
        ),

        step(
            "#saveBtn",
            "Salvar Imagem",
            "Salva a nova imagem contendo os dados ocultos.",
            "right"
        ),

        {
            popover: {
                title: "Tudo Pronto!",
                description:
                    "Agora você já conhece as principais funcionalidades da aplicação.",
            },
        },
    ],
});

/* -------------------------------------------------------------------------- */
/*                                   HINTS                                    */
/* -------------------------------------------------------------------------- */

const hint = (element, title, description) => ({
    element,
    id: element.replace("#", ""),
    beacon: {
        side: "left",
        align: "center",
    },
    popover: {
        title,
        description,
        showButton: false,
    },
});

const productHints = hints({
    overlay: true,
    overlayOpacity: 0.5,

    beacon: {
        animate: true,
    },

    hints: [
        hint(
            "#resetBtn",
            "Resetar",
            "Remove todas as informações ocultas da imagem e restaura seu estado inicial."
        ),

        hint(
            "#exportBtn",
            "Exportar",
            "Extrai os dados ocultos da imagem e os salva como um arquivo."
        ),
    ],
});

/* -------------------------------------------------------------------------- */

export default function help() {
    productHints.show();
    driverObj.drive();
}
