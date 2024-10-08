// Function to fetch data from the Dashboard API
const handleUser = () => {
    const token = localStorage.getItem("token");

    fetch('https://blossom-cart-8wo2.vercel.app/coustomer/userdetails/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
    
    fetch("https://blossom-cart-8wo2.vercel.app/coustomer/dashboard/", {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            "content-type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {
            
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

    fetch("https://blossom-cart-8wo2.vercel.app/coustomer/dashboard/", {
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
        const timestamp = `${item.timestamp}`;
        const date = new Date(timestamp);

        // Convert to human-readable format
        const humanReadableDate = date.toLocaleString();
        const parent = document.getElementById("deposits")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.coustomer}</td>
                <td>${item.amount}</td>
                <td>${humanReadableDate}</td>
        
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
                ${item?.category_display?.map((c) => {
                    return `${c}`;
                })}</td>
                <td>
               ${item?.color_display?.map((c) => {
                   return `${c}`;
               })}
        
                </td>
                <td>${item.price}</td>
                
                <td><button onclick="handleDeleteFlower(${item.id})" class="btn btn-danger mr-1">Delete</button><button onclick="handleEditFlower(${item.id})" class="btn btn-warning">Edit</button></td>
        
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

        const timestamp = `${item.created}`;
        const date = new Date(timestamp);

        // Convert to human-readable format
        const humanReadableDate = date.toLocaleString();

        const parent = document.getElementById("AllReview");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.image}</td>
            <td>${item.flower}</td>
            <td>${item.body}</td>
            <td>${item.rating}</td>
            <td>${humanReadableDate}</td>  <!-- Corrected line -->
        `;
        parent.appendChild(tr);
    });
};




const loadProfile = (items) => {
    const timestamp = `${items.date_joined}`;
    const date = new Date(timestamp);

    // Convert to human-readable format
    const humanReadableDate = date.toLocaleString();

    const parent = document.getElementById("profiles")
    parent.innerHTML = `
       <img src="images/profile.webp" alt="Profile Picture" class="profile-img">
                <div class="profile-info">
                    <h5>Username: ${items.username}</h5>
                    <h2>Name: ${items.first_name} ${items.last_name}</h2>
                    <p>Email: ${items.email}</p>
                    <p>Created On: ${humanReadableDate}</p>
                </div>
    `;
    

};


const handleCategory = () => {
    fetch("https://blossom-cart-8wo2.vercel.app/flower/category/")
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
    fetch("https://blossom-cart-8wo2.vercel.app/flower/color/")
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



const handleAddFlower = async (event) => {
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
    let imageUrl = "";
    if (image_file) {
        const imgFormData = new FormData();
        imgFormData.append('image', image_file);
        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5cb9b4e07adda01b2e7f1ca548a925bc', {
            method: 'POST',
            body: imgFormData
        });
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.status === 200) {
            imageUrl = imgbbData.data.url;
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
    

    await fetch("https://blossom-cart-8wo2.vercel.app/flower/list/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(flowerData),
    })
        .then((res) => res.json())
        .then((data) => {

            if (data) {
                window.location.href = "dashboard.html";
                alert("Successfully add flower");
            }
            
        });
}


const handleDeleteFlower = (flowerid) => {
    
    fetch(`https://blossom-cart-8wo2.vercel.app/flower/list/${flowerid}/`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {

            if (data) {
                window.location.href = "dashboard.html";
                alert("Flower deleted successfully");
            }
            
        });
}


const getdata = (id) => {
    const value = document.getElementById(id).value;
    return value;
}





// Update flower

const handleEditFlower = async (flowerId) => {
    // Fetch flower data by ID
    const response = await fetch(`https://blossom-cart-8wo2.vercel.app/flower/list/${flowerId}/`);
    const flower = await response.json();
    console.log('Fetched flower data:', flower);

    // Prefill the modal form
    document.getElementById("flowerId").value = flowerId;
    document.getElementById("editFlowerName").value = flower.name;
    document.getElementById("editFlowerPrice").value = flower.price;

    // Populate categories and colors select boxes (ensure options are loaded beforehand)
    await populateCategoriesAndColors();  // Ensure categories and colors are loaded

    // Set categories (assuming flower.category contains an array of category IDs)
    const categorySelect = document.getElementById("editFlowerCategory");
    Array.from(categorySelect.options).forEach(option => {
        console.log('Checking category option:', option.value);  // Debugging
        if (flower.category.includes(parseInt(option.value))) {
            option.selected = true;
        }
    });

    // Set colors (assuming flower.color contains an array of color IDs)
    const colorSelect = document.getElementById("editFlowerColor");
    Array.from(colorSelect.options).forEach(option => {
        console.log('Checking color option:', option.value);  // Debugging
        if (flower.color.includes(parseInt(option.value))) {
            option.selected = true;
        }
    });

    // Set image
    document.getElementById("editFlowerImagePreview").src = flower.image;

    // Show the modal
    const updateFlowerModal = new bootstrap.Modal(document.getElementById('updateFlowerModal'));
    updateFlowerModal.show();

    // Handle form submission
    document.getElementById("updateFlowerForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const flowerId = document.getElementById("flowerId").value;
        const name = document.getElementById("editFlowerName").value;
        const price = document.getElementById("editFlowerPrice").value;
        const selectedCategory = Array.from(document.getElementById("editFlowerCategory").selectedOptions).map(option => option.value);
        const selectedColor = Array.from(document.getElementById("editFlowerColor").selectedOptions).map(option => option.value);

        let imageUrl = document.getElementById("editFlowerImagePreview").src;
        const imageFile = document.getElementById("editFlowerImage").files[0];

        // If an image is selected, upload it to ImgBB
        if (imageFile) {
            const imgFormData = new FormData();
            imgFormData.append('image', imageFile);
            const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5cb9b4e07adda01b2e7f1ca548a925bc', {
                method: 'POST',
                body: imgFormData
            });
            const imgbbData = await imgbbResponse.json();
            if (imgbbData.status === 200) {
                imageUrl = imgbbData.data.url;
            } else {
                alert('Image upload failed!');
                return;
            }
        }

        // Prepare the updated flower data
        const updatedFlowerData = {
            name: name,
            price: price,
            category: selectedCategory,
            color: selectedColor,
            image: imageUrl
        };

        // Send a PUT request to update the flower
        await fetch(`https://blossomcart.onrender.com/flower/list/${flowerId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFlowerData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    alert("Flower updated successfully!");
                    location.reload();  // Optionally, refresh the page to reflect changes
                }
            });
        
    });
};

// Helper function to populate categories and colors
const populateCategoriesAndColors = async () => {
    // Fetch categories and colors
    const categoriesResponse = await fetch('https://blossom-cart-8wo2.vercel.app/flower/category/');
    const colorsResponse = await fetch('https://blossom-cart-8wo2.vercel.app/flower/color/');

    const categories = await categoriesResponse.json();
    const colors = await colorsResponse.json();

    console.log('Fetched categories:', categories);  // Debugging
    console.log('Fetched colors:', colors);  // Debugging

    // Populate category select
    const categorySelect = document.getElementById("editFlowerCategory");
    categorySelect.innerHTML = '';  // Clear previous options
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
    });

    // Populate color select
    const colorSelect = document.getElementById("editFlowerColor");
    colorSelect.innerHTML = '';  // Clear previous options
    colors.forEach(color => {
        const option = document.createElement("option");
        option.value = color.id;
        option.text = color.name;
        colorSelect.appendChild(option);
    });
};








handleUser();
handleCategory();
handlecolor();









