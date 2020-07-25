'use strict';

const got = require('got');

const host = 'demo-ap01-lecreuset.demandware.net';
const client_id = '575c31c4-1abd-47b2-8821-741640f87c51';
const client_pw = 'jek4BN2isK';
//const client_id = '5eb5ce5c-cafa-46d5-b00e-ee408dd1c12e';
//const client_pw = 'lcjp2020pos';

//const host = 'production-ap01-lecreuset.demandware.net';
//const client_id = '113389d1-18d9-4f7e-a701-04169341c937';
//const client_pw = '^69Z$2+79m3D';

let buff = new Buffer.from(client_id + ':' + client_pw);
let encoded = buff.toString('base64');

let url_oauth2 = 'https://account.demandware.com/dwsso/oauth2/access_token';
let url_libraries = 'https://' + host + '/s/-/dw/data/v20_3';
//url_libraries += '/libraries/lecreuset-apac/folders/root/content';
//url_libraries += '?start=0&count=10';
url_libraries += '/libraries/lecreuset-apac/folders/quicknews/content';
//url_libraries += '/customer_lists/lcapac-customer-list/customers/00003502';

(async () => {
  
  try {
    
    let {body} = await got.post(url_oauth2, {
      headers: {
        'Authorization': 'Basic ' + encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials',
      responseType: 'json'
    });
    console.dir(body);
    
    let response = await got.get(url_libraries, {
      headers: {
        'Authorization': 'Bearer ' + body.access_token,
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });
    console.dir(response.body);
    
  } catch (err) {
    console.dir(err);
  }
  
})();
