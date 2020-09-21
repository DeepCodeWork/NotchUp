import {API, EMAIL_API} from '../../config/config';

export const getCourseInfo = () => {

    console.log(API)
    return fetch(`${API}`,{
        method:"GET",
        mode:'cors'
    })
        .then(res => {
            return res.json();
        }).catch(err => console.log(err))
}

export const sendMail = (body) => {
    console.log(body)
    return fetch(EMAIL_API, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => {
            return res.json();
        }).catch(err =>  0);
}