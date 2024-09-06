const loadFlower = (findFlower) => {
  document.getElementById("flower-container").innerHTML = "";
  let url = "https://blossomcart.onrender.com/flower/list/"
  if (findFlower) {
    url = `https://blossomcart.onrender.com/flower/list/?category=${findFlower}`}
  
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.length > 0) {
        displayflower(data);
      }
      else {
        document.getElementById("flower-container").innerHTML = "";
        
      }


    });
}

const displayflower = (flowers) => {

  flowers.forEach((flower) => {
        const parent = document.getElementById("flower-container");
        const div = document.createElement('div');
        div.classList.add("col-lg-4")
        div.innerHTML = ` 
         <a href="${flower.image}" class="glightbox"><img src="${flower.image}" class="menu-img img-fluid" alt=""></a>
                <h3 ><b >${flower.name}</b> </h3>
                 <p>Category: 

                ${flower?.category_display?.map((item) => {
                    return `<small class="text-danger"> ${item} </small>`;
                })}
                </p>
                 <p>Color:

                ${flower?.color_display?.map((item) => {
                    return `<small class="text-danger"> ${item} </small>`;
                })}
                </p>
                
                <h6 class="price">
                  <b>Rs. ${flower.price} </b>
                </h6>
                 <button onclick="handleOrder(${flower.id})" class="btn btn-danger"><b> Buy Now</b></button>
                 <button onclick="handlereview()" class="btn"><b>Give Review</b></button>
              </div>
              
        
        `
        parent.appendChild(div);
    });
};




// load Category

const loadCategory = () => {
  fetch("https://blossomcart.onrender.com/flower/category/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("category");
                const li = document.createElement("li");
                li.classList.add("nav-item");
                li.innerHTML = `
                 <a class="nav-link active show" data-bs-toggle="tab" data-bs-target="#menu-starters">
              <h4 onclick="loadFlower('${item.id}')">${item.name}</h4>
            </a>
            `;
                parent.appendChild(li);
            });
        });
};

const loadReviews = () => {
  fetch("https://blossomcart.onrender.com/flower/review/")
        .then((res) => res.json())
        .then((data) => displayreview(data));

};


const displayreview = (reviews) => {
    reviews.forEach((review) => {
        const parent = document.getElementById("Review");
        const div = document.createElement("div");
        div.classList.add("swiper-slide");
       
        div.innerHTML = `
        
                 
              <div class="testimonial-item">
                <div  class="row gy-4 justify-content-center">
                  <div  class="col-lg-6">
                    <div class="testimonial-content">
                      <p>
                        <i class="bi bi-quote quote-icon-left"></i>
                        <span>${review.body}</span>
                        <i class="bi bi-quote quote-icon-right"></i>
                      </p>
                      <h3>${review.name}</h3>
                      <h4>Flower: ${review.flower}</h4>
                      <div class="stars">
                        ${review.rating}
                      </div>
                      <div class="stars">
                        <h6>${review.created}</h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 text-center">
                    <img src="${review.image}" class="img-fluid testimonial-img" alt="">
                  </div>
                </div>
              </div>
            
        
        
        `;
        parent.appendChild(div);
        
    })
}


// contact Us

const handlecontact = (event) => {
  event.preventDefault();
  const name = getvalue("contact-name");
  const phone = getvalue("contact-phone");
  const problem = getvalue("contact-problem");
  const info = {
    name,phone,problem,
  };
  fetch("https://blossomcart.onrender.com/contact_us/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            window.location.href = "index.html";
            alert("Message Sent Successfully!!");
              }

        });

}


const getvalue = (id) => {
  const value = document.getElementById(id).value;
  return value;
}


// coustomer

const loadCoustomer = (id) => {
  fetch(`https://blossomcart.onrender.com/coustomer/list/?id=${id}`)
      .then((res) => res.json())
      .then((data) => displayCoustomer(data));
  
}

const displayCoustomer = (items) => {
  
  items.forEach((item) => {
    const parent = document.getElementById("coustomer_info");
    const li = document.createElement("li");
    li.classList.add("pt-3","coustomer");
    li.innerHTML = `
        <span class="text-danger"> <b>Welcome ${item.user} <b/> !!</span>    ( balance : ${item.balance} )
  `;
    parent.appendChild(li);
  });

}


const coustomer_id = localStorage.getItem("coustomer_id");
if (coustomer_id) {
  loadCoustomer(coustomer_id);
  
}



const token = localStorage.getItem("token");
if (token) {
  document.getElementById("dropdownmenu").innerHTML = `
    <li><a id="arrowmenu" class="dropdown-item" href="deposit.html">Deposit</a></li>
    <li><a id="arrowmenu" class="dropdown-item" href="dashboard.html">Dashboard</a></li>
    <li><a onclick="handlelogOut()" id="arrowmenu" class="dropdown-item" href="#">logout</a></li>
  `;
}
else {
  document.getElementById("dropdownmenu").innerHTML = `
  <li><a id="arrowmenu" class="dropdown-item" href="signup.html">Sign Up</a></li>
  <li> <a id="arrowmenu" class="dropdown-item" href="login.html">Login</a></li >
  `;
}










loadFlower();
loadCategory();
loadReviews();
