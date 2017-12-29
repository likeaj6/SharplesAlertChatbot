var request = require("request")
var _ = require('lodash/core');

function getMonthMenu() {
    var url = "https://dash.swarthmore.edu/calendarapi/1768/month.json"
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            let monthCalendar = _.map(body['calData'])
            // _.pick(monthCalendar, hasMenu())
            let filteredCalendar =          monthCalendar.filter(v => v.events.length != 0)

            var dailyCalendar = {}

            var result = filteredCalendar.map(v => v.events);

            // var datedResult = result.map(v => v.map(s => s.body.split(/\r?\n/)))

            // console.log(_.flattenDeep(datedResult, cleanItem))

            // console.log(result)

            _.forEach(result, function(value) {
                separateDayMenu(value)
            });



            // console.log(filteredCalendar.forEach(date) => {
            //     dailyCalendar.set('': date.events)
            // });
            // let dayMenus = filteredCalendar.(v => v.events != 0)


        }
    })
}

getMonthMenu()


function hasMenu(res, v, k) {
      if (v) res[k] = v;
}

function separateDayMenu(dayMenu) {
    if (dayMenu.length != 0) {

        var lunch = dayMenu[1]['body'].split(/\r?\n/)
        var dinner = []
        if (dayMenu.length == 3) {
            dinner = dayMenu[2]['body'].split(/\r?\n/)
        }
        var splitItems = []

        var cleanedLunch = _.compact(_.map(_.flattenDeep(lunch), isItem))
        var cleanedDinner = _.compact(_.map(_.flattenDeep(dinner), isItem))
        if (cleanedLunch.length != 0 && cleanedDinner.length != 0) {
            var menu = {'Lunch': cleanedLunch, 'Dinner': cleanedDinner}
            console.log(menu)
        }
    }
}

function getDayMenu() {
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
            if (sharplesDayMenu.length != 0) {
                var lunch = sharplesDayMenu[1]['description'].split(/\r?\n/)
                var dinner = []
                if (sharplesDayMenu.length == 3) {
                    dinner = sharplesDayMenu[2]['description'].split(/\r?\n/)
                }
                var splitItems = []

                var cleanedLunch = _.compact(_.map(_.flattenDeep(lunch), isItem))
                var cleanedDinner = _.compact(_.map(_.flattenDeep(dinner), isItem))

                if (cleanedLunch.length != 0 && cleanedDinner.length != 0) {
                    var menu = {'Lunch': cleanedLunch, 'Dinner': cleanedDinner}
                    console.log(menu)
                }
            }
        }
    })
}

function cleanMenu(menu) {
    return _.compact(_.map(_.flattenDeep(dinner), isItem))
}
//
// function replaceHtml(item) {
//     return item.replace(/<[^>]*>/g, '')
// }

function fixApostrophies(item) {
    return item.replace(/\'/, '′')
}
//
function fixNBSP(item) {
    return item.replace(/&nbsp;/g, ' ')

}
//
function fixAmps(item) {
    return item.replace(/&amp;/g, '&')
}

var tabsRegex = /\t/g

var htmlRegex = /<[^>]*>/g

function cleanItem(item) {
    return fixApostrophies(fixNBSP(fixAmps(item)).replace(new RegExp(tabsRegex.source + "|" + htmlRegex.source, "g"), ''))
}

function isItem(item) {
    let cleaned = cleanItem(item)
    switch (cleaned) {
        case '':
            return null;
        case 'Served by the Fireplace':
            return null;
        case '(v) Indicates Vegan Entree - Items Subject to Change, Please Consult Menu Information Sheet on Serving Line':
            return null;
        case 'Please Note the Main Servery is Closed at this Time':
            return null
        default:
            return cleaned;
            // return replaceHtml(replaceApostrophies(replaceNBSP(replaceAmps((cleanTabs(item))))))
    }
}
