// show hide element

let token = localStorage.getItem('token')
let gToken = localStorage.getItem('gToken')


function clear() {
   $("#signUpForm").hide()
   $("#hotelListSignIn").hide()
   $("#hotelListSignOut").hide()
   $("#bookingList").hide()
   $("#modalBookingDetail").hide()
   $("#modalBookingUpdate").hide()
   $("#modalCancelBooking").hide()
}

function navAuth() {
   if(token) {
      $(".nav-Item").hide()
      $("#nav-Home").show()
      $("#navSignOut").show()
   } else {
      $(".nav-item").show()
      $("#navSignOut").hide()
   }
}

function showHome() {
   clear()

   $("#hotelListSignOut").hide()
   $("#hotelListSignIn").hide()

   navAuth()
}

function welcomePage() {
   if (token) {
      $('#signIn-container').hide()
      $('#signUpForm').hide()
      $('#welcome').show()
      $('#nav-signIn').hide()
      signOutCondition()
      $("#hotelListSignOut").hide()
      $("#hotelListSignIn").hide()
   } else {
      $('#signIn-container').hide()
      $('#signUpForm').hide()
      $('#welcome').show()
      $('#nav-signIn').show()
      signOutCondition()
      $("#hotelListSignOut").hide()
      $("#hotelListSignIn").hide()
   }
}

function signOutCondition() {
   if (gToken) {
      $('#nav-signOut').hide()
      $('#nav-gSignOut').show()
   } else {
      $('#nav-signOut').show()
      $('#nav-gSignOut').hide()
   }
}

function weather() {
    let weatherIcon = ''

    if (new Date()) {
        weatherIcon = '<i class="fas fa-cloud-rain mx-2"></i>'
    } else {
        weatherIcon = '<i class="fas fa-cloud-rain mx-2"></i>'
        weatherIcon = '<i class="fas fa-cloud-showers-heavy mx-2"></i>'
        weatherIcon = '<i class="fas fa-cloud mx-2"></i>'
        weatherIcon = '<i class="fas fa-wind mx-2"></i>'
        weatherIcon = '<i class="fas fa-sun mx-2"></i>'
        weatherIcon = '<i class="fas fa-umbrella mx-2"></i>'
        weatherIcon = '<i class="fas fa-bolt mx-2"></i>'
    }
    $('#date').append(`${new Date().toDateString()}`)
    $('#weather-icon').append(weatherIcon)
}

function navAuthentication() {

}

$(document).ready(function() {
   showHome()

   // token available
   if (token) {
      $('#signIn-container').hide()
      $('#nav-signIn').hide()

      signOutCondition()

      $('#logo').on('click', () => {
         $('#nav-signIn').hide()
         welcomePage()
         signOutCondition()
      })
   } else { // token unavailable
      welcomePage()
      $('#nav-signOut').hide()
      $('#nav-gSignOut').hide()
      $('#logo').on('click', () => {
         welcomePage()
         $('#nav-signIn').show()
         $('#nav-signOut').hide()
         $('#nav-gSignOut').hide()
      })
   }

   $('#nav-signIn').on('click', (el) => {
      showHome()
      el.preventDefault()
      $('#signIn-container').toggle("slow", function() {
         $('#signIn-form').show()
         $("#signUpForm").hide()
         $('#nav-signIn').show()
      })
   })
  
    //show weather
    weather()

   // function on submit sign in form
   $('#signIn-form').on('submit', (event) => {
      event.preventDefault()
      login()
   })

   // function on click sign out
   $('#nav-signOut').on('click', () => {
      logout()
      localStorage.clear()
   })

   //function on click register by SignIn
   $("#btn-register").on("click", function(el) {
      el.preventDefault()
      $('#nav-signIn').show()
      $("#signUpForm").show()
      $("#signIn-form").hide()
      $("#submitRegister").on("click", function(e) {
         e.preventDefault()
         register()
      })
   })

   // show hotels
   $('#hotels').on('click', function() {
      if (token) {
         $('#welcome').hide()
         $("#hotelListSignIn").show()
      } else {
         // showHome()
         $('#signIn-container').toggle("slow", function() {
            $('#signIn-form').show()
            $("#signUpForm").hide()
            $('#nav-signIn').show()
         })
      }
   })
})
