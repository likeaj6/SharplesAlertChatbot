import rp from 'request-promise';
import {cleanMenu} from './menu_scrape'
import Menu from '../models/menu';
import {SetMenu} from '../stores/menu-store';
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
            console.log(`in first then ${res.url}, ${myName}`);
            return {first_name, last_name};// ADD THIS!!
        },
        function(error) {
            return {}
    });
};

const nameReturnFunction = (response) => {
    const userName = {first_name:response.first_name, last_name: response.last_name}
    return userName; // return an object
}

const fetchCurrentMenu = () => {
    var url = "https://dash.swarthmore.edu/dining_json"
    var options = {
        url: url,
        json: true, // parse
    }
    return rp(options).then(function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const sharplesDayMenu = body['sharples']
            if (sharplesDayMenu) {
                const meal = currentMealFromDateTime
                switch (currentMealFromDateTime) {
                    case 'Lunch':
                        var lunch = sharplesDayMenu[1]['description'].split(/\r?\n/)
                        lunch = cleanMenu(lunch)
                        break;
                    case 'Dinner':
                        var dinner = sharplesDayMenu[2]['description'].split(/\r?\n/)
                        dinner = cleanMenu(dinner)
                        break;
                    default:
                        break;
                }
                setMenu(new Menu({id: ""+currentDate+currentMealFromDateTime.toLowerCase(), currentDate, currentMealFromDateTime, lunch}))
            }
        }
    });
}

export default {
  fetchUserName,
  fetchCurrentMenu,
};
