// Участники турнира

let prev = document.getElementsByClassName('slider-btn-prev');
let next = document.getElementsByClassName('slider-btn-next');
let product = document.getElementsByClassName('slider-item')
let product_page = Math.ceil(product.length / 3);
let l = 0;
let movePer = 34.34;
let maxMove = 120;
let count = 3;
document.querySelector('.count-slide').innerHTML = count;


let tab_view = window.matchMedia("(max-width: 1290px)");
if (tab_view.matches) {
	movePer = 40;
	maxMove = 150;
}

// mobile_view	
let mob_view = window.matchMedia("(max-width: 795px)");
if (mob_view.matches) {
	movePer = 105;
	maxMove = 620;
	count = 1;
	document.querySelector('.count-slide').innerHTML = count;
}

let right_mover = () => {
	l = l + movePer;
	if (product == 1) { l = 0; }
	for (const i of product) {
		if (l > maxMove) { l = 0; }
		i.style.left = '-' + l + '%';
	}
	updateScoreP()
	document.querySelector('.count-slide').innerHTML = count;
}

let left_mover = () => {
	l = l - movePer;
	if (l <= 0) { l = 0; }
	for (const i of product) {
		if (product_page > 1) {
			i.style.left = '-' + l + '%';
		}
	}
	updateScoreM()
	document.querySelector('.count-slide').innerHTML = count;
}

next[0].onclick = () => { right_mover(); }
prev[0].onclick = () => { left_mover(); }

function updateScoreP() {
	count++;
	if (count > 6) {
		if (mob_view.matches) {
			count = 1			
		}
		else {count = 3;}
	}	
	return count
}

function updateScoreM() {
	count--;
	if (count < 3) {
		if (mob_view.matches) {
			count = 1			
		}
		else {count = 3;}
	}	
	return count
}


setInterval(() => {
	right_mover()	
}, 4000);



// Этапы преображения Васюков

// Получаем ссылку на элементы
const gridContainer = document.querySelector('.stages__list');
const stagesContainer = document.querySelector('.stages__list-mobile');

// Получаем кнопки "вправо" и "влево" и все карточки
const rightButton = document.querySelector('.stages__slider-btn-next');
const leftButton = document.querySelector('.stages__slider-btn-prev');
const cards = document.querySelectorAll('.stages__item-mobile1');

// Функция для добавления класса hidden
function addHiddenClass() {
	gridContainer.classList.add('hidden');
	stagesContainer.classList.remove('hidden'); // Удаляем класс hidden
}

// Функция для удаления класса hidden
function removeHiddenClass() {
	gridContainer.classList.remove('hidden');
	stagesContainer.classList.add('hidden'); // Добавляем класс hidden
}



// Функция для переключения видимости карточек
function toggleCardVisibility(direction) {
	// Получаем индекс видимой карточки
	let visibleIndex;
	for (let i = 0; i < cards.length; i++) {
		if (!cards[i].classList.contains('hidden')) {
			visibleIndex = i;
			break;
		}
	}

	// Скрываем текущую видимую карточку
	cards[visibleIndex].classList.add('hidden');

	// Определяем индекс следующей карточки в зависимости от направления
	let nextIndex = (visibleIndex + direction + cards.length) % cards.length;

	// Показываем следующую карточку
	cards[nextIndex].classList.remove('hidden');

	// Устанавливаем класс "transparent" для всех элементов "mugs"
	const mugs = document.querySelectorAll('.mugs');
	for (let i = 0; i < mugs.length; i++) {
		if (i === nextIndex) {
			mugs[i].classList.remove('transparent');
		} else {
			mugs[i].classList.add('transparent');
		}
	}

	// Блокируем кнопки "вправо" и "влево" при необходимости
	if (nextIndex === 0) {
		leftButton.classList.add('transparent');
	} else if (nextIndex === cards.length - 1) {
		rightButton.classList.add('transparent');
	} else {
		leftButton.classList.remove('transparent');
		rightButton.classList.remove('transparent');
	}
}

// Назначаем обработчик события на кнопку "вправо"
rightButton.addEventListener('click', function () {
	if (!rightButton.classList.contains('transparent')) {
		toggleCardVisibility(1); // Переключаем карточки вправо
	}
});

// Назначаем обработчик события на кнопку "влево"
leftButton.addEventListener('click', function () {
	if (!leftButton.classList.contains('transparent')) {
		toggleCardVisibility(-1); // Переключаем карточки влево
	}
});


// Вызываем функцию при загрузке страницы для начальной настройки классов
handleResize();