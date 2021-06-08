displayArticle();

async function displayArticle() {
    let articleId = getId();
	const article = await fetchArticle(articleId);
	displayData(article);
    addToCart(article);
}

function getId(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');
    return (urlParams.get("id"));
}

function fetchArticle(articleId) {
	return fetch(`http://localhost:3000/api/teddies/${articleId}`)
		.then(response => response.json())
		.then(article => article)
		.catch(error => alert(error));
}

function displayData(article) {
    document.getElementsByClassName("product__nameContainer__name")[0].textContent = article.name;
    document.getElementsByClassName("product__container__links__imgctr__img")[0].src = article.imageUrl;
    document.getElementsByClassName("product__price__number")[0].textContent = article.price / 100;
    document.getElementsByClassName("product__description")[0].textContent = article.description;
}

function addToCart(article){
    const button = document.getElementById("addToCart");
    button.addEventListener('click', function(){
        localStorage.setItem("article", article);
    })
}
