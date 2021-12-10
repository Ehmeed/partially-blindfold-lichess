const allPieces = ['white_pawn', 'white_rook', 'white_knight', 'white_bishop', 'white_queen', 'white_king', 'black_pawn', 'black_rook', 'black_knight', 'black_bishop', 'black_queen', 'black_king']

document.addEventListener("click", handleClick, false);

function handleClick(event) {
    const element = event.target;
    if (element.id === 'hide_all') {
        hideAll(element);
    } else if (element.classList.contains('piece')) {
        pieceClick(element);
    }
}

function hideAll(element) {
    const doHide = !element.parentElement.classList.contains("selected")
    element.parentElement.classList.toggle("selected");
    allPieces.forEach(pieceId => {
        const pieceElement = document.getElementById(pieceId)
        const isHidden = pieceElement.parentElement.classList.contains("selected")
        if ((isHidden && !doHide) || (!isHidden && doHide)) {
            pieceClick(pieceElement)
        }
    });
    const data = {}
    data['hide_all'] = doHide;
    chrome.storage.local.set(data);
}

function pieceClick(element) {
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

chrome.storage.local.get(allPieces.concat(["hide_all"]), data => {
    for (let [pieceKey, isHidden] of Object.entries(data)) {
        const el = document.getElementById(pieceKey).parentElement
        if (isHidden) {
            el.classList.add("selected");
        } else {
            el.classList.remove("selected");
        }
    }
});
