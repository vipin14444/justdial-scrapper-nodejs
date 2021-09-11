const { default: axios } = require("axios");
var cheerio = require("cheerio");

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64)",
};

const getName = (element) => {
    let $ = cheerio.load(element);
    return $("span.jcn > a > span").text() || "";
};

const getPhoneNumber = (element) => {
    const map = {
        "icon-ji": 9,
        "icon-dc": "+",
        "icon-fe": "(",
        "icon-hg": ")",
        "icon-ba": "-",
        "icon-lk": 8,
        "icon-nm": 7,
        "icon-po": 6,
        "icon-rq": 5,
        "icon-ts": 4,
        "icon-vu": 3,
        "icon-wx": 2,
        "icon-yz": 1,
        "icon-acb": 0,
    };

    let $ = cheerio.load(element);

    let phoneNumber = "";

    $("p.contact-info > span span").each((i, item) => {
        const className = item.attribs.class;
        for (let cls in map) {
            if (className.includes(cls)) {
                phoneNumber += map[cls];
            }
        }
    });

    return phoneNumber;
};

const getAddress = (element) => {
    let $ = cheerio.load(element);
    return $("span.mrehover > .cont_fl_addr").text() || "";
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
            data.phoneNumber = getPhoneNumber(element);
            data.address = getAddress(element);
            console.log(data);
        });
        ++pageNumber;
    }
})();
