
let input = document.getElementById('searchForm').querySelector('input').value;

let search =  document.getElementById('searchButton');
if(search){
      console.log('search');
      search.addEventListener('click', function(e){
            let arrayCard = document.querySelectorAll('.nameOfProduct');
            arrayCard.forEach(element => {
                  if(element.textContent==input){
                        let parentElement = element.parentElement;
                        let id = parentElement.firstElementChild.getAttribute('id');
                        if(id)
                              chuyenTrang(`../html/tongSanPham.html?id=${id}`);     
                  }
            });
      })
}
function chuyenTrang(path) {
      window.location.href = path;
}