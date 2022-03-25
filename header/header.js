 //Search
 var url_ne = 'https://o3tea.herokuapp.com/list';
 fetch(url_ne, {
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
         },
     })
     .then((response) => response.json())
     .then((data) => {
         //Search
         function search() {
             var header_search_input = document.querySelector('.header_search_input').value.toLowerCase();

             var loc_NE = data.filter(function(lists) {
                 return lists.name.toLowerCase() === header_search_input;
             })

             if (loc_NE.length == 0) {
                 document.querySelector('.result_none').innerHTML = "Kết quả tìm kiếm: 0/99+";
                 document.querySelector('.result_none2').innerHTML = "Không có kết quả nào được tìm thấy";
             } else {
                 var htmls = loc_NE.map(function(lists) {
                     return "<h4>Kết quả tìm kiếm: 1/99+</h4>" + "<img " + "src='" + lists.img + "' class='content2_sanPham' >" +
                         "</img>" +
                         "<p class='content2_tenSanPham'>" + lists.name + "</p>" +
                         "<span>" + lists.gia + "</span>"
                 })

                 document.querySelector('.result').innerHTML = htmls.join('');
             }
         }

         //Nhấn phím tìm
         var header_seach_button = document.querySelector('.header_seach_button');
         header_seach_button.onclick = function(e) {
             search();
             var result = document.querySelector('.result');
             result.classList.add('background');
             result.classList.remove('display');
         }

         //Nhấn phím enter
         var header_search_input = document.querySelector('.header_search_input');

         header_search_input.onkeypress = function(e) {
             var key = e.keyCode || e.which;
             if (key == 13) {
                 search();
                 var result = document.querySelector('.result');
                 result.classList.add('background');
                 result.classList.remove('display');
             }
         }

         //Home
         try {
             var chaoMung = document.querySelector('.chaoMung')
             chaoMung.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {

         }

         //Câu hỏi
         try {
             var content_cauHoi = document.querySelector('.content_cauHoi')
             content_cauHoi.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Contact
         try {
             var contact = document.querySelector('.contact')
             contact.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Introduce
         try {
             var content_introduce = document.querySelector('.content_introduce')
             content_introduce.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Nước ép
         try {
             var content = document.querySelector('.content')
             content.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Khác
         try {
             var khac_content = document.querySelector('.khac_content')
             khac_content.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Sinh tố
         try {
             var sinhTo_content = document.querySelector('.sinhTo_content')
             sinhTo_content.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Trà hương
         try {
             var traHuong_content = document.querySelector('.traHuong_content')
             traHuong_content.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Trà sữa
         try {
             var traSua_content = document.querySelector('.traSua_content')
             traSua_content.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}

         //Trà trái cây
         try {
             var traTraiCay_content = document.querySelector('.traTraiCay_content')
             traTraiCay_content.onclick = function() {
                 var result = document.querySelector('.result');
                 result.classList.add('display');
             }
         } catch (error) {}
     })
     .catch((error) => {});