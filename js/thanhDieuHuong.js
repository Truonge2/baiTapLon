
// Get the collapse element
let ArrayCollapseElement = [
  ['namCollapse', 'collapseNam'],
  ['nuCollapse', 'collapseNu'],
  ['thuongHieuCollapse', 'collapseThuongHieu']
];
for(let i=0;i<ArrayCollapseElement.length;i++){
      // console.log([ArrayCollapseElement[i][0]] + "  "+i);
      document.getElementById(ArrayCollapseElement[i][0]).addEventListener('mouseenter', function(event) {
    // Show the collapse element
            for(let j=0;j<ArrayCollapseElement.length;j++){
                  document.getElementById(ArrayCollapseElement[j][1]).classList.remove('show');
            }
            document.getElementById(ArrayCollapseElement[i][1]).classList.add('show');

            document.getElementById(ArrayCollapseElement[i][1]).addEventListener('mouseleave', function(event) {
                  // Hide the collapse element
                  document.getElementById(ArrayCollapseElement[i][1]).classList.remove('show');
            });
      });

}
const trangChuNavbar= document.getElementById('trangChuNavbar');
// const lienHeNavBar= document.getElementById('lienHeNavBar');
trangChuNavbar.addEventListener('mouseenter', function(event) {
      for(let j=0;j<ArrayCollapseElement.length;j++){
                  document.getElementById(ArrayCollapseElement[j][1]).classList.remove('show');
            }
});
// lienHeNavBar.addEventListener('mouseenter', function(event) {
//       for(let j=0;j<ArrayCollapseElement.length;j++){
//                   document.getElementById(ArrayCollapseElement[j][1]).classList.remove('show');
//             }
// });
