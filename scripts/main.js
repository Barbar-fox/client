// show hide element

let token = localStorage.getItem('token')
let gToken = localStorage.getItem('gToken')

function welcomePage() {
    $('#signIn-container').hide()
    $('#registerForm').hide()
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
    })

   //function on click register
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
