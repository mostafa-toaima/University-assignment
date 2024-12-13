let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let tmp; 

let mood = 'create';

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
// Create product

let dataPro;

if (localStorage.product !=null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];

}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    //count
    if (title.value != '' && price.value != '' && discount.value !='' && newPro.count < 100)
    {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro); 
                }
            } else {
            dataPro.push(newPro); 
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'create'
            submit.innerHTML = 'Create'
            count.style.display= 'block'
        }
        clear()
    } else {
        
    }
    //Save LocalStorage

    localStorage.setItem('product', JSON.stringify(dataPro));
    onShow()
}

//clear

function clear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';    
}

//Show data

function onShow() {
    getTotal();
    let table = '';

    for (let i= 0; i < dataPro.length; i++){
        table +=
        `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tBody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');

    if(dataPro.length > 0) {
        btnDelete.innerHTML =
        `
        <button  onclick="deleteData(deleteAll())">Delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}
onShow()

//delete

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    onShow()
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    onShow()
}

//update

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].title;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//search

let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchTile') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus()
}

function searchData(value) {

    let table = '';

    if(searchMood == 'title') 
    {
        for(let i= 0; i < dataPro.length;i++){
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table +=
                    `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    </tr>
                    `;
            } 
            
        }
    }
    else
    {
        for (let i = 0; i < dataPro.length; i++){
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += 
                    `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick="updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                    </tr>
                    `
            } 
            
        }
    }
    document.getElementById('tBody').innerHTML = table;
}
