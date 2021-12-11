chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "togglePieceVisibility") {
        request.pieces.map(piece => `${piece['color']}_${piece['piece']}`).forEach(pieceKey => {
            const selector = `.${pieceKey.replace("_", '.')}`
            document.querySelectorAll(selector).forEach(el => {
                if (el.style.visibility === 'hidden') {
                    el.style.removeProperty('visibility')
                    isHidden = false
                } else {
                    el.style.visibility = "hidden";
                    isHidden = true
                }
            });
            const data = {}
            data[pieceKey] = isHidden;
            chrome.storage.local.set(data);

        })
    }
});


const allPieces = ['white_pawn', 'white_rook', 'white_knight', 'white_bishop', 'white_queen', 'white_king', 'black_pawn', 'black_rook', 'black_knight', 'black_bishop', 'black_queen', 'black_king']


chrome.storage.local.get(allPieces, data => {
    for (const [pieceKey, isHidden] of Object.entries(data)) {
        const selector = `.${pieceKey.replace("_", '.')}`
        document.querySelectorAll(selector).forEach(el => {
            if (isHidden) {
                el.style.visibility = "hidden";
            } else {
                el.style.removeProperty('visibility')
            }
        });
    }
});
