function fetchCars() {

fetch('/json/data.json')
      .then(res => {
      return res.json()
  })
      .then(data => {
            const cars = document.querySelector('.cars');
            
            cars.innerHTML = 
            `
            ${data.map((item)=> {
                  
            return `<div class='cars_item'>
                        <div class='cars_item_description'>
                        <p class='cars_name'>${item.Identification.Make}</p>
                        <p class='cars_price'>${item.price} $</p>
                        </div>
                        <img src='${item.Image ? item.Image : null}' />
                        <div class='cars_read_more'>
                        Year : ${item.Identification.Year}<br/>
                        Engine Type :${item.EngineInformation.EngineType}<br/>
                        Transmission : ${item.EngineInformation.Transmission}<br/>
                        Horsepower : ${item.EngineInformation.EngineStatistics.Horsepower}hp<br/>
                        Fuel : City ${item.FuelInformation.City_mph} and Highway ${item.FuelInformation.Highway_mpg}<br/>
                        </div>
                    </div>`
            }).join(' ')
            }
            `
            
            const carsArr = Array.from(cars.children)
            
            const searchFilter = document.querySelector('.search_filter');
            searchFilter.addEventListener('keyup', e => searchHandler(e, carsArr));

            const rangeInput = document.querySelector('.range');
            rangeInput.addEventListener('input', e => priceRange(e, carsArr));
            
            const carModelYear = document.querySelector('.car_model_year');
            carModelYear.addEventListener('change', e => selectYear(e, carsArr))

            const carModel = document.querySelector('.car_model_select');
            carModel.addEventListener('change', e => selectModel(e, carsArr))

            const submitMaxMinButton = document.querySelector('.min_max form');
            submitMaxMinButton.addEventListener('submit', e => submitMaxMin(e, carsArr))

            const automatic = document.querySelector('.automatic');
            automatic.addEventListener('change', e => automaticCheckbox(e, carsArr))

            const manual = document.querySelector('.manual');
            manual.addEventListener('change', e => manualCheckbox(e, carsArr))

      });
      
}
function searchHandler(e, carsArr){
      carsArr.map(item => {
            if (item.children[0].children[0].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                  item.style.display = "block"
            }else{
                  item.style.display = "none"
            }
      })     
}
function priceRange(e, carsArr){
      carsArr.map(item => {
            if(parseInt(item.children[0].children[1].textContent) >= parseInt(e.target.value)){
                  item.style.display = 'block'
            }else{
                  item.style.display = 'none'
            }
      })
      const labelValue = document.querySelector('.range div');
      labelValue.textContent = `${e.target.value} $`
} 
function selectYear(e,carsArr) {
      carsArr.map(item => {
            if (item.children[2].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                  item.style.display = "block"
            }else{
                  item.style.display = "none"
            }
      })     
}
function selectModel(e, carsArr) {
      carsArr.map(item => {
            if (item.children[2].textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                  item.style.display = "block"
            }else{
                  item.style.display = "none"
            }
      })   
}
function submitMaxMin(e, carsArr) {
      e.preventDefault();
      const minInput = document.querySelector('.min_input');
      const maxInput = document.querySelector('.max_input');
      carsArr.map(item => {
            const price = parseInt(item.children[0].children[1].textContent)
            if(price > parseInt(minInput.value) && price < parseInt(maxInput.value)){
                  item.style.display = 'block'
            }else{
                  item.style.display = 'none'
            }
      })       
}
function automaticCheckbox(e, carsArr) {
      carsArr.map(item => {
            if (item.children[2].textContent.includes("Automatic") && e.target.checked) {
                  item.style.display = "block"
            }else{
                  item.style.display = "none"
            }
      })
      
}
function manualCheckbox(e, carsArr) {
      carsArr.map(item => {
            if (item.children[2].textContent.includes("Manual") && e.target.checked) {
                  item.style.display = "block"
            }else{
                  item.style.display = "none"
            }
      })
}

////////////////////////Slider///////////////////////////
const sliderWraper = document.querySelector('.wallpapaer_zoom');
const leftArrow = document.querySelector('.left_arrow');
const rightArrow = document.querySelector('.right_arrow')

let currentSlide = 0;

sliderWraper.children[0].style.display = 'block';

