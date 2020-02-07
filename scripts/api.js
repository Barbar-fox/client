// access api
// function authenticationFetch() {
//    let tableNameId
//    if(localStorage.token) {
//       tableNameId = "showListOfHotel"
//    } else {
//       tableNameId = "showListOfHotel2"
//    }
//    fetchHotel(tableNameId)
// }

function fetchHotel() {
   $.ajax({
      method: 'GET',
      url : "http://localhost:3000/hotels",
   })
      .done(hotels => {
         hotels.forEach(hotel => {
            console.log('success in fetch')
            $(`#showListOfHotel2`).append(
               `
               <tr>
                  <td>${hotel.name}</td>
                  <td>${hotel.location}</td>
                  <td>${hotel.price}</td>
                  <td class="text-center">
                     <a class="btn btn-info" href="#" onclick="getBookingForm(${hotel.id})">Book</a>
                  </td>
               </tr>
               `
            )
         })
      })
      .fail(err => {
         console.log('error di fetch')
         console.log(err)
      })
}

function getBookingForm(id) {
   if(localStorage.token) {
      //Ke Form Book
   } else {
      //Ke Form Login
   }
}

function fetchBooking() {
   $.ajax({
      method: 'GET',
      url : "http://localhost:3000/bookings",
      headers : {
         token : localStorage.token
      }
   })
      .done(bookings => {
         // console.log(bookings.data.length)
         if(bookings.data.length === 0) {
            $("#showListOfBooking").html(
            `
               <tr>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td class="text-center">
                     <a class="btn btn-info" href="#">N/A</a>
                  </td>
               </tr>
            `) 
         } else {
         // console.log(bookings.data[0].UserHotels)
            let data = ``              
            bookings.data[0].UserHotels.forEach(Booking => {
               data +=  `<tr>
                  <td>${Booking.Hotel.name}</td>
                  <td>${Booking.Hotel.location}</td>
                  <td>${Booking.Hotel.price}</td>
                  <td>${Booking.date}</td>
                  <td class="text-center">
                     <a class="btn btn-info" href="#" onclick="getModalBookingDetail(${Booking.id})">Detail</a>
                  </td>
               </tr>
               `
            })
            $("#showListOfBooking").html(data)
         }
      })
      .fail(err => {
         console.log('error fetch booking')
         console.log(err)
      })
}

function getModalBookingDetail(id) {
   $("#bookingList").hide()
   $("#modalBookingDetail").show()
   $.ajax({
      method: 'GET',
      url : `http://localhost:3000/bookings/${id}`,
      headers : {
         token : localStorage.token
      }
   })
   .done(booking => {
      // console.log("success get booking detail")
      // console.log(booking.Hotel.name)
      let zomato =  []
      booking.resto.forEach((restaurant, i) => {
         if(i<5) {
            zomato.push(restaurant.title)
         }
         
      })
      $("#bookingDetail").html(
         `
         <label>Booking Date</label>
         <input readonly value="${convertDate(booking.date)}"><br>
         <label>Change Date</label>
         <input type="date" id="updateDate"><br><br>

         <label>Hotel</label>
         <input type="text" readonly value="${booking.Hotel.name}"><br>
         <label>Location</label>
         <input readonly value="${booking.Hotel.location}"><br>
         <label>Price</label>
         <input readonly value="${booking.Hotel.price}"><br>
         <label>Restaurant near place</label>
         <input readonly value="${zomato.join(',')}"><br>
         <label>Weather</label>
         <input readonly value="${booking.weather}"><br>
         <small>${booking.holiday.isHoliday ? "anda kena harga tambahan karena hari libur" : "" }</small><br>
         <a class="btn btn-info" onclick="confirmUpdate(${booking.id}, ${booking.HotelId})">Change Booking Date</a><br>
         <small>Dengan mengganti tanggal maka staff akan mengecek ketersediaan dan akan dikenai biaya tambahan</small><br>
         <a class="btn btn-info" href="#" onclick="showModalCancelBooking(${booking.id})">Cancel Booking</a><br>
         <small>Dengan membatalkan maka akan dikenai charge</small>
         `
      )
   })
   .fail(err => {
      console.log("failed get booking detail")
      console.log(err)
   })
}

