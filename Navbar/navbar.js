const hamburger_menu = document.querySelector('.hamburger_menu');
const navbar_links = document.querySelector('.navbar_links')

hamburger_menu.addEventListener('click', e => {

    if (hamburger_menu.classList.contains('change')) {
        hamburger_menu.classList.remove('change');
        navbar_links.style.display = 'none';
    }else{
        hamburger_menu.classList.add('change');
        navbar_links.style.display = 'block';
    }
})
window.addEventListener('resize', e => {
    if(e.target.innerWidth >= 768){
        navbar_links.style.display = 'block';
        hamburger_menu.classList.remove('change');
    }else{
        navbar_links.style.display = 'none';
    } 
});
window.addEventListener('scroll', e => {

    const navbar = document.querySelector('.navbar_links ul')
    const navbarLi = document.querySelector('.navbar_links')

    // navbarLi.forEach(item => console.log(item.classList.value))
    

    if(document.documentElement.scrollTop > 100){
        
        navbar.style.background = 'gray'
        navbar.style.color = 'white'
        navbar.style.backgroundSize = 'cover'
        if (!navbarLi.classList.contains('active')) {
            navbarLi.classList.add('active')
        }
    }else{
        if (navbarLi.classList.contains('active')) {
            navbarLi.classList.remove('active')
        }
        navbar.style.background = 'white'
        navbar.style.color = 'gray';
    }
})