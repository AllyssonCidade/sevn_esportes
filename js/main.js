import { getApiData } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
    let data;
    let count = 0;

    async function renderRodada() {
        try {
            if (!data) {
                data = await getApiData();
            }

            // Certifica-se de que o índice está dentro do intervalo válido
            if (count < 0 || count >= data.length) return;

            const rodada = data[count].round;
            const games = data[count].games;
            const card_rodadas = document.getElementById("card_rodadas");
            const card_head__title = document.getElementById("card_head__title");

            // Limpa o conteúdo atual
            card_head__title.innerHTML = '';

            // Cria e adiciona um novo div_card_game
            let div_card_game = document.getElementById("div_card_game");
            if (!div_card_game) {
                div_card_game = document.createElement("div");
                div_card_game.setAttribute("id", "div_card_game");
                card_rodadas.appendChild(div_card_game);
            } else {
                div_card_game.innerHTML = ""; 
            }

            // Atualiza o título do cabeçalho
            const round_number = document.createElement("p");
            round_number.innerText = `Rodada ${rodada}`;
            card_head__title.appendChild(round_number);
            
            games.forEach(jogo => {
                const card_game = document.createElement("div");
                card_game.setAttribute("class", "card_game"); 
                div_card_game.appendChild(card_game);

                // Div team 1
                const team1 = document.createElement("div");
                team1.setAttribute("class", "team1"); 
                card_game.appendChild(team1);

                // Logos dos times 1
                const team1Id = jogo.team_home_id;
                const team1Logo = document.createElement("img");
                team1Logo.setAttribute("class", "team1_logo"); 
                team1Logo.setAttribute("src", `assets/icons/${team1Id}.svg`);
                team1.appendChild(team1Logo);

                // Nomes dos times 1
                const team1Name = document.createElement("p");
                team1Name.innerText = `${jogo.team_home_name}`;
                team1.appendChild(team1Name);

                // Placar
                const divPlacar = document.createElement("div");
                divPlacar.setAttribute("class", "placar"); 
                card_game.appendChild(divPlacar);

                // Gols time 1
                const team1Gols = document.createElement("p");
                team1Gols.innerText = `${jogo.team_home_score}`;
                divPlacar.appendChild(team1Gols);

                // Versus
                const versus = document.createElement("img");
                versus.setAttribute("src", "./assets/icons/versus.svg");
                divPlacar.appendChild(versus);

                // Gols time 2
                const team2Gols = document.createElement("p");
                team2Gols.innerText = `${jogo.team_away_score}`;
                divPlacar.appendChild(team2Gols);

                // Div team 2
                const team2 = document.createElement("div");
                team2.setAttribute("class", "team2"); 
                card_game.appendChild(team2);

                // Nomes dos times 2
                const team2Name = document.createElement("p");
                team2Name.innerText = `${jogo.team_away_name}`;
                team2.appendChild(team2Name);

                // Logos dos times 2
                const team2Id = jogo.team_away_id;
                const team2Logo = document.createElement("img");
                team2Logo.setAttribute("class", "team2_logo"); 
                team2Logo.setAttribute("src", `assets/icons/${team2Id}.svg`);
                team2.appendChild(team2Logo);
            });
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    // logica dos botões avançar e retornar
    document.getElementById('button_right').addEventListener('click', () => {
        if (count < data.length - 1) {
            count++;
        } else {
            count = 0;
        }  
        renderRodada();
    });

    document.getElementById('button_left').addEventListener('click', () => {
        if (count > 0) {
            count--;
        } else {
            count = data.length - 1;
        }
        renderRodada();
    });

    // Renderiza a rodada inicial
    renderRodada();
});
