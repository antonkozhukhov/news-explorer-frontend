import {Article} from './article';
export class ArticleList{
    constructor(container, initialArticles){
      this.container = container;
      this.initialArticles = initialArticles;
      this.render(initialArticles);
      // массивы принято называть во множественном числе
      // внутри методов лучше использовать поля класса
      // this.initialCards
      // render лучше выполнять внутри конструктора класса без передачи параметров
    }
    
    addArticle(article, saved){          
        const {articleElement} = new Article(article, saved);
        this.container.appendChild(articleElement);      
    }
    render(initialArticles){
            initialArticles.forEach((article) => this.addAricle(article, false))          
    }
  }
  