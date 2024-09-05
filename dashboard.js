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
                    <h5>Username: ${items.username}</h5>
                    <h2>Name: ${items.first_name} ${items.last_name}</h2>
                    <p>Email: ${items.email}</p>
                    <p>Created On: ${items.date_joined}</p>
                </div>
    `;
    

};


const handleCategory = () => {
    fetch("http://127.0.0.1:8000/flower/category/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("category");
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
            ;
                
            });
        });
};


const handlecolor = () => {
    fetch("http://127.0.0.1:8000/flower/color/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("color");
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
            ;
                
            });
        });
};



handleAddFlower = async (event) => {
    event.preventDefault();
    const selectedCategory = Array.from(document.getElementById("category").selectedOptions).map(option => 
    option.value
    )
    const selectedcolor = Array.from(document.getElementById("color").selectedOptions).map(option => 
    option.value
    )
    
    const name = getdata("name");
    const price = getdata("price");

    const image_file = document.getElementById("flower_image").files[0];
    if (image_file) {
        const imgFormData = new FormData();
        imgFormData.append('image', image_file);
        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5cb9b4e07adda01b2e7f1ca548a925bc', {
            method: 'POST',
            body: imgFormData
        });
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.status === 200) {
            console.log("inside");
            imageUrl = imgbbData.data.url;
            console.log(imageUrl);
        } else {
            alert('Image upload failed!');
            return;
        }
    }
    const flowerData = {
        category: selectedCategory,
        color: selectedcolor,
        image: imageUrl,
        name: name,
        price: price,
    }
    console.log(flowerData);
    

    fetch("http://127.0.0.1:8000/flower/list/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(flowerData),
    })
        .then((res) => res.json())
        .then((data) => {

            if (data) {
                alert("Successfully add flower");
            }
            
        });
}


const getdata = (id) => {
    const value = document.getElementById(id).value;
    return value;
}



handleUser();
handleCategory();
handlecolor();









