const token = 'b2bd7464-a835-4f04-b8ac-13db5545ebd0';
 export class Api {
    constructor(options) {
      this.baseUrl = options['baseUrl'];
      this.headers = options['headers'];
      
    }
getMe(){
    return fetch(`${this.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
        authorization: `${token}`,       
        'Content-Type': 'application/json'
    },
    })
    
    .then(res => {
      if (res.ok) {
       return res.json();
      }      
      return Promise.reject(`Ошибка1: ${res.status}`);
    })
        .catch((err) => {
      console.log(err); 
    });      
}


getArticles(){
    fetch(`${this.baseUrl}/articles`, {
    method: 'GET',
    headers: {
      authorization: `${token}`,
        'Content-Type': 'application/json'
    },
    })

   .then(res => {          
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); 
    })

}
postArticle(word, article){
  return fetch(`${this.baseUrl}/articles/`, {
  method: 'PATCH',
  headers: {
    authorization: `${token}`,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      keyword: word,
      title: article.title,
      text: article.content,
      date: article.date,
      source:article.source,
      link:article.content,
      image:article.content,      
  }) 
})

 .then(res => {          
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); 
  })

}
createUser(name, email, password) {
  return  fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
    headers: {
      authorization: `${token}`
    },
    body: JSON.stringify({
      name:name,
       email: email,
        password: password,      
    }) 

  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, переходим в catch
      return Promise.reject(`Ошибка: ${res.status}`);
    })   
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });  
    }  


deleteCard(_id){
        fetch(`${this.baseUrl}/cards/${_id}`, {
          method: 'DELETE',
      headers: {
        authorization: `${token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
      })
          
      .catch((err) => {
        console.log(err); 
      });
}
putLike(_id){
          fetch(`${this.baseUrl}/cards/like/${_id}`, {
          method: 'PUT',
      headers: {
        authorization: `${token}`
      }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        
        return Promise.reject(`Ошибка: ${res.status}`);
      })
          
      .catch((err) => {
        console.log(err); 
      });
 }
deleteLike(_id){
          fetch(`${this.baseUrl}/cards/like/${_id}`, {
          method: 'DELETE',
        headers: {
        authorization: `${token}`
        }
        })
        .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
        })
          
        .catch((err) => {
        console.log(err); 
        });
}
getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
        headers: {
          authorization: `${token}`
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
         return Promise.reject(`Ошибка: ${res.status}`);
        })
       
        .catch((err) => {
          console.log(err); 
        });  
  }  
}