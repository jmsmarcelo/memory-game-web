const state = {
    views: {
        game: document.querySelector('.game')
    },
    values: {
        emojis: ['🐵', '🐵', '😺', '😺', '🦁', '🦁', '🐶', '🐶', '🦝', '🦝', '🦊', '🦊', '🐯', '🐯', '🐮', '🐮'],
        openCards: [],
        paused: false
    }
}
function setupCards() {
    state.values.openCards = [];
    let shuffleEmojis = state.values.emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
    while(state.views.game.firstChild) {
        state.views.game.firstChild.remove();
    }
    for(let i = 0; i < state.values.emojis.length; i++) {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        state.views.game.appendChild(box);
    }
}
function handleClick() {
    if(state.values.paused === true) return;
    if(state.values.openCards.length < 2 &&
            !this.classList.contains('box-open') && !this.classList.contains('box-match')) {
        this.classList.add('box-open');
        state.values.openCards.push(this);
    }
    if(state.values.openCards.length === 2) {
        state.values.paused = true;
        setTimeout(checkMatch, 500);
    }
}
function checkMatch() {
    if(state.values.openCards[0].innerHTML === state.values.openCards[1].innerHTML) {
        state.values.openCards[0].classList.add('box-match');
        state.values.openCards[1].classList.add('box-match');
    } else {
        state.values.openCards[0].classList.remove('box-open');
        state.values.openCards[1].classList.remove('box-open');
    }
    state.values.openCards = [];
    if(document.querySelectorAll('.box-match').length === state.values.emojis.length) {
        showPopup('You Winer');
    }
    state.values.paused = false;
}
function showPopup(text) {
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = text;
    state.views.game.appendChild(popup);
}
setupCards();