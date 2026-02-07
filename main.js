(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 10000; // 10 giây
	let currentRotate = 0;
	let isRotating = false;

	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');

	const popup = document.getElementById("resultPopup");
	const popupText = document.getElementById("popupText");
	const popupImg = document.getElementById("popupImg");
	const closeBtn = document.querySelector(".close");

	const spinSound = $('#spinSound');
	const winSound = $('#winSound');

	// 👉 thời gian quay CSS = 10s
	wheel.style.transition = "transform 10s cubic-bezier(0.075,0.8,0.2,1)";

	// 🔓 UNLOCK AUDIO FOR IOS
	const unlockAudio = () => {
		if(winSound){
			winSound.play().then(()=>{
				winSound.pause();
				winSound.currentTime = 0;
			}).catch(()=>{});
		}
	};
	document.addEventListener("touchstart", unlockAudio, { once:true });

	const listGift = [
		{ text: 'Mặt nạ', percent: 95.8/100 },
		{ text: 'Son', percent: 1/100 },
		{ text: '1 chỉ vàng', percent: 0/100 },
		{ text: '500k', percent: 0.1/100 },
		{ text: 'Bông tẩy trang', percent: 3/100 },
		{ text: 'Bảng mắt', percent: 0.1/100 },
		{ text: 'Nước hoa YSL', percent: 0/100 },
	];

	const giftImages = {
		"Mặt nạ":"matna.png",
		"Son":"son.png",
		"1 chỉ vàng":"vang.png",
		"500k":"500k.png",
		"Bông tẩy trang":"bongtaytrang.png",
		"Bảng mắt":"bangmat.png",
		"Nước hoa YSL":"ysl.png"
	};

	const size = listGift.length;
	const rotate = 360/size;
	const skewY = 90-rotate;

	// TẠO Ô VÒNG QUAY
	listGift.map((item,index)=>{
		const elm = document.createElement('li');

		elm.style.transform =
			`rotate(${rotate*index}deg) skewY(-${skewY}deg)`;

		elm.innerHTML =
`<p style="transform:skewY(${skewY}deg) rotate(${rotate/2}deg);" 
class="text ${index%2?'text-2':'text-1'}">

<img src="${giftImages[item.text]}" class="gift-img">

<b>${item.text}</b>

</p>`;

		wheel.appendChild(elm);
	});

	// BẮT ĐẦU QUAY
	const start = () => {
		isRotating = true;

		// 🔊 nhạc quay
		if(spinSound){
			spinSound.currentTime = 0;
			spinSound.play().catch(()=>{});
		}

		const random = Math.random();
		const gift = getGift(random);

		currentRotate += 360*25;

		rotateWheel(currentRotate,gift.index);
		showGift(gift);
	};

	// XOAY VÒNG
	const rotateWheel = (currentRotate,index)=>{
		wheel.style.transform =
			`rotate(${currentRotate-index*rotate-rotate/2}deg)`;
	};

	// LẤY QUÀ
	const getGift = randomNumber=>{
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item,index)=>{
			currentPercent += item.percent;
			if(randomNumber <= currentPercent){
				list.push({...item,index});
			}
		});

		return list[0];
	};

	// HIỆN QUÀ
	const showGift = gift => {
		let timer = setTimeout(() => {

			isRotating = false;

			// 🛑 DỪNG NHẠC QUAY
			if(spinSound){
				spinSound.pause();
				spinSound.currentTime = 0;
			}

			// 🎉 HIỆN POPUP
			popup.style.display = "flex";

			popupText.innerText =
			  "🎉 Chúc mừng bạn trúng: " + gift.text;

			popupImg.src = giftImages[gift.text];

			// 🔊 NHẠC WIN
			if(winSound){
				winSound.pause();
				winSound.currentTime = 0;
				winSound.play().catch(()=>{});
			}

			clearTimeout(timer);

		}, timeRotate);
	};

	// CLICK QUAY
	btnWheel.addEventListener('click',()=>{

		// unlock audio khi click
		if(winSound){
			winSound.play().then(()=>{
				winSound.pause();
				winSound.currentTime = 0;
			}).catch(()=>{});
		}

		!isRotating && start();
	});

	// ĐÓNG POPUP
	closeBtn.addEventListener("click", ()=>{
		popup.style.display = "none";
	});

})();
