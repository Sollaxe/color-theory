

class HomePage {
  constructor (id) {
    this.obj = document.getElementById(id);

    this.lbAngleVert = new Vivus('left-bottom-angle__vert', {
      type: 'oneByOne',
      duration: 30
    }).stop();
    this.lbAngleHoriz = new Vivus('left-bottom-angle__horiz', {
      type: 'oneByOne',
      duration: 30
    }).stop();

    this.rtAngleVert = new Vivus('right-top-angle__vert', {
      type: 'oneByOne',
      duration: 30
    }).stop();
    this.rtAngleHoriz = new Vivus('right-top-angle__horiz', {
      type: 'oneByOne',
      duration: 30
    }).stop();
    this.butToBegin  = document.getElementById('startBut');
  }

  showHomePage() {
    // document.body.style.overflowY = 'hidden';
    const self = this;
    this.lbAngleVert.play();
    this.lbAngleHoriz.play();
    this.rtAngleVert.play();
    this.rtAngleHoriz.play();

    // console.dir(this.obj.querySelectorAll('.home-page__list-container')[0]);
    this.chapterList = this.obj.querySelectorAll('.home-page__chapters-list')[0];

    setTimeout(function() {
      function animateChapter(n) {
        if ( n >= self.chapterList.children.length ) {
          return false;
        } else {
          setTimeout(function() {
            self.chapterList.children[n].classList.add('home-page__chapter_anim');
            animateChapter(n+1);
          }, 100);
        }
      }
      animateChapter(0);
    }, 300);
  }

  slideOnHomePage() {
    this.obj.classList.remove('home-page_hide');
    window.addEventListener('keyup', handlerHideHomePage);
  }

  hideHomePage() {
    const self = this;

    this.obj.classList.add('home-page_hide');
    /*setTimeout(function() {
      console.dir(self);

      for (let value of self.chapterList.children) {
        value.classList.remove('home-page__chapter_anim');
      }

      self.lbAngleVert.reset();
      self.lbAngleHoriz.reset();
      self.rtAngleVert.reset();
      self.rtAngleHoriz.reset();
      self.obj.style.display = 'none';
      document.body.style.overflowY = 'auto';
    }, 500);*/
  }
}


class Menu {
  constructor (id) {
    this.obj = document.getElementById(id);
    this.navItems = document.querySelectorAll('.menu__nav-item');
    // console.log(this.obj);
    this.activeItem;
    this.isHide = false;
    this.activeItemNum;
  }

  showMenu() {
    const self = this;
    for (let value of this.navItems) {
      value.addEventListener('click', function() {
        self.makeInactive();
        self.makeActive(this);
        self.changeDesc(this.dataset.num);
      })
    }
    this.makeActive(this.navItems[0]);
    this.createDesc(this.navItems[0].dataset.num);
  }

  slideFromPage() {
    this.obj.classList.remove('menu_hide');
    this.isHide = false;
  }

  slideOnPage() {
    this.obj.classList.add('menu_hide');
    this.isHide = true;
  }

  slideBack() {
    if ( +this.activeItem.dataset.num > 0 ) {
      let activeItemNum = +this.activeItem.dataset.num;
      this.makeInactive();  
      this.makeActive(this.navItems[activeItemNum - 1]);
      this.changeDesc(this.navItems[activeItemNum - 1].dataset.num);
    }
  }

  slideForward() {
    if ( +this.activeItem.dataset.num < (this.navItems.length - 1) ) {
      let activeItemNum = +this.activeItem.dataset.num;
      this.makeInactive();
      this.makeActive(this.navItems[activeItemNum + 1]);
      this.changeDesc(this.navItems[activeItemNum + 1].dataset.num);
    }
  }

  makeActive(item) {
    if (item !== this.activeItem) {
      item.classList.add('menu__nav-item_active');
      this.activeItem = item;
      this.activeItemNum = +this.activeItem.dataset.num;
      // console.log(this.activeItemNum);
      let svg = item.children[0];
      let svgLine = svg.children[0].children[0];
      let svgCircle = svg.children[0].children[1];

      svg.setAttribute('width', '90');
      svgLine.setAttribute('d', 'M 0 11 H 62');
      svgCircle.setAttribute('cx', '72');

      // console.log(svgCircle);
    }
  }