leftArrow.addEventListener('click', e => {
      const imagesArr = Array.from(sliderWraper.children)

      //reset images and set it to display:'none'
      imagesArr.map(item => item.style.display = 'none'); 

      //if current slide is 0, set currentSLide to the last slide, in this case 2
      if (currentSlide === 0) {currentSlide = imagesArr.length };

      //this is the case where the currentSlide is 1 or 2(1-1= 0, 2-1= 1) 
      imagesArr[currentSlide - 1].style.display = 'block';
      currentSlide--
})
rightArrow.addEventListener('click', nextSlide);

function nextSlide(){
      const imagesArr = Array.from(sliderWraper.children)

      //reset images and set it to display:'none'
      imagesArr.map(item => item.style.display = 'none'); 

      //if current slide is 2, set currentSLide to the first slide, in this case 0, -1 + i++ = 0
      if (currentSlide === imagesArr.length - 1) {currentSlide = -1};

      //this is the case where the currentSlide is 1 or 2(1-1= 0, 2-1= 1) 
      imagesArr[currentSlide + 1].style.display = 'block';
      currentSlide++
}

window.setInterval(nextSlide, 3000)

// const imageWidth = currentImage.getBoundingClientRect().width;













// function sortCarByRecommend() {

//       fetch('/json/data.json')
//             .then(res => {
//             return res.json()
//         })
//             .then(data => {
//                   const ourRecommendations = document.querySelector('.recommended_cars');
      
//                   const recommendCars = data.filter(item => {
//                         return item.Identification.Year === 2012
//                   })
//                   ourRecommendations.innerHTML += 
//                   `
//                   ${recommendCars.map((item)=> {
                        
//                   return `<div class='cars_item'>
//                               <div class='cars_item_description'>
//                               <p class='cars_name'>${item.Identification.Make}</p>
//                               <p class='cars_price'>6300 $</p>
//                               </div>
//                               <img src='${item.Image ? item.Image : null}' />
//                           </div>`
//                   }).join(' ')
//                   }
//                   `
//         });
//       }
// sortCarByRecommend();


function fetchNewCars() {
      fetch('/json/dataNewCars.json')
      .then(res => res.json())
      .then(data => {
                  
      const featuredCars = document.querySelector('.featured_all_cars ul');
      const currentNewCar = document.querySelector('.featured_current_car') ;

      featuredCars.innerHTML= 
      `
      ${data.map(item => {
            return `<li>${item.name}</li> 
            `
      }).join(' ')
}
      `   
      let allNewCarsArr = Array.from(featuredCars.children);
      allNewCarsArr.map(item => item.addEventListener('click', (e)=>changeFeaturedCar(e,data)))
      
      
      const currentCarImage = document.createElement('img')
      currentCarImage.src = data[0].img;
      currentNewCar.appendChild(currentCarImage)
      const featuredCarsStats = document.querySelector('.featured_cars_stats p');
      const featuredCarsTitle = document.querySelector('.featured_cars_stats h2');
      
      featuredCarsTitle.innerHTML = `${data[0].model}`

      featuredCarsStats.innerHTML = `
      Price : ${data[0].price} <br/>
      Max Speed : ${data[0].maxSpeed} <br/>
      From 0 - 100km/h : ${data[0].from0100}s <br/> 
      Horsepower : ${data[0].horsepower}hp
      `
      })
}

function changeFeaturedCar(e, data){
      const currentNewCar = document.querySelector('.featured_current_car');
      const featuredCarsStats = document.querySelector('.featured_cars_stats p');
      const featuredCarsTitle = document.querySelector('.featured_cars_stats h2');
      const dataFilter = data.find(item => {
            if (item.name === e.target.innerHTML) {
                 return item
            }
      })
      currentNewCar.children[0].src = dataFilter.img 
      featuredCarsStats.innerHTML = `
      Price : ${dataFilter.price} <br/>
      Max Speed : ${dataFilter.maxSpeed} <br/>
      From 0 - 100km/h : ${dataFilter.from0100}s <br/> 
      Horsepower : ${dataFilter.horsepower}hp
      `
      featuredCarsTitle.innerHTML = `${dataFilter.model}`
}

window.addEventListener('DOMContentLoaded', () => {
      fetchCars();
      fetchNewCars()
})


