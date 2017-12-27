var request = require("request")
var _ = require('lodash/core');
var url = "https://dash.swarthmore.edu/dining_json"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        // console.log(body['sharples']) // Print the json response
        var sharplesDayMenu = body['sharples']
        console.log(sharplesDayMenu)
        // mealItems = []
        // var meals = _.values(sharplesDayMenu);
        // // sharplesDayMenu.forEach(function(meal) {
        // //     // console.log(element);
        // //     mealItems.push(meal.description.split(/\r?\n/))
        // //
        // var items = _.map(meals, 'description')
        // });

        if (sharplesDayMenu) {

            var lunch = sharplesDayMenu[1]['description'].split(/\r?\n/)
            var dinner = sharplesDayMenu[2]['description'].split(/\r?\n/)
            // console.log(lunch)
            var splitItems = []
            // var validItems = _.map(items, isItem)
            // lunch.forEach(function(item) {
            //     splitItems.push(item.split(/\r?\n/))
            //     // if (isItem(item)) {
            //     //
            //     // }
            //     // console.log(item)
            // });
            var cleanedLunch = _.compact(_.map(_.flattenDeep(lunch), isItem))
            var cleanedDinner = _.compact(_.map(_.flattenDeep(dinner), isItem))
            var menu = {'Lunch': cleanedLunch, 'Dinner': cleanedDinner}
            console.log(menu)
        }
    }
})

function cleanMenu(menu) {
    return _.compact(_.compact(_.map(_.flattenDeep(menu), isMenu)))
}

function replaceApostrophies(item) {
    return item.replace(/\'/, '')
}

function replaceAmps(item) {
    return item.replace(/&amp;/g, '&')
}

function cleanTabs(item) {
    return item.replace(/\t/g, '')
}
function isItem(item) {
    switch (item) {
        case '':
            return null;
        case 'Served by the Fireplace':
            return null;
        case '(v) Indicates Vegan Entree&nbsp;- Items Subject to Change, Please Consult Menu Information Sheet on Serving Line':
            return null;
        case 'Please Note the Main Servery is Closed at this Time':
            return null
        default:
            return replaceApostrophies(replaceAmps(cleanTabs(item)))
    }
}
