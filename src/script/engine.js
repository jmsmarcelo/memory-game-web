const state = {
    views: {
        game: document.querySelector('.game')
    },
    values: {
        emojis: ['🐵', '🐵', '😺', '😺', '🦁', '🦁', '🐶', '🐶', '🦝', '🦝', '🦊', '🦊', '🐯', '🐯', '🐮', '🐮'],
        openCards: [],
        paused: false,
        time: [],
        errors: 0
    }
}
function setupGame() {
    state.values.openCards = [];
    state.values.paused = false;
    state.values.time = [];
    state.values.errors = 0;
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
    if(state.values.time.length === 0) state.values.time[0] = new Date().getTime();
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
        state.values.errors++;
    }
    state.values.openCards = [];
    if(document.querySelectorAll('.box-match').length === state.values.emojis.length) {
        state.values.time[1] = new Date().getTime();
        showPopup('You Winer');
    }
    state.values.paused = false;
}
function showPopup() {
    let popup = document.createElement('div');
    let title = document.createElement('h3');
    let time = document.createElement('p');
    let errors = document.createElement('p');
    title.textContent = 'You Winer';
    time.textContent = getTime();
    errors.textContent = 'Errors: ' + state.values.errors;
    popup.className = 'popup';
    popup.append(title, time, errors);
    state.views.game.appendChild(popup);
}
function getTime() {
    let time = state.values.time[1] - state.values.time[0], m = '', s = '';
    if((time / 1000) > 60) {
        m = Math.floor(time / 1000 / 60) + 'm';
        s = Math.floor(time / 1000 % 60) + 's';
    } else {
        s = Math.floor(time / 1000) + 's';
    }
    return 'Time: ' + m + s;
}
setupGame();