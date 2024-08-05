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
        url_oaa_queryimei: 'http://localhost:3333/api/oaa-queryimei',
        url_oaa_checkstock: 'http://localhost:3333/api/oaa-checkstock',
        url_opp_item: 'http://localhost:3333/api/opp-item',
        url_opp_checkout: 'http://localhost:3333/api/opp-checkout',
        url_kafka: 'http://localhost:3333/api/kafka',
      };
  
      const updateUI = (elementId, response) => {
        const rounded_number = round(response.avg, 3)
        document.getElementById(elementId).innerHTML = rounded_number + "s";

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
    setInterval(fetchData, 5000);
    getDateTime();
  });


  async function getDateTime() {
    function updateTime(){
        var str = "";

        var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        var now = new Date();

        str += days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
        document.getElementById("date_time_now").innerHTML = str;
    }
    setInterval(updateTime, 1000);
  }
  