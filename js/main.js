function fetchDeviceData() {
    fetch("http://54.157.232.27/api/devices")
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la información");
        }
        return response.json();
      })
      .then(data => {
        const tbody = document.getElementById("data-table-body");
        const statusHeading = document.getElementById("main-status");
  
        tbody.innerHTML = ""; // Limpiar tabla
  
        if (data.devices[0].status != "") {
          // Mostrar el status de la primera fila
          statusHeading.textContent = `Estado actual: ${data.devices[0].status}`;
        } else {
          statusHeading.textContent = "No hay datos disponibles";
        }

        console.table(data.devices);
  
        data.devices.forEach(device => {
          const row = `
            <tr>
              <td>${device.id}</td>
              <td>${device.name}</td>
              <td>${device.ip}</td>
              <td>${device.status}</td>
              <td>${device.date}</td>
            </tr>
          `;
          tbody.innerHTML += row;
        });
      })
      .catch(error => {
        console.error("Error al obtener los datos:", error);
      });
  }
  
  setInterval(fetchDeviceData, 2000);
  document.addEventListener("DOMContentLoaded", fetchDeviceData);
  
