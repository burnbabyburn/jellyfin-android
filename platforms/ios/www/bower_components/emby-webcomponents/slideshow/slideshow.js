define(["paperdialoghelper","inputManager","connectionManager","browser","css!./style","html!./icons","iron-icon-set","paper-fab","paper-icon-button","paper-spinner"],function(e,i,t,a){return function(n){function o(t){k=e.createDialog({exitAnimationDuration:t.interactive?400:800,size:"fullscreen"}),k.classList.add("slideshowDialog");var a="";t.interactive?(a+="<div>",a+='<div class="slideshowSwiperContainer"><div class="swiper-wrapper"></div></div>',a+='<paper-fab mini icon="slideshow:arrow-back" class="btnSlideshowExit" tabindex="-1"></paper-fab>',a+='<div class="slideshowControlBar">',a+='<paper-icon-button icon="slideshow:skip-previous" class="btnSlideshowPrevious slideshowButton"></paper-icon-button>',a+='<paper-icon-button icon="slideshow:pause" class="btnSlideshowPause slideshowButton" autoFocus></paper-icon-button>',a+='<paper-icon-button icon="slideshow:skip-next" class="btnSlideshowNext slideshowButton"></paper-icon-button>',a+="</div>",a+="</div>"):a+='<div class="slideshowImage"></div><h1 class="slideshowImageText"></h1>',k.innerHTML=a,t.interactive&&(k.querySelector(".btnSlideshowExit").addEventListener("click",function(){e.close(k)}),k.querySelector(".btnSlideshowNext").addEventListener("click",p),k.querySelector(".btnSlideshowPrevious").addEventListener("click",u),k.querySelector(".btnSlideshowPause").addEventListener("click",v)),document.body.appendChild(k),e.open(k).then(function(){S(),k.parentNode.removeChild(k)}),i.on(window,x),k.addEventListener("iron-overlay-closed",g),t.interactive&&r(k)}function r(e){e.querySelector(".swiper-wrapper").innerHTML=P.slides?P.slides.map(c).join(""):P.items.map(s).join(""),require(["swiper"],function(){T=new Swiper(e.querySelector(".slideshowSwiperContainer"),{direction:"horizontal",loop:n.loop!==!1,autoplay:n.interval||8e3,preloadImages:!1,lazyLoading:!0,autoplayDisableOnInteraction:!1,initialSlide:n.startIndex||0}),T.on("onLazyImageLoad",l),T.on("onLazyImageReady",d),a.mobile?m():h()})}function s(e){return c({imageUrl:f(e)})}function l(e,i){var t=i.querySelector("paper-spinner");t&&(t.active=!0)}function d(e,i){var t=i.querySelector("paper-spinner");t&&(t.active=!1,t.parentNode.removeChild(t))}function c(e){var i="";return i+='<div class="swiper-slide">',i+='<img data-src="'+e.imageUrl+'" class="swiper-lazy">',i+="<paper-spinner></paper-spinner>",(e.title||e.subtitle)&&(i+='<div class="slideText">',i+='<div class="slideTextInner">',e.title&&(i+='<div class="slideTitle">',i+=e.title,i+="</div>"),e.description&&(i+='<div class="slideSubtitle">',i+=e.description,i+="</div>"),i+="</div>",i+="</div>"),i+="</div>"}function u(){T?T.slidePrev():(S(),I(B-1))}function p(){if(T){if(n.loop===!1&&T.activeIndex>=T.slides.length-1)return void e.close(k);T.slideNext()}else S(),I(B+1)}function h(){k.querySelector(".btnSlideshowPause").icon="slideshow:pause",T.startAutoplay()}function m(){k.querySelector(".btnSlideshowPause").icon="slideshow:play-arrow",T.stopAutoplay()}function v(){var e="slideshow:pause"!=k.querySelector(".btnSlideshowPause").icon;e?h():m()}function g(){var e=T;e&&(e.off("onLazyImageLoad"),e.off("onLazyImageReady"),e.destroy(!0,!0),T=null),i.off(window,x)}function w(e){P=e,S(),o(e),e.interactive||(q=e.interval||8e3,I(e.startIndex||0,!0))}function f(e){var i=t.getApiClient(e.ServerId);return e.BackdropImageTags&&e.BackdropImageTags.length?y(e,{maxWidth:screen.availWidth},i):b(e,{type:"Primary",maxWidth:screen.availWidth},i)}function y(e,i,t){return i=i||{},i.type=i.type||"Backdrop",i.width=null,delete i.width,i.maxWidth=null,delete i.maxWidth,i.maxHeight=null,delete i.maxHeight,i.height=null,delete i.height,i.maxWidth||i.width||i.maxHeight||i.height||(i.quality=100),e.BackdropImageTags&&e.BackdropImageTags.length?(i.tag=e.BackdropImageTags[0],t.getScaledImageUrl(e.Id,i)):null}function b(e,i,t){return i=i||{},i.type=i.type||"Primary","string"==typeof e?t.getScaledImageUrl(e,i):e.ImageTags&&e.ImageTags[i.type]?(i.tag=e.ImageTags[i.type],t.getScaledImageUrl(e.Id,i)):"Primary"==i.type&&e.AlbumId&&e.AlbumPrimaryImageTag?(i.tag=e.AlbumPrimaryImageTag,t.getScaledImageUrl(e.AlbumId,i)):null}function I(e,i){e=Math.max(0,e),e>=P.items.length&&(e=0),B=e;var t=P,a=t.items,n=a[e],o=f(n),r=function(){var i=k.querySelector(".slideshowImage"),a=document.createElement("div");a.className=i.className,t.cover&&a.classList.add("cover"),a.style.backgroundImage="url('"+o+"')",a.classList.add("hide"),i.parentNode.appendChild(a),k.querySelector(".slideshowImageText").innerHTML=t.showTitle?n.Name:"",a.classList.remove("hide");var r=function(){var e=i.parentNode;e&&e.removeChild(i)};if(a.animate){var s=[{opacity:"0",offset:0},{opacity:"1",offset:1}],l={duration:1200,iterations:1};a.animate(s,l).onfinish=r}else r();S(),L=setTimeout(function(){I(e+1,!0)},q)};if(i)r();else{var s=new Image;s.onload=r,s.src=o}}function S(){L&&(clearTimeout(L),L=null)}function x(e){switch(e.detail.command){case"left":u();break;case"right":p();break;case"play":h();break;case"pause":m();break;case"playpause":v();break;default:return}e.preventDefault()}var T,k,L,q,P,B,N=this;N.show=function(){w(n)},N.hide=function(){var i=k;i&&e.close(i)}}});