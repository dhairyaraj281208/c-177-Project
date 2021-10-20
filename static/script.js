// let words = [
//     {
//         "inputs": 5,
//         "category": "Sports",
//         "word": "Chess"
//     },
//     {
//         "inputs": 6,
//         "category": "European Country Name",
//         "word": "France"
//     }]

$(document).ready(function(){
    getWord();
})

function getWord() {
    
    $.ajax({
        url: "/get-word",
        type: "get",
        success: function(result){
            fill_blanks()
        },
        error: function(result){
            alert(result.responseJSON.message)
        }
    })
		
}


var gameOver = false 
//Fill blanks only if the character match is found 
$(".clickable").click(function () {
    var correctGuess = false;
    //Get the id of the button clicked 
    let id = $(this).attr("id");
    //Get the life 
    var life = parseInt($("#life").text())
    // Loop through all the letters 
    for (var i = 0; i < randomWord.word.length; i++) {
        //Check if the character matches the id of the button 
        if (randomWord.word.charAt(i).toLowerCase() == id) {
            //Check if the life is still left and blank is is empty/already filled 
            if (life > 0 && ($(".fill_blanks").eq(i).html() == "_" || $(".fill_blanks").eq(i).html() == id)) {
                //fill blanks 
                $(".fill_blanks").eq(i).html(id); 
                correctGuess = true;
                //Check if the word guess is complete 
                if ($("#blanks").text() === randomWord.word.to.LowerCase()) {
                    $("#result").text("You Win!!")
                    correctGuess = true;
                    gameOver = true;
                }
            }
        }
    }
}),

function fill_blanks() {
    const word = words[Math.floor(Math.random() * stories.length)];
    $("#hint").html(word.category)


    $("#blanks").empty();
    for (let i = 0; i < word.inputs; i++) {
        let input_html = `<input type="text" class="input_field" id="input_${i}" placeholder="Input ${i + 1}"/>`
        $("#blanks").append(input_html)
    }

    $("#blanks").html(word.word)
}

$.ajax({
    url: "/post-answers",
    type: "post",
    data: JSON.stringify(data),
    dataType: "json",
    contentType: 'application/json',
    success: function (result) {
        $("#result").html(result.result)
        $("#result_container").removeClass("hidden")
    },
    error: function (result) {
        alert(result.responseJSON.message)
    }
})  