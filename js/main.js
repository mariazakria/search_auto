console.log("maria");
document.addEventListener('DOMContentLoaded', function() {
    // Mobile submenu toggle
    const mobileSubmenus = document.querySelectorAll('.dropdown-submenu .dropdown-item');
    
    mobileSubmenus.forEach(submenu => {
        submenu.addEventListener('click', function(e) {
            // Check if we're in mobile view
            if (window.innerWidth <= 767) {
                e.preventDefault();
                
                // Toggle dropdown menu
                const dropdownMenu = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other submenus
                document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                        menu.previousElementSibling.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current submenu
                dropdownMenu.classList.toggle('show');
                this.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });
});

// Mobile Menu Overlay
document.addEventListener('DOMContentLoaded', function() {
    const menuOverlay = document.querySelector('.menu-overlay');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Show overlay when mobile menu is opened
    navbarCollapse.addEventListener('show.bs.collapse', function() {
        menuOverlay.classList.add('show');
    });

    // Hide overlay when mobile menu is closed
    navbarCollapse.addEventListener('hide.bs.collapse', function() {
        menuOverlay.classList.remove('show');
    });

    // Close mobile menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Entries Dropdown
    const entriesDropdown = document.getElementById('listing-items');
    const entriesOptions = document.querySelectorAll('.dropdown-menu[aria-labelledby="listing-items"] .dropdown-item');

    entriesOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedEntries = this.textContent.trim();
            
            // Update the button text
            entriesDropdown.innerHTML = `${selectedEntries} <i class="caret"></i>`;

            // Remove active class from all options
            entriesOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to the selected option
            this.classList.add('active');

            console.log(`Selected ${selectedEntries} entries`);
        });
    });

    // Sort By dropdown
    const sortDropdown = document.getElementById('listing-order');
    const sortOptions = document.querySelectorAll('.dropdown-menu[aria-labelledby="listing-order"] .dropdown-item');

    sortOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedSort = this.textContent.trim().replace(/\s*<.*>$/, '');
            
            // Update the button text
            sortDropdown.innerHTML = `<span class="la la-sort-amount-asc"></span> ${selectedSort}`;

            // Remove active class from all options
            sortOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to the selected option
            this.classList.add('active');

            console.log(`Sorted by: ${selectedSort}`);
        });
    });

    // Pagination functionality
    const paginationContainer = document.querySelector('.listing-pagination');
    const paginationLinks = paginationContainer.querySelectorAll('.page-link');

    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all page items
            paginationContainer.querySelectorAll('.page-item').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked page
            const pageItem = this.closest('.page-item');
            pageItem.classList.add('active');

            // Get the page number
            const pageNumber = this.textContent;

            // Handle special cases for 'Next' and 'Last'
            if (pageNumber === '›') {
                // Go to next page logic
                const currentActive = paginationContainer.querySelector('.page-item.active');
                const nextPage = currentActive.nextElementSibling;
                if (nextPage && !nextPage.classList.contains('page-next')) {
                    currentActive.classList.remove('active');
                    nextPage.classList.add('active');
                }
            } else if (pageNumber === 'Last ›') {
                // Go to last page logic
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
                .map(img => img.src.replace('width=250', 'width=1200')); // Get high-res images
            openImageLayer(images);
        });
    });
});