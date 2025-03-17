console.log("maria");
$(document).ready(function () {
    $('[data-toggle="collapse"]').on('click', function () {
       $(this).find('.angle').toggleClass('rotated');
    });
 });
 $(document).ready(function () {
    $(".search").on("keyup", function () {
       var value = $(this).val().toLowerCase();
       $(".list li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
       });
    });
 });
 
 
 document.addEventListener('DOMContentLoaded', function () {
    const noResultsAlert = document.querySelector('.alert-secondary');
    const vehicleRows = document.querySelectorAll('.vehicle-row');
    const searchForm = document.getElementById('search-keywords');
    const searchInput = searchForm.querySelector('input[name="keywords"]');
 
    if (noResultsAlert) {
       noResultsAlert.style.display = 'none';
    }
 
    function performSearch() {
       const searchTerm = searchInput.value.trim().toLowerCase();
       let matchFound = false;
 
       vehicleRows.forEach(row => {
          row.classList.remove('d-none');
 
          const rowText = row.innerText.toLowerCase();
          const isMatch = rowText.includes(searchTerm);
 
          row.style.display = isMatch ? 'block' : 'none';
 
          if (isMatch) {
             matchFound = true;
          }
       });
 
       if (noResultsAlert) {
          if (!matchFound && searchTerm !== '') {
             noResultsAlert.style.display = 'block';
          } else {
             noResultsAlert.style.display = 'none';
          }
       }
    }
 
    searchInput.addEventListener('input', performSearch);
 });
 document.addEventListener('DOMContentLoaded', function () {
    const fromYearInput = document.getElementById('from_year');
    const toYearInput = document.getElementById('to_year');
    const yearFiltersApplyButton = document.querySelector('#years-filters input[type="submit"]');
    const vehicleRows = document.querySelectorAll('.vehicle-row');
    const noResultsAlert = document.querySelector('.alert-secondary');
 
    function applyYearFilter() {
       const fromYear = parseInt(fromYearInput.value) || 1920;
       const toYear = parseInt(toYearInput.value) || 2026;
       let matchFound = false;
 
       vehicleRows.forEach(row => {
          const carTitleElement = row.querySelector('.vehicle-model');
          if (carTitleElement) {
             const carYear = extractYearFromTitle(carTitleElement.textContent);
             const isInYearRange = carYear >= fromYear && carYear <= toYear;
 
             row.style.display = isInYearRange ? 'block' : 'none';
 
             if (isInYearRange) {
                matchFound = true;
             }
          }
       });
 
       if (noResultsAlert) {
          noResultsAlert.style.display = matchFound ? 'none' : 'block';
       }
    }
 
    function extractYearFromTitle(title) {
       const yearMatch = title.match(/\d{4}/);
       return yearMatch ? parseInt(yearMatch[0]) : 0;
    }
    yearFiltersApplyButton.addEventListener('click', function (event) {
       event.preventDefault();
       applyYearFilter();
    });
 
    fromYearInput.addEventListener('input', applyYearFilter);
    toYearInput.addEventListener('input', applyYearFilter);
 });
 
 
    document.addEventListener('DOMContentLoaded', function () {
       const vehicleContainer = document.querySelector('.vehicle-listings');
       const vehicleRows = Array.from(document.querySelectorAll('.vehicle-row'));
       const listingSummary = document.querySelector('.listing-summary');
       const paginationContainer = document.querySelector('.pagination');
       const entriesOptions = document.querySelectorAll('#listing-items + .dropdown-menu a');
       const pageSizeButton = document.getElementById('listing-items');
 
       let currentPage = 1;
       let pageSize = 25;
       const totalEntries = vehicleRows.length;
       const totalPages = Math.ceil(totalEntries / pageSize);
 
       function updatePageView() {
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
 
          vehicleRows.forEach(row => row.style.display = 'none');
 
          vehicleRows.slice(startIndex, endIndex).forEach(row => row.style.display = 'block');
 
          if (listingSummary) {
             listingSummary.textContent = `Showing ${startIndex + 1} to ${Math.min(endIndex, totalEntries)} of ${totalEntries} entries`;
          }
 
          updatePaginationButtons();
       }
 
       function updatePaginationButtons() {
          if (!paginationContainer) return;
 
          paginationContainer.innerHTML = '';
 
          const actualPages = Math.ceil(totalEntries / pageSize);
 
          if (currentPage > 1) {
             const prevButton = document.createElement('li');
             prevButton.classList.add('page-item');
             prevButton.innerHTML = `<a class="page-link" href="#"><</a>`;
             prevButton.addEventListener('click', () => {
                currentPage--;
                updatePageView();
             });
             paginationContainer.appendChild(prevButton);
          }
 
          for (let i = 1; i <= actualPages; i++) {
             const pageButton = document.createElement('li');
             pageButton.classList.add('page-item');
             if (i === currentPage) {
                pageButton.classList.add('active');
             }
             pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
             pageButton.addEventListener('click', () => {
                currentPage = i;
                updatePageView();
             });
             paginationContainer.appendChild(pageButton);
          }
 
          if (currentPage < actualPages) {
             const nextButton = document.createElement('li');
             nextButton.classList.add('page-item', 'page-next');
             nextButton.innerHTML = `<a class="page-link" href="#">></a>`;
             nextButton.addEventListener('click', () => {
                currentPage++;
                updatePageView();
             });
             paginationContainer.appendChild(nextButton);
          }
 
          if (actualPages > 1) {
             const lastButton = document.createElement('li');
             lastButton.classList.add('page-item', 'text-nowrap', 'd-none', 'd-md-inline-block');
             lastButton.innerHTML = `<a class="page-link" href="#">Last ›</a>`;
             lastButton.addEventListener('click', () => {
                currentPage = actualPages;
                updatePageView();
             });
             paginationContainer.appendChild(lastButton);
          }
       }
 
       entriesOptions.forEach(option => {
          option.addEventListener('click', function (e) {
             e.preventDefault();
             pageSize = parseInt(this.textContent);
 
             entriesOptions.forEach(opt => opt.classList.remove('active'));
 
             this.classList.add('active');
 
             pageSizeButton.textContent = pageSize;
 
             currentPage = 1;
             updatePageView();
          });
       });
 
       updatePageView();
    });
