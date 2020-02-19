const articleContainer = document.querySelector('.table');
const registrationButton = document.querySelector('.registration-button');
const enterButton = document.querySelector('.enter-button');
const searchButton = document.querySelector('.search-menu__button');
const showmoreButton = document.querySelector('.show-more');

const registrationForm = document.forms.registration;
const registrationName = registrationForm.elements.name;
const registrationEmail = registrationForm.elements.email;
const registrationPassword = registrationForm.elements.password;
const menuName = document.querySelector('.header__name');
const menuAuth = document.querySelector('.header__auth');
const enterForm = document.forms.enter;
const enterEmail = enterForm.elements.email;
const enterPassword = enterForm.elements.password;
const searchForm = document.forms.search;
const searchName = searchForm.elements.name;
const formEnter = document.querySelector('.form__enter');
const formRegistration = document.querySelector('.form__registration');
const formRegistrationOk = document.querySelector('.form__registration-ok');

class Api {
  constructor(options) {
    this.baseUrl = options['baseUrl'];
    this.headers = options['headers'];

  }


  signup(name, email, password){
    return fetch('http://www.api.news-explorer.fun/signup', {
    method: 'POST',
    headers: {

      'Content-Type': 'application/json'
  },

    body: JSON.stringify({
        name: name,
        email: email,
        password: password

      })
    })

    .then(res => {
      console.log(res)
      if (res.ok) {
       return res.json();
      }
      console.log(res)
      const { message } = res.json()
      return Promise.reject(`Ошибка1: ${message}`);
    })
        .catch((err) => {
      console.log(err);
    });
}
signin(email, password){
  return fetch('http://www.api.news-explorer.fun/signin', {
  credentials: 'include',
  method: 'POST',
  headers: {

    'Content-Type': 'application/json'
},

  body: JSON.stringify({
      email: email,
      password: password

    })
  })

  .then(res => {
    if (res.ok) {
     return res;
    }
    return Promise.reject(`Ошибка1: ${res.status}`);
  })

      .catch((err) => {
    console.log(err);
  });
}


}
class NewsApi {
  constructor(options) {
    this.baseUrl = options['baseUrl'];
    this.headers = options['headers'];

  }
getNews(url){
  return fetch('https://newsapi.org/v2/everything?' +
  `q=${url}&` +
  'from=2020-02-12&' +
  'sortBy=popularity&' +
  'language=ru&' +
   'pageSize=100&'+'apiKey=3811c0c95b1241fc8a93d4e6bd879b2d', {
  method: 'GET',
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
}
const api = new Api({
  baseUrl: 'http://api.news-explorer.fun',
  headers: {
    'Content-Type': 'application/json'
  }
});

const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything?' +
  'q=q&' +
  'from=2020-02-12&' +
  'sortBy=popularity&' +
  'language=ru&' +
   'pageSize=100&'+'apiKey=3811c0c95b1241fc8a93d4e6bd879b2d',
});
searchForm.addEventListener('submit', function(){
  event.preventDefault();
const searchForm1 = document.forms.search;
const searchName1 = searchForm1.elements.name;
console.log(searchName1.value)
newsApi.getNews(searchName1.value).then((res)=>{console.log(res)});
})




class Popup{
  constructor(popupElement){
    this.popupElement = popupElement;


  }
  open(){
    document.querySelector('.popup-forms').classList.remove('display-none' );
    this.popupElement.classList.remove('display-none');
  }
  close(){
    document.querySelector('.popup-forms').classList.add('display-none' );
    this.popupElement.classList.add('display-none');
    document.querySelector('.form__error-valid').textContent = '';

    this.popupElement.reset(); // убираем сообщение об ошибке у второго ввода
  }
}

class Validate{
  constructor(button, popuptype){
    this.button = button;
    this.popuptype = popuptype;
  }
  buttonIsValid(){
    this.button.removeAttribute('disabled');
    this.button.classList.add('button__isvalid');
  }
  buttonIsNotValid(){
    this.button.setAttribute('disabled', true);
    this.button.classList.remove('button__isvalid');
  }


