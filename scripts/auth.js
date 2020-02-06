// login register

function register() {
   console.log("success")
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
         console.log(user)
         $("div#registerForm").hide()
      })
      .fail(err => {
         console.log("fail register")
         console.log(err)
      })



}



