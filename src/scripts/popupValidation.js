export class Popup{
    constructor(popupElement){
      this.popupElement = popupElement;
    }
    open(){
      this.popupElement.classList.add('form-is-opened');
    }
    close(){
      this.popupElement.classList.remove('form-is-opened');
      this.popupElement.querySelector('.form__error-valid').textContent = '';
      this.popupElement.querySelector('.a').textContent = '';  // убираем сообщение об ошибке у второго ввода
    }
  }

  export class Validate{
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
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Это обязательное поле';
          return false
        }
        if (event.target.value.length < 2 || event.target.value.length > 30){
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Должно быть от 2 до 30 символов';
          return false}

        else {
          this.popuptype.querySelector(`#error-${event.target.name}`).textContent = '';
           return true;
        }
    }
  }
  export class ValidateEnter extends Validate{
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
  export class ValidateRegistration extends Validate{
    buttonValidate(){
      const form = document.forms.registration;
      const name = form.elements.name;
      const email = form.elements.email;
      const password = form.elements.password;
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