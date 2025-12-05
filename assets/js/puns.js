const puns = [
    {
        setup: "O que o sujeito disse para o predicado?",
        punchline: "Sem você, minha existência não faz sentido! 💑"
    },
    {
        setup: "Por que o verbo foi ao psiquiatra?",
        punchline: "Ele estava com uma crise de conjugação! 😵‍💫"
    },
    {
        setup: "Qual é o tempo verbal mais rico?",
        punchline: "O Presente! 🎁"
    },
    {
        setup: "O que a Crase disse para o 'A'?",
        punchline: "Chega pra lá que eu sou Grave! 💅"
    },
    {
        setup: "Por que o Ponto Final não tem muitos amigos?",
        punchline: "Porque ele sempre encerra o assunto. 🤐"
    },
    {
        setup: "Qual é o super-herói da gramática?",
        punchline: "O Super-lativo! 🦸"
    },
    {
        setup: "O que a Oração Subordinada disse para a Oração Principal?",
        punchline: "Eu não sou nada sem você! 🥺"
    },
    {
        setup: "Por que o Adjetivo não gosta de briga?",
        punchline: "Porque ele prefere qualificar as coisas. ☮️"
    },
    {
        setup: "O que o Vocativo disse para o Sujeito?",
        punchline: "Ei, você aí! 🗣️"
    },
    {
        setup: "Qual é o animal que tem problemas de concordância?",
        punchline: "As formiga! 🐜"
    },
    {
        setup: "Por que o Gerúndio não termina nada?",
        punchline: "Porque ele está sempre fazendo... indo... 🌀"
    },
    {
        setup: "O que o Ponto de Interrogação perguntou para o Ponto de Exclamação?",
        punchline: "Por que você está gritando?! 📢"
    },
    {
        setup: "O que o corretor ortográfico disse para o erro?",
        punchline: "Você não tem lugar aqui! ❌"
    },
    {
        setup: "Por que a gramática é romântica?",
        punchline: "Porque ela adora concordância! ❤️"
    }
];

let currentPunIndex = -1;
const cardContainer = document.getElementById('pun-card-container');
const nextBtn = document.getElementById('next-pun-btn');

function getRandomPun() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * puns.length);
    } while (newIndex === currentPunIndex && puns.length > 1);
    
    currentPunIndex = newIndex;
    return puns[currentPunIndex];
}

function createCard(pun) {
    const card = document.createElement('div');
    card.className = 'pun-display-card';
    
    card.innerHTML = `
        <div class="pun-inner">
            <div class="pun-front">
                <div class="pun-icon">🤔</div>
                <p class="pun-text">${pun.setup}</p>
                <span class="tap-hint">Toque para ver a resposta</span>
            </div>
            <div class="pun-back">
                <div class="pun-icon">😂</div>
                <p class="pun-text">${pun.punchline}</p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            triggerConfetti(card);
        }
    });

    return card;
}

function showNextPun() {
    // Disable button temporarily
    nextBtn.disabled = true;
    
    const oldCard = cardContainer.querySelector('.pun-display-card');
    const newPun = getRandomPun();
    const newCard = createCard(newPun);

    // Prepare new card (start off-screen right)
    newCard.classList.add('entering');
    cardContainer.appendChild(newCard);

    // Animate old card out (to left)
    if (oldCard) {
        oldCard.classList.add('exiting');
        setTimeout(() => {
            oldCard.remove();
        }, 500); // Match CSS transition
    }

    // Animate new card in
    requestAnimationFrame(() => {
        newCard.classList.remove('entering');
    });

    setTimeout(() => {
        nextBtn.disabled = false;
    }, 500);
}

function triggerConfetti(element) {
    // Simple emoji burst effect
    const rect = element.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    for (let i = 0; i < 10; i++) {
        createEmojiParticle(center.x, center.y);
    }
}

function createEmojiParticle(x, y) {
    const emojis = ['😂', '🤣', '😹', '💀', '✨'];
    const particle = document.createElement('div');
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.className = 'emoji-particle';
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showNextPun();
    nextBtn.addEventListener('click', showNextPun);
});
