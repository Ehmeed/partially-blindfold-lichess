document.addEventListener("click", handleClick, false);

function handleClick(event) {
    const element = event.target;
    if (!element.classList.contains('piece')) {
        return
    }
    const piece = element.getAttribute('data-piece');
    const color = element.getAttribute('data-color');

    element.parentElement.classList.toggle("selected");
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {

        payload = {
            type: "togglePieceVisibility",
            pieces: [
                {
                    piece: piece,
                    color: color
                }
            ]
        }
        chrome.tabs.sendMessage(tabs[0].id, payload);
    });
}

const allPieces = ['white_pawn', 'white_rook', 'white_knight', 'white_bishop', 'white_queen', 'white_king', 'black_pawn', 'black_rook', 'black_knight', 'black_bishop', 'black_queen', 'black_king']
chrome.storage.local.get(allPieces, data => {
    for (let [pieceKey, isHidden] of Object.entries(data)) {
        const el = document.getElementById(pieceKey).parentElement
        if (isHidden) {
            el.classList.add("selected");
        } else {
            el.classList.remove("selected");
        }
    }
});