  makeInactive() {
    if (this.activeItem !== null) {
      this.activeItem.classList.remove('menu__nav-item_active');
      let svg = this.activeItem.children[0];
      let svgLine = svg.children[0].children[0];
      let svgCircle = svg.children[0].children[1];

      svg.setAttribute('width', '50');
      svgLine.setAttribute('d', 'M 0 11 H 30');
      svgCircle.setAttribute('cx', '40');
      this.activeItem = null;
    }
  }

  createDesc() {
    let menuDesc = this.obj.children[1];
    menuDesc.children[0].children[0].innerHTML = menu_description[0].title;
    menuDesc.children[1].innerHTML = menu_description[0].text;

    setTimeout(function() {
      menuDesc.classList.remove('menu__desc_hide');
      menuDesc.classList.add('menu__desc_show');
    }, 200);
  }

  changeDesc(num) {
    let menuDesc = this.obj.children[1];
    menuDesc.classList.remove('menu__desc_show');
    menuDesc.classList.add('menu__desc_hide');


    setTimeout(function() {
      menuDesc.children[0].children[0].innerHTML = menu_description[+num].title;
      menuDesc.children[1].innerHTML = menu_description[+num].text;
      menuDesc.classList.remove('menu__desc_hide');
      menuDesc.classList.add('menu__desc_show');
    }, 200);
  }

  clearDesc() {
    let menuDesc = this.obj.children[1];
    menuDesc.classList.add('menu__desc_hide');
    setTimeout(function() {
      menuDesc.children[0].children[0].innerHTML = "";
      menuDesc.children[1].innerHTML = "";
    }, 500)
  }
}

let menu = new Menu('menu');

function handlerShowPage() {
  // let self = this;
  // console.log(page.numTitle);
  if (event.keyCode === 39) {
    page.showPage(+menu.activeItem.dataset.num);
  } else if (event.keyCode === 37 && menu.activeItemNum > 0) {
    let menuPrevActiveItemNum = menu.activeItemNum - 1;

    page.showPage(menuPrevActiveItemNum, page_info_arr[menuPrevActiveItemNum].length - 1)

    setTimeout(function() {
      menu.makeInactive();
      menu.makeActive(menu.navItems[menuPrevActiveItemNum]);
      menu.changeDesc(menu.navItems[menuPrevActiveItemNum].dataset.num);
    }, 500);

  }
}


function handlerMenuSlideBack () {
  // console.log(event.keyCode);
  if (event.keyCode === 38) {
    // menu.slideBack.apply(menu, arguments);
    menu.slideBack();
  }
}

function handlerMenuSlideForward () {
  console.log(event.keyCode);
  if (event.keyCode === 40) {
    // menu.slideBack.apply(menu, arguments);
    menu.slideForward();
  }
}


function handlerSliderPage() {
  if (event.keyCode === 39) {
    page.slideNext();
  } else if (event.keyCode === 37) {
    page.slidePrev();
  }
}

class Page {
  constructor(id) {
    this.obj = document.getElementById(id);
    this.numTitle = 0;
    this.pageSub = document.getElementById('page__subtitle');
    this.pageCounter = document.getElementById('page__counter-current-num');
    this.pageText = document.getElementById('page__text');
    this.pageImg = document.getElementById('page__image');
  }

  // showPage(numTitle) {
  //   this.numTitle = numTitle;
  //   this.infoArr = page_info_arr[this.numTitle];
  //   this.numOfPage = this.infoArr.length;
  //   this.currentPage = 0;

  //   console.log(this.infoArr);

  //   document.getElementById('page__counter-total-num').innerHTML = this.numOfPage;

  //   this.changePage(this.infoArr[this.currentPage], this.currentPage + 1);

  //   let self = this;
  //   menu.slideOnPage();

  //   window.removeEventListener('keyup', handlerShowPage);
  //   window.removeEventListener('keyup', handlerMenuSlideBack);
  //   window.removeEventListener('keyup', handlerMenuSlideForward);

