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
	clone.querySelector('.article__infos__price').textContent = teddy.price / 100 + ' €';
	clone.querySelector('.article__container__image').src = teddy.imageUrl;
	clone.querySelector('.article').href = 'article.html?id=' + teddy._id;

	document.getElementsByClassName("destination")[0].appendChild(clone);
};

