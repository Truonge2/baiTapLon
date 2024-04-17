// var gioHangLoaded = false;
// window.onload = function() {
//         loadGioHangTuLocal();
//         updateTongTien();
//     }
window.addEventListener('load', function() {
    loadGioHangTuLocal();
    updateTongTien();
})
window.addEventListener('beforeunload', function(event) {
    // event.returnValue = 'Bạn có muốn rời khỏi trang này không?';
    if (window.location.pathname.endsWith('chiTietSanPham.html'))
        luuGioHangVaoLocal();
});

// phần load giỏ hàng từ local
function loadGioHangTuLocal() {
    console.log('loadGioHangTuLocal')
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length > 0) {
        console.log('đọc được array cartItems từ local');
        console.log(cartItems.length);
    }
    let container = document.querySelector('.phanGioHang .offcanvas-body .container');

    cartItems.forEach(cartItem => {

        let cartRow = document.createElement('div');
        cartRow.classList.add('sanPhamGioHang');
        cartRow.classList.add('row');
        cartRow.innerHTML = ` 
            <div class="col-5">
                  <section class="left">
                  <img src="${cartItem.img}" alt="" loading="lazy" >
                  </section>
            
            </div>
            <div class="col-7">
                  <section class="right infoDetails">
                        <div id="${cartItem.id}" class="${cartItem.theLoai}" style="display: none;"></div>
                        <h6 class="nameOfProduct border-bottom">${cartItem.name}</h6>
                        <p class="priceOfProduct"><span>${cartItem.price}</span>đ</p>
                        <div class="d-flex justify-content-around">
                              <input style=" width: 70%;" type="number" name="soLuongSanPham" id="soLuongSanPham" min="1" max="10" value="${cartItem.soluong}">
                              <button class="xoaSanPhamButton" data-bs-toggle="modal" data-bs-target="#removeModal"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                  </section>
            </div>`;
        container.appendChild(cartRow);
        console.log('da thêm thành công');
        removeProduct();
    })
}

function luuGioHangVaoLocal() {
    let gioHang = document.querySelector('.phanGioHang .offcanvas-body .container');
    let arrayItem = gioHang.querySelectorAll('.sanPhamGioHang');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    //     console.log(arrayItem.length);
    let id, name, price, img, theLoai, soluong;
    arrayItem.forEach(item => {
        name = item.querySelector('.infoDetails .nameOfProduct').innerHTML;
        price = item.querySelector('.infoDetails .priceOfProduct').firstElementChild.innerHTML;
        img = item.querySelector('.left img').src;

        id = item.querySelector('.infoDetails').firstElementChild.getAttribute('id');
        theLoai = item.querySelector('.infoDetails').firstElementChild.getAttribute('class');

        soluong = item.querySelector('#soLuongSanPham').value;

        console.log(id + " " + name + " " + price + " " + img + " " + theLoai + " " + soluong);
        if (cartItems.length > 0) {
            let index = cartItems.findIndex(cartItem => cartItem.id == id);
            if (index == -1) {
                cartItems.push({ id: id, name: name, price: price, img: img, theLoai: theLoai, soluong: soluong });
            } else {
                cartItems[index].soluong = soluong;
            }
        } else {
            cartItems.push({ id: id, name: name, price: price, img: img, theLoai: theLoai, soluong: soluong });
        }
    })
    if (arrayItem.length > 0)
        localStorage.setItem('cart', JSON.stringify(cartItems));
    else
        localStorage.removeItem('cart');
}
// phần thêm sản phẩm vào giỏ hàng
function addProductToCart(event) {
    let button = event.target;
    let infoDetails = button.parentElement.parentElement;
    let carouselExampleControlsNoTouching = infoDetails.parentElement.parentElement.querySelector('#carouselExampleControlsNoTouching');

    let name = infoDetails.querySelector('.nameOfProduct').innerText;
    let price = infoDetails.querySelector('.priceOfProduct').firstElementChild.innerText;
    let img = carouselExampleControlsNoTouching.querySelector('.carousel-item').firstElementChild.src;
    let id = infoDetails.firstElementChild.getAttribute('id');
    let theLoai = infoDetails.firstElementChild.getAttribute('class');

    addProductToCart2(id, name, price, img, theLoai);
    isGioHangEmpty();
}

