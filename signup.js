const handleregistration = (event) => {
    event.preventDefault();
    const username = getinfo("username");
    const first_name = getinfo("first_name");
    const last_name = getinfo("last_name");
    const email = getinfo("email");
    const mobile_no = getinfo("mobile");
    const password = getinfo("password");
    const confirm_password = getinfo("confirm_password");

    const info = {
        username, first_name, last_name, email, mobile_no, password, confirm_password,
    };

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                password
            )
        ) {
            console.log(JSON.stringify(info));
            fetch("https://blossomcart.onrender.com/coustomer/register/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(info),
            })
                .then((res) => res.json())
                .then((data) => {
                    
                    console.log(data);
                    if (data) {
                        document.getElementById("error").innerText =
                            "Please Check Your Email For Confirmation";
                        alert("Please Check Your Email For Confirmation");
                        
                    }
                });
        } else {
            document.getElementById("error").innerText =
                "***pass must contain eight characters, at least one letter, one number and one special character***";
        }
    }

    else {
        document.getElementById("error").innerText =
            "***password and confirm password do not match***";
        alert("password and confirm password do not match");
    }



}

const getinfo = (id) => {
    const value = document.getElementById(id).value;
    return value;
}


const handleLogin = (event) => {
    event.preventDefault();
    const username = getinfo("login-username");
    const password = getinfo("login-password");
    
    if ((username, password)) {

        fetch("https://blossomcart.onrender.com/coustomer/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.token && data.user_id && data.coustomer_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    localStorage.setItem("coustomer_id", data.coustomer_id);
                    window.location.href = "index.html";
                    alert("Login Successfully!!! **Welcome To BlossomCart**");
                }
            });
    }
    
};

const handlelogOut = () => {
    const token = localStorage.getItem("token");

    fetch("https://blossomcart.onrender.com/coustomer/logout/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {

            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            localStorage.removeItem("coustomer_id");
            window.location.href = "login.html";
        });
};



// Deposit

const handledeposit = (event) => {
    event.preventDefault();
    const coustomer_id = localStorage.getItem("coustomer_id");
    const amount = getinfo("amount");
    const token = localStorage.getItem("token");
    const data = {
        coustomer: coustomer_id,
        amount:amount
    }
    console.log(data);
    if (token) {

        if (amount >= 500) {
            fetch("https://blossomcart.onrender.com/coustomer/deposite/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {

                    alert("Deposite Successfully")
                    window.location.href = "index.html";

                });
        }
        else {
            alert("You can't deposit less then 500");
        }
    }
    else {
        alert("Please Login First");
        window.location.href = "login.html";
    }


}
