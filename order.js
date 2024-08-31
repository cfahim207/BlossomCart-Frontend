const handleOrder = (id) => {
    const coustomer_id = localStorage.getItem("coustomer_id");
    const token = localStorage.getItem("token");
    const data = {
        flower: id,
        coustomer: coustomer_id
    }
    console.log(data)
    if (token) {
        fetch("https://blossomcart.onrender.com/order/list/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Order Successful.. Please check your mail..")
                window.location.href = "dashboard.html";


            });
    }
    else {
        alert("Please Login First");
        window.location.href = "login.html";
    }
    

}