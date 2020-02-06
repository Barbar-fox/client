// show hide element



$(document).ready(function() {
   //function on click register
   $("nav#navRegister").on("click", function(el) {
      el.preventDefault()
      $("div#registerForm").show()
      $("#submitRegister").on("click", function(e) {
         e.preventDefault()
         register()
      })
   })


   
})