document.addEventListener('DOMContentLoaded', function() {
    const mobileSubmenus = document.querySelectorAll('.dropdown-submenu .dropdown-item');
    
    mobileSubmenus.forEach(submenu => {
        submenu.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                e.preventDefault();
                
                const dropdownMenu = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                        menu.previousElementSibling.setAttribute('aria-expanded', 'false');
                    }
                });
                
                dropdownMenu.classList.toggle('show');
                this.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuOverlay = document.querySelector('.menu-overlay');
    const navbarCollapse = document.querySelector('.navbar-collapse');
        navbarCollapse.addEventListener('show.bs.collapse', function() {
        menuOverlay.classList.add('show');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function() {
        menuOverlay.classList.remove('show');
    });

    menuOverlay.addEventListener('click', function() {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const entriesDropdown = document.getElementById('listing-items');
    const entriesOptions = document.querySelectorAll('.dropdown-menu[aria-labelledby="listing-items"] .dropdown-item');

    entriesOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedEntries = this.textContent.trim();
            
            entriesDropdown.innerHTML = `${selectedEntries} <i class="caret"></i>`;

            entriesOptions.forEach(opt => opt.classList.remove('active'));

            this.classList.add('active');

            console.log(`Selected ${selectedEntries} entries`);
        });
    });

    const sortDropdown = document.getElementById('listing-order');
    const sortOptions = document.querySelectorAll('.dropdown-menu[aria-labelledby="listing-order"] .dropdown-item');

    sortOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedSort = this.textContent.trim().replace(/\s*<.*>$/, '');
            
            sortDropdown.innerHTML = `<span class="la la-sort-amount-asc"></span> ${selectedSort}`;

            sortOptions.forEach(opt => opt.classList.remove('active'));

            this.classList.add('active');

            console.log(`Sorted by: ${selectedSort}`);
        });
    });

    const paginationContainer = document.querySelector('.listing-pagination');
    const paginationLinks = paginationContainer.querySelectorAll('.page-link');

    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            paginationContainer.querySelectorAll('.page-item').forEach(item => {
                item.classList.remove('active');
            });

            const pageItem = this.closest('.page-item');
            pageItem.classList.add('active');

            const pageNumber = this.textContent;

            if (pageNumber === '›') {
                const currentActive = paginationContainer.querySelector('.page-item.active');
                const nextPage = currentActive.nextElementSibling;
                if (nextPage && !nextPage.classList.contains('page-next')) {
                    currentActive.classList.remove('active');
                    nextPage.classList.add('active');
                }
            } else if (pageNumber === 'Last ›') {
                paginationContainer.querySelectorAll('.page-item').forEach(item => {
                    item.classList.remove('active');
                });
                paginationContainer.querySelector('.page-item:nth-last-child(2)').classList.add('active');
            }

            console.log(`Navigated to page: ${pageNumber}`);
        });
    });

    // Image Layer Functionality
    const imageLayer = document.getElementById('image-layer');
    const closeImageLayer = document.querySelector('.close-image-layer');
    const imageLayerSwiper = new Swiper('.image-layer-swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    function openImageLayer(images) {
        const imageLayerWrapper = document.getElementById('image-layer-swiper-wrapper');
        imageLayerWrapper.innerHTML = ''; // Clear previous images

        images.forEach(imageSrc => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            const img = document.createElement('img');
            img.src = imageSrc;
            slide.appendChild(img);
            imageLayerWrapper.appendChild(slide);
        });

        imageLayerSwiper.update();
        imageLayer.style.display = 'block';
    }

    closeImageLayer.addEventListener('click', function() {
        imageLayer.style.display = 'none';
    });

    // Attach click events to "View All Images" and vehicle images
    document.querySelectorAll('.photo-swipe, .show-vehicle-images').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const vehicleRow = this.closest('.vehicle-row');
            const images = Array.from(vehicleRow.querySelectorAll('.swiper-slide img'))
                .map(img => img.src.replace('width=250', 'width=1200')); 
            openImageLayer(images);
        });
    });
});