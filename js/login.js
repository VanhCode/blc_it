
function getAllUser() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-api-key":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5MGE5MTNhZC1jNDI3LTQ1ODctYWUwMC02M2VkNTBhMDNhOTYiLCJzdWIiOiJhOWU1OGI2ZS02OWZmLTQyOTYtOTM5MS0xZGRhMDQ4ZjQ3N2QiLCJpYXQiOjE3MDQ1MTIzOTJ9.dlTU8amMIRMpx3jBnMDwEnH5Rg1NQxnLLXEyur985Cc",
        },
    };

    return fetch("https://api.gameshift.dev/users", options)
        .then((response) => response.json())
        .catch((err) => console.error(err));
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

    if (found == false) {
        alert('Tài khoản hoặc mật khẩu của bạn không đúng');
        window.location.href = "login.html";
    }
}



function signup() {
    createFrom();
}

function loginUser() {
    const userForm = document.getElementById('form-login')
    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email_user = document.getElementById('email_user');

        const user = encodeURIComponent(email_user.value);
        // console.log(user);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5MGE5MTNhZC1jNDI3LTQ1ODctYWUwMC02M2VkNTBhMDNhOTYiLCJzdWIiOiJhOWU1OGI2ZS02OWZmLTQyOTYtOTM5MS0xZGRhMDQ4ZjQ3N2QiLCJpYXQiOjE3MDQ1MTIzOTJ9.dlTU8amMIRMpx3jBnMDwEnH5Rg1NQxnLLXEyur985Cc'
            }
        };

        fetch('https://api.gameshift.dev/users/' + user, options)
            .then(response => response.json())
            .then(response => {
                const { referenceId, address, email } = response;

                if (email === email_user.value) {
                    // Lưu email vào local storage
                    localStorage.setItem('userEmail', email_user.value);
                    console.log(localStorage);
                    alert("Đăng nhập thành công");
                    window.location.href = "farm.html";
                } else {
                    // console.log('Email không tồn tại');
                    alert("Email không tồn tại");
                }
            }

            )
            .catch(err => console.error(err));
    });
}


// Đăng kí
function create_user() {
    const userForm = document.getElementById('userForm')
    if (userForm) {
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('username');
            console.log(emailInput.value);
            const user = {
                referenceId: emailInput.value,
                email: emailInput.value
            }

            const newUsers = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI5MGE5MTNhZC1jNDI3LTQ1ODctYWUwMC02M2VkNTBhMDNhOTYiLCJzdWIiOiJhOWU1OGI2ZS02OWZmLTQyOTYtOTM5MS0xZGRhMDQ4ZjQ3N2QiLCJpYXQiOjE3MDQ1MTIzOTJ9.dlTU8amMIRMpx3jBnMDwEnH5Rg1NQxnLLXEyur985Cc',
                    'content-type': 'application/json'
                },
            };

            fetch('https://api.gameshift.dev/users', newUsers)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));
        });
    }
}


async function main() {
    let Alluser = await getAllUser();

    // console.log(Alluser);

    create_user()
    loginUser()

}
main();

console.log(localStorage);