// login register

function login() {
    console.log($('#login-email').val())
    console.log($('#login-password').val())
    $.ajax("http://localhost:3000/users/login", {
        method: 'POST',
        data: {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }
    })
        .done(response => {
            console.log(response.token)
            localStorage.setItem('token', response.token)
            $('#welcome').hide()
            $("#hotelListSignOut").show()
            fetchHotel()
            $('#signIn-container').hide()
            $('#nav-signIn').hide()
            signOutCondition()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete')
        })
}

function logout() {
    localStorage.clear()
    location.reload(true)
    var auth2 = gapi.auth2.getAuthInstance()
localStorage.clear()
auth2.signOut().then(function () {
    location.reload(true)
    console.log('User signed out.')
})
}

function onSignIn(googleUser) {

    var token = googleUser.getAuthResponse().id_token;
    console.log(token)
    
    localStorage.setItem('gToken', token)

    $.ajax("http://localhost:3000/users/gSignIn", {
        method: 'POST',
        headers: {
            idToken: token
        }
    })
        .done(response => {
            console.log(response.token)
            localStorage.setItem('token', response.token)
            $('#welcome').hide()
            $("#hotelListSignOut").show()
            fetchHotel()
            $('#signIn-container').hide()
            $('#nav-signIn').hide()
            signOutCondition()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            console.log('complete g-sign-in')
        })
  }

function signOut() {
var auth2 = gapi.auth2.getAuthInstance()
localStorage.clear()
auth2.signOut().then(function () {
    location.reload(true)
    console.log('User signed out.')
})
}

function register() {
   // console.log("success")
   $.ajax({
      method: "POST",
      url : "http://localhost:3000/users/register",
      data : {
         name : $("#registerName").val(),
         email : $("#registerEmail").val(),
         password : $("#registerPassword").val()
      }
   })
      .done(user => {
         console.log("success register")
         // console.log(user)
         $("#signUpForm").hide()
         $('#nav-signIn').show()
         $("#signIn-form").show()
         // $("div#") PERGI KE LOGIN
      })
      .fail(err => {
         console.log("fail register")
         console.log(err)
      })



}