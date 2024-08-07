svg = document.getElementsByTagName('svg')[0];
menu = document.getElementsByClassName('nav-list')[0];
menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
navBar = document.getElementsByClassName('navbaritem')[0];
faqItem = document.getElementsByClassName('accordion-item');
faqButton = document.getElementsByClassName('accordion-button');
rotate = 0;

svg.addEventListener('click', () => {
    console.log('I am listening');
    if (rotate == 0) {
        svg.style.rotate = '90deg';
        rotate = 1;
        console.log("rotate = 1");
        menu.style.display = 'block';
        menuBlock.style.height = '150px';
        menuBlock.style.width = "100%";
        navBar.style.position = 'relative';
    }
    else if (rotate == 1) {
        svg.style.rotate = '0deg';
        rotate = 0;
        console.log("rotate = 0");
        menuBlock.style.height = '0';
        navBar.style.position = 'absolute';
        menu.style.display = 'none';
    }
});
faqItem[0].style.borderTopLeftRadius  = '20px';
faqItem[0].style.borderTopRightRadius  = '20px';
faqItem[14].style.borderBottomLeftRadius  = '20px';
faqItem[14].style.borderBottomRightRadius  = '20px';

faqButton[0].style.borderTopLeftRadius  = '20px';
faqButton[0].style.borderTopRightRadius  = '20px';
faqButton[14].style.borderBottomLeftRadius  = '20px';
faqButton[14].style.borderBottomRightRadius  = '20px';