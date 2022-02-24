let sectionCurrent = 0;
let currentHeight = 0;
// let Scrollcurrent = 0;
const SectionsHeight = [];
const slide_div = document.querySelector(".slide-pj-div");
const slideElem = document.querySelectorAll(".slide-pj-div .slide-pj");
const modaldetail = document.querySelector(".modal-detail");
const gnbMenu = document.querySelectorAll("header nav a");
const modalPosition = document.querySelector(".modal-position");
const modal = document.querySelector(".slide-modal");
const modalimg = document.querySelector(".slide-modal img");
const modalClose = document.querySelector(".slide-modal .modal-close");
const SLIDE_SPEED = 250;
let onslideClass = document.querySelector('.onslide');
let preScrollHeight = 0;
let imgIdx = 0;
let slideimg_Width = 900;
let imgWidthidx = [];
let dotidx = 0;
let DotBtn = null;
let modalDom = null;
// let DotActive =null;
function dotEvent() {
    const slideDotBox = document.querySelector(".dot-circle");
    for (let i = 0; i < slideElem.length; i++) {
        const Dot = document.createElement("button");
        slideDotBox.append(Dot);
    }
    DotBtn = document.querySelectorAll(".dot-circle button");

    DotBtn.forEach(function (item, idx) {
        DotBtn[0].classList.add("ondot");
        item.addEventListener("click", function (e) {
            const DotActive = document.querySelector(".ondot");
            const DotActiveSlide = document.querySelector(".onslide");
            DotActiveSlide.classList.remove("onslide");
            DotActive.classList.remove("ondot");
            imgIdx = idx;
            e.target.classList.add("ondot");
            slide_div.style.transition = SLIDE_SPEED + "ms";
            slide_div.style.transform =
                "translateX(-" + slideimg_Width * (imgIdx + 1) + "px)";
            slideElem[imgIdx].classList.add("onslide");

            // console.log(imgIdx);

        });
    });
}

function cloneSlideNode() {
    const firstNode = slide_div.firstElementChild;

    const lastNode = slide_div.lastElementChild;

    let cloneFirst = firstNode.cloneNode(true);
    let cloneLast = lastNode.cloneNode(true);

    slide_div.appendChild(cloneFirst);
    slide_div.insertBefore(cloneLast, firstNode);
    slide_div.lastChild.classList.remove("onslide");
}
function prevBtnEvent() {
    if (imgIdx >= 0) {
        slide_div.style.transition = SLIDE_SPEED + "ms";
        slide_div.style.transform =
            "translateX(-" + slideimg_Width * imgIdx + "px)";
    }
    if (imgIdx == 0) {
        imgIdx = slideElem.length;
        setTimeout(function () {
            slide_div.style.transition = "0ms";
            slide_div.style.transform =
                "translateX(-" + slideimg_Width * slideElem.length + "px)";
        }, SLIDE_SPEED);
    }
    imgIdx--;
    if (imgIdx == slideElem.length - 1) {
        DotBtn[0].classList.remove("ondot");
        slideElem[0].classList.remove("onslide");
    } else if (imgIdx >= 0) {
        DotBtn[imgIdx + 1].classList.remove("ondot");
        slideElem[imgIdx + 1].classList.remove("onslide");
    }
    slideElem[imgIdx].classList.add("onslide");
    DotBtn[imgIdx].classList.add("ondot");

    return onslideClass=document.querySelector('.onslide');

}
function NextBtnEvent() {
    imgIdx++;
    if (imgIdx <= slideElem.length) {
        slide_div.style.transition = SLIDE_SPEED + "ms";
        slide_div.style.transform =
            "translateX(-" + slideimg_Width * (imgIdx + 1) + "px)";
    }
    if (imgIdx === slideElem.length) {
        imgIdx = 0;
        setTimeout(function () {
            slide_div.style.transition = "0ms";
            slide_div.style.transform = "translateX(-" + slideimg_Width + "px)";
        }, SLIDE_SPEED);
    }
    if (imgIdx == 0) {
        DotBtn[slideElem.length - 1].classList.remove("ondot");
        slideElem[slideElem.length - 1].classList.remove("onslide");
    } else if (imgIdx <= slideElem.length) {
        DotBtn[imgIdx - 1].classList.remove("ondot");
        slideElem[imgIdx - 1].classList.remove("onslide");
    }
    slideElem[imgIdx].classList.add("onslide");

    DotBtn[imgIdx].classList.add("ondot");

    return onslideClass=document.querySelector('.onslide');
    

}

