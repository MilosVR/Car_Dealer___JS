const sliderUlArr = Array.from(document.querySelector('.multiple_item_slider ul').children);
const sliderLi = document.querySelector('.multiple_item_slider li')
const multi_slide_left = document.querySelector('.multi_slide_left');
const multi_slide_right = document.querySelector('.multi_slide_right');
const newCarSlider = document.querySelector('.newCarSlider');

sliderWidth = sliderUlArr[0].getBoundingClientRect().width

sliderUlArr.map((item, index) => {
    item.style.left = index * sliderWidth + 'px';
})


multi_slide_left.style.display = 'none'

multi_slide_right.addEventListener('click', nextSlide)
function nextSlide(){

  multi_slide_left.style.display = 'block'

  let current_slide = document.querySelector('.current_slide');
  let amountToMove = current_slide.nextElementSibling.style.left
  const sliderUl = document.querySelector('.multiple_item_slider ul')
  sliderUl.style.transform = `translateX(-${amountToMove})` 
  current_slide.classList.remove('current_slide');
  current_slide.nextElementSibling.classList.add('current_slide');
  const sliderUlArr = Array.from(document.querySelector('.multiple_item_slider ul').children);
 
  if(current_slide === sliderUlArr[3]){
    
    sliderUl.style.transform = `translateX(0px)`
    current_slide.classList.remove('current_slide');
    sliderUlArr[0].classList.add('current_slide');
  }
}
setInterval(() => {
  nextSlide()
}, 3000);

multi_slide_left.addEventListener('click', prevSlide)

function prevSlide(e){ 

  const current_slide = document.querySelector('.current_slide');
  let amountToMove = current_slide.previousElementSibling.style.left 
  const sliderUl = document.querySelector('.multiple_item_slider ul')
  
  sliderUl.style.transform = `translateX(-${amountToMove})` 
  current_slide.classList.remove('current_slide');
  current_slide.previousElementSibling.classList.add('current_slide')
 
}
