displayCart();

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null){
        emptyCart();
    } else {
        cart.forEach(item => displayData(item, cart));
    }

}

function displayData(teddy, cart){
	const template = document.getElementsByClassName('template')[0];
	const clone = document.importNode(template.content, true);

	clone.querySelector('.article__infos__name').textContent = teddy.name;
	clone.querySelector('.article__infos__price').textContent = 'prix: ' + teddy.price / 100 + ' €';
	clone.querySelector('.article__container__image').src = teddy.img;
	clone.querySelector('.article').id = teddy.name;
    clone.querySelector('.article__infos__qty').textContent = teddy.qty;

	document.getElementsByClassName("destination")[0].appendChild(clone);
	displayPrice(cart);
	watchModification(teddy, cart);
}

function displayPrice(cart){
	let totalPrice = 0;
	cart.forEach(item => totalPrice += addPrice(item));
	function addPrice(item){
		return item.qty * (item.price / 100);
	}
	document.querySelector('.articles__totalPrice__total').textContent = totalPrice;
}

function watchModification(teddy, cart){
	let item = document.getElementById(teddy.name);
	let counter = 0;
	while(item.id != cart[counter].name){
		 counter++;
	}
	item.children[1].children[3].addEventListener('click', () => {
		cart[counter].qty++;
		document.getElementsByClassName("destination")[0].innerHTML = '';
		localStorage.setItem('cart', JSON.stringify(cart));
		displayCart();
	});
	item.children[1].children[5].addEventListener('click', () => {
		if(cart[counter].qty > 0){
			cart[counter].qty--;
		}
		if(cart[counter].qty === 0){
			cart.splice(counter, 1);
		}
		document.getElementsByClassName("destination")[0].innerHTML = '';
		localStorage.setItem('cart', JSON.stringify(cart));
		displayCart();
	});
	item.children[1].children[4].addEventListener('click', () => {
		cart.splice(counter, 1);
		document.getElementsByClassName("destination")[0].innerHTML = '';
		localStorage.setItem('cart', JSON.stringify(cart));
		displayCart();
	});
}



