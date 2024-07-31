function playGameRock(){
    const randomNumber = Math.random();

    let selectedMove = '';

    if (randomNumber < 1/3){
        selectedMove = 'rock';
        // console.log(selectedMove);
    }
    else if (randomNumber > 1/3 && randomNumber <2/3){
        selectedMove = 'paper';
        // console.log(selectedMove);
    }
    else if ( randomNumber > 2/3){
        selectedMove = 'scissor';
        // console.log(selectedMove);
    }
    console.log(selectedMove);

    let result = '';

    if (selectedMove === 'rock'){
        result = "tie";
    } else if (selectedMove === 'paper'){
        result = 'you lose';
    } else if (selectedMove === "scissor"){
        result = "you win";
    }

    alert(`You picked rock. The computer picked ${selectedMove}. ${result}`);
}
function playGameScissor(){
    const randomNumber = Math.random();

    let selectedMove = '';

    if (randomNumber < 1/3){
        selectedMove = 'rock';
        // console.log(selectedMove);
    }
    else if (randomNumber > 1/3 && randomNumber <2/3){
        selectedMove = 'paper';
        // console.log(selectedMove);
    }
    else if ( randomNumber > 2/3){
        selectedMove = 'scissor';
        // console.log(selectedMove);
    }
    console.log(selectedMove);

    let result = '';

    if (selectedMove === 'rock'){
        result = "you lose";
    } else if (selectedMove === 'paper'){
        result = 'you win';
    } else if (selectedMove === "scissor"){
        result = "tie";
    }

    alert(`You picked scissor. The computer picked ${selectedMove}. ${result}`);
}
function playGamePaper(){
    const randomNumber = Math.random();

    let selectedMove = '';

    if (randomNumber < 1/3){
        selectedMove = 'rock';
        // console.log(selectedMove);
    }
    else if (randomNumber > 1/3 && randomNumber <2/3){
        selectedMove = 'paper';
        // console.log(selectedMove);
    }
    else if ( randomNumber > 2/3){
        selectedMove = 'scissor';
        // console.log(selectedMove);
    }
    console.log(selectedMove);

    let result = '';

    if (selectedMove === 'rock'){
        result = "you win";
    } else if (selectedMove === 'paper'){
        result = 'tie';
    } else if (selectedMove === "scissor"){
        result = "you lose";
    }

    alert(`You picked paper. The computer picked ${selectedMove}. ${result}`);
}

// /*
// const age = 35;

// if (age <= 5 || age >= 65){
//     console.log("Discount")
// } else {
//     console.log("No discount")
// }
// */