  handleValidate(event){
    this.buttonValidate();
      if (event.target.value.length === 0){
        this.popuptype.querySelector(`#error-${event.target.name}`).classList.remove('display-none');
        return false
      }
      if (event.target.value.length < 2 || event.target.value.length > 30){
        this.popuptype.querySelector(`#error-${event.target.name}`).classList.remove('display-none');
        this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Должно быть от 2 до 30 символов';
        return false}

      else {

        this.popuptype.querySelector(`#error-${event.target.name}`).textContent = '';
         return true;
      }
  }
}
 class ValidateEnter extends Validate{
  buttonValidate(){  //описываем специфичное для конкретного попапа поведение
    const form = document.forms.enter;
    const email = form.elements.email;
    const password = form.elements.password;
    if (email.value.length > 1 && email.value.length < 30 && password.value.length > 1 && password.value.length < 30){
      this.buttonIsValid();
      return true;
    }
    else {
    this.buttonIsNotValid();
    return false;
    }
  }
}
 class ValidateRegistration extends Validate{
  buttonValidate(){
    const form = document.forms.registration;
    const name = form.elements.name;
    const email = form.elements.email;
    const password = form.elements.password;
    console.log(name.value)
    if (name.value.length > 1 && name.value.length < 30 && email.value.length > 1 && email.value.length < 30 && password.value.length > 1 && password.value.length < 30 ){
    this.buttonIsValid();
    return true;
    }
    else {

      this.buttonIsNotValid();
      return false;
    }
  }
}
const enterPopup = new Popup(formEnter);
const registrationPopup = new Popup(formRegistration);
const registrationOkPopup = new Popup (formRegistrationOk);
const registrationValidate = new ValidateRegistration(registrationButton, formRegistration);
const enterValidate = new ValidateEnter(enterButton, formEnter);

document.querySelector('.enter-close').addEventListener('click', function() {
  enterPopup.close();
  enterValidate.buttonIsNotValid();});
document.querySelector('.reg-close').addEventListener('click', function() {
  registrationPopup.close();
  registrationValidate.buttonIsNotValid();});


class Article{
  constructor(article, saved){
    this.saved =saved;
    this.articleElement = this.createarticle(article, saved);
    this.articleElement.querySelector('.article__icon-save').addEventListener('click', this.save);

  }
  createarticle(templateArticle, saved){

    const article = document.createElement('div');  /*создание элементов карточки*/
    article.classList.add('article');

    const div1 = document.createElement('div');
    div1.classList.add('article__pic');
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article__title');
    articleTitle.textContent = templateArticle.title;

    const articleImg = document.createElement('img');
    articleImg.classList.add('article__img');
    articleImg.setAttribute('src',templateArticle.urlToImage);  /*установка названия карточки*/

    const articleIconSave = document.createElement('div');
    articleIconSave.classList.add('article__icon-save');
     /*установка background карточки*/

     const articleDate = document.createElement('p');
     articleDate.classList.add('article__date');
     articleDate.textContent = date(templateArticle.publishedAt);

     const articleContent = document.createElement('p');
     articleContent.classList.add('article__content');
     articleContent.textContent = templateArticle.description;

     const articleSource = document.createElement('p');
     articleSource.classList.add('article__source');
     articleSource.textContent = templateArticle.source.name;


     div1.appendChild(articleImg);
    article.appendChild(articleIconSave);
    article.appendChild(div1);

    article.appendChild(articleDate);
    article.appendChild(articleTitle);
    article.appendChild(articleContent);
    article.appendChild(articleSource);



    return article;
  }
  save(keyword, article){
    if (!this.saved){
      api.postCard(keyword, article);
      this.articleElement.querySelector('.article__icon-save').classList.add('article__icon-save_active')
    }
    else{
       api.deleteCard(this._id)
    this.articleElement.querySelector('.article__icon-save').classList.remove('article__icon-save_active');
    }
  }
}
class ArticleList{
  constructor(container, initialArticles){
    this.container = container;
    this.initialArticles = initialArticles;
    this.render(initialArticles);
  }

