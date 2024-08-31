// Function to fetch data from the Dashboard API

const handleDashboard = () => {
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
            if(data.is_superuser){}
                loadOrders(data.orders);
                loadDeposit(data.deposite);
                loadCoustomer(data.coustomer);
                loadflowers(data.flower);
                loadContact(data.contactus);
                loadAllReview(data.review);  
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




handleDashboard();






