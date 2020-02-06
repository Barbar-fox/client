// show hide element
let token = localStorage.getItem('token')
let gToken = localStorage.getItem('gToken')

function welcomePage() {
    $('#signIn-container').hide()
    $('#welcome').show()
    $('#nav-signIn').show()
    $('#nav-signOut').hide()
    $('#nav-gSignOut').hide()
    // $('#nav-gSignOut').show()
}

$(document).ready(() => { 
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
    } else {
        welcomePage()
        $('#logo').on('click', () => {
            welcomePage()
            $('#nav-signIn').show()
            $('#nav-signOut').hide()
            $('#nav-gSignOut').hide()
        })
    }

    $('#nav-signIn').on('click', () => {
        $('#signIn-container').show()
        $('#welcome').show()
    })

    $('#signIn-form').on('submit', (event) => {
        event.preventDefault()
        login()
    })

    $('#nav-signOut').on('click', () => {
        logout()
        // $('#welcome').show()
    })
})