// function getUpdateModalBooking(id) {
//    $("modalBookingDetail").hide()
//    $("modalBookingUpdate").show()
//    $.ajax({
//       method: 'GET',
//       url : `http://localhost:3000/bookings/${id}`,
//       headers : {
//          token : localStorage.token
//       }
//    })
//    .done(booking => {
//       console.log("success update booking detail")
//       console.log(booking)
//       $("#bookingUpdate").append(
//          `
//          <label>Booking Date</label>
//          <input value="${booking.date}"><br>
         
//          <label>Hotel</label>
//          <input readonly value="${booking.Hotel.name}"><br>
//          <label>Location</label>
//          <input readonly value="${booking.Hotel.location}"><br>
//          <label>Price</label>
//          <input readonly value="${booking.Hotel.price}"><br>
         
//          <a class="btn btn-info" href="#" onclick="confirmUpdate(${booking.id}, ${booking.HotelId}, ${booking.date})">Change Booking Date</a>
//          <small>Dengan mengganti tanggal maka staff akan mengecek ketersediaan dan akan dikenai biaya tambahan</small><br>
//          <a class="btn btn-info" href="#" onclick="showModalCancelBooking(${booking.id})">Cancel Booking</a>
//          <small>Dengan membatalkan maka akan dikenai charge</small>
//          `
//       )
//    })
//    .fail(err => {
//       console.log("failed get booking detail")
//       console.log(err)
//    })
// }

function confirmUpdate(id, HotelId) {
   console.log('confirm')
   $.ajax({
      url: `http://localhost:3000/bookings/${id}`,
      method: 'PUT',
      headers : {
         token : localStorage.token
      },
      data: {
         HotelId,
         date : convertDate($("#updateDate").val())
      }
   })
      .done(booking => {
         console.log(booking)
         console.log("update success")
         $("#modalBookingUpdate").hide()
         $("#bookingList").show()
      })
      .fail(err => {
         console.log("update failed")
         console.log(err)
      })
}

function showModalCancelBooking(id) {
   $("#modalBookingUpdate").hide()
   $("#modalBookingDetail").hide()
   $("#modalCancelBooking").show()
   $("#cancelBookingConfirm").on("click", function(el) {
      el.preventDefault()
      cancelBooking(id)
   })
}

function cancelBooking(id) {
   $.ajax({
      method: 'DELETE',
      url : `http://localhost:3000/bookings/${id}`,
      headers : {
         token : localStorage.token
      }
   })
   .done(booking => {
      console.log("delete success")
      console.log(booking)
      $("#modalCancelBooking").hide()
      fetchBooking()
      $("#bookingList").show()
   })
   .fail(err => {
      console.log("delete failed")
      console.log(err)
   })
}

function convertDate (date) {
   return `${new Date(date).getFullYear()}/${new Date(date).getMonth()}/${new Date(date).getDate()}`
}
function getBookingForm(hotelId) {
   $("#hotelListSignOut").hide()
   $("#form-booking").show()

   $.ajax({
      method: 'GET',
      url : `http://localhost:3000/hotels/${hotelId}`
   })
   .done(hotel => {
      console.log(hotel)
      $("#form-booking").empty()
      $("#form-booking").append(
         `
            <h5>Booking Form</h5>
            <label>Hotel:</label>
            <input class="form-control" readonly type="text" id="hotelName" value="${hotel.name}"></input>
            <label>Location</label>
            <input class="form-control" readonly type="text" id="hotelLocation" value="${hotel.location}"></input>
            <label>Price:</label>
            <input class="form-control" readonly type="text" id="hotelPrice" value="${hotel.price}"></input>
            <label for="bookDate">mulai menginap tanggal:</label>
            <input class="form-control" type="date" id="bookDate"></input>

            <input class="btn btn-dark mt-3" type="submit" value="Booking" onclick="booking(${hotel.id})"></input>
         `
      )
   })
   .fail(err => {
      console.log("failed get hotel")
      console.log(err)
   })
}

function booking(hotelId) {
   $.ajax({
      method: 'POST',
      url : `http://localhost:3000/bookings`,
      headers: {
         token: localStorage.getItem('token')
      },
      data: {
         HotelId : hotelId,
         date: $("#bookDate").val()
      }
   })
   .done(response => {
      console.log('success booking')
      $("#form-booking").hide()
      $('#bookingList').show()
   })
   .fail(err => {
      console.log("failed get hotel")
      console.log(err)
   })
}

