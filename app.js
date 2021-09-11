const { default: axios } = require("axios");
var cheerio = require("cheerio");
const {
    getName,
    getAddress,
    getPhoneNumber,
    getRating,
    getVotes,
    exportToCSV,
    headers,
} = require("./utils");
const {
    INITIAL_URL,
    STARTING_PAGE,
    ENDING_PAGE,
    OUTPUT_FILE_NAME,
} = require("./config");

(async () => {
    let firstPageNumber = STARTING_PAGE;
    let lastPageNumber = ENDING_PAGE;

    let list = [];

    while (true) {
        if (firstPageNumber > lastPageNumber) break;

        const URL = `${INITIAL_URL}/page-${firstPageNumber}`;

        let html = await axios.get(URL, { headers: headers });
        let $ = cheerio.load(html.data);
        $("li.cntanr").each((i, element) => {
            try {
                let data = {};
                data.name = getName(element);
                data.phoneNumber = getPhoneNumber(element);
                data.address = getAddress(element);
                data.rating = getRating(element);
                data.votes = getVotes(element);
                console.log(data);
                list.push(data);
            } catch (err) {
                // ! SKIP ROW IF ANY EXCEPTION IS ENCOUNTERED
            }
        });
        ++firstPageNumber;
    }

    exportToCSV(list, OUTPUT_FILE_NAME);
})();
