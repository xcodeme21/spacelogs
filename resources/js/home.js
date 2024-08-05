document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = menuButton.querySelector('svg:nth-of-type(1)');
    const closeIcon = menuButton.querySelector('svg:nth-of-type(2)');

    menuButton.addEventListener('click', function () {
      // Toggle the 'hidden' class to show/hide the mobile menu
      mobileMenu.classList.toggle('hidden');
      // Toggle icon visibility
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    // Optional: Hide mobile menu if clicked outside
    document.addEventListener('click', function (event) {
      if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });

   document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('user-menu-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    button.addEventListener('click', function () {
      // Toggle the 'hidden' class to show/hide the dropdown menu
      dropdownMenu.classList.toggle('hidden');
    });

    // Optional: Hide dropdown if clicked outside of it
    document.addEventListener('click', function (event) {
      if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
      }
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    async function fetchData() {
      const api = {
        url_oaa_queryimei: 'http://localhost:3333/api/oaa_queryimei',
        // url_ora_cekstock: 'http://localhost:3333/ora_cekstock',
        // url_orl_createorder: 'http://localhost:3333/orl_createorder',
        // url_orl_deliveryorder: 'http://localhost:3333/orl_deliveryorder',
        // url_orl_getinvoice: 'http://localhost:3333/orl_getinvoice',
        // url_orl_cn: 'http://localhost:3333/orl_cn',
        // url_orl_updateinventory: 'http://localhost:3333/orl_updateinventory'
      };
  
      const updateUI = (elementId, response) => {
        const rounded_number = round(response.avg, 3)
        document.getElementById(elementId).innerHTML = rounded_number + " s";

        let arrowIcon = '';

        if (rounded_number > 1) {
          arrowIcon = '<i class="fa fa-arrow-up fa-2x text-danger" aria-hidden="true"></i>';
        } else {
          arrowIcon = '<i class="fa fa-arrow-down fa-2x text-success" aria-hidden="true"></i>';
        }
        document.getElementById(elementId+"_icon").innerHTML = arrowIcon;
      };

      const round = (num, decimals) => {
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
      };
  
      const fetchDataFromAPI = async (url, elementId) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          updateUI(elementId, data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      for (let [key, value] of Object.entries(api)) {
        const elementId = key.replace('url_', 'div_');
        fetchDataFromAPI(value, elementId);
      }
    }
  
    fetchData();
  });
  