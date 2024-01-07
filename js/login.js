const API_KEYL =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyNWRkZTkxYy1mMzUzLTQ2ODMtODdmYi05MzVlNzcxZWVhNjMiLCJzdWIiOiI4MTcwOThhOS05ODA1LTQ2YmQtOTQzZC0wODljZDAyYjBjMTgiLCJpYXQiOjE3MDQ2NDQ2NTN9.6yeE2wLDXTWCmVN1VFZ6NHLXtIIr_SH0SVfIOznzHsQ";
function getAllUser() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEYL,
    },
  };

  return fetch("https://api.gameshift.dev/users", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function loginUser() {
  const userForm = document.getElementById("form-login");
  if (userForm) {
    userForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email_user = document.getElementById("email_user");

      const user = encodeURIComponent(email_user.value);
      // console.log(user);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": API_KEYL,
        },
      };

      fetch("https://api.gameshift.dev/users/" + user, options)
        .then((response) => response.json())
        .then((response) => {
          const { referenceId, address, email } = response;

          if (email === email_user.value) {
            localStorage.setItem("userEmail", email_user.value);
            console.log(localStorage);
            alert("Đăng nhập thành công");
            window.location.href = "farm.html";
          } else {
            alert("Email không tồn tại");
          }
        })
        .catch((err) => console.error(err));
    });
  }
}

// Đăng kí
function create_user() {
  const userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = document.getElementById("username");
      console.log(emailInput.value);
      const user = {
        referenceId: emailInput.value,
        email: emailInput.value,
      };

      const newUsers = {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-api-key": API_KEYL,
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      };

      fetch("https://api.gameshift.dev/users", newUsers)
        .then((response) => response.json())
        .then(async (response) => {
          if (response.statusCode > 0) {
            alert("Tài khoản đã tồn tại");
            window.location.href = "signup.html";
          } else {
            await createPlotItem(emailInput.value);
            await createUserMoney(emailInput.value);
            alert("Đăng kí thành công");
            window.location.href = "login.html";
          }
        })
        .catch((err) => console.error(err));
    });
  }
}

// Khi tạo tài khoản thì có tiền 5k $
function createUserMoney(referenceId, money = 5000) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEYL,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      details: {
        attributes: [{ traitType: "money", value: money.toString() }],
        imageUrl:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGPPBAJuP63NuXju3O5-UyjCHBLe994UCZAghszHZaH2I-QEaR8vatbTx4nL9EqkRryx4USoRro3DFQKbZTm30wI8v1ZBgCAsZ30w8VTZbX4kY6Flu_dGcHcPsK-xVDfi2o_1nw3poN_DGHfi81mKKX2FnMDvcdma3lFNt9jDCtfIq-oUCYyQGjKIY07o/s320/money.gif",
        name: "tiền",
        description: "Tiền mua bán",
      },
      destinationUserReferenceId: referenceId,
    }),
  };

  return fetch("https://api.gameshift.dev/assets", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function createPlotItem(referenceId) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEYL,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      details: {
        attributes: [
          {
            traitType: "plot_status",
            value: "plot ready",
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

function coinItem() {}

async function main() {
  let Alluser = await getAllUser();

  // console.log(Alluser);

  create_user();
  loginUser();
}
main();

const btnLogout = document.querySelector("#logout");
if (btnLogout) {
  btnLogout.addEventListener("click", function () {
    const isConfirmed = window.confirm("Bạn có chắc muốn đăng xuất?");

    if (isConfirmed) {
      logout();
    }
  });
}

function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}

console.log(localStorage);
