// login register

function register() {
   // console.log("success")
   $.ajax({
      method: "POST",
      url : "http://localhost:3000/register",
      data : {
         name : $("#registerName").val(),
         email : $("#registerEmail").val(),
         password : $("#registerPassword").val()
      }
   })
      .done(user => {
         console.log("success register")
         // console.log(user)
         $("div#signUpForm").hide()
         // $("div#") PERGI KE LOGIN
      })
      .fail(err => {
         console.log("fail register")
         console.log(err)
      })



}



