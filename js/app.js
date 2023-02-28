const loadPhone = async (searchField, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`
  const res = await fetch(url)
  const data = await res.json();
  displayPhones(data.data, dataLimit);
}

const displayPhones = (data, dataLimit) => {


  const phonesContainer = document.getElementById('phone-container');

  phonesContainer.textContent = '';

  // display 10 phones only 
  const showAll = document.getElementById('show-all')
  if (dataLimit && data.length > 10) {
    data = data.slice(0, 10);

    showAll.classList.remove('d-none')
  }
  else {
    showAll.classList.add('d-none')
  }


  // display no phone found
  const noPhone = document.getElementById('no-found-message')
  if (data.length === 0) {
    noPhone.classList.remove('d-none')
  }
  else {
    noPhone.classList.add('d-none')
  }
  //display all phone
  data.forEach(phone => {
    // console.log(phone);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card p-4">
    <img  src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
      
    </div>
  </div>
    
    `;
    div.classList.add('col');
    phonesContainer.appendChild(div);

  });
  //stop spinner or loader
  toggleSpinner(false)
}

const processSearch = (dataLimit) => {
  toggleSpinner(true)
  const searchField = document.getElementById('search-field').value;
  loadPhone(searchField, dataLimit);
}



//handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
  //start loader
  // toggleSpinner(true)
  // const searchField = document.getElementById('search-field').value;
  // loadPhone(searchField);
  processSearch(10);
})

//search input field enter kew handler
document.getElementById('search-field').addEventListener('keypress', function (e) {

  if (e.key === 'Enter') {
    processSearch(10);
  }
});
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none')
  }

}

//not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
  // toggleSpinner(true)
  // const searchField = document.getElementById('search-field').value;
  // loadPhone(searchField);
  processSearch();
})

const loadPhoneDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone => {
  console.log(phone);
  const modalTite=document.getElementById('phoneDetailModalLabel');
  modalTite.innerText=phone.name ;
  
const phoneDetails=document.getElementById('phone-details')
phoneDetails.innerHTML=`
<img class="img-fluid" src="${phone.image}" >

<p>Release Date: ${phone.releaseDate ?phone.releaseDate : 'No Release date found'}  </p>
<p>Storage: ${phone.mainFeatures
 ? phone.mainFeatures.storage : 'No avalaible storage'}</P>
<p>Others: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth information'}</p>
`

}
loadPhone( 'apple');