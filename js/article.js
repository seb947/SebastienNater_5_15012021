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

function addToCart(teddy){
	const addItem = document.getElementById('addToCart');
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	function addProduct(product) {
		console.log(product);
		console.log(cart);
		const find = cart.find(cartItem => cartItem._id === product._id);
		if (find) {
			find.qty += product.qty;
		} else {
			cart.push(product);
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		console.log(localStorage.getItem('cart'));
	};

	addItem.addEventListener('click', () => {
		addProduct({
			_id: teddy._id,
			name: teddy.name,
			price: teddy.price,
			img: teddy.imageUrl,
			qty: 1
		});
	});
}
