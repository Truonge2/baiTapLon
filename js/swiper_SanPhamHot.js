let swiper = new Swiper(".SanPhamHotSwiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    
var SanPhamHot=document.getElementById('SanPhamHot');
function changeImage(event) {
      const target = event.target;
      setTimeout(function() {
        if(target.src.indexOf('fr')>0)
          target.src=target.src.replace('fr','qt');
        else
          target.src=target.src.replace('qt','fr');
      },200);
}
let card =SanPhamHot.querySelectorAll('#SanPhamHot .card-img-top');
for(let i=0;i<card.length;i++){
      card[i].addEventListener('mouseover',changeImage);
      card[i].addEventListener('mouseout',changeImage);
}
