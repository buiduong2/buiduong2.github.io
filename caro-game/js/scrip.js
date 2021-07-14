let tableElement = document.querySelector("#table");

const arr = [];

const PLAYER_1 = {
    text: 'X',
    className: "x-player"
};

const PLAYER_2 = {
    text: 'O',
    className: "o-player"
}

const PLAYER = {
    player: PLAYER_1,
    winnerClass: "winner",
    resultClass: "show-result"
};

function Cell(target, row, col) {
    this.td = target;
    this.x = row;
    this.y = col;
}

for (let i = 0; i < tableElement.rows.length; i++) {
    let cells = tableElement.rows[i].cells;
    arr.push([]);
    for (let j = 0; j < cells.length; j++) {
        arr[i].push(new Cell(cells[j], i, j));
    }
}

arr.forEach(function (row) {
    row.forEach(function (obj) {
        obj.td.addEventListener("click", function () {
            main(obj, PLAYER, arr);
        });
    });
});


// Event

function main(obj, player, cells) {
    let isSuccess = writeIntheCell(obj.td, player.player);
    if (isSuccess) {

        let result = calculatorWin(obj, cells);
        if (result != 0) {
            showResult(player);
            cssForWinner(result, obj, player, cells);
        } else {
            chagePlayer(player);
            showCurrentPlayerText(player.player.text);
        }

    }
}

function chagePlayer(player) {
    player.player = player.player == PLAYER_1 ? PLAYER_2 : PLAYER_1;
}

function writeIntheCell(td, player) {
    if (td.innerHTML == "") {
        td.innerHTML = player.text;
        td.classList.add(player.className);
        return true;
    }
    return false;
}

// calculatorWin
function calculatorWin(obj, cells) {
    if (checkMainDiagonal(obj.x, obj.y, obj.td.innerHTML, cells)) {
        return 1;
    } else if (checkSupDiagonal(obj.x, obj.y, obj.td.innerHTML, cells)) {
        return 2;
    } else if (checkHorizontal(obj.x, obj.y, obj.td.innerHTML, cells)) {
        return 3;
    } else if (checkVertical(obj.x, obj.y, obj.td.innerHTML, cells)) {
        return 4;
    }
    return 0;
}


function checkMainDiagonal(row, col, text, cells) {
    let count = 1;
    let size = cells.length;
    for (let i = 1; (row + i < size) && (col + i < size); i++) {
        if ((cells[row + i][col + i].td.innerHTML == text)) {
            count++
        } else {
            break;
        }
    }
    for (let i = 1; (row - i >= 0) && (col - i >= 0); i++) {
        if (cells[row - i][col - i].td.innerHTML == text) {
            count++;
        } else {
            break;
        }
    }
    return count > 4;
}

function checkSupDiagonal(row, col, text, cells) {
    let count = 1;
    let size = cells.length;
    for (let i = 1; (row + i < size) && (col - i >= 0); i++) {
        if (cells[row + i][col - i].td.innerHTML == text) {
            count++
        } else {
            break;
        }
    }
    for (let i = 1; (row - i >= 0) && (col + i < size); i++) {
        if (cells[row - i][col + i].td.innerHTML == text) {
            count++;
        } else {
            break;
        }
    }
    return count > 4;
}

function checkHorizontal(row, col, text, cells) {
    let count = 1;
    let size = cells.length;
    for (let i = 1; col - i >= 0; i++) {
        if (cells[row][col - i].td.innerHTML == text) {
            count++;
        } else {
            break;
        }
    }
    for (let i = 1; col + i < size; i++) {
        if (cells[row][col + i].td.innerHTML == text) {
            count++;
        } else {
            break;
        }
    }
    return count > 4;
}

function checkVertical(row, col, text, cells) {
    let count = 1;
    let size = cells.length;
    for (let i = 1; row - i >= 0; i++) {
        if (cells[row - i][col].td.innerHTML == text) {
            count++;
        } else {
            break;
        }
    }
    for (let i = 1; row + i < size; i++) {
        if (cells[row + i][col].td.innerHTML == text) {
            count++;
        } else {
            break;
        }
    }
    return count > 4;
}
//

//CSS For Winner 


function cssForWinner(result, obj, player, cells) {
    switch (result) {
        case 1:
            writeIdForMainDiagonal(obj.x, obj.y, obj.td.innerHTML, player.winnerClass, cells);
            break;
        case 2:
            writeIdForSubDiagonal(obj.x, obj.y, obj.td.innerHTML, player.winnerClass, cells);
            break;
        case 3:
            writeIdForHorizontal(obj.x, obj.y, obj.td.innerHTML, player.winnerClass, cells);
            break;
        case 4:
            writeIdForVertical(obj.x, obj.y, obj.td.innerHTML, player.winnerClass, cells);
            break;
        default:
    }
}


function writeIdForMainDiagonal(row, col, text, winnerId, cells) {
    let size = cells.length;
    for (let i = 0; (row + i < size) && (col + i < size); i++) {
        if ((cells[row + i][col + i].td.innerHTML == text)) {
            cells[row + i][col + i].td.classList.add(winnerId);
        } else {
            break;
        }
    }
    for (let i = 0; (row - i >= 0) && (col - i >= 0); i++) {
        if (cells[row - i][col - i].td.innerHTML == text) {
            cells[row - i][col - i].td.classList.add(winnerId);
        } else {
            break;
        }
    }
}

function writeIdForSubDiagonal(row, col, text, winnerId, cells) {
    let size = cells.length;
    for (let i = 0; i < size; i++) {
        for (let i = 0; (row + i < size) && (col - i >= 0); i++) {
            if (cells[row + i][col - i].td.innerHTML == text) {
                cells[row + i][col - i].td.classList.add(winnerId);
            } else {
                break;
            }
        }
        for (let i = 0; (row - i >= 0) && (col + i < size); i++) {
            if (cells[row - i][col + i].td.innerHTML == text) {
                cells[row - i][col + i].td.classList.add(winnerId);
            } else {
                break;
            }
        }
    }
}

function writeIdForHorizontal(row, col, text, winnerId, cells) {
    let size = cells.length;
    for (let i = 0; col - i >= 0; i++) {
        if (cells[row][col - i].td.innerHTML == text) {
            cells[row][col - i].td.classList.add(winnerId);
        } else {
            break;
        }
    }
    for (let i = 0; col + i < size; i++) {
        if (cells[row][col + i].td.innerHTML == text) {
            cells[row][col + i].td.classList.add(winnerId);
        } else {
            break;
        }
    }
}

function writeIdForVertical(row, col, text, winnerId, cells) {
    let size = cells.length;
    for (let i = 0; row - i >= 0; i++) {
        if (cells[row - i][col].td.innerHTML == text) {
            cells[row - i][col].td.classList.add(winnerId);
        } else {
            break;
        }
    }
    for (let i = 0; row + i < size; i++) {
        if (cells[row + i][col].td.innerHTML == text) {
            cells[row + i][col].td.classList.add(winnerId);
        } else {
            break;
        }
    }
}



//Show Result
function showResult(player) {
    let divElement = document.createElement("div");
    divElement.classList.add(player.resultClass);
    divElement.innerHTML = `<h1>Winner is ${player.player.text}</h1>
                            <br>
                            <h3>F5 to refresh<h3>`
    let wrapElement = document.querySelector("body");
    wrapElement.appendChild(divElement);
}

//Show currentPlayer

function showCurrentPlayerText(text) {
    let spanElement = document.querySelector(".show-player");
    spanElement.innerHTML = text;
}