function scrollFunction() {
   if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      $('#banner').fadeOut(600)
   } 
   else {
      $('#banner').fadeIn(600)
   } 
 }
 window.onscroll = scrollFunction;

