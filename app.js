'use strict';

/* ============================================================
   CHECKOUT TABLE — Double Out
   ============================================================ */
const CHECKOUTS = {
    2: 'D1', 4: 'D2', 6: 'D3', 8: 'D4', 10: 'D5',
    12: 'D6', 14: 'D7', 16: 'D8', 18: 'D9', 20: 'D10',
    22: 'D11', 24: 'D12', 26: 'D13', 28: 'D14', 30: 'D15',
    32: 'D16', 34: 'D17', 36: 'D18', 38: 'D19', 40: 'D20',
    50: 'Bull',
    41: 'S1 D20', 42: 'S2 D20', 43: 'S3 D20', 44: 'S4 D20',
    45: 'S5 D20', 46: 'S6 D20', 47: 'S7 D20', 48: 'S8 D20',
    49: 'S9 D20', 51: 'S11 D20', 52: 'T12 D8', 53: 'S13 D20',
    54: 'S14 D20', 55: 'S15 D20', 56: 'T16 D4', 57: 'S17 D20',
    58: 'S18 D20', 59: 'S19 D20', 60: 'S20 D20',
    61: 'T15 D8', 62: 'T10 D16', 63: 'T13 D12', 64: 'T16 D8',
    65: 'T19 D4', 66: 'T10 D18', 67: 'T17 D8', 68: 'T20 D4',
    69: 'T19 D6', 70: 'T18 D8', 71: 'T13 D16', 72: 'T16 D12',
    73: 'T19 D8', 74: 'T14 D16', 75: 'T17 D12', 76: 'T20 D8',
    77: 'T15 D16', 78: 'T18 D12', 79: 'T13 D20', 80: 'T20 D10',
    81: 'T19 D12', 82: 'T14 D20', 83: 'T17 D16', 84: 'T20 D12',
    85: 'T15 D20', 86: 'T18 D16', 87: 'T17 D18', 88: 'T20 D14',
    89: 'T19 D16', 90: 'T18 D18', 91: 'T17 D20', 92: 'T20 D16',
    93: 'T19 D18', 94: 'T18 D20', 95: 'T19 D19', 96: 'T20 D18',
    97: 'T19 D20', 98: 'T20 D19', 100: 'T20 D20',
    99: 'T19 S10 D16', 101: 'T17 S10 D20', 102: 'T20 S2 D20',
    103: 'T19 S6 D20', 104: 'T20 S4 D20', 105: 'T20 S5 D20',
    106: 'T20 S6 D20', 107: 'T19 S10 D20', 108: 'T20 S8 D20',
    109: 'T20 S9 D20', 110: 'T20 S10 D20', 111: 'T20 S11 D20',
    112: 'T20 T12 D8', 113: 'T20 S13 D20', 114: 'T20 S14 D20',
    115: 'T20 S15 D20', 116: 'T20 S16 D20', 117: 'T20 S17 D20',
    118: 'T20 S18 D20', 119: 'T20 S19 D20', 120: 'T20 S20 D20',
    121: 'T20 S11 D14', 122: 'T18 T20 D4', 123: 'T19 T16 D9',
    124: 'T20 T14 D11', 125: 'T20 T15 D10', 126: 'T19 T19 D6',
    127: 'T20 T17 D8', 128: 'T18 T14 D16', 129: 'T19 T16 D12',
    130: 'T20 T18 D8', 131: 'T20 T13 D16', 132: 'T20 T16 D12',
    133: 'T20 T19 D8', 134: 'T20 T14 D16', 135: 'T20 T17 D12',
    136: 'T20 T20 D8', 137: 'T20 T15 D16', 138: 'T20 T18 D12',
    139: 'T20 T13 D20', 140: 'T20 T16 D16', 141: 'T20 T19 D12',
    142: 'T20 T14 D20', 143: 'T20 T17 D16', 144: 'T20 T20 D12',
    145: 'T20 T15 D20', 146: 'T20 T18 D16', 147: 'T20 T17 D18',
    148: 'T20 T20 D14', 149: 'T20 T19 D16', 150: 'T20 T18 D18',
    151: 'T20 T17 D20', 152: 'T20 T20 D16', 153: 'T20 T19 D18',
    154: 'T20 T18 D20', 155: 'T20 T19 D19', 156: 'T20 T20 D18',
    157: 'T20 T19 D20', 158: 'T20 T20 D19', 160: 'T20 T20 D20',
    161: 'T20 T17 Bull', 164: 'T20 T18 Bull', 167: 'T20 T19 Bull',
    170: 'T20 T20 Bull',
};

const PLAYER_COLORS = ['#00d4aa', '#4da6ff', '#ff7c43', '#c77dff', '#a8e063', '#f7971e', '#f953c6', '#00c6ff'];
const playerColor = i => PLAYER_COLORS[i % PLAYER_COLORS.length];

/* ============================================================
   APP STATE
   ============================================================ */
const state = {
    view: 'home',
    setup: {
        gameType: 'x01',
        startScore: 501,
        outType: 'double',
        cricketMode: 'standard',
        hardcoreEffect: 'penalty',
        players: ['Player 1', 'Player 2'],
    },
    game: null,
};

/* ============================================================
   X01 GAME
   ============================================================ */
