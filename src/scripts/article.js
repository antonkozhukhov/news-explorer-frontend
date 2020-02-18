const myID = 'ba779b70717b07ad9c49ec5f';
import {api} from './script.js'

export class Article{
    constructor(article, saved){
      this.saved =saved;
      this.articleElement = this.createarticle(article, saved);       
      this.articleElement.querySelector('.article__icon-save').addEventListener('click', this.save);
            
    }
    createarticle(templateArticle, saved){
       
      const article = document.createElement('div');  /*создание элементов карточки*/
      article.classList.add('article');
      article.setAttribute('id', `${articleID}`)
    
      const articleTitle = document.createElement('h3');
      articleTitle.classList.add('article__title');
      articleTitle.textContent = templateArticle.title; 
      
      const articleImg = document.createElement('img');
      articleImg.classList.add('article__pic');
      articleImg.textContent = templateArticle.title;  /*установка названия карточки*/
    
      const articleIconSave = document.createElement('div');
      articleIconSave.classList.add('article__icon-save');
       /*установка background карточки*/
    
       const articleDate = document.createElement('p');
       articleDate.classList.add('article__date');
       articleDate.textContent = templateArticle.date;  

       const articleContent = document.createElement('p');
       articleContent.classList.add('article__content');
       articleContent.textContent = templateArticle.content;  

       const articleSource = document.createElement('p');
       articleSource.classList.add('article__source');
       articleSource.textContent = templateArticle.source;  
 
     
       
      article.appendChild(articleIconSave);
      article.appendChild(articleImg);
      article.appendChild(articleDate);
      article.appendChild(articleTitle);
      article.appendChild(articleContent);
      article.appendChild(articleSource);


    
      return article;
    }
    
    save(event){   
      console.log(event.target.classList.value)
      if (this.liked){
      api.putLike(event.target.parentElement.parentElement.parentElement.id);
      console.log(event.target.parentElement.parentElement.parentElement.id);
      let numbLike =  Number(event.target.parentElement.parentElement.parentElement.querySelector('.place-article__like-number').textContent);
      numbLike += 1 ; 
      event.target.parentElement.parentElement.parentElement.querySelector('.place-article__like-number').textContent = numbLike;
      event.target.classList.add('place-article__like-icon_liked');  
      this.liked =false;
      }
      else {
      api.deleteLike(event.target.parentElement.parentElement.parentElement.id);
      console.log(event.target.parentElement.parentElement.parentElement.id);
      let numbLike =  Number(event.target.parentElement.parentElement.parentElement.querySelector('.place-article__like-number').textContent);
      numbLike -= 1 ; 
      event.target.parentElement.parentElement.parentElement.querySelector('.place-article__like-number').textContent = numbLike;
      event.target.classList.remove('place-article__like-icon_liked');   
      this.liked = true;
      }
      }
    remove(event){ 
      event.stopPropagation();   
      if (window.confirm('Вы действительно хотите удалить эту карточку?')){    
      const article = event.target.parentElement.parentElement;
      article.parentElement.removeChild(article);
      api.deletearticle(event.target.parentElement.parentElement.id);
      }
      else return false;
  
    }
    openImage(event){
      document.querySelector('.image').classList.add('image_open');
      const src = event.target.style.backgroundImage.substr(4).substr(0,event.target.style.backgroundImage.length);
      document.querySelector('.image_src').src = src.substr(1, src.length-3);     
    }  
  }