  addArticle(article, saved){
      const {articleElement} = new Article(article, saved);
      this.container.appendChild(articleElement);
  }
  render(initialArticles){
          initialArticles.forEach((article) => this.addArticle(article, false))
  }
}
let articleList;
let articles = [];
let lengthArticles;
let numb;

function date(str){
  function month(n){
  switch (n) {
    case 1:
      return 'января';
    case 2:
      return 'февраля';
    case 3:
      return 'марта';
    case 4:
      return 'апреля';
    case 5:
      return 'мая';
    case 6:
      return 'июня';
    case 7:
      return 'июля';
    case 8:
      return 'августа';
    case 9:
      return 'сентября';
    case 10:
      return 'октября';
    case 11:
      return 'ноября';
    case 12:
      return 'декабря';
    default:
      alert( "Нет таких значений" );
  }
}
  return(String(Number(str.substr(8,2))) + ' '+ month(Number(str.substr(5,2)))+', ' + str.substr(0,4));
}

searchForm.addEventListener('submit', function(){
  numb = 0;
  event.preventDefault();
  articles= [];

  articleContainer.innerHTML = '';
  document.querySelector('.results').classList.remove('display-none')
  document.querySelector('.nothing-not-found').classList.add('display-none');
  document.querySelector('.show-more').classList.add('display-none');
  document.querySelector('.finding').classList.remove('display-none');
const searchForm1 = document.forms.search;
const searchName1 = searchForm1.elements.name;

newsApi.getNews(searchName1.value).then((res)=>{
   document.querySelector('.finding').classList.add('display-none');
  if (res.articles.length === 0){ document.querySelector('.nothing-not-found').classList.remove('display-none') }
  if (res.articles.length!=0 && res.articles.length<=3){
  articleList = new ArticleList(articleContainer, res.articles);
  }
  if (res.articles.length > 3){
         for (let i=0;i<3; i++ ){
      articleContainer.appendChild((new Article(res.articles[i],false)).createarticle(res.articles[i],false))
      }
      document.querySelector('.show-more').classList.remove('display-none')
      articles = res.articles;

    }

})
numb = numb+3;
})
showmoreButton.addEventListener('click', function() {
  lengthArticles = articles.length;
  console.log(lengthArticles,numb)
  if (lengthArticles - numb > 3){
    for (let i = numb;i<numb+3; i++ ){
      articleContainer.appendChild((new Article(articles[i],false)).createarticle(articles[i],false))
      }
      numb = numb+3;
  }
  else {
     document.querySelector('.show-more').classList.add('display-none')
    for (let i = numb;i <= lengthArticles; i++ ){
    articleContainer.appendChild((new Article(articles[i],false)).createarticle(articles[i],false))
    }
  }
})






document.querySelector('.header__auth').addEventListener('click', function() {
  event.preventDefault();
  registrationPopup.open();
  registrationValidate.buttonIsNotValid();
});
/*document.querySelector('.form__close').addEventListener('click', function() {
 / registrationPopup.close();
  registrationValidate.buttonIsNotValid();
});*/
registrationName.addEventListener('input',function(){
  registrationValidate.handleValidate(event);
});
registrationEmail.addEventListener('input',function(){
  registrationValidate.handleValidate(event);
});
registrationPassword.addEventListener('input',function(){
  registrationValidate.handleValidate(event);
});
document.querySelector('.or-registration__link_enter').addEventListener('click', function() {
  event.preventDefault();
  registrationPopup.close();
  enterPopup.open();

});


enterEmail.addEventListener('input',function(){
  enterValidate.handleValidate(event);
});
enterPassword.addEventListener('input',function(){
  enterValidate.handleValidate(event);
});

console.log(registrationName.value)
registrationForm.addEventListener('submit', function(){
  event.preventDefault();
  const registrationForm1 = document.forms.registration;
const registrationName1 = registrationForm1.elements.name;
const registrationEmail1 = registrationForm1.elements.email;
const registrationPassword1 = registrationForm1.elements.password;

  console.log(registrationName1,registrationEmail1, registrationPassword1);
  api.signup(registrationName1.value, registrationEmail1.value, registrationPassword1.value).then((res)=>{console.log(res)});
})
enterForm.addEventListener('submit', function(){
  event.preventDefault();
  const enterForm1 = document.forms.enter;
const enterEmail1 = enterForm1.elements.email;
const enterPassword1 = enterForm1.elements.password;

  api.signin( enterEmail1.value, enterPassword1.value).then((res)=>{console.log(res); localStorage.setItem('to1ken', res.token);});
})




document.querySelector('.header__menu-mobile-img').addEventListener('click', function() {
  document.querySelector('.body-mobile').classList.remove('display-none')
});
document.querySelector('#exit').addEventListener('click', function() {
  document.querySelector('.body-mobile').classList.add('display-none')
});
/*
popupOpenProfileButton.addEventListener('click', function() {
  popupProf.open();
  const form = document.forms.profile;
  const name = form.elements.name;
  const job = form.elements.job;
  name.value = authorName.textContent;
  job.value = authorJob.textContent;
  profileValidate.buttonValidate();
});
document.querySelector('.popup__close-profile').addEventListener('click', function() {
  popupProf.close();
  profileForm.reset();
});
document.querySelector('.user-info__photo').addEventListener('click', function() {
  popupAva.open();
});
document.querySelector('.popup__close-avatar').addEventListener('click', function() {
  popupAva.close();

});
document.querySelector('.popup__button_save_avatar').addEventListener('click', function() {
  event.preventDefault()
  const form = document.forms.avatar;
  const name = form.elements.avatarLink;
  api.patchAvatar(name.value).then(res=> {document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;});
  popupAva.close();

});
placeName.addEventListener('input',function(){
    placeValidate.handleValidate(event);
  });
placeLink.addEventListener('input', function(){
    placeValidate.handleValidate(event);
  });
profileAuthorName.addEventListener('input',function(){
    profileValidate.handleValidate(event);
  });
/*
const token = 'b2bd7464-a835-4f04-b8ac-13db5545ebd0';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'
const myID = 'ba779b70717b07ad9c49ec5f';
let cardList;
import { Api } from './fetchs';
import {CardList} from './cardlist';
import {Popup, ValidateProfile, ValidateNewCard} from './popupValidation';

export const api = new Api({
  baseUrl: `${serverUrl}`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
});
const enterPopup = new Popup(formEnter);
const registrationPopup = new Popup(formRegistration);
const registrationOkPopup = new Popup (formRegistrationOk);
const registrationValidate = new ValidateProfile(registrationButton, formRegistration);
const enterValidate = new ValidateNewCard(enterButton, formEnter);

document.querySelector('.header__auth').addEventListener('click', function(){
  document.querySelector('.popup-forms').classList.add('popup-is-opened');
});


api.getCards().then(cards =>{cardList = new CardList(cardContainer, cards)});
api.getProphile().then(res => {
      authorName.textContent = res.name;
      authorJob.textContent = res.about;
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
  })

function changeProfile(event){
    event.preventDefault();
    const form = document.forms.profile;
    const name = form.elements.name;
    const job = form.elements.job;
    authorName.textContent = name.value;
    authorJob.textContent = job.value;
    popupProf.close();
    console.log(profileAuthorName.value);
    api.patchProfile();
}

document.querySelector('.image_close_button').addEventListener('click', function(){
  document.querySelector('.image').classList.remove('image_open');
});
popupButton.addEventListener('click', function() {
  popupPlace.open();
});

document.querySelector('.popup__close').addEventListener('click', function() {
  popupPlace.close();
  placeForm.reset();
  placeValidate.buttonIsNotValid();
});

popupOpenProfileButton.addEventListener('click', function() {
  popupProf.open();
  const form = document.forms.profile;
  const name = form.elements.name;
  const job = form.elements.job;
  name.value = authorName.textContent;
  job.value = authorJob.textContent;
  profileValidate.buttonValidate();
});
document.querySelector('.popup__close-profile').addEventListener('click', function() {
  popupProf.close();
  profileForm.reset();
});
document.querySelector('.user-info__photo').addEventListener('click', function() {
  popupAva.open();
});
document.querySelector('.popup__close-avatar').addEventListener('click', function() {
  popupAva.close();

});
document.querySelector('.popup__button_save_avatar').addEventListener('click', function() {
  event.preventDefault()
  const form = document.forms.avatar;
  const name = form.elements.avatarLink;
  api.patchAvatar(name.value).then(res=> {document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;});
  popupAva.close();

});
placeName.addEventListener('input',function(){
    placeValidate.handleValidate(event);
  });
placeLink.addEventListener('input', function(){
    placeValidate.handleValidate(event);
  });
profileAuthorName.addEventListener('input',function(){
    profileValidate.handleValidate(event);
  });
profileAuthorJob.addEventListener('input', function(){
    profileValidate.handleValidate(event);
  });

placeForm.addEventListener('submit', function(){
  event.preventDefault()

  api.postPlace(placeName, placeLink).then((result) => {
              // Исправил
     cardList.addCard(result.name, result.link, 0,result._id, myID, true);
  });
  popupPlace.close();
  placeValidate.buttonIsNotValid();

});
profileForm.addEventListener('submit', changeProfile);*/

