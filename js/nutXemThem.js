
var isAnimatingSanPhamMoi = false;
var isAnimatingDiscount = false;
var isAnimatingToanBoSanPham = false;
let count=0;
// phần toàn bộ sản phẩm
document.getElementById("XemThemToanBoSanPham").addEventListener("click", function (event) {
      event.preventDefault();
      count++;
      let idCollapse = "collapsePhanToanBoSanPhamPhan"+count;
      if (count<3) {           
            let sp =document.getElementById(idCollapse);
            sp.classList.add("animationSildeUpToDown");
            sp.classList.add("show");
            if(count==2)
                  document.getElementById("XemThemToanBoSanPham").innerHTML = "Ẩn bớt<i class='fas fa-angle-up'></i>";
      }
      else{
            for(let i=1;i<=3;i++){
                  let id="collapsePhanToanBoSanPhamPhan"+i;
                  let sp =document.getElementById(id);            
                  sp.classList.remove("show");                     
            }
            count=0;
            document.getElementById("XemThemToanBoSanPham").innerHTML = "Xem thêm<i class='fas fa-angle-down'></i>";
      }     
      isAnimatingDiscount=!isAnimatingDiscount;       
    });
// phần best seller
document.getElementById("XemThemDiscount").addEventListener("click", function (event) {
      let sp =document.getElementById("collapsePhanSanPhamDiscountPhan1");
      event.preventDefault();

      if (!isAnimatingDiscount) {
          
            sp.classList.add("animationSildeUpToDown");
            sp.classList.add("show");
            document.getElementById("XemThemDiscount").innerHTML = "Ẩn bớt<i class='fas fa-angle-up'></i>";
      }
      else{
  
            sp.classList.add("animationSildeDownToUp");
            setTimeout(() => {
                  sp.classList.remove("show");   
            }, 1100);
            document.getElementById("XemThemDiscount").innerHTML = "Xem thêm<i class='fas fa-angle-down'></i>";
      }     
      isAnimatingDiscount=!isAnimatingDiscount;       
    });
// phần sản phẩm mới 
    document.getElementById("XemThemSanPhamMoi").addEventListener("click", function (event) {
      let sp =document.getElementById("collapsePhanSanPhamMoiPhan1");
      event.preventDefault();

      if (!isAnimatingSanPhamMoi) {   
            sp.classList.add("animationSildeUpToDown");
            sp.classList.add("show");
            document.getElementById("XemThemSanPhamMoi").innerHTML = "Ẩn bớt<i class='fas fa-angle-up'></i>";
      }
      else{
            sp.classList.add("animationSildeDownToUp");
            setTimeout(() => {
                  sp.classList.remove("show");   
            }, 1100);
            document.getElementById("XemThemSanPhamMoi").innerHTML = "Xem thêm<i class='fas fa-angle-down'></i>";
      } 
      isAnimatingSanPhamMoi=!isAnimatingSanPhamMoi;
    });

    