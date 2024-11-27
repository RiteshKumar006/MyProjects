

class Http {
    constructor(uri){
        this.uri = uri
        this.xhr = new XMLHttpRequest()
    }
    
    static serialize(obj){
        console.log("10",obj)
        let qs = [];
        for(let key in obj){
            qs = [...qs,`${encodeURIComponent(key)} = ${encodeURIComponent(obj[key])}`]
        }
        console.log(qs)
        return qs.join('&' )
    }

    get(qs){
        return new Response((resolve, reject) => {  
            console.log("control inside the get")
            this.xhr.open('GET', `${this.uri}/?${Http?.serialize(qs)}`,true)
            this.xhr.addEventListener('load', function () {
                // console.log("http", this.response)
                return resolve({status: this.statusText, response: this.response})
            })
            this.xhr.addEventListener('error', error => reject(error));
            this.xhr.send();
        })
    }
}

export default Http;