function getId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');
    let counter = product[6];
    return (counter - 1);
}

function changeImage(teddy){
    let imagesUrl = document.getElementsByClassName("product__container__links__imgctr__img");
    imagesUrl[0].setAttribute("src", teddy.imageUrl);
}

function changePrice(teddy){
    let teddyPrice = document.getElementsByClassName("product__price__number");
    teddyPrice[0].innerHTML = teddy.price;
}

function changeDescription(teddy){
    let teddyDescription = document.getElementsByClassName("product__description");
    teddyDescription[0].innerHTML = teddy.description;
}

function changeName(teddy){
    let teddyName = document.getElementsByClassName("product__nameContainer__name");
    teddyName[0].innerHTML = teddy.name;
}

function addToCart(pageID){
    const button = document.getElementById("addToCart");
    button.addEventListener('click', function(teddy){
        localStorage.setItem("id", pageID);
    })
}

fetch("http://localhost:3000/api/teddies")
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddy){
        let pageId = getId();
        console.log(pageId)
        changeImage(teddy[pageId]);
        changePrice(teddy[pageId]);
        changeDescription(teddy[pageId]);
        changeName(teddy[pageId]);
        addToCart(pageId);
    })

    .catch(function(err){
        console.log("erreur de chargement des informations")
    });
