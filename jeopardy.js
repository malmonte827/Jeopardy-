// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

// Get 6 random categories from API.
// Returns array of category ids
async function getCategoryIds() {
    const res = await axios.get(
        "https://rithm-jeopardy.herokuapp.com/api/categories",
        { params: { count: 14 } }
    );
    const categoryIds = res.data.map((categories) => categories.id);
    console.log(categoryIds);
    return _.sampleSize(categoryIds, 6);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory() {
    const res = await axios.get(
        "https://rithm-jeopardy.herokuapp.com/api/category",
        {
            params: { id: 3 },
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

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
$('.start').on('click', setupAndStart)

async function setupAndStart() {}

/** On click of start / restart button, set up game. */
// TODO

/** On page load, add event handler for clicking clues */
$('.jeopardy-board').on('click', "td", function)
// TODO
