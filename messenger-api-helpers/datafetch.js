import rp from 'request-promise';

import UserStore from '../stores/user-store';


const fetchUserName = (userPSID) => {
    const usersPublicProfile = 'https://graph.facebook.com/v2.6/' + userPSID + '?fields=first_name,last_name&access_token=&access_token=' + process.env.PAGE_ACCESS_TOKEN;
    var options = {
        url: usersPublicProfile,
        json: true, // parse
        resolveWithFullResponse: true
    }

    return rp(options).then(function (response) {
        console.log("RESPONSE")
        console.log(response)
        if (response.statusCode === 200) {
            setUserName(response, response.first_name, response.last_name);
            return body.first_name
        }
    }).catch(function (error) {

    });

    // , function (error, response, body) {
    //     return new Promise((resolve, reject) => {
    //             if (!error && response.statusCode === 200) {
    //                 setUserName(userPSID, body.first_name, body.last_name);
    //                 console.log(body)
    //                 resolve(body.first_name);
    //             } else {
    //                 reject(error);
    //             }
    //           });
    //     });
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
