import rp from 'request-promise';
import menu_scrape from './menu_scrape'
import Menu from '../models/menu';
import MenuStore from '../stores/menu-store';
import dateString from '../utils/date-string-format';

const fetchUserName = (userPSID) => {
    const usersPublicProfile = 'https://graph.facebook.com/v2.6/' + userPSID + '?fields=first_name,last_name&access_token=&access_token=' + process.env.PAGE_ACCESS_TOKEN;
    var options = {
        url: usersPublicProfile,
        json: true, // parse
    }

    return rp(options).then(function(response) {
        if (response) {
            return nameReturnFunction(response);
        }
    }).then(function({first_name, last_name}) {
            console.log(`in first then ${first_name}, ${last_name}`);
            return {first_name, last_name};
        },
        function(error) {
            console.log('ERROR RETRIEVING NAME');
            return {}
    });
};

const nameReturnFunction = (response) => {
    const userName = {first_name:response.first_name, last_name: response.last_name}
    return userName; // return an object
}

const menuReturnFunction = (body) => {
    const sharplesDayMenu = body['sharples']
    var todaysMenu = [];
    if (sharplesDayMenu.length != 0) {
        sharplesDayMenu.forEach(function(meal) {
            var shortTime = meal['short_time']
            var menuType = dateString.mealFromDateTime(meal['startdate'])
            var date = dateString.dateFromDateTime(meal['startdate'])
            var title = meal['title']
            var menuId = (date + menuType).toLowerCase()
            var menuItems = menu_scrape.cleanMenu(meal['description'].split(/\r?\n/))
            todaysMenu.push(new Menu({id: menuId, dateOfMenu:date, shortTime, menuType: menuType, menuItems}))
        })
    }
    return todaysMenu;
}

const fetchCurrentMenu = () => {
    var url = "https://dash.swarthmore.edu/dining_json"
    var options = {
        url: url,
        json: true, // parse
    }
    return rp(options).then(function (body) {
        if (body) {
            return menuReturnFunction(body);
        }
    },
    function(error) {
        console.log('ERROR RETRIEVING MENU 1');
        return {}
    })
}

export default {
  fetchUserName,
  fetchCurrentMenu,
};
