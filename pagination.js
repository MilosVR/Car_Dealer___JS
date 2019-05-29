const prev_page_btn = document.querySelector('.prev_page');
const next_page_btn = document.querySelector('.next_page');
const result_pagination = document.querySelector('.result_pagination')
const recomendend_cars = document.querySelector('.recomendend_cars');

function fetchCarsPage(){
    fetch('/json/data.json')
    .then(res => res.json())
    .then(data => {
        let current_page = 1;
        let records_per_page = 4;
    
    prev_page_btn.addEventListener('click', prevPage)
    function prevPage(){
        if (current_page > 1) {
            current_page--
            changePage(current_page)
        }
    }
    next_page_btn.addEventListener('click', nextPage)
    function nextPage() {
        if (current_page < Math.ceil(data.length / records_per_page)) {
            current_page++
            changePage(current_page);
        }
    }
    function changePage(page) {
        
        let filterData = data.filter(item => {
            return item.Identification.Year === 2011
        })
        recomendend_cars.innerHTML = ''
        if (page < 1) { page = 1 }
        if (page > Math.ceil(filterData.length / records_per_page)) { 
            page = Math.ceil(filterData.length / records_per_page)
        }
        
        for(let i = (page - 1) * records_per_page; i < (page*records_per_page) && i < filterData.length; i++){
            
        recomendend_cars.innerHTML += `
        <div class='cars_item'>
        <div class='cars_item_description'>
        <p class='cars_name'> ${filterData[i].Identification.Make}</p>
        <p class='cars_price'>${filterData[i].price} $</p>
        </div>
        <img src='${filterData[i].Image}' />
        <div class='cars_read_more'>
        Year : ${filterData[i].Identification.Year}<br/>
        Engine Type :${filterData[i].EngineInformation.EngineType}<br/>
        Transmission : ${filterData[i].EngineInformation.Transmission}<br/>
        Horsepower : ${filterData[i].EngineInformation.EngineStatistics.Horsepower}hp<br/>
        Fuel : City ${filterData[i].FuelInformation.City_mph} and Highway ${filterData[i].FuelInformation.Highway_mpg}<br/> 
        </div>
        </div>
        ` 
        if (page == 1) {
            prev_page_btn.disabled = 'true';
            if (!prev_page_btn.classList.contains('disabledBtn')) {
                prev_page_btn.classList.add('disabledBtn');   
            } 
        } else {
            if (prev_page_btn.classList.contains('disabledBtn')) {
                prev_page_btn.classList.remove('disabledBtn');   
            }
            prev_page_btn.removeAttribute('disabled');
        }
        if (page == Math.ceil(filterData.length / records_per_page)) {
            if (!next_page_btn.classList.contains('disabledBtn')) {
                next_page_btn.classList.add('disabledBtn');   
            } 
            next_page_btn.disabled = 'true'
        } else {
            if (next_page_btn.classList.contains('disabledBtn')) {
                next_page_btn.classList.remove('disabledBtn');   
            } 
            next_page_btn.removeAttribute('disabled');
        }

        }
    }
    window.onload = function(){
        changePage(1)
    }
    })
} 
fetchCarsPage()



