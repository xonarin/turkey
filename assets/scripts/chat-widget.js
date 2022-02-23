//Чат виджет справа внизу
var chatButton = document.querySelector('.chat-widget--button');
var chatBubble = document.querySelector('.chat-widget--bubble');
chatButton.addEventListener('click', function() {
  void chatBubble.offsetWidth;
  chatBubble.classList.toggle('-hide');
  chatButton.classList.toggle('active-widget');
});
