// show hide element

function clear() {
   $("#signUpForm").hide()
   $("#hotelListSignIn").hide()
   $("#hotelListSignOut").hide()
   $("#bookingList").hide()
   $("#modalBookingDetail").hide()
   $("#modalBookingUpdate").hide()
   $("#modalCancelBooking").hide()
}

function showHome() {
   clear()
   if(localStorage.token) {
      console.log('if')
      $("#hotelListSignIn").show()
      $("#hotelListSingOut").hide()
   } else {
      console.log('else')
      $("#hotelListSignOut").show()
      $("#hotelListSignIn").hide()
   }
   navAuth(localStorage.token)
}

function navAuth(token) {
   if(token) {
      $(".nav-Item").hide()
      $("#navHome").show()
      $("#navSignOut").show()
   } else {
      $(".nav-item").show()
      $("#navSignOut").hide()
   }
}


$(document).ready(function() {
   showHome()
   //function on click register
   $("#navSignUp").on("click", function(el) {
      el.preventDefault()
      clear()
      $("div#signUpForm").show()
      $("#submitRegister").on("click", function(e) {
         e.preventDefault()
         register()
      })
   })

   $("#navSignOut").on("click", function(el) {
      el.preventDefault()
      localStorage.clear()
   })

   $("#navHome").on("click", function(el) {
      el.preventDefault()
      showHome()
   })

   $('#modalHotelDetail').on("click", function(el) {
      $("#modal-delete").show()
   })
   
})
