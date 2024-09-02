
const slides = document.querySelectorAll('.slide');
  const controls = document.querySelectorAll('.control');
  let activeSlide = 0;
  let prevActive = 0;
  
  changeSlides();
  let int = setInterval(changeSlides, 8000);
  
  function changeSlides() {
    slides[prevActive].classList.remove('active');
    controls[prevActive].classList.remove('active');
  
    slides[activeSlide].classList.add('active');
    controls[activeSlide].classList.add('active');
    
    prevActive = activeSlide++;
    
    if(activeSlide >= slides.length) {
      activeSlide = 0;
    }
    
    console.log(prevActive, activeSlide);
  }
  
  controls.forEach(control => {
    control.addEventListener('click', () => {
      let idx = [...controls].findIndex(c => c === control);
      activeSlide = idx;
  
      changeSlides();
  
      clearInterval(int);
      int = setInterval(changeSlides, 8000);
    });
  });

  const splide = new Splide(".splide", {
    // Optional parameters
    start: 1,
    perPage: 1.5,
    perMove: 1,
    gap: 20,
    type: "loop",
    drag: "free",
    snap: false,
    interval: 3000,
    arrows: true,
    pagination: true,
    rewind: true,
    rewindByDrag: true,
    lazyLoad: true,
 
    // Responsive breakpoint
    breakpoints: {
       768: {
          perPage: 1,
          snap: true
       }
    }
 });
 
 splide.mount();

 const prevBtns = document.querySelectorAll(".btn-prev");
 const nextBtns = document.querySelectorAll(".btn-next");
 const progress = document.getElementById("progress");
 const formSteps = document.querySelectorAll(".form-step");
 const progressSteps = document.querySelectorAll(".progress-step");
 
 const btnComplete = document.querySelector(".btn-complete");
 btnComplete.addEventListener("click", () => {
     document.getElementsByTagName('form').submit
 })
 let formStepsNum = 0;
 let experienceNum = 1;
 function updateFormSteps() {
 
     formSteps.forEach(formStep => {
         formStep.classList.contains("active") &&
             formStep.classList.remove("active");
     })
     formSteps[formStepsNum].classList.add("active");
 }
 
 function updateProgressBar() {
     progressSteps.forEach((progressStep, idx) => {
         if (idx < formStepsNum + 1) {
             progressStep.classList.add("active");
         } else {
             progressStep.classList.remove("active");
         }
     })
 
     const progressActive = document.querySelectorAll(".progress-step.active");
     progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%';
 }
 
 
 nextBtns.forEach(btn => {
     btn.addEventListener("click", function () {
         formStepsNum++;
         updateFormSteps();
         updateProgressBar();
         console.log("kk")
     })
 })
 
 
 prevBtns.forEach(btn => {
     btn.addEventListener("click", function () {
         formStepsNum--;
         updateFormSteps();
         updateProgressBar();
         console.log("kk")
     })
 })
 
 //-----------------//
 $('#myCarousel').carousel({
   interval:   4000
 });
  
 

  
 