class X01Game {
    constructor(startScore, players, outType) {
        this.startScore = startScore;
        this.outType = outType;
        this.players = players.map((name, i) => ({
            id: i,
            name: name || `Player ${i + 1}`,
            color: playerColor(i),
            score: startScore,
            dartsThrown: 0,
            rounds: 0,
            history: [],
            oneEighties: 0,
            highScore: 0,
        }));
        this.currentPlayerIndex = 0;
        this.darts = [];      // [{mod, num, value}] — up to 3 per turn
        this.modifier = 'single';
        this.bust = false;
        this.winner = null;
        this.stateHistory = [];
    }

    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    getAverage(player) {
        if (player.rounds === 0) return '0.0';
        const scored = player.history
            .filter(h => !h.bust)
            .reduce((sum, h) => sum + h.score, 0);
        return (scored / player.rounds).toFixed(1);
    }

    dartValue(mod, num) {
        if (num === 0) return 0;
        if (num === 25) return mod === 'double' ? 50 : 25;
        if (mod === 'single') return num;
        if (mod === 'double') return num * 2;
        return num * 3;
    }

    selectModifier(mod) {
        this.modifier = mod;
    }

    addDart(num) {
        if (this.darts.length >= 3 || this.winner) return;
        const value = this.dartValue(this.modifier, num);
        this.darts.push({ mod: this.modifier, num, value });
        this.modifier = 'single';
    }

    removeDart() {
        if (this.darts.length > 0) this.darts.pop();
        this.modifier = 'single';
    }

    get turnTotal() {
        return this.darts.reduce((s, d) => s + d.value, 0);
    }

    _saveState() {
        this.stateHistory.push({
            players: JSON.parse(JSON.stringify(this.players)),
            currentPlayerIndex: this.currentPlayerIndex,
            bust: this.bust,
        });
        if (this.stateHistory.length > 20) this.stateHistory.shift();
    }

    undo() {
        if (this.stateHistory.length === 0) return false;
        const prev = this.stateHistory.pop();
        this.players = prev.players;
        this.currentPlayerIndex = prev.currentPlayerIndex;
        this.bust = prev.bust;
        this.winner = null;
        this.darts = [];
        this.modifier = 'single';
        return true;
    }

    confirm() {
        if (this.winner) return;

        const score = this.turnTotal;
        this._saveState();
        const player = this.currentPlayer;
        const remaining = player.score - score;

        player.dartsThrown += this.darts.length;
        player.rounds++;
        if (score === 180) player.oneEighties++;
        if (score > player.highScore) player.highScore = score;

        const resetTurn = () => {
            this.darts = [];
            this.modifier = 'single';
        };

        if (this.outType === 'double') {
            if (remaining < 0 || remaining === 1) {
                player.history.push({ score, bust: true });
                this.bust = true;
                resetTurn();
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
                return;
            }
        } else {
            if (remaining < 0) {
                player.history.push({ score, bust: true });
                this.bust = true;
                resetTurn();
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
                return;
            }
        }

        if (remaining === 0) {
            if (this.outType === 'double') {
                const lastDart = this.darts[this.darts.length - 1];
                if (!lastDart || lastDart.mod !== 'double') {
                    player.history.push({ score, bust: true });
                    this.bust = true;
                    resetTurn();
                    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
                    return;
                }
            }
            player.score = 0;
            player.history.push({ score, bust: false });
            this.winner = player;
            this.bust = false;
            resetTurn();
            return;
        }

        player.score = remaining;
        player.history.push({ score, bust: false });
        this.bust = false;
        resetTurn();
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
}

/* ============================================================
   CRICKET GAME
   ============================================================ */
class CricketGame {
    constructor(players, mode = 'standard', hardcoreEffect = 'penalty') {
        this.mode = mode; // 'standard' | 'cutthroat' | 'hardcore' | 'cutthroat-hardcore'
        this.hardcore = mode === 'hardcore' || mode === 'cutthroat-hardcore';
        this.cutthroat = mode === 'cutthroat' || mode === 'cutthroat-hardcore';
        this.hardcoreEffect = hardcoreEffect; // 'penalty' | 'benefit'
        this.winTargets = [25, 20, 19, 18, 17, 16, 15];
        this.targets = this.hardcore
            ? [25, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
            : [25, 20, 19, 18, 17, 16, 15];
        const emptyMarks = {};
        this.targets.forEach(t => { emptyMarks[t] = 0; });
        this.players = players.map((name, i) => ({
            id: i,
            name: name || `Player ${i + 1}`,
            color: playerColor(i),
            marks: { ...emptyMarks },
            score: 0,
            dartsThrown: 0,
            rounds: 0,
        }));
        this.currentPlayerIndex = 0;
        this.turnDarts = []; // [{num, marks}] — up to 3 per turn
        this.modifier = 1;
        this.winner = null;
        this.stateHistory = [];
    }

    _emptyTurnMarks() {
        const m = {};
        this.targets.forEach(t => { m[t] = 0; });
        return m;
    }

    get turnMarks() {
        const m = this._emptyTurnMarks();
        for (const d of this.turnDarts) m[d.num] = (m[d.num] || 0) + d.marks;
        return m;
    }

    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    isClosedFor(player, num) {
        return player.marks[num] >= 3;
    }

    isClosedForAll(num) {
        return this.players.every(p => p.marks[num] >= 3);
    }

    selectModifier(n) {
        this.modifier = n;
    }

    addMark(num, forcedMarks) {
        if (this.turnDarts.length >= 3) return;
        const marks = forcedMarks !== undefined ? forcedMarks : this.modifier;
        this.turnDarts.push({ num, marks });
        if (forcedMarks === undefined) this.modifier = 1;
    }

    removeLastDart() {
        if (this.turnDarts.length > 0) this.turnDarts.pop();
        this.modifier = 1;
    }

    _saveState() {
        this.stateHistory.push({
            players: JSON.parse(JSON.stringify(this.players)),
            currentPlayerIndex: this.currentPlayerIndex,
        });
        if (this.stateHistory.length > 20) this.stateHistory.shift();
    }

    undo() {
        if (this.stateHistory.length === 0) return false;
        const prev = this.stateHistory.pop();
        this.players = prev.players;
        this.currentPlayerIndex = prev.currentPlayerIndex;
        this.winner = null;
        this.turnDarts = [];
        this.modifier = 1;
        return true;
    }

    confirmTurn() {
        if (this.winner) return;
        this._saveState();

        const player = this.currentPlayer;
        player.dartsThrown += this.turnDarts.length;
        player.rounds++;

        const turnMarks = this.turnMarks; // computed from turnDarts

        for (const num of this.targets) {
            const marks = turnMarks[num];
            if (marks === 0) continue;

            const existingMarks = player.marks[num];
            const isPenalty = this.hardcore && num < 15;
            // Penalty numbers track real hit count; standard numbers cap at 3
            player.marks[num] = isPenalty
                ? existingMarks + marks
                : Math.min(existingMarks + marks, 3);

            const closingMarks = Math.max(0, 3 - existingMarks);
            const scoringMarks = Math.max(0, marks - closingMarks);

            if (scoringMarks > 0) {
                if (isPenalty) {
                    if (this.hardcoreEffect === 'benefit') {
                        this.players.forEach(p => {
                            if (p.id !== player.id) {
                                // Cricket: add to opponents; Cut Throat: remove from opponents
                                p.score += this.cutthroat ? -(num * scoringMarks) : (num * scoringMarks);
                            }
                        });
                    } else {
                        // Cricket: remove from yourself; Cut Throat: add to yourself
                        player.score += this.cutthroat ? (num * scoringMarks) : -(num * scoringMarks);
                    }
                } else if (this.cutthroat) {
                    // Give points to opponents who haven't closed this number
                    this.players.forEach(p => {
                        if (p.id !== player.id && p.marks[num] < 3) {
                            p.score += num * scoringMarks;
                        }
                    });
                } else {
                    const anyOpponentOpen = this.players.some(
                        p => p.id !== player.id && p.marks[num] < 3
                    );
                    if (anyOpponentOpen) {
                        player.score += num * scoringMarks;
                    }
                }
            }
        }

        this.turnDarts = [];
        this.modifier = 1;
        this._checkWin();

        if (!this.winner) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }
    }

