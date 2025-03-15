console.log("maria");

document.addEventListener('DOMContentLoaded', function() {
    // Mobile submenu toggle
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