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
   if(token) {
      console.log('if')
      $("#hotelListSignIn").show()
      $("#hotelListSignOut").hide()
   } else {
      console.log('else')
      $("#hotelListSignOut").show()
      $("#hotelListSignIn").hide()
   }
   navAuth()
}

function welcomePage() {
   $('#signIn-container').hide()
   $('#signUpForm').hide()
   $('#welcome').show()
   $('#nav-signIn').show()
   $('#nav-signOut').hide()
   $('#nav-gSignOut').hide()
   // $('#nav-gSignOut').show()
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

$(document).ready(function() {
   showHome()
   //function to get homepage
   $("#nav-Home").on("click", function(el) {
      el.preventDefault()
      showHome()
   })

   // token available
   if (token) {
      $('#logo').on('click', () => {
         welcomePage()
      })
      $('#signIn-container').hide()
      $('#nav-signIn').hide()
      
      if (gToken) {
         $('#nav-signOut').hide()
         $('#nav-gSignOut').show()
      } else {
         $('#nav-signOut').show()
         $('#nav-gSignOut').hide()
      }
   } else { // token unavailable
      welcomePage()
      $('#logo').on('click', () => {
         welcomePage()
         $('#nav-signIn').show()
         $('#nav-signOut').hide()
         $('#nav-gSignOut').hide()
      })
   }

   // function on click sign in
   $('#nav-signIn').on('click', () => {
      showHome()
      $('#signIn-container').show()
      $('#welcome').show()
      $("#signUpForm").hide()
      $('#nav-signIn').hide()
   })
  
    //show weather
    weather()

    // function on click sign in
    $('#nav-signIn').on('click', () => {
        $('#signIn-container').show()
        $('#welcome').show()
        $("#registerForm").hide()
        $('#nav-signIn').hide()
    })

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

   //function on click register by Navbar
   $("#nav-SignUp").on("click", function(el) {
      el.preventDefault()
      clear()
      $("div#signUpForm").show()
      $("#submitRegister").on("click", function(e) {
         e.preventDefault()
         register()
      })
   })

   //function on click register by SignIn
   $("#btn-register").on("click", function(el) {
      el.preventDefault()
      $('#nav-signIn').show()
      $("div#registerForm").show()
      $("#submitRegister").on("click", function(e) {
         e.preventDefault()
         register()
      })
   })


   
})
