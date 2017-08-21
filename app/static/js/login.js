$(document).ready(function() {
    $('#login').submit(function(e) {
        console.log('button clicked');
        var email = $('#login-email').val();
        var password = $('#login-password').val();
        if(email == "") {
            console.log("invalid form");
            $('#login-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'> \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    Please enter a valid email address</div>");
            return false;
        } else if(password == "") {
            console.log("invalid form");
            $('#login-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    Please enter a password</div>");
            return false;
        } else {
            e.preventDefault();
            // AJAX -- LOGIN
            $.ajax({
                url: '/login',
                type: 'POST',
                data: {email: email, password: password},
                dataType: "json",
                success: function(response) {
                    console.log('in success');
                    console.log(response);
                    if(response.success) {
                        $('#login-alert').html("<div class='alert alert-success alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Success!</strong> \
                                    " + response.success + "</div>");
                        window.location.replace('/');
                    } else {
                        $('#login-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    " + response.error + "</div>");
                    }
                },
                error: function(response) {
                    // server error
                    console.log('in error');
                    $('#login-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    " + response.responseText + "</div>");
                }
            });
            /*
            console.log("form valid");
            console.log(email);
            console.log(password);
            */
        }
    });
    $('#register').submit(function(e) {
        var name = $('#register-name').val();
        var email = $('#register-email').val();
        var password = $('#register-password').val();
        var confirm = $('#register-confirm').val();
        if(name == "") {
            console.log("invalid form");
            $('#register-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'> \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    Please enter your name</div>");
            return false;
        }
        else if(email == "") {
            console.log("invalid form");
            $('#register-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'> \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    Please enter a valid email address</div>");
            return false;
        } else if(password == "") {
            console.log("invalid form");
            $('#register-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    Please enter a password</div>");
            return false;
        } else if(password != confirm) {
            console.log("invalid form");
            $('#register-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    Passwords do not match</div>");
            return false;
        } else {
            e.preventDefault();
            // AJAX -- REGISTER
            console.log("form valid");
            console.log(email);
            console.log(password);
            console.log(confirm);
            $.ajax({
                url: '/register',
                type: 'POST',
                data: {name: name, email: email, password: password},
                dataType: 'json',
                success: function(response) {
                    console.log(response);
                    if(response.success) {
                        $('#register-alert').html("<div class='alert alert-success alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Success!</strong> \
                                    " + response.success + "</div>");
                    } else {
                        $('#register-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    " + response.error + "</div>");
                    }
                },
                error: function(response) {
                    // server error
                    console.log('in error');
                    $('#register-alert').html("<div class='alert alert-danger alert-dismissible show' role='alert'>  \
                                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'> \
                                    <span aria-hidden='true'>&times;</span></button><strong>Error!</strong> \
                                    " + response.responseText + "</div>");
                }
            });
        }
    });
});