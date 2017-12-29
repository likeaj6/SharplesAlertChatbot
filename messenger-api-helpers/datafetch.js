import rp from 'request-promise';
import {cleanMenu} from './menu_scrape'
import Menu from '../models/menu';
import MenuStore from '../stores/menu-store';
import {currentDate, currentMealFromDateTime} from '../utils/date-string-format';

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

const menuReturnFunction = (error, response, body) => {
    const sharplesDayMenu = body['sharples']
    var menu;
    if (sharplesDayMenu.length != 0) {
        switch (currentMealFromDateTime) {
            case 'Lunch':
                var lunch = sharplesDayMenu[1]['description'].split(/\r?\n/)
                menu = cleanMenu(lunch)
                break;
            case 'Dinner':
                var dinner = sharplesDayMenu[2]['description'].split(/\r?\n/)
                menu = cleanMenu(dinner)
                break;
            default:
                break;
        }
        menu = new Menu({id: ""+currentDate+currentMealFromDateTime.toLowerCase(), currentDate, currentMealFromDateTime, lunch})
        
    }
    return menu;
}

const fetchCurrentMenu = () => {
    var url = "https://dash.swarthmore.edu/dining_json"
    var options = {
        url: url,
        json: true, // parse
    }
    return rp(options).then(function (error, response, body) {
        if (!error && response.statusCode === 200) {
            return menuReturnFunction(error, response, body);
        } else {
            console.log('ERROR RETRIEVING MENU 1');
            return {}
        }
    }).then(function(menu) {
            console.log(`in first then ${menu}`);
            return menu;// ADD THIS!!
        },
        function(error) {
            console.log('ERROR RETRIEVING MENU 2');
            return {}
    });
}

export default {
  fetchUserName,
  fetchCurrentMenu,
};
