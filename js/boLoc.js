window.onload = function() {
    pushPhanBestSeller();
    pushPhanSanPhamMoi();
    pushPhanSanPhamDiscount();
}
var phanToanBoSanPham = document.querySelector('#PhanToanBoSanPham');
var phanToanBoSanPhamClone = phanToanBoSanPham.cloneNode(true);
// đẩy sản phẩm theo hạng mục vs: bestseller, new, discount,
function pushPhanBestSeller() {
    let arrayCard = document.querySelectorAll('#PhanBestSeller .card');
    let arrayId = getArrayIdTheoHangMuc(['BestSeller']);

    for (let i = 0; i < arrayId.length; i++) {
        if (arrayCard[i]) {
            // console.log(i);
            let card = document.getElementById(arrayId[i]).parentElement.parentElement;
            arrayCard[i].querySelector('img').outerHTML = card.querySelector('img').outerHTML;
            arrayCard[i].querySelector('.card-body').outerHTML = card.querySelector('.card-body').outerHTML;
        } else {
            break;
        }
    }
}

function pushPhanSanPhamMoi() {
    let arrayCard = document.querySelectorAll('#PhanSanPhamMoi .card');
    let arrayId = getArrayIdTheoHangMuc(['New']);
    for (let i = 0; i < arrayId.length; i++) {
        if (arrayCard[i]) {
            arrayCard[i].outerHTML = document.getElementById(arrayId[i]).parentElement.parentElement.outerHTML;
        } else {
            break;
        }
    }
}

function pushPhanSanPhamDiscount() {
    let arrayCard = document.querySelectorAll('#PhanSanPhamDiscount .card');
    let arrayId = getArrayIdTheoHangMuc(['Discount']);
    for (let i = 0; i < arrayId.length; i++) {
        if (arrayCard[i]) {
            arrayCard[i].outerHTML = document.getElementById(arrayId[i]).parentElement.parentElement.outerHTML;
        } else {
            break;
        }
    }
}
// Lọc sản phẩm theo hạng mục vs: bestseller, new, discount, nam, nu , thương hiệu, si
function getArrayIdTheoHangMuc(arrayTheLoai) {
    let arrayCard = document.querySelectorAll('#PhanToanBoSanPham .card');
    let arrayID = [];
    arrayCard.forEach(card => {
        // console.log('vo day');
        let item = card.querySelector('.card-body').firstElementChild;
        for (let i = 0; i < arrayTheLoai.length; i++) {
            if (item.classList.contains(arrayTheLoai[i])) {
                arrayID.push(item.getAttribute('id'));
                break;
            }
        }
    });
    return arrayID;
}


let sapXepForm = document.getElementById('sapXep');

// Add event listener to the parent element
sapXepForm.addEventListener('change', function(event) {
    // Check if the changed element is a radio input
    if (event.target.type === 'radio') {
        // Get the value of the selected radio input
        filterSapSep(event.target.value);
        //   event.target.checked = true;
    }
});
// Sắp xếp sản phẩm
function filterSapSep(dieuKienLoc) {


    let arrayCard = document.querySelectorAll('#PhanToanBoSanPham .card');
    let array = [];
    // kiểm tra điều kiện tăng dần hay giảm dần
    if (dieuKienLoc == 'sapTheoGiaTangDan' || dieuKienLoc == 'sapTheoGiaGiamDan') {
        //thực hiện lấy id và giá của sản phẩm
        arrayCard.forEach(card => {
            let price = card.querySelector('.card-body .priceOfProduct').firstElementChild.textContent;
            let id = card.querySelector('.card-body').firstElementChild.getAttribute('id');
            let noDots = price.replace(/\./g, '');
            let gia = Number(noDots);
            array.push({ id: id, gia: gia });
        });
        // sắp xếp theo giá tăng
        if (dieuKienLoc == 'sapTheoGiaTangDan') {
            arrayCard.forEach(card => {});
            array.sort(function(a, b) {
                return a.gia - b.gia;

            });
        }
        // sắp xếp theo giá giảm
        else {
            array.sort(function(a, b) {
                return b.gia - a.gia;
            });
        }
        //swap giữa 2 card
        swapCard(arrayCard, array);
    }
    //trường hợp chọn phù hợp với bạn thì trả lại danh sách cũ
    else {
        arrayCard.forEach(card => {
            let id = card.querySelector('.card-body').firstElementChild.getAttribute('id');
            array.push({ id: id });
        })
        array.sort(function(a, b) { return a.id - b.id });
        swapCard(arrayCard, array);
    }
}
//thực hiện swap
function swapCard(arrayCard, array) {

    for (let i = 0; i < arrayCard.length; i++) {
        let id = '[id=' + '\"' + array[i].id + '\"' + ']';
        let card = phanToanBoSanPham.querySelector(id).parentElement.parentElement;

        let tmp = arrayCard[i].innerHTML;

        arrayCard[i].innerHTML = card.innerHTML;
        card.innerHTML = tmp;
    }
}


