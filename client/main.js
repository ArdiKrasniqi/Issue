const URL = 'http:/localhost:3000/';
$('#signUp').click(() => {
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    if (password !== confirmPassword) {
        alert('Password dont match')
        return;
    }
    let obj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: password
    }
    $.ajax({
        url: URL + 'user',
        method: 'POST',
        data: obj,
        success: (response) => {
            console.log(response);
            alert('Sign Up was succesful plase log in');
            $('#firstName').val('');
            $('#lastName').val('');
            $('#email').val('');
            $('#password').val('');
            $('#confirmPassword').val('');
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$('#logIn').click(() => {
    console.log('aa');

    let obj = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
    }
    $.ajax({
        url: 'login',
        method: 'POST',
        data: obj,
        success: (response) => {
            if (response.loggedIn == true) {
                alert(response.message);
                localStorage.setItem('loggedIn', response.loggedIn)
                console.log(response);
                window.location.href = "dashboard.html"
            }
        },
        error: (err) => {
            console.log(err);
        }
    })

})