  //   window.addEventListener('keyup', handlerSliderPage);
  // }

  showPage(numTitle, numPage = 0) {
    this.numTitle = numTitle;
    this.infoArr = page_info_arr[this.numTitle];
    this.numOfPage = this.infoArr.length;
    this.currentPage = numPage;

    document.getElementById('page__counter-total-num').innerHTML = this.numOfPage;

    this.changePage(this.infoArr[this.currentPage], this.currentPage + 1);

    const self = this;
    menu.slideOnPage();

    window.removeEventListener('keyup', handlerShowPage);
    window.removeEventListener('keyup', handlerMenuSlideBack);
    window.removeEventListener('keyup', handlerMenuSlideForward);

    window.addEventListener('keyup', handlerSliderPage);
  }

  hidePage() {
    window.removeEventListener('keyup', handlerSliderPage);

    window.addEventListener('keyup', handlerShowPage);
    window.addEventListener('keyup', handlerMenuSlideBack);
    window.addEventListener('keyup', handlerMenuSlideForward);

    menu.slideFromPage();
    this.obj.classList.remove('page_show');
  }

  slideNext() {
    const self = this;
    this.currentPage++;
    if (this.currentPage < this.numOfPage) {
      this.changePage(this.infoArr[this.currentPage], this.currentPage + 1);
    } else if (this.currentPage >= this.numOfPage) {
      this.hidePage();

      setTimeout(function() {
        // console.log(self.numTitle);
        if ( self.numTitle+1 < menu.navItems.length ) {
          menu.makeInactive();
          menu.makeActive(menu.navItems[self.numTitle + 1]);
          menu.changeDesc(menu.navItems[self.numTitle + 1].dataset.num);
        } else {
          menu.makeInactive();
          menu.clearDesc();
          // homePage.obj.style.display = 'block';

          homePage.slideOnHomePage();

          // for (let value of self.chapterList.children) {
          //   value.classList.remove('home-page__chapter_anim');
          // }
          // alert('Всё');
        }
      }, 500);
    }
  }

  slidePrev() {
    // console.log('gg');
    this.currentPage--;
    if (this.currentPage >= 0) {
      this.changePage(this.infoArr[this.currentPage], this.currentPage + 1);
    } else if (this.currentPage < 0) {
      this.hidePage();
    }
  }

  changePage(data, curPage) {
    const self = this;
    // let pageSub = document.getElementById('page__subtitle');
    // let pageCounter = document.getElementById('page__counter-current-num');
    // let pageText = document.getElementById('page__text');
    // let pageImg = document.getElementById('page__image');


    // let page = this.obj;

    this.obj.classList.remove('page_show');
    this.pageCounter.innerHTML = curPage;
    // this.obj.style.overflowY = "hidden"; 
    // this.obj.classList.add('page_hide');

    setTimeout(function() {
      self.pageImg.setAttribute('src', data.phPath);
      // self.obj.style.overflowY = "auto"; 
    }, 400);


    setTimeout(function() {
      // self.pageImg.setAttribute('src', data.phPath);
      // self.obj.classList.remove('page_hide');
      self.pageSub.innerHTML = data.subtitle;
      self.pageText.innerHTML = data.text;
      self.obj.classList.add('page_show');
    }, 500);
  }
}

let page = new Page('page');

let homePage = new HomePage('homePage');
homePage.showHomePage();
homePage.butToBegin.addEventListener('click', handlerHideHomePage);
window.addEventListener('keyup', handlerHideHomePage);

function handlerHideHomePage () {
  if (event.type === "click" || event.keyCode === 13) {
    homePage.hideHomePage();
    window.removeEventListener('keyup', handlerHideHomePage);

    setTimeout(function() {
      menu.showMenu();
      window.addEventListener('keyup', handlerShowPage);
      window.addEventListener('keyup', handlerMenuSlideBack);
      window.addEventListener('keyup', handlerMenuSlideForward);
    }, 500);
  }
}

// homePage.hidePage();

//     menu.showPage();
//     window.addEventListener('keyup', handlerShowPage);
//     window.addEventListener('keyup', handlerMenuSlideBack);
//     console.log(menu.activeItem.dataset);