function addProductToCart2(id, name, price, img, theLoai) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('sanPhamGioHang');
    cartRow.classList.add('row');

    let offcanvas_body = document.querySelector('.phanGioHang .offcanvas-body');
    let cartItem = offcanvas_body.querySelectorAll('.infoDetails');
    let cartItemQuantities = offcanvas_body.querySelectorAll('#soLuongSanPham');
    let flag = 0;
    for (let i = 0; i < cartItem.length; i++) {
        if (cartItem[i].firstElementChild.getAttribute('id') == id) {
            let quantity = cartItemQuantities[i];
            quantity.value++;
            updateTongTien();
            flag = 1;
            return;
        }
    }
    if (flag == 0) {
        let cartRowContents = `
            <div class="col-5">
                  <section class="left">
                  <img src="${img}" alt="" loading="lazy" >
                  </section>
            </div>
            <div class="col-7">
                  <section class="right infoDetails">
                        <div id="${id}" class="${theLoai}" style="display: none;"></div>
                        <h6 class="nameOfProduct border-bottom">${name}</h6>
                      
                        <p class="priceOfProduct"><span>${price}</span>đ</p>
                        <div class="d-flex justify-content-around">
                           
                              <input style=" width: 70%;" type="number" name="soLuongSanPham" id="soLuongSanPham" min="1" max="10" value="1">
                              <button class="xoaSanPhamButton" data-bs-toggle="modal" data-bs-target="#removeModal"><i class="fa-regular fa-trash-can"></i></button>
                        </div>
                  </section>
            </div>
            `;
        cartRow.innerHTML = cartRowContents;
        offcanvas_body.querySelector('.container').append(cartRow);


        updateTongTien();
        removeProduct();
    }
}
//phần xóa sản phẩm
function removeProduct() {
    console.log('removeProduct');
    let modal = new bootstrap.Modal(document.getElementById('removeModal'));
    let arrayxoaSanPhamButton = document.querySelectorAll('.xoaSanPhamButton[data-bs-target="#removeModal"]');
    let sanPhamGioHang;

    arrayxoaSanPhamButton.forEach(xoaSanPhamButton => {

        xoaSanPhamButton.addEventListener('click', function(event) {

            sanPhamGioHang = event.target.closest('.sanPhamGioHang');
            if (sanPhamGioHang)
                removeProductFromCart(sanPhamGioHang, modal);
        });
    });
}

// xóa sản phẩm khỏi giỏ hàng
function removeProductFromCart(sanPhamGioHang, modal) {
    console.log('removeProductFromCart');
    document.querySelector('#xoaSanPhamKhoiGioHangButton').onclick = function() {
        //     This function will be executed when the button is clicked
        //     It removes the first div with the class 'sanPhamGioHang' from its parent     

        let sum = 0;
        let giaString = sanPhamGioHang.querySelector('.priceOfProduct').firstElementChild.innerText;
        let noDots = giaString.replace(/\./g, '');
        let gia = Number(noDots);

        let soluong = sanPhamGioHang.querySelector('#soLuongSanPham').value;
        let parsedSoluong = parseInt(soluong);

        if (isNaN(parsedSoluong) || parsedSoluong < 0) {
            console.error("Error: Invalid soluong value");
            parsedSoluong = 0;
            return;
        }
        sum = gia * parsedSoluong;
        let offcanvasFooter = document.querySelector('.offcanvas-footer');
        let tongTienElement = offcanvasFooter.querySelector('.tongTien').firstElementChild;
        let noDots2 = tongTienElement.innerText.replace(/\./g, '');
        let tongTien = Number(noDots2);

        let str = (tongTien - sum).toLocaleString('de-DE');

        tongTienElement.innerText = str;

        sanPhamGioHang.remove();

        //     Then it closes the modal
        modal.hide();
        //     Then it removes the modal backdrop
        let modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop);
        }
    };
    // Then, add an event listener to the button
}