// Lọc sản phẩm theo bộ lọc
document.getElementById('timKiemBoLoc').onclick = filterBoLoc;

// Lọc sản phẩm theo bộ lọc
function filterBoLoc() {

    let arrayTheLoai = [];
    let body = document.querySelector('#phanBoLoc .offcanvas-body .menu');
    // console.log(body);
    let thuongHieu = body.querySelector('.thuonghieu');
    // console.log(thuongHieu);
    let gia = body.querySelector('.gia');
    let gioiTinh = body.querySelector('.gioiTinh');
    let kichThuoc = body.querySelector('.kichThuoc');

    //thực hiện lấy giá trị checked
    let arrayCheck = thuongHieu.querySelectorAll('input:checked');
    //đặt cờ để check xem nếu mà người dùng chọn những phần nào
    let flag = 0;
    arrayCheck.forEach(check => {
        arrayTheLoai.push(check.value);
        flag = 1;
    });
    arrayCheck = gioiTinh.querySelectorAll('input:checked');
    arrayCheck.forEach(check => {
        arrayTheLoai.push(check.value);
        flag = 1;
    });
    arrayCheck = kichThuoc.querySelectorAll('input:checked');
    arrayCheck.forEach(check => {
        arrayTheLoai.push(check.value);
        flag = 1;
    });

    let arrayID = new Set();
    let arrayCard = phanToanBoSanPhamClone.querySelectorAll('.card');

    arrayCheck = gia.querySelectorAll('input:checked');
    arrayCheck.forEach(check => {
        if (check.value == 'gia4') {
            arrayCard.forEach(card => {
                let price = card.querySelector('.priceOfProduct').firstElementChild.textContent;
                let noDots = price.replace(/\./g, '');
                let gia = Number(noDots);
                if (gia > 2000000) {
                    let id = card.querySelector('.card-body').firstElementChild;
                    arrayID.add(id.getAttribute('id'));
                }
            });
        } else if (check.value == 'gia3') {
            arrayCard.forEach(card => {
                let price = card.querySelector('.priceOfProduct').firstElementChild.textContent;
                let noDots = price.replace(/\./g, '');
                let gia = Number(noDots);
                if (gia > 1000000 && gia < 2000000) {
                    let id = card.querySelector('.card-body').firstElementChild;
                    arrayID.add(id.getAttribute('id'));
                }
            });
        } else if (check.value == 'gia2') {
            arrayCard.forEach(card => {
                let price = card.querySelector('.priceOfProduct').firstElementChild.textContent;
                let noDots = price.replace(/\./g, '');
                let gia = Number(noDots);
                if (gia > 500000 && gia < 1000000) {
                    let id = card.querySelector('.card-body').firstElementChild;
                    arrayID.add(id.getAttribute('id'));
                }
            });
        } else {
            arrayCard.forEach(card => {
                let price = card.querySelector('.priceOfProduct').firstElementChild.textContent;
                let noDots = price.replace(/\./g, '');
                let gia = Number(noDots);
                if (gia > 100000 && gia < 500000) {
                    let id = card.querySelector('.card-body').firstElementChild;
                    arrayID.add(id.getAttribute('id'));
                }
            });
        }
        flag = 2;
    });
    // ở đây mình lọc theo hạng mục trước sau đó lấy kết quả của hạng mục để lọc theo giá , tuy nhiên nếu người dùng chỉ chọn giá thì  flag==2 và sẽ phải lấy tất cả sản phẩm sau đó mới lọc
    if (flag == 1) {
        let array = getArrayIdTheoHangMuc(arrayTheLoai);
        for (let i = 0; i < array.length; i++) {
            arrayID.add(array[i]);
        }
    }
    // trường hợp ko chọn gì thì ko cần phải lọc
    else if (flag == 0)
        return;
    //lọc theo giá
    let arrayIDTheoMang = Array.from(arrayID);

    //thực hiện xóa toàn bộ sản phẩm sau đó chèn lại từ đầu
    let row = document.createElement('div');
    row.classList.add('row', 'row-cols-sm-1', 'row-cols-md-3', 'row-cols-lg-6', 'g-4', 'my-2');

    for (let i = 0; i < arrayIDTheoMang.length; i++) {
        let id = '[id=' + '\"' + arrayIDTheoMang[i] + '\"' + ']';
        let card = phanToanBoSanPhamClone.querySelector(id).parentElement.parentElement;
        let col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = card.outerHTML;
        console.log(col);
        row.appendChild(col);
    }
    phanToanBoSanPham.innerHTML = '';
    phanToanBoSanPham.innerHTML = row.outerHTML;
}