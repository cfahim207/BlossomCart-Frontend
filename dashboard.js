// Function to fetch data from the Dashboard API
const handleUser = () => {
    const token = localStorage.getItem("token");

    fetch('https://blossomcart.onrender.com/coustomer/userdetails/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.is_superuser) {
                // Show admin-specific content
                handleAdminDashboard();
                document.getElementById("admin_user").innerHTML = "Admin Dashboard";
                document.getElementById("customer_user").innerHTML = ` <a class="nav - link active" href="#" onclick="showSection('customers')">Customers</a>`
                document.getElementById("flower-user").innerHTML = ` <a class="nav-link" href="#" onclick="showSection('flowers')">Flowers</a>`
                document.getElementById("contact_user").innerHTML = ` <a class="nav-link" href="#" onclick="showSection('contactMessages')">Contact Messages</a>`
                document.getElementById("review_user").innerHTML = ` <a class="nav-link" href="#" onclick="showSection('Reviews')">All Reviews</a>`
            } else {
                // Show normal user content
                loadUserDashboard();
                document.getElementById("admin_user").innerHTML = "User Dashboard";
                document.getElementById("customer_user").innerHTML = "";
                document.getElementById("flower-user").innerHTML = "";
                document.getElementById("contact_user").innerHTML = "";
                document.getElementById("review_user").innerHTML = "";
            }
        })
}

const handleAdminDashboard = () => {
    const token = localStorage.getItem("token");
    
    fetch("https://blossomcart.onrender.com/coustomer/dashboard/", {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            "content-type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
                loadOrders(data.orders);
                loadDeposit(data.deposite);
                loadCoustomer(data.coustomer);
                loadflowers(data.flower);
                loadContact(data.contactus);
                loadAllReview(data.review);  
                loadProfile(data.user);
        });
}


const loadUserDashboard = () => {
    const token = localStorage.getItem("token");

    fetch("https://blossomcart.onrender.com/coustomer/dashboard/", {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            "content-type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {
            loadProfile(data.user);
            loadOrders(data.orders);
            loadDeposit(data.deposite);
        });
}

const loadCoustomer = (items) => {
    items.forEach((item) => {
        console.log(item);
        const parent = document.getElementById("Coustomers")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.user}</td>
                <td>${item.mobile_no}</td>
                <td>${item.image}</td>
                <td>${item.balance}</td>
        
        `;
        parent.appendChild(tr);


    })
    
}
const loadOrders = (items) => {
    items.forEach((item) => {
        console.log(item);
        const parent = document.getElementById("orders")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.flower}</td>
                <td>${item.coustomer}</td>
                <td>${item.order_status}</td>
                <td class="btn">❌</td>
        
        `;
        parent.appendChild(tr);


    })
    
}

const loadDeposit = (items) => {
    items.forEach((item) => {
        console.log(item);
        const parent = document.getElementById("deposits")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.coustomer}</td>
                <td>${item.amount}</td>
                <td>${item.timestamp}</td>
        
        `;
        parent.appendChild(tr);


    })
    
}
const loadflowers = (items) => {
    items.forEach((item) => {
        console.log(item);
        const parent = document.getElementById("flowerDetails")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                ${item?.category?.map((c) => {
            return `${c}`
        })}
                <td>
                ${item?.color?.map((c) => {
            return `${c}`
        })}
                </td>
                <td>${item.price}</td>
        
        `;
        parent.appendChild(tr);


    })
    
};

const loadContact = (items) => {
    items.forEach((item) => {
        console.log(item);
        const parent = document.getElementById("contactUs")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${item.problem}</td>
        
        `;
        parent.appendChild(tr);


    })
};
const loadAllReview = (items) => {
    items.forEach((item) => {
        console.log(item);
        const parent = document.getElementById("AllReview")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.image}</td>
                <td>${item.flower}</td>
                <td>${item.body}</td>
                <td>${item.rating}</td>
                <td>${item.created}</td>
                
        
        `;
        parent.appendChild(tr);


    })
};




const loadProfile = (items) => {
    const parent = document.getElementById("profiles")
        
    parent.innerHTML = `
       <img src="images/profile.webp" alt="Profile Picture" class="profile-img">
                <div class="profile-info">
                    <h5>${items.username}</h5>
                    <h2>${items.first_name} ${items.last_name}</h2>
                    <p>${items.email}</p>
                    <p>${items.date_joined}</p>
                </div>
    `;
    

};










handleUser();









