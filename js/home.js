let arrayCard = document.querySelectorAll('.card');

arrayCard.forEach(card => {
    card.addEventListener('click', function() {
        console.log(card);
        localStorage.removeItem('chiTietSP');
        if(luuLocalStoragCuaChiTiet(card))
            window.location.href = '../html/chiTietSanPham.html';
    });
});

window.onload = function() {

    var currentPagePath = window.location.pathname;

    // Kiểm tra xem đường dẫn có chứa "home.html" hay không
    if (currentPagePath.includes("chiTietSanPham.html")) {
        docLocalStorageCuaChiTiet();
    }
    return;

}

function docLocalStorageCuaChiTiet() {
    console.log('docLocalStorageCuaChiTiet');
    let chiTietSP = JSON.parse(localStorage.getItem('chiTietSP')) || [];
    if (chiTietSP.length == 0) {
        return false;
    }
    console.log(chiTietSP);
    let product = document.querySelector('main .container .product');
    let carouselExampleControlsNoTouching = product.querySelector('.left #carouselExampleControlsNoTouching');
    let item = carouselExampleControlsNoTouching.querySelectorAll('.carousel-item');

    

    //  
    item[0].querySelector('img').setAttribute('src', chiTietSP[0].img)
    item[1].querySelector('img').setAttribute('src', chiTietSP[0].img.replace('fr', 'qt'));

    let infoDetails = product.querySelector('.infoDetails');

    infoDetails.firstElementChild.setAttribute('id', chiTietSP[0].id);
    infoDetails.firstElementChild.setAttribute('class', chiTietSP[0].theLoai);
    infoDetails.querySelector('.nameOfProduct').textContent = chiTietSP[0].name;
    infoDetails.querySelector('.priceOfProduct').firstElementChild.textContent = chiTietSP[0].price;

    let brand= document.querySelector('main .detailInfo .brand');
    let thelLoai=  chiTietSP[0].theLoai.split(" ");
    let thuongHieu =["Ray-Ban","Oakley","Prada","Versace","Versace","Burberry","Alain_Mikli"];
    thelLoai.forEach(element => {
        for (let i = 0; i < thuongHieu.length; i++) {
            if(element==thuongHieu[i]){
                brand.textContent=element;
            }
        }
    
    })
    return true;
}

function luuLocalStoragCuaChiTiet(card) {
    if(card.firstElementChild && card.firstElementChild.tagName === "SPAN" && card.firstElementChild.innerText==""){
        console.log('Không lưu sản phẩm này');
        return false;
    }
    let id, name, price, img, theLoai;
    img = card.querySelector('img').src;

    id = card.querySelector('.card-body').firstElementChild.getAttribute('id');
    theLoai = card.querySelector('.card-body').firstElementChild.getAttribute('class');


    name = card.querySelector('.nameOfProduct').textContent;
    price = card.querySelector('.priceOfProduct').firstElementChild.textContent;

    let chiTietSP = JSON.parse(localStorage.getItem('chiTietSP')) || [];
    chiTietSP.push({ id: id, name: name, price: price, img: img, theLoai: theLoai });
    localStorage.setItem('chiTietSP', JSON.stringify(chiTietSP));
    return true;
}
function search(){
    let input = document.getElementById('searchForm').querySelector('input').value;

    let search =  document.getElementById('searchButton');
    if(search && input){

        console.log('search');
        search.addEventListener('click', function(e){
            
                let arrayCard = document.querySelectorAll('.nameOfProduct');
                arrayCard.forEach(element => {
                    console.log(element.textContent);
                    if(element.textContent==input){
                            let parentElement = element.parentElement;
                            let id = parentElement.firstElementChild.getAttribute('id');
                            if(id){
                                let path= `../html/tongSanPham.html?id=${id}`;
                                chuyenTrang(path.textContent); 
                            }
                               
                            else
                                chuyenTrang('../html/tongSanPham.html');
                                
                    }
                });
        })
    }
}
function chuyenTrang(path) {
    window.location.href = path;
}
 