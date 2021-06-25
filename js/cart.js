let cartTrue = displayCart();
if (cartTrue === true){
checkAndSend();
}

//Affichage et modification des quantités.
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null || cart.length === 0){
        emptyCart();
		return false;
    } else {
        cart.forEach(item => displayData(item, cart));
		return true;
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

function emptyCart(){
	let emptyCss = 'style="display:flex; justify-content:space-around; margin: 100px 0 520px 0"'
	document.getElementsByTagName("main")[0].innerHTML = `<div class="emptyMessage"${emptyCss}><span>Votre panier est vide</span></div>`;
}

// Envoi du formulaire et de la commande
function checkAndSend(){
	const cartValidation = document.getElementById('formValidation');
	cartValidation.addEventListener('submit', (event) => {
		event.preventDefault();
		sendCart();
	});

	function sendCart(){
		const firstname = document.getElementById('firstName').value;
		const lastname = document.getElementById('lastName').value;
		const address = document.getElementById('address').value;
		const email = document.getElementById('email').value;
		const city = document.getElementById('city').value;
		const productsArray = JSON.parse(localStorage.getItem('cart'));

		const order = {
			contact: {
				firstName: firstname,
				lastName: lastname,
				address: address,
				city: city,
				email: email
			},
			products: productsArray.map(product => product._id)
		}
		console.log(order);

		fetch(`http://localhost:3000/api/teddies/order`, {
			method: 'POST',
			body: JSON.stringify(order),
			headers: { 'Content-Type': 'application/json; charset=utf-8' }
		})
			.then(response => {		
				if(response.ok) {
					return response.json();
				}
				throw new Error("Erreur");
			})
			
			.then(informations => {
				let price = document.querySelector('.articles__totalPrice__total').textContent;
				localStorage.removeItem('cart');
				window.location.href = `confirmation.html?orderId=${informations.orderId}
				&price=${price}&name=${informations.contact.lastName}`;
			})
			.catch((error) => {
				console.log(error.message);
			})
		
	}
}
