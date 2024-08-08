document.addEventListener('DOMContentLoaded', function () {
  let fetchInterval;
  
  const modal = document.getElementById('myModal');
  const closeModalButton = document.getElementById('closeModal');
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  document.body.appendChild(overlay);

  const showModal = async (tableName, title, elementId, intervalDuration = 60000) => {
    overlay.style.display = 'block';
    try {
      const response = await fetch(`/hit-count?transaction_title=${encodeURIComponent(title)}&table_name=${encodeURIComponent(tableName)}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      const modalTitle = {
        div_oaa_queryimei: 'OAA Query Imei',
        div_oaa_checkstock: 'OAA Check Stock',
        div_opp_item: 'OPP Item',
        div_opp_checkout: 'OPP Checkout',
        div_kafka: 'Kafka',
      }[elementId] || elementId;

      document.getElementById("modalTitle").innerHTML = modalTitle;
      document.getElementById("modalContent").innerHTML = '<canvas id="myChart" class="w-full h-64"></canvas>';

      if (modal) modal.classList.remove('hidden');

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
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { beginAtZero: true, title: { display: true, text: 'Time Minute' } },
            y: { beginAtZero: true, title: { display: true, text: 'Ticks In Minute' } },
          },
        },
      });

      if (fetchInterval) clearInterval(fetchInterval);
      fetchInterval = setInterval(() => showModal(tableName, title, elementId, intervalDuration), intervalDuration);
    } catch (error) {
      console.error('Error in showModal:', error);
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add('hidden');
      overlay.style.display = 'none';
      if (fetchInterval) clearInterval(fetchInterval);
    }
  };

  if (closeModalButton) {
    closeModalButton.onclick = closeModal;
  }

  overlay.onclick = (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  };

  const updateClass = (elementId, addClass, removeClass) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove(removeClass);
      element.classList.add(addClass);
    }
  };

  const updateUI = (elementId, response) => {
    const rounded_number = round(response.avg, 3);
    document.getElementById(elementId).innerHTML = rounded_number + 's';
    const tableName = response.table_name;
    const title = response.transaction_title;

    const button = document.getElementById(elementId + '_btn');
    if (button) {
      button.onclick = () => showModal(tableName, title, elementId);
    }

    const minimum = ["div_opp_item", "div_oaa_checkstock"].includes(elementId) ? 2 : 1;

    if (rounded_number > minimum) {
      updateClass(elementId, 'text-danger', 'text-success');
      updateClass(elementId + '_icon', 'text-danger', 'text-success');
      updateClass(elementId + '_icon', 'fa-arrow-up', 'fa-arrow-down');
    } else {
      updateClass(elementId, 'text-success', 'text-danger');
      updateClass(elementId + '_icon', 'text-success', 'text-danger');
      updateClass(elementId + '_icon', 'fa-arrow-down', 'fa-arrow-up');
    }
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

  const api = {
    url_oaa_queryimei: '/api/oaa-queryimei',
    url_oaa_checkstock: '/api/oaa-checkstock',
    url_opp_item: '/api/opp-item',
    url_opp_checkout: '/api/opp-checkout',
    url_kafka: '/api/kafka',
  };

  for (const [key, value] of Object.entries(api)) {
    const elementId = key.replace('url_', 'div_');
    fetchDataFromAPI(value, elementId);
    setInterval(() => fetchDataFromAPI(value, elementId), 60000);
  }
});