    _checkWin() {
        for (const player of this.players) {
            const allClosed = this.winTargets.every(t => player.marks[t] >= 3);
            if (allClosed) {
                if (this.cutthroat) {
                    const minScore = Math.min(...this.players.map(p => p.score));
                    if (player.score <= minScore) {
                        this.winner = player;
                        return;
                    }
                } else {
                    const maxScore = Math.max(...this.players.map(p => p.score));
                    if (player.score >= maxScore) {
                        this.winner = player;
                        return;
                    }
                }
            }
        }
    }
}

/* ============================================================
   HELPERS
   ============================================================ */
function getCheckout(score) {
    return CHECKOUTS[score] || null;
}

function dartLabel(dart) {
    if (dart.num === 0) return 'Miss';
    if (dart.num === 25) return dart.mod === 'double' ? 'D·Bull' : 'Bull';
    if (dart.mod === 'single') return String(dart.num);
    if (dart.mod === 'double') return `D${dart.num}`;
    return `T${dart.num}`;
}

function marksToSymbol(marks) {
    if (marks === 0) return '';
    if (marks === 1) return '/';
    if (marks === 2) return 'X';
    return '⊗';
}

function marksHTML(marks, color) {
    if (marks === 0) return '';
    if (marks >= 3) return `<span class="mark-symbol marks-closed" style="color:${color}">⊗</span>`;
    return `<span class="mark-symbol" style="color:${color}">${marks === 1 ? '/' : '✕'}</span>`;
}

/* ============================================================
   RENDER — HOME SCREEN
   ============================================================ */
function renderHome() {
    const { setup } = state;
    const isX01 = setup.gameType === 'x01';
    const isCricket = setup.gameType === 'cricket';
    const isCutThroat = setup.gameType === 'cutthroat';

    const playersHTML = setup.players.map((name, i) => `
        <div class="player-row">
            <span class="player-dot" style="background:${playerColor(i)}"></span>
            <input
                class="player-input"
                type="text"
                placeholder="Player ${i + 1}"
                value="${escapeHtml(name)}"
                data-action="player-name"
                data-index="${i}"
                maxlength="16"
            />
            ${setup.players.length > 1 ? `
                <button class="remove-player-btn" data-action="remove-player" data-index="${i}">✕</button>
            ` : ''}
        </div>
    `).join('');

    const addPlayerBtn = `
        <button class="add-player-btn" data-action="add-player">
            <span>+</span> Add Player
        </button>
    `;

    const cricketConfig = (isCricket || isCutThroat) ? `
        <div>
            <div class="section-label">Mode</div>
            <div class="option-group">
                <button class="option-btn ${setup.cricketMode === 'standard' ? 'active' : ''}"
                    data-action="set-cricket-mode" data-value="standard">Standard</button>
                <button class="option-btn ${setup.cricketMode === 'hardcore' ? 'active' : ''}"
                    data-action="set-cricket-mode" data-value="hardcore">Hardcore</button>
            </div>
        </div>
        ${setup.cricketMode === 'hardcore' ? `
        <div>
            <div class="section-label">Hardcore Effect</div>
            <div class="option-group">
                <button class="option-btn ${setup.hardcoreEffect === 'penalty' ? 'active' : ''}"
                    data-action="set-hardcore-effect" data-value="penalty">Penalty yourself</button>
                <button class="option-btn ${setup.hardcoreEffect === 'benefit' ? 'active' : ''}"
                    data-action="set-hardcore-effect" data-value="benefit">Benefit opponent</button>
            </div>
        </div>
        ` : ''}
    ` : '';

    const x01Config = isX01 ? `
        <div>
            <div class="section-label">Starting Score</div>
            <div class="option-group">
                ${[301, 501, 701].map(s => `
                    <button class="option-btn ${setup.startScore === s ? 'active' : ''}"
                        data-action="set-score" data-value="${s}">${s}</button>
                `).join('')}
            </div>
        </div>
        <div>
            <div class="section-label">Checkout</div>
            <div class="option-group">
                <button class="option-btn ${setup.outType === 'double' ? 'active' : ''}"
                    data-action="set-out" data-value="double">Double Out</button>
                <button class="option-btn ${setup.outType === 'single' ? 'active' : ''}"
                    data-action="set-out" data-value="single">Single Out</button>
            </div>
        </div>
    ` : '';

    return `
        <div class="home-screen">
            <div class="home-header">
                <div class="logo">🎯</div>
                <h1>Darts Scorer</h1>
                <p>Keep score like a pro</p>
            </div>
            <div class="home-body">
                <div>
                    <div class="section-label">Game Mode</div>
                    <div class="tab-group">
                        <button class="tab-btn ${isX01 ? 'active' : ''}"
                            data-action="set-game" data-value="x01">X01</button>
                        <button class="tab-btn ${isCricket ? 'active' : ''}"
                            data-action="set-game" data-value="cricket">Cricket</button>
                        <button class="tab-btn ${isCutThroat ? 'active' : ''}"
                            data-action="set-game" data-value="cutthroat">Cut Throat</button>
                    </div>
                </div>
                ${x01Config}
                ${cricketConfig}
                <div>
                    <div class="section-label">Players</div>
                    <div class="players-list">
                        ${playersHTML}
                        ${addPlayerBtn}
                    </div>
                </div>
                <button class="start-btn" data-action="start-game">
                    Start Game
                </button>
            </div>
        </div>
    `;
}

/* ============================================================
   RENDER — X01 GAME SCREEN
   ============================================================ */
function renderX01() {
    const game = state.game;
    if (!game) return '';

    const currentPlayer = game.currentPlayer;

    // Checkout hint — recalculates live as darts are entered this turn
    const liveRemaining = currentPlayer.score - game.turnTotal;
    let checkoutHint = '';
    if (game.outType === 'double' && liveRemaining > 0 && liveRemaining <= 170) {
        const co = getCheckout(liveRemaining);
        if (co) {
            checkoutHint = `<div class="checkout-hint">
                <span class="label">Checkout</span>
                ${co}
            </div>`;
        }
    }

    // Scorecard for each player
    const scorecardsHTML = game.players.map(p => {
        const isActive = p.id === currentPlayer.id && !game.winner;
        const lastEntry = p.history[p.history.length - 1];
        const lastText = lastEntry
            ? (lastEntry.bust
                ? `<span class="bust">BUST (${lastEntry.score})</span>`
                : `+${lastEntry.score}`)
            : '';

        return `
            <div class="scorecard ${isActive ? 'active' : ''}"
                 style="--player-color: ${p.color}">
                <div class="scorecard-name">${escapeHtml(p.name)}</div>
                <div class="scorecard-score">${p.score}</div>
                <div class="scorecard-stats">
                    <span>Avg ${game.getAverage(p)}</span>
                    ${p.oneEighties > 0 ? `<span>180×${p.oneEighties}</span>` : ''}
                </div>
                <div class="scorecard-last">${lastText}</div>
            </div>
        `;
    }).join('');

    // Check if the PREVIOUS player (who just threw) busted
    const prevIdx = (game.currentPlayerIndex - 1 + game.players.length) % game.players.length;
    const prevPlayer = game.players[prevIdx];
    const prevLastEntry = prevPlayer.history[prevPlayer.history.length - 1];
    const prevBusted = prevLastEntry && prevLastEntry.bust && !game.winner;

    const turnLabel = game.winner
        ? `🏆 ${escapeHtml(game.winner.name)} wins!`
        : prevBusted
            ? `<span style="color:var(--red)">BUST!</span> — <span style="color:${currentPlayer.color}">${escapeHtml(currentPlayer.name)}</span>'s turn`
            : `<span style="color:${currentPlayer.color}">${escapeHtml(currentPlayer.name)}</span>'s turn`;

    // Dart chips
    const dartsHTML = [0, 1, 2].map(i => {
        const dart = game.darts[i];
        if (dart) {
            return `<div class="dart-chip mod-${dart.mod}">
                <span class="dart-chip-label">${dartLabel(dart)}</span>
                <span class="dart-chip-value">${dart.value}</span>
            </div>`;
        }
        return `<div class="dart-chip empty"><span class="dart-chip-label">—</span></div>`;
    }).join('');

    const totalHTML = game.darts.length > 0
        ? `<div class="dart-total">= ${game.turnTotal}</div>`
        : '';

    // Modifier buttons
    const modsHTML = [
        { key: 'single', label: 'Single', short: '1×' },
        { key: 'double', label: 'Double', short: '2×' },
        { key: 'triple', label: 'Triple', short: '3×' },
    ].map(m => `
        <button class="mod-btn ${game.modifier === m.key ? 'active mod-active-' + m.key : ''}"
            data-action="modifier" data-value="${m.key}">
            <span class="mod-short">${m.short}</span>
            <span class="mod-label">${m.label}</span>
        </button>
    `).join('');

    // Number grid 1–20 + Bull + Miss + controls (5 columns)
    const canAdd = game.darts.length < 3 && !game.winner;
    const nd = canAdd ? '' : 'disabled';

    const numsHTML = Array.from({ length: 20 }, (_, i) => i + 1).map(n =>
        `<button class="dart-num-btn" data-action="dart-number" data-value="${n}" ${nd}>${n}</button>`
    ).join('');

    return `
        <div class="x01-screen">
            <div class="game-header">
                <div class="game-header-left">
                    <button class="quit-btn" data-action="quit">✕ Quit</button>
                    <span class="game-mode-badge">${game.startScore} · ${game.outType === 'double' ? 'Dbl Out' : 'Sgl Out'}</span>
                </div>
                <button class="undo-btn" data-action="undo" ${game.stateHistory.length === 0 ? 'disabled' : ''}>
                    ↩ Undo
                </button>
            </div>

            <div class="scorecards ${game.players.length <= 4 ? 'scorecards-fill' : ''}">${scorecardsHTML}</div>

            <div class="turn-info">
                <div class="turn-name">${turnLabel}</div>
                ${checkoutHint}
            </div>

            <div class="dart-chips-area">
                <div class="dart-chips">${dartsHTML}</div>
                ${totalHTML}
            </div>

            <div class="dart-numpad-area">
                <div class="modifier-row">${modsHTML}</div>
                <div class="dart-grid">
                    ${numsHTML}
                    <button class="dart-num-btn dart-bull" data-action="dart-number" data-value="25" ${nd}>Bull</button>
                    <button class="dart-num-btn dart-miss" data-action="dart-number" data-value="0" ${nd}>Miss</button>
                    <span class="dart-grid-spacer"></span>
                    <button class="dart-ctrl-btn dart-back" data-action="dart-back" ${game.darts.length === 0 ? 'disabled' : ''}>⌫</button>
                    <button class="dart-ctrl-btn dart-confirm" data-action="confirm">${game.darts.length === 0 ? 'Triple Niet' : '✓'}</button>
                </div>
            </div>
        </div>
    `;
}

/* ============================================================
   RENDER — CRICKET GAME SCREEN
   ============================================================ */
function renderCricket() {
    const game = state.game;
    if (!game) return '';

    const currentPlayer = game.currentPlayer;
    const liveMarks = game.turnMarks;

    // Compute live score delta for current player based on pending darts
    let liveScoredPoints = 0;
    if (!game.winner) {
        for (const num of game.targets) {
            const marks = liveMarks[num] || 0;
            if (marks === 0) continue;
            const existingMarks = currentPlayer.marks[num];
            const closingMarks = Math.max(0, 3 - existingMarks);
            const scoringMarks = Math.max(0, marks - closingMarks);
            if (scoringMarks > 0) {
                if (game.hardcore && num < 15) {
                    if (game.hardcoreEffect === 'benefit') {
                        // Shown in cutthroatPending below
                    } else {
                        // Cricket: remove from self; Cut Throat: add to self
                        liveScoredPoints += game.cutthroat ? (num * scoringMarks) : -(num * scoringMarks);
                    }
                } else if (!game.cutthroat) {
                    const anyOpponentOpen = game.players.some(p => p.id !== currentPlayer.id && p.marks[num] < 3);
                    if (anyOpponentOpen) liveScoredPoints += num * scoringMarks;
                }
            }
        }
    }

    // Compute pending points opponents would receive (cut throat + hardcore benefit)
    const cutthroatPending = {};
    if (!game.winner) {
        for (const num of game.targets) {
            const marks = liveMarks[num] || 0;
            if (marks === 0) continue;
            const existingMarks = currentPlayer.marks[num];
            const closingMarks = Math.max(0, 3 - existingMarks);
            const scoringMarks = Math.max(0, marks - closingMarks);
            if (scoringMarks > 0) {
                const isHardcoreNum = game.hardcore && num < 15;
                if (game.cutthroat && !isHardcoreNum) {
                    // Standard cut throat: give to opponents who haven't closed
                    game.players.forEach(p => {
                        if (p.id !== currentPlayer.id && p.marks[num] < 3) {
                            cutthroatPending[p.id] = (cutthroatPending[p.id] || 0) + num * scoringMarks;
                        }
                    });
                } else if (isHardcoreNum && game.hardcoreEffect === 'benefit') {
                    // Cricket: add to opponents; Cut Throat: remove from opponents
                    const delta = game.cutthroat ? -(num * scoringMarks) : (num * scoringMarks);
                    game.players.forEach(p => {
                        if (p.id !== currentPlayer.id) {
                            cutthroatPending[p.id] = (cutthroatPending[p.id] || 0) + delta;
                        }
                    });
                }
            }
        }
    }

    // Cricket board table — score embedded in header
    const headerCells = game.players.map((p) => {
        const isActive = p.id === currentPlayer.id && !game.winner;
        const opponentPending = cutthroatPending[p.id] || 0;
        const pending = opponentPending || (isActive ? liveScoredPoints : 0);
        const displayScore = pending !== 0
            ? `${p.score} <span class="th-score-pending">${pending > 0 ? '+' : ''}${pending}</span>`
            : p.score;
        return `<th class="player-th ${isActive ? 'active-th' : ''}">
            <div class="th-player-name" style="color:${p.color}">${escapeHtml(p.name)}</div>
            <div class="th-player-score ${isActive ? 'th-score-active' : ''}">${displayScore}</div>
        </th>`;
    });

    const tableRows = game.targets.map(num => {
        const allClosed = game.isClosedForAll(num);
        const label = num === 25 ? 'Bull' : num;

        const playerMarkCells = game.players.map(p => {
            const isCurrentPlayer = p.id === currentPlayer.id && !game.winner;
            const pendingAdded = isCurrentPlayer ? (liveMarks[num] || 0) : 0;
            const marks = Math.min(p.marks[num] + pendingAdded, 3);
            const isPending = isCurrentPlayer && pendingAdded > 0 && marks > p.marks[num];
            const isActivePenalty = isCurrentPlayer && game.hardcore && num < 15 && marks >= 3;
            return `<td class="marks-cell ${isPending ? 'pending-mark' : ''} ${isCurrentPlayer ? 'active-col' : ''} ${isActivePenalty ? 'active-penalty-col' : ''}">${marksHTML(marks, p.color)}</td>`;
        });

        const scoreInfo = game.players.map(p => {
            if (p.marks[num] >= 3 && !allClosed) {
                const opponents = game.players.filter(op => op.id !== p.id && op.marks[num] < 3);
                if (opponents.length > 0) return `+${num}`;
            }
            return '';
        }).filter(Boolean).join('/');

        const isHardcoreNum = game.hardcore && num < 15;
        return `
            <tr class="${allClosed ? 'closed-row' : ''} ${isHardcoreNum ? 'penalty-row' : ''}">
                <td class="cricket-number ${num === 25 ? 'bull' : ''} ${isHardcoreNum ? 'penalty-number' : ''}">${label}</td>
                ${playerMarkCells.join('')}
            </tr>
        `;
    }).join('');

    // Build turn input buttons (forcedMarks overrides modifier for Bull buttons)
    const buildBtn = (num, forcedMarks = null) => {
        const label = forcedMarks === 2 && num === 25 ? 'D·Bull'
                    : num === 25 ? 'Bull'
                    : num;
        const turnMarkCount = game.turnMarks[num];
        const committedMarks = currentPlayer.marks[num];
        const combinedMarks = Math.min(committedMarks + turnMarkCount, 3);
        const isClosed = committedMarks >= 3;
        const isPenalty = game.hardcore && num < 15;
        const isDeadForAll = !isPenalty && game.isClosedForAll(num);
        const canScore = isClosed && !isDeadForAll;
        const hasTurnMarks = turnMarkCount > 0;
        const dartsFull = game.turnDarts.length >= 3;
        const markSym = combinedMarks === 0 ? '' : combinedMarks === 1 ? '/' : combinedMarks === 2 ? '✕' : '⊗';
        const forcedAttr = forcedMarks !== null ? `data-forced-marks="${forcedMarks}"` : '';
        return `
            <button class="cricket-num-btn
                ${hasTurnMarks ? 'has-marks' : ''}
                ${isDeadForAll ? 'num-dead' : ''}
                ${isPenalty && !isClosed ? 'num-penalty' : ''}
                ${isPenalty && isClosed ? 'num-penalty-active' : ''}
                ${canScore && !hasTurnMarks && !isPenalty ? 'num-can-score' : ''}"
                data-action="cricket-toggle" data-num="${num}" ${forcedAttr}
                ${isDeadForAll || dartsFull ? 'disabled' : ''}>
                <span class="cricket-num-label">${label}</span>
                <span class="cricket-mark-sym" style="color:${combinedMarks > 0 ? currentPlayer.color : 'transparent'}">${markSym || '·'}</span>
            </button>
        `;
    };

    const turnBtnsHTML = [
        buildBtn(25, 2), buildBtn(25, 1),
        buildBtn(20), buildBtn(19), buildBtn(18), buildBtn(17), buildBtn(16), buildBtn(15),
    ].join('');
    const penaltyBtnsHTML = game.hardcore
        ? `<div class="cricket-penalty-section">
               <div class="cricket-penalty-label">Penalty numbers</div>
               <div class="cricket-nums cricket-penalty-nums">
                   ${[14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(n => buildBtn(n)).join('')}
               </div>
           </div>`
        : '';

    return `
        <div class="cricket-screen">
            <div class="game-header">
                <div class="game-header-left">
                    <button class="quit-btn" data-action="quit">✕ Quit</button>
                    <span class="game-mode-badge">${
                        game.mode === 'cutthroat-hardcore' ? 'Cut Throat · Hardcore' :
                        game.hardcore ? 'Hardcore' :
                        game.cutthroat ? 'Cut Throat' : 'Cricket'
                    }</span>
                </div>
                <button class="undo-btn" data-action="undo" ${game.stateHistory.length === 0 ? 'disabled' : ''}>
                    ↩ Undo
                </button>
            </div>

            <div class="cricket-board">
                <table class="cricket-table">
                    <thead>
                        <tr>
                            <th class="num-col"></th>
                            ${headerCells.join('')}
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>

            <div class="cricket-turn">
                <div class="cricket-turn-title">
                    <span style="color:var(--text2)">
                        ${game.winner ? '🏆 Game Over' : `<span style="color:${currentPlayer.color}">${escapeHtml(currentPlayer.name)}</span>'s turn`}
                    </span>
                    ${game.cutthroat ? `<span class="cutthroat-label">lowest score wins</span>` : ''}
                </div>
                <div class="cricket-dart-chips">
                    ${[0,1,2].map(i => {
                        const d = game.turnDarts[i];
                        if (!d) return `<div class="dart-chip empty"><span class="dart-chip-label">—</span></div>`;
                        const numLabel = d.num === 25 ? 'Bull' : d.num;
                        const label = d.marks === 1 ? numLabel : d.marks === 2 ? `D${numLabel}` : `T${numLabel}`;
                        const mod = d.marks === 1 ? 'single' : d.marks === 2 ? 'double' : 'triple';
                        return `<div class="dart-chip mod-${mod}"><span class="dart-chip-label">${label}</span></div>`;
                    }).join('')}
                </div>
                <div class="modifier-row">
                    ${[{n:1,label:'Single',short:'1×'},{n:2,label:'Double',short:'2×'},{n:3,label:'Triple',short:'3×'}].map(m => `
                        <button class="mod-btn ${game.modifier === m.n ? 'active mod-active-' + (m.n===1?'single':m.n===2?'double':'triple') : ''}"
                            data-action="cricket-modifier" data-value="${m.n}"
                            ${game.turnDarts.length >= 3 ? 'disabled' : ''}>
                            <span class="mod-short">${m.short}</span>
                            <span class="mod-label">${m.label}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="cricket-nums">${turnBtnsHTML}</div>
                ${penaltyBtnsHTML}
                <div class="cricket-controls">
                    <button class="undo-btn" data-action="cricket-back"
                        style="flex:0 0 auto"
                        ${game.turnDarts.length === 0 ? 'disabled' : ''}>⌫</button>
                    <button class="cricket-confirm-btn" data-action="cricket-confirm">
                        ${game.winner ? 'See Results' : game.turnDarts.length === 0 ? 'Triple Niet' : 'End Turn'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

/* ============================================================
   RENDER — GAME OVER SCREEN
   ============================================================ */
function renderGameOver() {
    const game = state.game;
    const winner = game.winner;
    if (!winner) return '';

    const isX01 = game instanceof X01Game;

    let statsHTML = '';
    if (isX01) {
        statsHTML = `
            <div class="all-stats">
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Avg</th>
                            <th>Darts</th>
                            <th>180s</th>
                            <th>Best</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${game.players.map(p => `
                            <tr class="${p.id === winner.id ? 'winner-row' : ''}">
                                <td>
                                    <div class="player-name-cell">
                                        <span class="player-name-dot" style="background:${p.color}"></span>
                                        ${escapeHtml(p.name)}
                                    </div>
                                </td>
                                <td>${game.getAverage(p)}</td>
                                <td>${p.dartsThrown}</td>
                                <td>${p.oneEighties}</td>
                                <td>${p.highScore}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        // Cricket stats
        statsHTML = `
            <div class="all-stats">
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                            <th>Rounds</th>
                            <th>Darts</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${game.players.map(p => `
                            <tr class="${p.id === winner.id ? 'winner-row' : ''}">
                                <td>
                                    <div class="player-name-cell">
                                        <span class="player-name-dot" style="background:${p.color}"></span>
                                        ${escapeHtml(p.name)}
                                    </div>
                                </td>
                                <td>${p.score}</td>
                                <td>${p.rounds}</td>
                                <td>${p.dartsThrown}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    const subtitle = isX01
        ? `Checked out ${game.startScore} — ${winner.dartsThrown} darts thrown`
        : `Closed all numbers with ${winner.score} points`;

    return `
        <div class="gameover-screen">
            <div class="trophy">🏆</div>
            <div>
                <div class="winner-label">Winner</div>
                <div class="winner-name" style="color:${winner.color}">${escapeHtml(winner.name)}</div>
                <div class="winner-subtitle">${subtitle}</div>
            </div>
            ${statsHTML}
            <div class="gameover-actions">
                <button class="rematch-btn" data-action="rematch">Rematch</button>
                <button class="new-game-btn" data-action="new-game">New Game</button>
            </div>
        </div>
    `;
}

/* ============================================================
   MAIN RENDER
   ============================================================ */
function render() {
    const app = document.getElementById('app');
    const game = state.game;
    if (state.view === 'home') saveSetup();

    // Check if we should show game over
    if (game && game.winner && state.view !== 'gameover') {
        if (state.view === 'x01' || state.view === 'cricket') {
            // Show game screen with winner visible, let user click "See Results"
        }
    }

    switch (state.view) {
        case 'home':
            app.innerHTML = renderHome();
            bindHomeEvents();
            break;
        case 'x01':
            app.innerHTML = renderX01();
            break;
        case 'cricket':
            app.innerHTML = renderCricket();
            break;
        case 'gameover':
            app.innerHTML = renderGameOver();
            break;
    }
}

/* ============================================================
   HOME EVENTS (special: input binding)
   ============================================================ */
function bindHomeEvents() {
    // Bind player name inputs (live update)
    document.querySelectorAll('[data-action="player-name"]').forEach(input => {
        input.addEventListener('input', e => {
            const i = parseInt(e.target.dataset.index);
            state.setup.players[i] = e.target.value;
        });
    });
}

/* ============================================================
   GLOBAL EVENT DELEGATION
   ============================================================ */
document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const value = btn.dataset.value;

    switch (action) {
        // HOME
        case 'set-game':
            state.setup.gameType = value;
            render();
            break;

        case 'set-score':
            state.setup.startScore = parseInt(value);
            render();
            break;

        case 'set-out':
            state.setup.outType = value;
            render();
            break;

        case 'set-cricket-mode':
            state.setup.cricketMode = value;
            render();
            break;

        case 'set-hardcore-effect':
            state.setup.hardcoreEffect = value;
            render();
            break;

        case 'add-player':
            state.setup.players.push(`Player ${state.setup.players.length + 1}`);
            render();
            const inputs = document.querySelectorAll('[data-action="player-name"]');
            if (inputs.length) inputs[inputs.length - 1].focus();
            break;

        case 'remove-player': {
            const idx = parseInt(btn.dataset.index);
            state.setup.players.splice(idx, 1);
            render();
            break;
        }

        case 'start-game': {
            // Capture current player names from inputs
            document.querySelectorAll('[data-action="player-name"]').forEach((input, i) => {
                state.setup.players[i] = input.value.trim() || `Player ${i + 1}`;
            });
            startGame();
            break;
        }

        // GAME — X01
        case 'modifier':
            if (state.view === 'x01' && state.game && !state.game.winner) {
                state.game.selectModifier(value);
                render();
            }
            break;

        case 'dart-number':
            if (state.view === 'x01' && state.game && !state.game.winner) {
                state.game.addDart(parseInt(value));
                render();
            }
            break;

        case 'dart-back':
            if (state.view === 'x01' && state.game) {
                state.game.removeDart();
                render();
            }
            break;

        case 'confirm':
            if (state.view === 'x01' && state.game) {
                state.game.confirm();
                if (state.game.winner) {
                    state.view = 'gameover';
                }
                render();
            }
            break;

        case 'undo':
            if (state.game) {
                state.game.undo();
                render();
            }
            break;

        // GAME — Cricket
        case 'cricket-modifier':
            if (state.view === 'cricket' && state.game && !state.game.winner) {
                state.game.selectModifier(parseInt(value));
                render();
            }
            break;

        case 'cricket-toggle':
            if (state.view === 'cricket' && state.game && !state.game.winner) {
                const forcedMarks = btn.dataset.forcedMarks !== undefined ? parseInt(btn.dataset.forcedMarks) : undefined;
                state.game.addMark(parseInt(btn.dataset.num), forcedMarks);
                render();
            }
            break;

        case 'cricket-back':
            if (state.view === 'cricket' && state.game && !state.game.winner) {
                state.game.removeLastDart();
                render();
            }
            break;

        case 'cricket-confirm':
            if (state.view === 'cricket' && state.game) {
                if (state.game.winner) {
                    state.view = 'gameover';
                    render();
                } else {
                    state.game.confirmTurn();
                    if (state.game.winner) {
                        // Stay on cricket screen briefly, show winner
                    }
                    render();
                }
            }
            break;

        // NAVIGATION
        case 'quit':
            if (confirm('Quit game? Progress will be lost.')) {
                state.game = null;
                state.view = 'home';
                render();
            }
            break;

        case 'rematch':
            startGame(true);
            break;

        case 'new-game':
            state.game = null;
            state.view = 'home';
            render();
            break;
    }
});

/* ============================================================
   START GAME
   ============================================================ */
function startGame(rematch = false) {
    const { gameType, startScore, outType, cricketMode, hardcoreEffect, players } = state.setup;
    const names = rematch && state.game
        ? state.game.players.map(p => p.name)
        : players;

    if (gameType === 'x01') {
        state.game = new X01Game(startScore, names, outType);
        state.view = 'x01';
    } else if (gameType === 'cutthroat') {
        const mode = cricketMode === 'hardcore' ? 'cutthroat-hardcore' : 'cutthroat';
        state.game = new CricketGame(names, mode, hardcoreEffect);
        state.view = 'cricket';
    } else {
        const mode = cricketMode === 'hardcore' ? 'hardcore' : 'standard';
        state.game = new CricketGame(names, mode, hardcoreEffect);
        state.view = 'cricket';
    }
    render();
}

/* ============================================================
   UTILITY
   ============================================================ */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* ============================================================
   PERSISTENCE
   ============================================================ */
function saveSetup() {
    localStorage.setItem('darts-setup', JSON.stringify(state.setup));
}

function loadSetup() {
    try {
        const saved = localStorage.getItem('darts-setup');
        if (saved) Object.assign(state.setup, JSON.parse(saved));
    } catch (e) {}
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    loadSetup();
    render();
});