// khi thanh toán thì xóa toàn bộ sản phẩm trong giỏ hàng và cập nhật tổng tiền
function thanhToan() {
    let modal = new bootstrap.Modal(document.getElementById('payModal'));
    if (isGioHangEmpty()) {
        modal.hide();
    } else {
        modal.show();
        document.getElementById('audioPay').play();
        let offcanvasFooter = document.querySelector('.offcanvas-footer');
        offcanvasFooter.querySelector('.tongTien').firstElementChild.innerText = 0;
        let container = document.querySelector('.phanGioHang .offcanvas-body').querySelector('.container');
        container.innerHTML = '';
    }
}

function isGioHangEmpty() {
    let container = document.querySelector('.phanGioHang .offcanvas-body').querySelector('.container');

    // trường hợp mà giỏ hàng rỗng
    if (!container.innerHTML.trim()) {
        let emptyTag = document.createElement('div');
        emptyTag.classList.add('empty');
        emptyTag.innerHTML = `
                  <img src="../anh/utility/empty-cart.png" alt="" loading="lazy" style="width:100%; margin: auto;">
                  <p class="text-center text-danger fw-bold">Chưa có sản phẩm nào trong giỏ hàng</p>`;
        container.append(emptyTag);
        return true;
    }
    // kiểm tra xem trong giỏ hàng có thẻ empty và các thẻ khác không
    var children = container.children;

    var containsNonEmptyTag = false;

    // Loop through each child element
    for (var i = 0; i < children.length; i++) {
        // Check if the current child element does not have the class "empty"
        if (!children[i].classList.contains('empty')) {
            containsNonEmptyTag = true;
            break; // If a non-empty tag is found, no need to continue checking
        }
    }
    // nếu ko chứa thẻ empty và có thẻ khác thì remove thẻ empty
    if (container.querySelector('.empty') && containsNonEmptyTag) {
        let removeTag = container.querySelector('.empty');
        removeTag.remove();
        return false;
    }
    //trường hợp ko có thẻ empty mà chỉ có thẻ khác
    else if (!container.querySelector('.empty') && containsNonEmptyTag) {
        return false;
    }
    //trường hợp chỉ có thẻ empty
    return true;


}

// cập nhật tổng tiền khi thay đổi số lượng sản phẩm
var offCanvasBody = document.querySelector('.phanGioHang .offcanvas-body');
if(offCanvasBody){
    offCanvasBody.addEventListener('change', function(e) {
        updateTongTien();
    });
}


function updateTongTien() {

    let offcanvasFooter = document.querySelector('.offcanvas-footer');
    let tongTien = offcanvasFooter.querySelector('.tongTien').firstElementChild;

    let arraySanPhamGioHang = document.querySelectorAll('.sanPhamGioHang');

    let str = tinhTongTien(arraySanPhamGioHang).toLocaleString('de-DE');
    tongTien.innerText = str;
}
// tính tổng tiền của toàn bộ sản phẩm
function tinhTongTien(arraySanPhamGioHang) {
    let sum = 0;
    arraySanPhamGioHang.forEach(sanPhamGioHang => {

        let giaString = sanPhamGioHang.querySelector('.priceOfProduct').firstElementChild.textContent;

        let noDots = giaString.replace(/\./g, '');
        let gia = Number(noDots);

        let soluong = sanPhamGioHang.querySelector('#soLuongSanPham').value;
        let parsedSoluong = parseInt(soluong);

        if (isNaN(parsedSoluong) || parsedSoluong < 0) {
            console.error("Error: Invalid soluong value");
            parsedSoluong = 0;
            return;
        }
        sum += gia * parsedSoluong;
    });
    return sum;
}