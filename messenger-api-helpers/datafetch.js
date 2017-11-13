import request from 'request';

import UserStore from '../stores/user-store';


const fetchUserName = (userPSID) => {
    const usersPublicProfile = 'https://graph.facebook.com/v2.6/' + userPSID + '?fields=first_name,last_name&access_token=&access_token=' + process.env.PAGE_ACCESS_TOKEN;
    request({
        url: usersPublicProfile,
        json: true // parse
    }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                setUserName(userPSID, body.first_name, body.last_name);
                console.log(body)
                return body.first_name
            }
        });
};

const setUserName = (id, firstName, lastName) => {
    const user = UserStore.get(id) || UserStore.insert({id: id});
    console.log("USER")
    user.setUserName(firstName, lastName);
    console.log(user)

}

export default {
  fetchUserName,
  setUserName,
};
