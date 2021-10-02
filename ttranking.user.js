// ==UserScript==
// @name         TTRanking
// @namespace    https://github.com/chagama-g/
// @version      0.1
// @description  Typing Tube のランキング表示
// @author       You
// @match        https://typing-tube.net/movie/*/*
// @icon         https://www.google.com/s2/favicons?domain=typing-tube.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...

    class User {
        constructor(name, score) {
            this.name = name;
            this.score = score;
        }
    }

    let graph_div = "score_graph"

    console.log("TTRanking");

    appendScript("https://www.gstatic.com/charts/loader.js");

    window.addEventListener("load", (e) => {
        createGraphElem();
        drawGraph();
    });


    function createGraphElem() {
        let insert_pos = document.getElementById("controlbox");

        let graph_elem = document.createElement('div');
        graph_elem.id = graph_div;
        graph_elem.style.height = "400px";
        graph_elem.style.paddingTop = "6px";

        insert_pos.after(graph_elem);
    }


    function drawGraph() {
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            let options = {
                title: 'Score Distribution',
                legend: { position: 'none' },
                histogram: {
                    bucketSize: 5
                }
            };
            let chart = new google.visualization.Histogram(document.getElementById(graph_div));
            chart.draw(getGoogleVisualizationDataTable(), options);
        }
    }


    function getGoogleVisualizationDataTable() {
        let users = getRankingList();
        let data = [];
        users.forEach((elem, index) => {
            data[index] = [elem.name, elem.score];
        });
        data.unshift(["Name", "Score"]);

        data = google.visualization.arrayToDataTable(data);

        return data;
    }


    function getRankingList() {
        let elems = document.getElementsByClassName("list-group-item p-2");
        let arry = Array.from(elems);

        let users = new Array(arry.length);

        arry.forEach((elem, index) => {
            let name = elem.getElementsByClassName("player_ranking_name")[0].textContent;

            let score = elem.getElementsByClassName("player_ranking")[0].textContent;
            score = score.slice(0, score.length - 1);

            users[index] = new User(name, score);
        });

        return users;
    }

    function appendScript(URL) {
        var el = document.createElement('script');
        el.src = URL;
        document.body.appendChild(el);
    };

})();
