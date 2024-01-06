

function getAllUser() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-api-key":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2YmY0NjU2Yy0wY2Q1LTRiNTgtYTJiMy05NDMyOTM2Yjg2YmMiLCJzdWIiOiI1YTk5NjEzZi0wNjUwLTQ5MTgtYmYxYy1iMGViMzc4OTU3N2QiLCJpYXQiOjE3MDQ1MTEzMDl9.oDbn6dEHLnrkstptlVgCES0Ey17xHcgBDRIJQehCvho",
        },
    };

    return fetch("https://api.gameshift.dev/users", options)
        .then((response) => response.json())
        .catch((err) => console.error(err));
}


function loginUser() {
    const userForm = document.getElementById('form-login')
    if (userForm) {
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email_user = document.getElementById('email_user');

            const user = encodeURIComponent(email_user.value);
            // console.log(user);

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2YmY0NjU2Yy0wY2Q1LTRiNTgtYTJiMy05NDMyOTM2Yjg2YmMiLCJzdWIiOiI1YTk5NjEzZi0wNjUwLTQ5MTgtYmYxYy1iMGViMzc4OTU3N2QiLCJpYXQiOjE3MDQ1MTEzMDl9.oDbn6dEHLnrkstptlVgCES0Ey17xHcgBDRIJQehCvho'
                }
            };

            fetch('https://api.gameshift.dev/users/' + user, options)
                .then(response => response.json())
                .then(response => {
                    const { referenceId, address, email } = response;

                    if (email === email_user.value) {
                        localStorage.setItem('userEmail', email_user.value);
                        console.log(localStorage);
                        alert("Đăng nhập thành công");
                        window.location.href = "farm.html"

                    } else {
                        alert("Email không tồn tại");
                    }
                }

                )
                .catch(err => console.error(err));
        });
    }
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
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2YmY0NjU2Yy0wY2Q1LTRiNTgtYTJiMy05NDMyOTM2Yjg2YmMiLCJzdWIiOiI1YTk5NjEzZi0wNjUwLTQ5MTgtYmYxYy1iMGViMzc4OTU3N2QiLCJpYXQiOjE3MDQ1MTEzMDl9.oDbn6dEHLnrkstptlVgCES0Ey17xHcgBDRIJQehCvho',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            };

            fetch('https://api.gameshift.dev/users', newUsers)
                .then(response => response.json())
                .then(async response => {
                    if (response.statusCode > 0) {
                        alert("Tài khoản đã tồn tại");
                        window.location.href = "signup.html";
                    } else {
                        await createPlotItem(emailInput.value);
                        alert("Đăng kí thành công");
                        window.location.href = "login.html";
                    }
                })
                .catch(err => console.error(err));
        });
    }
}

function createPlotItem(referenceId) {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2YmY0NjU2Yy0wY2Q1LTRiNTgtYTJiMy05NDMyOTM2Yjg2YmMiLCJzdWIiOiI1YTk5NjEzZi0wNjUwLTQ5MTgtYmYxYy1iMGViMzc4OTU3N2QiLCJpYXQiOjE3MDQ1MTEzMDl9.oDbn6dEHLnrkstptlVgCES0Ey17xHcgBDRIJQehCvho",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            details: {
                attributes: [
                    {
                        traitType: "plot_status",
                        value: "null",
                    },
                ],
                description: "plot",
                imageUrl:
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjc7Ah4Ol_cLTqt-78GEtWfvPv3PuqYZ-8CgBHTWyyy-zUf-AiuAxJ_H7YhyOffejL5wCSW_HxCRiZO0HWPC3lrV1iSXVH7mBrbrOKuT-ExZg5q-ty6XeVDuW5VamiI3vACg0Wp3bx3skhSOiZtZdHUgHd090NKNp2gaBhAf9re-kIEuOMz0bafpK3GLTE/s1600/dat.png",
                name: "plot",
            },
            destinationUserReferenceId: referenceId,
        }),
    };

    return fetch("https://api.gameshift.dev/assets", options)
        .then((response) => response.json())
        .catch((err) => console.error(err));
}


async function main() {
    let Alluser = await getAllUser();

    // console.log(Alluser);

    create_user()
    loginUser()

}
main();

const btnLogout = document.querySelector('#logout')
if (btnLogout) {
    btnLogout.addEventListener('click', function () {
        const isConfirmed = window.confirm('Bạn có chắc muốn đăng xuất?');

        if (isConfirmed) {
            logout();
        }
    })
}

function logout() {
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

console.log(localStorage);

