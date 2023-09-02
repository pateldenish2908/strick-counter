const express = require("express");
const app = express();

const moment = require("moment");

app.get("/", (req, res) => {
    let lesson = [
        // {
        //     submitDate: "2023-09-02",
        //     point: "10",
        // },
        {
            submitDate: "2023-08-31",
            point: "10",
        },
        {
            submitDate: "2023-08-30",
            point: "10",
        },
        {
            submitDate: "2023-08-29",
            point: "10",
        },
        {
            submitDate: "2023-08-28",
            point: "10",
        },
    ];

    var currentDate = moment();

    var weekStart = currentDate.clone().startOf("isoWeek");

    var days = [];

    for (var i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, "days").format("YYYY-MM-DD"));
    }

    days.reverse();
    console.log("days ", days);

    var strick = [];
    var isChecked = false;
    var isStrickChecked = false;
    days.forEach((element) => {
        let findData = lesson.find((item) => {
            if (moment(item.submitDate).isSame(element)) {
                return item;
            }
        });

        if (findData && !isChecked) {
            isChecked = true;
            isStrickChecked = true;
        } 
        else if (
            findData &&
            isChecked &&
            strick[strick.length - 1]?.isStrickChecked
        ) {
            isChecked = true;
            isStrickChecked = true;
        } 
        else {
            isStrickChecked = false;
        }

        strick.push({
            date: moment(element).format("YYYY-MM-DD"),
            isStrickChecked: isStrickChecked,
        });
    });
    console.log("strick ", strick);

    res.send(
        "Hello, Welcome to the Express starter template for Stackblitz!" +
            moment().format(),
    );
});

const port = 3111;

app.listen(port, () => {
    console.log(`App is live at http://localhost:${port}`);
});
