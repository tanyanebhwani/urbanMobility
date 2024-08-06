svg = document.getElementsByTagName('svg')[0];
menu = document.getElementsByClassName('nav-list')[0];
menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
navBar = document.getElementsByClassName('navbar')[0];
bannerText = document.getElementsByClassName('banner-text')[0];
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
        bannerText.style.height = '60vh';
    }
    else if (rotate == 1) {
        svg.style.rotate = '0deg';
        rotate = 0;
        console.log("rotate = 0");
        menuBlock.style.height = '0';
        navBar.style.position = 'absolute';
        bannerText.style.height = '80vh';
        menu.style.display = 'none';
    }
});
$(document).ready(function() {
    $('.reply-button').click(function() {
        $(this).siblings('.reply-form').toggle();
      });

      $('.send-reply').click(function() {
        const replyText = $(this).siblings('textarea').val();
        alert('Reply sent: ' + replyText);
        $(this).parent('.reply-form').hide();
        $(this).siblings('textarea').val('');
      });
    });