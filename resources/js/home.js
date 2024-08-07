document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('mobile-menu-button')
  const mobileMenu = document.getElementById('mobile-menu')
  const openIcon = menuButton.querySelector('svg:nth-of-type(1)')
  const closeIcon = menuButton.querySelector('svg:nth-of-type(2)')

  menuButton.addEventListener('click', function () {
    // Toggle the 'hidden' class to show/hide the mobile menu
    mobileMenu.classList.toggle('hidden')
    // Toggle icon visibility
    openIcon.classList.toggle('hidden')
    closeIcon.classList.toggle('hidden')
  })

  // Optional: Hide mobile menu if clicked outside
  document.addEventListener('click', function (event) {
    if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.add('hidden')
      openIcon.classList.remove('hidden')
      closeIcon.classList.add('hidden')
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('user-menu-button')
  const dropdownMenu = document.getElementById('dropdown-menu')

  button.addEventListener('click', function () {
    // Toggle the 'hidden' class to show/hide the dropdown menu
    dropdownMenu.classList.toggle('hidden')
  })

  // Optional: Hide dropdown if clicked outside of it
  document.addEventListener('click', function (event) {
    if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.add('hidden')
    }
  })
})

document.addEventListener('DOMContentLoaded', () => {
  let isLoading = false;

  async function fetchData() {
    if (isLoading) return;

    isLoading = true;

    const api = {
      url_oaa_queryimei: 'http://localhost:3333/api/oaa-queryimei',
      url_oaa_checkstock: 'http://localhost:3333/api/oaa-checkstock',
      url_opp_item: 'http://localhost:3333/api/opp-item',
      url_opp_checkout: 'http://localhost:3333/api/opp-checkout',
      url_kafka: 'http://localhost:3333/api/kafka',
    }

    function updateClass(elementId, addClass, removeClass) {
      var element = document.getElementById(elementId);
      if (element) {
        element.classList.remove(removeClass);
        element.classList.add(addClass);
      }
    }

    let fetchInterval;

    const showModal = async (tableName, title, intervalDuration = 10000) => {
      try {
        const fetchData = async () => {
          try {
            const response = await fetch(`/hit-count?transaction_title=${encodeURIComponent(title)}&table_name=${encodeURIComponent(tableName)}`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            console.log(`Data fetched for ${title} in table ${tableName}:`, data);
        
            const modalElement = document.getElementById('myModal');
            const modalContent = document.getElementById('modalContent');
        
            modalContent.innerHTML = '<canvas id="myChart" class="w-full h-64"></canvas>';
    
            if (modalElement) modalElement.classList.remove('hidden');
        
            const latestData = data.slice(-10);
            const labels = latestData.map(item => item.timeMinute);
            const ticksInMinute = latestData.map(item => item.ticksInMinute);
    
            new Chart(document.getElementById('myChart').getContext('2d'), {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Ticks In Minute',
                  data: ticksInMinute,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: { beginAtZero: true, title: { display: true, text: 'Time Minute' }},
                  y: { beginAtZero: true, title: { display: true, text: 'Ticks In Minute' }}
                }
              }
            });
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        await fetchData();
        
        if (fetchInterval) clearInterval(fetchInterval);
        fetchInterval = setInterval(fetchData, intervalDuration);
        
      } catch (error) {
        console.error('Error in showModal:', error);
      }
    };

    const closeModal = () => {
      const modal = document.getElementById('myModal');
      if (modal) {
        modal.classList.add('hidden');
        if (fetchInterval) clearInterval(fetchInterval);
      }
    };

    const modal = document.getElementById('myModal');
    const closeModalButton = document.getElementById('closeModal');

    if (closeModalButton) closeModalButton.onclick = closeModal;
    window.onclick = (event) => {
      if (event.target === modal) closeModal();
    };


    const updateUI = (elementId, response) => {
      const rounded_number = round(response.avg, 3);
      document.getElementById(elementId).innerHTML = rounded_number + 's';
      const tableName = response.table_name;
      const title = response.transaction_title;

      const button = document.getElementById(elementId + '_btn');
      if (button) {
        button.onclick = () => showModal(tableName, title);
      }

      let minimum = 1;
      if(elementId === "div_opp_item" || elementId === "div_oaa_checkstock") {
        minimum = 2;
      } else {
        minimum = 1;
      }

      if (rounded_number > minimum) {
        updateClass(elementId, 'text-danger', 'text-success');
        updateClass(elementId + '_icon', 'text-danger', 'text-success');
        updateClass(elementId + '_icon', 'fa-arrow-up', 'fa-arrow-down');
      } else {
        updateClass(elementId, 'text-success', 'text-danger');
        updateClass(elementId + '_icon', 'text-success', 'text-danger');
        updateClass(elementId + '_icon', 'fa-arrow-down', 'fa-arrow-up');
      }
    }

    const round = (num, decimals) => {
      const factor = Math.pow(10, decimals)
      return Math.round(num * factor) / factor
    }

    const fetchDataFromAPI = async (url, elementId) => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        updateUI(elementId, data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    for (let [key, value] of Object.entries(api)) {
      const elementId = key.replace('url_', 'div_')
      fetchDataFromAPI(value, elementId)
    }

    isLoading = false;
  }

  fetchData()
  setInterval(fetchData, 10000)
  getDateTime()
})


async function getDateTime() {
  function updateTime() {
    var str = ''

    var days = new Array(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    )
    var months = new Array(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    )

    var now = new Date()

    str +=
      days[now.getDay()] +
      ', ' +
      now.getDate() +
      ' ' +
      months[now.getMonth()] +
      ' ' +
      now.getFullYear() +
      ' ' +
      now.getHours() +
      ':' +
      now.getMinutes() +
      ':' +
      now.getSeconds()
    document.getElementById('date_time_now').innerHTML = str
  }
  setInterval(updateTime, 500)
}

const modal = document.getElementById('myModal');
const closeModalButton = document.getElementById('closeModal');

if (closeModalButton) {
  closeModalButton.onclick = () => {
    if (modal) {
      modal.classList.add('hidden');
    }
  }
}

window.onclick = (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
}