function modalPopUp() {
    slideElem.forEach(function (item, idx) {
        
        item.addEventListener("click", function (e) {
            const onSlideClass = document.querySelector('.onslide');
            if(this === onSlideClass){
                modalPosition.classList.remove("closeModalAni");
                modalPosition.classList.add("openModalAni");
                modalPosition.style.opacity = "1";
                modalPosition.style.zIndex = "11";
                modal.style.display = "flex";
                modalimg.src = portfolio[idx].imgsrc;
                modaldetail.children[0].innerText = portfolio[idx].title;
                modaldetail.children[1].innerText = portfolio[idx].detail;
                modaldetail.children[2].innerText = portfolio[idx].contribute;
                modaldetail.children[3].innerText = portfolio[idx].skills;
                modaldetail.children[4].href = portfolio[idx].viewurl;
                modaldetail.children[5].href = portfolio[idx].giturl;

                modalClose.addEventListener("click", function () {
                    modal.style.display = "none";
                    modalPosition.classList.remove("openModalAni");
                    modalPosition.classList.add("closeModalAni");
                    modalPosition.style.opacity = "0";
                    modalPosition.style.zIndex = "-1";
                    
            });
        }
        
        });
    
    });
}
function slideImg() {
    const prevBtn = document.querySelector(
        ".slide-pj-article .slidebtn div:nth-child(1)"
    );
    const nextBtn = document.querySelector(
        ".slide-pj-article .slidebtn div:nth-child(2)"
    );
    slide_div.style.transform = "translateX(-" + slideimg_Width + "px)";
    slideElem[0].classList.add("onslide");
    nextBtn.addEventListener("click", NextBtnEvent);
    prevBtn.addEventListener("click", prevBtnEvent);
    for (let i = 0; i < slideElem.length; i++) {
        //슬라이드 이미지 위드값 저장
        slideimg_Width = slideElem[i].clientWidth;
    }
    dotEvent();
    cloneSlideNode();
    
    modalPopUp();

}

function saveCurrent() {
    //A태그 위치 이동 함수
    gnbMenu.forEach(function (item, idx) {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            switch (idx) {
                case 0:
                    currentHeight = 0;
                    break;
                case 1:
                    currentHeight = 1;
                    break;
                case 2:
                    currentHeight = 2;
                    break;
                case 3:
                    currentHeight = 3;
                    break;
            }
            window.scrollTo(0, SectionsHeight[currentHeight]);
            return currentHeight;
        });
    });
}

