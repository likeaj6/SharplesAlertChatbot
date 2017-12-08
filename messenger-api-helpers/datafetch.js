import rp from 'request-promise';

import UserStore from '../stores/user-store';
import {currentDate, currentMealFromDateTime} from '../utils/date-string-format';

const fetchUserName = (userPSID) => {
    const usersPublicProfile = 'https://graph.facebook.com/v2.6/' + userPSID + '?fields=first_name,last_name&access_token=&access_token=' + process.env.PAGE_ACCESS_TOKEN;
    var options = {
        url: usersPublicProfile,
        json: true, // parse
    }

    return rp(options);
};

const fetchCurrentMenu = () => {
    // const currentMealFromDateTime
    // switch (currentMealFromDateTime) {
    //     case 'Lunch':
    //
    //         break;
    //     case 'Dinner':
    //         break;
    //     default:
    //         break;
    // }
}

export default {
  fetchUserName,
  fetchCurrentMenu,
};
