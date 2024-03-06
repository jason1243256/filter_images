// 이미지 정보 객체 배열. (json format) - 실제 개발에서는 서버에서 받아온 데이터 형식으로 사용
const filterItems = [
  { dataFilter: "bag", src: "bag-1.jpg" },
  { dataFilter: "camera", src: "camera-1.jpg" },
  { dataFilter: "camera", src: "camera-2.jpg" },
  { dataFilter: "headphone", src: "headphone-1.jpg" },
  { dataFilter: "headphone", src: "headphone-2.jpg" },
  { dataFilter: "shoes", src: "shoe-1.jpg" },
  { dataFilter: "shoes", src: "shoe-2.jpg" },
  { dataFilter: "watch", src: "watch-1.jpg" },
];

// 전체 이미지를 감싸는 요소 저장
const imagewrapper = document.querySelector(".filter-images");

// json객체 데이터 배열을 forEach 메서드로 순회 - 배열 요소 각각을 분리 - 분리된 각각의 데이터는 item 파라미터에 전달 - item 파라미터에 filterItems를 넣었다 생각하면됨.
filterItems.forEach((item) => {
  //각각의 이미지 요소 생성 - DOM(document Object Model(html을 말함) : html 문서의 요소들) 생성
  const itemElmt = ` 
        <div class="filter-image show" data-filter="${item.dataFilter}"> 
        <span>
          <img src="images/${item.src}" alt="">
        </span>
      </div>
  
  `;
  // 생성된 이미지 요소를 감싸는 요소에 추가
  imagewrapper.insertAdjacentHTML("beforeend", itemElmt);
});

//  ''따옴표를 쓰는 이유
// `` 백띡을 쓰는 이유

// DOM(HTML요소) 요소들 변수 저장.
const btns = document.querySelectorAll(".filter-btns button"); //버튼 요소들 저장
const images = document.querySelectorAll(".filter-image"); //이미지 요소들 저장
const lightBox = document.querySelector(".light-box"); //라이트 박스 요소 저장
const overlay = document.querySelector(".overlay"); //오버레이 요소 저장
const closeBtn = document.querySelector(".ri-close-line"); // x 버튼 요소 저장

// console.log(images);

//  lightbox 활성화 함수 - 클릭한 이미지를 thisElmt 파라미터로 전달.
const activateLightBox = (thisElmt) => {
  const thisElmtSrc = thisElmt.querySelector("img").getAttribute("src"); //클릭한 이미지의 src 속성값 저장
  const thisElmtDataFilter = thisElmt.getAttribute("data-filter"); //클릭한 이미지의 data-filter 속성값 저장
  // console.log(thisElmtDataFilter);

  const firstLetter = thisElmtDataFilter.charAt(0).toUpperCase(); //첫 번째 글자를 선택하여 대문자로 변환.
  // console.log(firstLetter);
  const remainLetters = thisElmtDataFilter.slice(1); //두 번째 글자부터 나머지 글자 전체 선택
  // console.log(remainLetters);
  const cateElmt = document.querySelector(".title p"); //카테고리 문자요소(p) 저장
  // console.log(cateElmt);

  cateElmt.textContent = firstLetter + remainLetters; //첫번째 대문자 + 나머지 글자를 텍스트로 지정

  // 첫번째 대문자 + 나머지 글자를 텍스트로 지정 위 코드와 똑같음.
  // const thisElmtDataFilter = thisElmt.getAttribute('data-filter');
  // const result = thisElmtDataFilter.charAt(0).toUpperCase() + thisElmtDataFilter.slice(1);

  //함수가 실행되면 클릭된 모든 이미지 요소의 active 클래스 삭제
  images.forEach((img) => img.classList.remove("active"));
  // 클릭한 대상 이미지 요소에 active 클래스 추가
  thisElmt.classList.add("active");

  // 라이트 박스가 활성화 될 때 클릭된 이미지 요소의 src 속성 값을 읽어 라이트 박스 이미지 src 속성값으로 전달
  lightBox.querySelector("img").setAttribute("src", thisElmtSrc);

  lightBox.classList.add("show"); //라이트 박스에 show 클래스를 추가하여 활성화
  overlay.classList.add("show"); //오버레이에 show 클래스를 추가하여 활성화
};

// const imgWrapper = document.querySelector('.panel');
// 이미지 요소들을 순회하여 각각을 클릭했을 때 activeLightBox 함수 실행 : 클릭한 대상 요소를 파라미터로 전달
images.forEach((img) => {
  img.addEventListener("click", function () {
    // imgWrapper.innerHTML = '';

    activateLightBox(this);
    // const idx = Array.from(btns).indexOf(this);
    // const imgElmt = `<img src="${imgs[idx]}" alt="">`;
    // imgWrapper.insertAdjacentHTML('beforeend', imgElmt);
  });
});

// ------refactoring--------

// 이미지 요소 배열을 순회한다. 첫번째 파라미터는 이미지 요소 배열, 두번째 파라미터는 bloolean 값 - true일 경우 ? 뒤에 : 을 기준으로 앞에 로직이 적용되고, false일 경우 뒤에 로직이 적용된다.
// 아래코드를 써줌으로서 각 카테고리 창을 열어주거나 닫거나를 결정 할 수 있다.
function showAndHide(images, isShow) {
  images.forEach((image) => {
    image.classList.add(isShow ? "show" : "hide");
    image.classList.remove(isShow ? "hide" : "show");
  });
}

// 아래 주석은 카테고리 창을 열고 닫거나 여는 작업을 하는 코드이다.

// showAndHide(images, true); //add show remove hide
// showAndHide(images, false); //add hide remove show
// showAndHide(thisImage, true); //thisImage array add show remove hide