function scrollEvent() {
    const Sections = document.querySelectorAll("main section");
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    let SectionsTotalHeight = 0;
    // let heightRatio = 0;
    window.addEventListener("scroll", function () {
        const introani = document.querySelector("#intro");
        const aboutani = document.querySelector("#about .about");
        const aboutmeani = document.querySelector("#about .aboutme");
        const contactani = document.querySelector("#contact .contactme");
        // aboutmeani.style.transform = "translateX(100vw)";

        const projectani = document.querySelector(".slide-pj-article");
        const backgroundSection = document.querySelectorAll(".backsection");

        // event.preventDefault();

        for (let i = 0; i < Sections.length; i++) {
            SectionsTotalHeight += Sections[i].clientHeight;
            preScrollHeight =
                SectionsTotalHeight -
                Sections[i].clientHeight +
                header.clientHeight;
            SectionsHeight.push(preScrollHeight);
            currentHeight = Math.round(
                (window.pageYOffset - header.clientHeight) /
                    Sections[i].clientHeight
            );
            heightRatio =
                (window.pageYOffset - header.clientHeight) /
                Sections[i].clientHeight;
        }

        for (let i = 0; i < gnbMenu.length; i++) {
            gnbMenu[i].classList.remove("scrollmenucolor");
            gnbMenu[currentHeight].classList.add("scrollmenucolor");
        }
        for (let i = 0; i < backgroundSection.length; i++) {
            backgroundSection[i].classList.remove("opacityani");
            if (currentHeight == 3) {
                backgroundSection[3].classList.add("contactopacityani");
            } else {
                backgroundSection[currentHeight].classList.add("opacityani");
            }
        }
        if (currentHeight == 0) {
            header.classList.add("headerani");
            introani.classList.add("introani");
            main.style.transition = "0.5s";
        } else {
            header.classList.remove("headerani");

            introani.classList.remove("introani");
            // videoani.classList.remove("videoani");
        }
        if (currentHeight == 1) {
            aboutani.classList.add("moveabout");
            // aboutmeani.style.transition = "1.5s";
            // setTimeout(function () {
            // aboutmeani.style.opacity ='1';
            // aboutmeani.style.transform = "translateX(0vw)";
            aboutmeani.classList.add("moveaboutme");
            // }, 200);
        } else {
            aboutani.classList.remove("moveabout");
            aboutmeani.classList.remove("moveaboutme");
        }
        if (currentHeight == 2) {
            projectani.classList.add("projectanime");
        } else {
            projectani.classList.remove("projectanime");
        }
        if (currentHeight == 3) {
            contactani.classList.add("contactani");
        } else {
            contactani.classList.remove("contactani");
        }
        if (currentHeight !== 2) {
            modal.style.display = "none";
            modalPosition.classList.remove("openModalAni");
            modalPosition.classList.add("closeModalAni");
            modalPosition.style.opacity = "0";
            modalPosition.style.zIndex = "-1";
        }
        saveCurrent();
    });

    // const test = document.querySelector("body");
    // test.addEventListener("keydown", function (event) {
    //     console.log(event.keyCode);
    //     // event.preventDefault();
    //     if(event.keyCode == 40 || event.keyCode == 34){
    //         if (currentHeight < 3) {
    //             currentHeight++;
    //         }
    //     }else if (event.keyCode == 38 || event.keyCode == 33){
    //         if(currentHeight > 0){
    //             currentHeight --;

    //         }
    //     }
    //     if(event.keyCode == 40 || event.keyCode == 34){

    //         window.scrollTo(0, SectionsHeight[currentHeight]);
    //     }
    //     console.log(currentHeight);
    // });

    window.addEventListener(
        "wheel",
        function (event) {
            event.preventDefault();
            // console.log(currentHeight);
            if (event.deltaY > 0) {
                if (currentHeight < 3) {
                    currentHeight++;
                }
            } else if (event.deltaY < 0) {
                if (currentHeight > 0) {
                    currentHeight--;
                }
            }

            window.scrollTo({
                top: SectionsHeight[currentHeight],
                left: 0,
                behavior: "smooth",
            });
        },
        { passive: false }
    );
}


function copy(val) {
    const dummyCopy = document.createElement("textarea");
    document.body.appendChild(dummyCopy);
    dummyCopy.value = val;
    dummyCopy.select();
    document.execCommand("copy");
    document.body.removeChild(dummyCopy);
}

const init = () => {
    window.scrollTo(0, 50);
    scrollEvent();
    slideImg();
    const mailCopy = document.querySelector(".mailcopy");
    mailCopy.addEventListener("click", function (e) {
        e.preventDefault();
        alert("메일 주소가 복사 되었습니다!");
        copy("wianw@naver.com");
    });
};
init();
