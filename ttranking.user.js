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

    console.log("TTRanking");

    let users = getRankingList();
    users.forEach((elem, index) => {
        console.log(elem.name, elem.score);
    });


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

})();
