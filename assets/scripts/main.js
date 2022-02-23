// класс для создание таймера обратного отсчета
class CountdownTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      days: '', hours: '', minutes: '', seconds: '',
      daysTitle: '', hoursTitle: '', minutesTitle: '', secondsTitle: ''
    };
    this._start();
  }
  static declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }
  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }
  _calc() {
    const diff = this._deadline - new Date();
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    this._out.days = days < 10 ? '0' + days : days;
    this._out.hours = hours < 10 ? '0' + hours : hours;
    this._out.minutes = minutes < 10 ? '0' + minutes : minutes;
    this._out.seconds = seconds < 10 ? '0' + seconds : seconds;
    this._out.daysTitle = CountdownTimer.declensionNum(days, ['день', 'дня', 'дней']);
    this._out.hoursTitle = CountdownTimer.declensionNum(hours, ['час', 'часа', 'часов']);
    this._out.minutesTitle = CountdownTimer.declensionNum(minutes, ['минута', 'минуты', 'минут']);
    this._out.secondsTitle = CountdownTimer.declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff <= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // .timer (на минуту)
  const elDays = document.querySelector('.timer .timer__days');
  const elHours = document.querySelector('.timer .timer__hours');
  const elMinutes = document.querySelector('.timer .timer__minutes');
  const elSeconds = document.querySelector('.timer .timer__seconds');

  (function timer() {
    const deadline = new Date(Date.now() + (120 * 60 * 1000 + 999));
    new CountdownTimer(deadline, (timer) => {
      elDays.textContent = timer.days;
      elHours.textContent = timer.hours;
      elMinutes.textContent = timer.minutes;
      elSeconds.textContent = timer.seconds;
      elDays.dataset.title = timer.daysTitle;
      elHours.dataset.title = timer.hoursTitle;
      elMinutes.dataset.title = timer.minutesTitle;
      elSeconds.dataset.title = timer.secondsTitle;
    }, () => {
      timer();
    })
  })();

});


//Шапка
$(window).scroll(function(){
  if($(this).scrollTop()>30){
      $('.header').addClass('fixed');
  }
  else if ($(this).scrollTop()<30){
      $('.header').removeClass('fixed');
  }
});

//Плавный скролл по якорям
$(document).ready(function() {
  $("a.scroll-link").click(function () {
    elementClick = $(this).attr("href")
    destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 150}, 1100);
    return false;
  });
});

//Плашка позвонить фикс
$(window).scroll(function(){
  if($(this).scrollTop()>500){
      $('.callme').addClass('fixed');
  }
  else if ($(this).scrollTop()<500){
      $('.callme').removeClass('fixed');
  }
});
