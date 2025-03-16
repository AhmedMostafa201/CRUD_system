let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(255, 0, 157)';
    }
}

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(title.value != '' && price.value!='' && category.value!=''){
        if (mood === 'create') {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        ClearData();

    }


    localStorage.setItem('product', JSON.stringify(datapro));
    showData();
}

function ClearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        let adsValue = datapro[i].ads === '' ? '-' : datapro[i].ads;
        let priceValue = datapro[i].price === '' ? '-' : datapro[i].price;
        let taxesValue = datapro[i].taxes === '' ? '-' : datapro[i].taxes;
        let discountValue = datapro[i].discount === '' ? '-' : datapro[i].discount;

        table += `
        <tr>
            <th>${i+1}</th>
            <th>${datapro[i].title}</th>
            <th>${priceValue}</th>
            <th>${taxesValue}</th>
            <th>${adsValue}</th>
            <th>${discountValue}</th>
            <th>${datapro[i].count}</th>
            <th>${datapro[i].category}</th>
            <td><button onclick="updateData(${i})" id="updatebtn">update</button></td>
            <td><button onclick="deleteItem(${i})" id="deletebtn">delete</button></td>
        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${datapro.length})</button>
        `;
    } else {
        btnDelete.innerHTML = '';
    }
}

showData();

function deleteItem(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}

function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    mood = 'update';
    submit.innerHTML = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// search functionality

let searchMood = 'title';

function getsearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'search by '+searchMood;

    search.focus();
    search.value='';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
    if (searchMood == 'title') {
        // Search by title
            if (datapro[i].title.includes(value)) {
                let adsValue = datapro[i].ads === '' ? '-' : datapro[i].ads;
                let priceValue = datapro[i].price === '' ? '-' : datapro[i].price;
                let taxesValue = datapro[i].taxes === '' ? '-' : datapro[i].taxes;
                let discountValue = datapro[i].discount === '' ? '-' : datapro[i].discount;

                table += `
                <tr>
                    <th>${i}</th>
                    <th>${datapro[i].title}</th>
                    <th>${priceValue}</th>
                    <th>${taxesValue}</th>
                    <th>${adsValue}</th>
                    <th>${discountValue}</th>
                    <th>${datapro[i].count}</th>
                    <th>${datapro[i].category}</th>
                    <td><button onclick="updateData(${i})" id="updatebtn">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="deletebtn">delete</button></td>
                </tr>
                `;
            
        }
    } else if (searchMood == 'category') {
        // Search by category
            if (datapro[i].category.includes(value)) {
                let adsValue = datapro[i].ads === '' ? '-' : datapro[i].ads;
                let priceValue = datapro[i].price === '' ? '-' : datapro[i].price;
                let taxesValue = datapro[i].taxes === '' ? '-' : datapro[i].taxes;
                let discountValue = datapro[i].discount === '' ? '-' : datapro[i].discount;

                table += `
                <tr>
                    <th>${i}</th>
                    <th>${datapro[i].title}</th>
                    <th>${priceValue}</th>
                    <th>${taxesValue}</th>
                    <th>${adsValue}</th>
                    <th>${discountValue}</th>
                    <th>${datapro[i].count}</th>
                    <th>${datapro[i].category}</th>
                    <td><button onclick="updateData(${i})" id="updatebtn">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="deletebtn">delete</button></td>
                </tr>
                `;
            }
        
    }
    }
    document.getElementById('tbody').innerHTML = table;
}
