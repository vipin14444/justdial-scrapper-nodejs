const { default: axios } = require("axios");
var cheerio = require("cheerio");

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64)",
};

const getName = (element) => {
    let $ = cheerio.load(element);
    return $("span.jcn > a > span").text() || "";
};

(async () => {
    let pageNumber = 1;

    while (true) {
        if (pageNumber > 1) break;

        const URL = `https://www.justdial.com/Rajkot/Hardware-Shops-in-Rajkot/nct-10243514/page-${pageNumber}`;

        let html = await axios.get(URL, { headers: headers });
        let $ = cheerio.load(html.data);
        $("li.cntanr").each((i, element) => {
            let data = {};
            data.name = getName(element);
        });
        ++pageNumber;
    }
})();
