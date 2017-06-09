
const shortid = require('shortid');
const Nightmare = require('nightmare');   
const async = require('async');
let nightmare = Nightmare({ show: true });
const downloader = require('image-downloader');
const shell = require('shelljs');
const fs = require('fs');
const convert = require('color-convert');

nightmare
    .goto('http://www.color-hex.com/color-palettes/popular.php')
    .evaluate(function () {

        // get colors
        let res = document.querySelectorAll('.palettecontainerlist .palettecolordivcon .palettecolordiv');
        let colors = [];

        for(let i = 0; i < res.length;i++){
            // let tm = res[i].querySelector('a').href;
            let tm = res[i].style.backgroundColor;
            colors.push(tm);
        }

        // Get name pallet
        let res2 = document.querySelectorAll('.palettecontainerlist a');
        let titles = [];

        for(let i = 0; i < res2.length;i++){
            // let tm = res[i].querySelector('a').href;
            let tm = res2[i].innerText;
            titles.push(tm);
        }

        // let newarr = arr.slice(9);
        return [colors,titles];
    })
    .end()
    .then(function (result){
        let colors = result[0];
        let names = result[1];

        let arrHex = [];
        colors.forEach((val)=>{
            // let a = convert.rgb.hex(val);  
            let a = val.replace('rgb(','');
            a = a.replace(')','');
            let arr = a.split(' ');
            let tmp = [];

            arr.forEach((b)=>{
              tmp.push(b.replace(',',''));
            });

            let hex = '#' + convert.rgb.hex(tmp);  
            arrHex.push(hex);
        });

        let arrPallets = [];

        names.forEach((name)=>{
            let tmp = {};
            tmp.key = 'data';
            tmp.array = [];
            tmp.key1 = 'name';
            tmp.string = name;
            for(let i = 0; i < 5; i++){
                tmp['array'].push(arrHex[0]);
                arrHex.shift();
            }
            arrPallets.push(tmp);
        });
        exportJson(arrPallets);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

    function exportJson(arr){
        let json = {};
        let n = arr.length;
        for(let i = 0; i < n; i++){
            json[i] = arr[i];
        }
        let jsonString = JSON.stringify(json); 
        fs.writeFile('data2.json', jsonString, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }