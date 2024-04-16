let categories = [];

// Get 6 random categories from API.
// Returns array of category ids
async function getCategoryIds() {
    const res = await axios.get(
        "https://rithm-jeopardy.herokuapp.com/api/categories",
        { params: { count: 14 } }
    );
    const categoryIds = res.data.map((categories) => categories.id);
    return _.sampleSize(categoryIds, 6);
}

//  Return object with data about a category
async function getCategory() {
    const res = await axios.get(
        "https://rithm-jeopardy.herokuapp.com/api/category",
        {
            params: { id: cat },
        }
    );
    const category = res.data;
    const cluesArray = category.clues.map((clues) => ({
        question: clues.question,
        answer: clues.answer,
        showing: null,
    }));
    const randomClues = _.sampleSize(cluesArray, 5);

    return { title: category.title, clues: randomClues };
}

// Creates rows and colums of table
// Adds category titles to header
// Adds ids to tbody cells corrilating them with the category indexes
async function fillTable() {
    hideLoadingView();
    const $tr = $("<tr>");
    for (let category of categories) {
        $tr.append($("<th>").text(category.title));
    }
    $(".jeopardy-board thead").append($tr);

    for (let i = 0; i < 5; i++) {
        const $tr = $("<tr>");
        for (let j = 0; j < 6; j++) {
            $tr.append(
                $("<td>").attr("id", `${j}-${i}`).text("?")
                // .addClass("fa fa-question-circle")
            );
        }
        $(".jeopardy-board tbody").append($tr);
    }
}

// Adds event handler for clicking clues
$(".jeopardy-board").on("click", "td", handleClick);

// Shows the question or answer when "td" is clicked
function handleClick(evt) {
    const $evt = $(evt.target);
    const id = $evt.attr("id");
    const catIdx = id.substring(0, 1);
    const clueIdx = id.substring(2);
    const clue = categories[catIdx].clues[clueIdx];

    if (clue.showing === null) {
        $evt.html(clue.question);
        clue.showing = clue.question;
    } else if (clue.showing === clue.question) {
        $evt.addClass("correct").html(clue.answer);

        clue.showing = clue.answer;
    }
}

// Clears board and displays loading wheel
// displays "Loading" on button
function showLoadingView() {
    $(".jeopardy-board thead").empty();
    $(".jeopardy-board tbody").empty();

    $(".loading-wheel").show();
    $(".loading-container").addClass("loading-wheel");
    $(".start").text("Loading");
}

// Hides loading wheel
// Sets button text to "Restart"
function hideLoadingView() {
    $(".loading-wheel").hide();
    $(".start").text("Restart");
}

// Adds click listener to start/restart button
// Sets up or restarts game
$(".start").on("click", setupAndStart);

// Clears categories array
// Gets random category ids
//  Gets the data for each category
// creates table
async function setupAndStart() {
    showLoadingView();

    const catIds = await getCategoryIds();

    categories = [];

    for (cat of catIds) {
        categories.push(await getCategory(cat));
    }

    fillTable();
}