// // 1
// images.forEach((image) => {
//   image.classList.add('hide');
//   image.classList.remove('show');
// });

// // 2
// if (thisCategory === 'all') {
//   images.forEach((image) => {
//     image.classList.add('show');
//     image.classList.remove('hide');
//   });

//   // 3
//   thisImage.forEach((activatedItem) => {
//     console.log(activatedItem);
//     activatedItem.classList.add('show');
//     activatedItem.classList.remove('hide');
//   });

// // 4
// images.forEach((image) => {
//   image.classList.add('hide');
//   image.classList.remove('show');
// });

// ==============
//  탭 버튼을 클릭 했을 때 실행되는 함수
function showItems(thisItem) {
  // 탭 버튼을 클릭했을 때 클릭 된 탭의 data - filter 속성값 저장
  const thisCategory = thisItem.getAttribute("data-filter");

  // 1
  showAndHide(images, false); //images array add hide remove show
  // 아래주석은 위에 코드가 대신한다.
  // images.forEach((image) => {
  //   image.classList.add('hide');
  //   image.classList.remove('show');
  // });

  if (thisCategory === "all") {
    //클릭한 요소의 속성값이 all일 때
    // 2
    showAndHide(images, true); // images array add show remove hide
    // 아래주석은 위에 코드가 대신한다.
    // images.forEach((image) => {
    //   image.classList.add('show');
    //   image.classList.remove('hide');
    // });
  }

  //클릭한 탭 버튼 요소의 data - filter 속성값과 이미지 요소의 data - filter 속성값이 일치하는 것만 필터링
  const thisImage = Array.from(images).filter(
    //array.from() : 유사배열 (NodeList, HTMLcollection)을 정식 배열로 전환
    (image) => image.getAttribute("data-filter") === thisCategory
  );

  // 3
  showAndHide(thisImage, true); // images array add show remove hide
  // 아래주석은 위에 코드가 대신한다.
  //  images.forEach((image) => {
  //   image.classList.add('show');
  //   image.classList.remove('hide');
  // });
}

// 탭 버튼 배열을 순회
btns.forEach((btn) => {
  //각각의 탭 버튼을 클릭했을 때
  btn.addEventListener("click", function () {
    // 모든 버튼 요소의 active 클래스 제거
    btns.forEach((btn) => btn.classList.remove("active"));
    // 클릭한 대상 요소에만 active 클래스 추가
    this.classList.add("active");

    // 4
    showAndHide(images, false); // images array add show remove hide
    // 아래주석은 위에 코드가 대신한다.
    // images.forEach((images) => {
    //   image.classList.add('hide');
    //   image.classList.remove('show');
    // });

    //이미지 요소들이 재배치 될 때 0.1초 뒤에 showItems 함수 실행
    setTimeout(() => {
      showItems(this);
    }, 300);
  });
});

// x버튼누르면 창 꺼지는 코드
// closeBtn.addEventListener('click', function () {
//   lightBox.classList.remove('show');
//   overlay.classList.remove('show');
// });
// 바탕을 누르면 창 꺼지는 코드
// overlay.addEventListener('click', function () {
//   lightBox.classList.remove('show');
//   overlay.classList.remove('show');
// });

// x버튼과 바탕을 누르면 꺼지는 코드를 하나에 담아둠.
// 라이트 박스 닫는 함수
function closeLightBox() {
  lightBox.classList.remove("show"); //라이트 박스 자체를 없앤다.
  overlay.classList.remove("show"); //배경 오버레이를 없앤다.
}

// 이벤트 실행 함수를 전달할 때 ()를 붙이지 않는다.
closeBtn.addEventListener("click", closeLightBox); //x버튼을 클릭했을 때 함수 실행
overlay.addEventListener("click", closeLightBox); //배경 오버레이를 클릭했을 때 함수 실행

// getAttribute : https://urliveblogger.blogspot.com/2021/01/js-getAttribute.html
// setAttribute : https://urliveblogger.blogspot.com/2021/01/js-setAttribute.html
// const img = document.querySelector('#img');
// const imgGetAttr = img.getAttribute('class');

// console.log(imgGetAttr);

// img.setAttribute('class', 'new-class');

// method : 어떠한 객체의 맴버가 함수일 경우 메서드라고 합니다.

// filter() : https://velog.io/@haleyjun/JavaScript-filter-%EC%82%AC%EC%9A%A9%EB%B2%95
const arr = [1, 4, 3, 5, 6, 7, 9, 4, 5, 7, 4, 8, 9];

let result = arr.filter((value) => value === 4); // 4만 뽑고싶을때 ===이 세개있으면 엄격하게 뽑는다.
console.log(result);

// Array.from() : 유사배열(NodeList, HTMLCollection)을 정식 배열로 전환
// https://www.freecodecamp.org/korean/news/how-to-set-a-timer-in-javascript/

// 첫번째 파라미터 : 함수 - 실행할 코드, 두번째  파리미터 : 숫자 - 시간(밀리초) == 밀리초 단위 시간 이후 함수 실행

// setTimeout(function () {
//   alert('Hello World');
// }, 2000);

// setInterval() :  https://ko.javascript.info/settimeout-setinterval
// 2초 간격으로 메시지를 보여줌
// 변수에 값을 저장하게 되면, 변수를 이용하여 일정 시간 이후 실행을 정지시킬 수 있다.(clearInterval(timerId))

// const timerId = setInterval(() => console.log('짹깍'), 1000);

// 5초후 정지

// const a = 1;
// if (a === 1) {
//   console.log(true);
// } else {
//   console.log(false);
// }

// 삼항 연산자 true면 앞에가 실행 false면 뒤에가 실행
// a === 1 ? console.log(true) : console.log(false);
