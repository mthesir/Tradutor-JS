// Elementos do DOM
const textInput = document.getElementById("text_input");
const textOutput = document.getElementById("text_output");
const idiomaDestinoSelect = document.getElementById("idioma");
const traduzirBtn = document.getElementById("traduzir");
const microfoneBtn = document.getElementById("microfone");
const copiarBtn = document.getElementById("copiar");

// Detectar idioma simples: pt, en, es, fr
function detectarIdioma(texto) {
    const t = texto.toLowerCase();
    if (/[áéíóúãõç]/.test(t)) return 'pt';
    if (/(hola|gracias|adios)/.test(t)) return 'es';
    if (/(bonjour|merci|au)/.test(t)) return 'fr';
    return 'en';
}

// API
async function traduzirTexto() {
    const texto = textInput.value.trim();
    const idiomaDestino = idiomaDestinoSelect.value;

    if (!texto) { alert("Digite algum texto!"); return; }
    if (!idiomaDestino) { alert("Selecione o idioma de destino!"); return; }

    const idiomaOrigem = detectarIdioma(texto);

    if (idiomaOrigem === idiomaDestino) {
        alert("O texto já está no idioma de destino!");
        return;
    }

    textOutput.value = "Traduzindo... ⏳";

    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${idiomaOrigem}|${idiomaDestino}`;
        const response = await fetch(url);
        const data = await response.json();
        textOutput.value = data?.responseData?.translatedText || "Erro na tradução.";
    } catch (err) {
        console.error("Erro na tradução:", err);
        textOutput.value = "Erro na tradução. Verifique sua conexão.";
    }
}

// Eventos
traduzirBtn.addEventListener("click", traduzirTexto);

microfoneBtn.addEventListener("click", () => {
    alert("⚠️ O microfone ainda não está funcional nesta versão.");
});

copiarBtn.addEventListener("click", () => {
    if (textOutput.value) {
        navigator.clipboard.writeText(textOutput.value)
            .then(() => alert("Texto copiado! ✅"))
            .catch(() => alert("Falha ao copiar."));
    }
});
// By Mdev