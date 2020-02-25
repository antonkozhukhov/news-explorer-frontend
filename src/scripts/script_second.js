const articleContainer = document.querySelector('.table');

const menuName = document.querySelector('.header__name');
const menuAuth = document.querySelector('.header__auth');


class Api {
  constructor(options) {
    this.baseUrl = options['baseUrl'];
    this.headers = options['headers'];
  }
getMyArticles(){
  return fetch('https://www.api.news-explorer.fun/articles/me', {
  method: 'GET',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
},
  })

  .then(res => {
    if (res.ok) {
     return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}

deleteArticle(id){
  return fetch(`https://www.api.news-explorer.fun/articles/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
},
  })
  .then(res => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}
getMe(){
  return fetch('https://www.api.news-explorer.fun/users/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
},
  })
  .then(res => {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Ошибка2: ${res.status}`);
  })
      .catch((err) => {
    console.log(err);
  });
}

}

const api = new Api({
  baseUrl: 'https://www.api.news-explorer.fun',
  headers: {
    'Content-Type': 'application/json'
  }
});
api.getMe()
.then(res=>{
  if(res.name){
    menuName.textContent = `${res.name}`
    document.querySelector('.search-menu__tittle_saved').textContent = `${res.name}`+' у вас'}
    else window.Location.href = '../index.html'
})
api.getMyArticles()
.then(res=>{
  console.log(res.length);
  console.log(numberOfArticles(res.length));
  document.querySelector('#number-of-articles').textContent = numberOfArticles(res.length);})



class Article{
  constructor(article){
    this.articleElement = this.createarticle(article);
    this.articleElement.querySelector('.article__icon-save_saved').addEventListener('click', function( event){
      event.stopImmediatePropagation();
      event.preventDefault();
      const card = event.target.parentElement;
      card.parentElement.removeChild(card);
      api.deleteArticle(article._id)
        })
  }
  createarticle(article){
    const article1 = document.createElement('a');  /*создание элементов карточки*/
    article1.classList.add('article');
    article1.setAttribute('href', article.link);
    article1.setAttribute('target', '_blank');

    const div1 = document.createElement('div');
    div1.classList.add('article__pic');
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article__title');
    articleTitle.textContent =  article.title;
    const articleKeyword = document.createElement('h3');
    articleKeyword.classList.add('article__icon-name');
    articleKeyword.textContent =  article.keyword;

    const articleImg = document.createElement('img');
    articleImg.classList.add('article__img');
    articleImg.setAttribute('src', article.image);

    const articleIconSave = document.createElement('div');
    articleIconSave.classList.add('article__icon-save');
    articleIconSave.classList.add('article__icon-save_saved');

     const articleDate = document.createElement('p');
     articleDate.classList.add('article__date');
     articleDate.textContent = article.date;

     const articleContent = document.createElement('p');
     articleContent.classList.add('article__content');
     articleContent.textContent =  article.text;

     const articleSource = document.createElement('p');
     articleSource.classList.add('article__source');
     articleSource.textContent =  article.source;

     div1.appendChild(articleImg);
    article1.appendChild(articleIconSave);
    article1.appendChild(div1);
    article1.appendChild(articleKeyword);
    article1.appendChild(articleDate);
    article1.appendChild(articleTitle);
    article1.appendChild(articleContent);
    article1.appendChild(articleSource);
    return article1;
  }

}
class ArticleList{
  constructor(container, initialArticles){
    this.container = container;
    this.initialArticles = initialArticles;
    this.render(initialArticles);
  }

  addArticle(article){
      const {articleElement} = new Article(article);
      this.container.appendChild(articleElement);
  }
  render(initialArticles){
          initialArticles.forEach((article) => this.addArticle(article));
  }
}
let articleList;

let myArticles = [];
function count(item, massive){
  let numbItem = 0;
  for (let i=0; i<massive.length; i++){
    if(massive[i].keyword == item.keyword){ numbItem = numbItem+1;}
    else(numbItem = numbItem)
  }
  return numbItem;
}
api.getMyArticles()
.then(res=>{
  articleList = new ArticleList(articleContainer, res.sort(function(a,b){return count(b,res)-count(a,res);
  }))
return Array.from(new Set(res.sort(function(a,b){return count(b,res)-count(a,res);}).map(function(item){return item.keyword;})))})
.then( res=>{keyWordsShow(res) })

function keyWordsShow(keywords){
  if (keywords.length > 3){
    document.querySelector('#first-bold').textContent = `${keywords[0]}`+', '+`${keywords[1]}`;
    document.querySelector('#second-bold').textContent = `${keywords.length-2}`+' другим';
    document.querySelector('#and').textContent = ' и';
  }
  if (keywords.length == 3){
    document.querySelector('#first-bold').textContent = `${keywords[0]}`+', '+`${keywords[1]}`;
    document.querySelector('#second-bold').textContent = `${keywords[2]}`;
    document.querySelector('#and').textContent = 'и';
  }
  if (keywords.length == 2){
    document.querySelector('#first-bold').textContent = `${keywords[0]}`;
    document.querySelector('#second-bold').textContent = `${keywords[1]}`;
    document.querySelector('#and').textContent = 'и';
  }
  if (keywords.length == 1){
    document.querySelector('#first-bold').textContent = `${keywords[0]}`;
    document.querySelector('#second-bold').textContent = ``;
    document.querySelector('#and').textContent = '';
  }
  if (keywords.length == 1){
    document.querySelector('#first-bold').textContent = 'Ваш список пуст';
    document.querySelector('#second-bold').textContent = ``;
    document.querySelector('#and').textContent = '';
  }
}
function numberOfArticles(numb){
  if (numb<5 && numb>20){
  switch(numb%10){
    case 1:
      return `${numb}`+' сохраненная статья';
    case 2:
      return `${numb}`+' сохраненных статьи';
    case 3:
      return `${numb}`+' сохраненных статьи';
    case 4:
      return `${numb}`+' сохраненных статьи';
   default:
    return `${numb}`+' сохраненных статей';
  }
}
else return `${numb}`+' сохраненных статей'
}
