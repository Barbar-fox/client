// access api
function authenticationFetch() {
   let tableNameId
   if(localStorage.token) {
      tableNameId = "showListOfHotel"
   } else {
      tableNameId = "showListOfHotel2"
   }
   fetchHotel(tableNameId)
}

function fetchHotel(tableNameId) {
   $.ajax({
      method: 'GET',
      url : "http://localhost:3000/hotels",
   })
      .done(hotels => {
         hotels.forEach(hotel => {
            $(`#${tableNameId}`).append(
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
         bookings.forEach(Booking => {
            $("#showListOfBooking").append(
               `
               <tr>
                  <td>${Booking.name}</td>
                  <td>${Booking.location}</td>
                  <td>${Booking.price}</td>
                  <td>${Booking.date}</td>
                  <td class="text-center">
                     <a class="btn btn-info" href="#" onclick="getModalBookingDetail(${hotel.id})">Detail</a>
                  </td>
               </tr>
               `
            )
         })
      })
}

function getModalBookingDetail(id) {
   $.ajax({
      method: 'GET',
      url : `http://localhost:3000/bookings/${id}`,
      headers : {
         token : localStorage.token
      }
   })
   .done(booking => {
      console.log("success get booking detail")
      // console.log(booking)
      $("#bookingDetail").append(
         `
         <label>Hotel</label>
         <input readonly>${booking.name}<br>
         <label>Location</label>
         <input readonly>${booking.location}<br>
         <label>Price</label>
         <input readonly>${booking.price}<br>
         <label>Booking Date</label>
         <input readonly>${booking.date}<br>
         <label>Restaurant near place</label>
         <input readonly>${booking.resto}<br>
         <label>Weather</label>
         <input readonly>${booking.weather}<br>
         <a class="btn btn-info" href="#" onclick="getUpdateModalBooking(${booking.id})">Change Booking Date</a>
         <small>Dengan mengganti tanggal maka staff akan mengecek ketersediaan dan akan dikenai biaya tambahan</small><br>
         <a class="btn btn-info" href="#" onclick="cancelBooking(${booking.id})">Cancel Booking</a>
         <small>Dengan membatalkan maka akan dikenai charge</small>
         `
      )
   })
   .fail(err => {
      console.log("failed get booking detail")
      console.log(err)
   })
}

function getUpdateModalBooking(id) {
   $.ajax({
      method: 'GET',
      url : `http://localhost:3000/bookings/${id}`,
      headers : {
         token : localStorage.token
      }
   })
   .done(booking => {
      console.log("success update booking detail")
      // console.log(booking)
      $("#bookingUpdate").append(
         `
         <small>Change booking date</small>
         <label>Booking Date</label>
         <input type="date">${booking.date}<br>

         <small>Hotel detail</small>
         <label>Hotel</label>
         <input readonly> ${booking.name}<br>
         <label>Location</label>
         <input readonly>${booking.location}<br>
         <label>Price</label>
         <input readonly>${booking.price}<br>
         <a class="btn btn-info" href="#" onclick="confirmUpdate(${booking.id}, ${booking.date})">Change Booking Date</a>
         <small>Dengan mengganti tanggal maka staff akan mengecek ketersediaan dan akan dikenai biaya tambahan</small><br>
         <a class="btn btn-info" href="#" onclick="showModalCancelBooking(${booking.id})">Cancel Booking</a>
         <small>Dengan membatalkan maka akan dikenai charge</small>
         `
      )
   })
   .fail(err => {
      console.log("failed get booking detail")
      console.log(err)
   })
}

function confirmUpdate(id, newDate) {
   $.ajax({
      url: `http://localhost:3000/bookings/${id}`,
      method: 'PUT',
      data: {
         date : newDate
      }
   })
      .done(booking => {
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
   $("#modalCancelBooking").show()
   $("#cancelBookingConfirm").on("click", function(el) {
      el.preventDefault()
      cancelBooking(id)
   })
}

function cancelBooking(id) {
   $.ajax({
      method: 'DELETE',
      url : `http://localhost:3000/books/${id}`,
      headers : {
         token : localStorage.token
      }
   })
   .done(booking => {
      console.log("delete success")
      console.log(booking)
      $("#modalCancelBooking").hide()
   })
   .fail(err => {
      console.log("delete failed")
      console.log(err)
   })
}


$(document).ready(function() {
   
})