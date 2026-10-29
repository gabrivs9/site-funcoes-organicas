// ACORDEÃO (os marcados com class "aberto" já começam abertos)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.style.display === "block";
        conteudo.style.display = aberto ? "none" : "block";
        botao.querySelector("span").textContent = aberto ? "+" : "−";
    });
});
document.querySelectorAll(".acordeao.aberto .titulo-acordeao").forEach(b => b.click());

// QUIZ
const perguntas = [
    {pergunta: "O que caracteriza uma função orgânica?",
     alternativas: ["O número de átomos de carbono da molécula", "A presença de um mesmo grupo funcional, que dá propriedades semelhantes", "O estado físico da substância", "A origem vegetal ou animal do composto"],
     correta: 1, explicacao: "Compostos que têm o mesmo grupo funcional (átomo ou conjunto de átomos característico) se comportam de forma parecida e pertencem à mesma função."},
    {pergunta: "Quais funções orgânicas estão presentes na molécula da glicose?",
     alternativas: ["Éster e amina", "Ácido carboxílico e amida", "Álcool (várias hidroxilas) e aldeído", "Éter e cetona apenas"],
     correta: 2, explicacao: "A glicose tem várias hidroxilas (função álcool) e um grupo aldeído, por isso é chamada de poli-hidroxialdeído."},
    {pergunta: "A frutose, açúcar presente em muitas frutas, apresenta:",
     alternativas: ["Álcool e cetona", "Éster e amida", "Amina e ácido carboxílico", "Apenas hidrocarboneto"],
     correta: 0, explicacao: "A frutose tem várias hidroxilas (álcool) e um grupo cetona: é um poli-hidroxicetona."},
    {pergunta: "Os óleos e gorduras dos alimentos são formados principalmente por:",
     alternativas: ["Aminoácidos", "Carboidratos simples", "Ácidos orgânicos livres", "Triglicerídeos, que são triésteres"],
     correta: 3, explicacao: "Triglicerídeos são triésteres formados pela união do glicerol com três ácidos graxos."},
    {pergunta: "Qual função orgânica é a principal responsável pelo aroma de muitas frutas?",
     alternativas: ["Amida", "Éster", "Álcool", "Éter"],
     correta: 1, explicacao: "Ésteres de cadeia curta ou média têm aromas agradáveis e são encontrados em frutas e flores."},
    {pergunta: "As ligações peptídicas, que unem os aminoácidos nas proteínas, pertencem a qual função?",
     alternativas: ["Éster", "Aldeído", "Amida", "Cetona"],
     correta: 2, explicacao: "A ligação peptídica é uma ligação do tipo amida (–CONH–), formada entre o grupo ácido de um aminoácido e o grupo amina de outro."},
    {pergunta: "Todo aminoácido possui, ao mesmo tempo, os grupos:",
     alternativas: ["Amina e ácido carboxílico", "Álcool e aldeído", "Éster e éter", "Cetona e amida"],
     correta: 0, explicacao: "Os aminoácidos têm um grupo amina (–NH2) e um grupo ácido carboxílico (–COOH)."},
    {pergunta: "Qual é o grupo funcional característico dos ácidos carboxílicos?",
     alternativas: ["–OH ligado a carbono saturado", "–CHO", "–NH2", "–COOH"],
     correta: 3, explicacao: "O grupo carboxila (–COOH) caracteriza os ácidos carboxílicos."},
    {pergunta: "Qual ácido orgânico é o principal componente ácido do vinagre?",
     alternativas: ["Ácido cítrico", "Ácido acético (etanoico)", "Ácido lático", "Ácido benzoico"],
     correta: 1, explicacao: "O vinagre é uma solução de ácido acético (etanoico), um ácido carboxílico."},
    {pergunta: "Por que o leite azeda quando fica muito tempo fora da geladeira?",
     alternativas: ["A gordura vira proteína", "O leite perde toda a lactose por evaporação", "Bactérias transformam a lactose em ácido lático", "A caseína vira álcool"],
     correta: 2, explicacao: "Microrganismos fermentam a lactose (carboidrato do leite) e produzem ácido lático, o que deixa o leite azedo."}
];

let perguntaAtual = 0, pontos = 0;

function mostrarPergunta() {
    const p = perguntas[perguntaAtual];
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = p.pergunta;
    const box = document.getElementById("alternativas");
    box.innerHTML = "";
    p.alternativas.forEach((alt, i) => {
        const b = document.createElement("button");
        b.textContent = `${"ABCD"[i]}) ${alt}`;
        b.onclick = () => verificarResposta(i);
        box.appendChild(b);
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(i) {
    const p = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll("#alternativas button");
    botoes.forEach(b => b.disabled = true);
    if (i === p.correta) {
        botoes[i].classList.add("correta");
        document.getElementById("feedback").textContent = "Resposta correta! " + p.explicacao;
        pontos++;
    } else {
        botoes[i].classList.add("errada");
        botoes[p.correta].classList.add("correta");
        document.getElementById("feedback").textContent = "Resposta incorreta. " + p.explicacao;
    }
    const prox = document.getElementById("proxima");
    prox.textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado" : "Próxima pergunta";
    prox.style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    perguntaAtual < perguntas.length ? mostrarPergunta() : mostrarResultado();
}

function mostrarResultado() {
    const msg = pontos === perguntas.length ? "Excelente! Você acertou todas!"
              : pontos >= 7 ? "Muito bom! Ótimo conhecimento sobre funções orgânicas." : "Vale a pena revisar o conteúdo.";
    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id="refazer" onclick="refazerQuiz()">Refazer quiz</button>`;
}

function refazerQuiz() {
    perguntaAtual = 0; pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p><h3 id="pergunta"></h3><div id="alternativas"></div>
        <p id="feedback"></p><button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>`;
    mostrarPergunta();
}

if (document.getElementById("quiz-container")) mostrarPergunta();
