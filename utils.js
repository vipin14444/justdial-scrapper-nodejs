var cheerio = require("cheerio");
const converter = require("json-2-csv");
var fs = require("fs");

const getName = (element) => {
    try {
        let $ = cheerio.load(element);
        return $("span.jcn > a > span").text() || "";
    } catch (err) {
        return "";
    }
};

const getPhoneNumber = (element) => {
    try {
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
    } catch (err) {
        return "";
    }
};

const getAddress = (element) => {
    try {
        let $ = cheerio.load(element);
        return $("span.mrehover > .cont_fl_addr").text() || "";
    } catch (err) {
        return "";
    }
};

const getRating = (element) => {
    try {
        let $ = cheerio.load(element);
        return $("p.newrtings .green-box").text() || "";
    } catch (err) {
        return "";
    }
};

const getVotes = (element) => {
    try {
        let $ = cheerio.load(element);
        const voteString = $("p.newrtings .rt_count.lng_vote").text();
        if (voteString) {
            return voteString.replace(/\D/g, "");
        }
        return 0;
    } catch (err) {
        return "";
    }
};

const exportToCSV = (data, fileName) => {
    let json2csvCallback = function (err, csv) {
        if (err) throw err;
        fs.writeFile(`${fileName || "data"}.csv`, csv, "utf8", function (err) {
            if (err) {
                console.log(
                    "Some error occured - file either not saved or corrupted file saved."
                );
            } else {
                console.log("It's saved!");
            }
        });
    };

    converter.json2csv(data, json2csvCallback, {
        prependHeader: true,
    });
};

const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64)",
};

module.exports = {
    getName,
    getPhoneNumber,
    getAddress,
    getRating,
    getVotes,
    exportToCSV,
    headers,
};
