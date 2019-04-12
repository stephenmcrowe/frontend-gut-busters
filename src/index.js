// change require to es6 import style
import $ from 'jquery';
import './style.scss';

let num = 0;

// Increment and display time spent on page
// Source: https://www.w3schools.com/js/tryit.asp?filename=tryjs_setinterval2
function timer() {
  num += 1;
  // document.getElementById('#main').innerHTML = (`<p>Youve been on this page for ${num} seconds.</p>`);
  $('#main').html(`<p>Youve been on this page for ${num} seconds.</p>`);
}
// Calculate and display time
setInterval(timer, 1000);
