const apiUser = "http://localhost:3000/user";
console.log(apiUser);
function login() {
    getDatabaseUser(checkLogin);
}

function getDatabaseUser(callback) {
    // fetch(apiUser).then(function (response) {
    //     return response.json().then(callback);
    // })
    fetch(apiUser)
        .then(function (response) {
            return response.json(); // Trả về một Promise chứa dữ liệu JSON
        })
        .then(function (data) {
            checkLogin(data); // Gọi hàm checkLogin với dữ liệu đã được chuyển đổi từ JSON
        });
}

function checkLogin(data) {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    let found = false;

    data.forEach((data) => {
        if (data.username == usernameInput && data.password == passwordInput) {
            found = true; 
            alert('Đăng nhập thành công');
            window.location.href = "farm.html";
        }
    });

    if (found==false) {
        alert('Tài khoản hoặc mật khẩu của bạn không đúng');
        window.location.href = "login.html";
    }
}



function signup() {
    createFrom();
}

function createUser(data) {
    fetch(apiUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
    }).then(function (response) {
        return response.json();
    })

    if(data) {
        alert('Đăng ký thành công');
        window.location.href = "login.html";
    }
}

function createFrom() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const user = {
        username : usernameInput.value,
        password : passwordInput.value
    };

    createUser(user);
}