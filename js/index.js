displayContent();

async function displayContent() {
	const teddyArray = await fetchData();
	teddyArray.forEach(teddy => displayData(teddy));
}

function fetchData() {
	return fetch('http://localhost:3000/api/teddies')
		.then(response => response.json())
		.then(teddyArray => teddyArray)
		.catch(error => alert(error));
}

function displayData(teddy) {
	const template = document.getElementsByClassName('template')[0];
	const clone = document.importNode(template.content, true);

	clone.querySelector('.article__infos__name').textContent = teddy.name;
	clone.getElementById('price').textContent = teddy.price / 100 + ' €';
	clone.getElementById('imageUrl').src = teddy.imageUrl;
	clone.getElementById('productUrl').href = 'article.html?id=' + teddy._id;

	document.getElementsByClassName("destination")[0].appendChild(clone);

	removeIds();
};

function removeIds() {
	document.getElementsByClassName("article__infos__name")[0].removeAttribute("id");
	document.getElementsByClassName("article__infos__price")[0].removeAttribute("id");
	document.getElementsByClassName("article__container__image")[0].removeAttribute("id");
	articles = document.getElementsByClassName("article");
	for(elements of articles)
	{
		elements.removeAttribute("id");
	}
}
