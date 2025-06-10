function toggleMenu() {
  const menu = document.getElementById('side-menu');
  menu.classList.toggle('active');
}

const map = L.map('map').setView([-25.450, -49.230], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

let currentMarker = null;
let userLocation = null;
let routingControl = null;
const lastPositions = [];
const maxPositions = 5;

function calcularMediaPosicoes(positions) {
  const total = positions.length;
  let latSum = 0, lngSum = 0;
  positions.forEach(pos => {
    latSum += pos.lat;
    lngSum += pos.lng;
  });
  return L.latLng(latSum / total, lngSum / total);
}

map.locate({ setView: true, maxZoom: 17, enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });

map.on('locationfound', (e) => {
  lastPositions.push(e.latlng);
  if (lastPositions.length > maxPositions) lastPositions.shift();

  userLocation = calcularMediaPosicoes(lastPositions);

  if (window.userMarker) {
    map.removeLayer(window.userMarker);
  }

  window.userMarker = L.marker(userLocation)
    .addTo(map)
    .bindPopup("Você está aqui")
    .openPopup();

  map.setView(userLocation, 17);
});

map.on('locationerror', () => {
  alert("Não foi possível obter sua localização.");
});

function traçarRota(destino) {
  if (routingControl) map.removeControl(routingControl);

  routingControl = L.Routing.control({
    waypoints: [userLocation, destino],
    routeWhileDragging: false,
    showAlternatives: false,
    fitSelectedRoutes: true,
    lineOptions: { styles: [{ color: '#3b82f6', weight: 5 }] },
    createMarker: () => null
  }).addTo(map);
}

function onMapClick(e) {
  const { lat, lng } = e.latlng;

  if (currentMarker) map.removeLayer(currentMarker);
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }

  const popupContent = `
    <div style="width:180px;background:#4B4B3E;border-radius:16px;padding:12px;text-align:center;color:white;font-family:Poppins,sans-serif;">
      <div style="margin-bottom:10px;font-size:14px;">O que deseja fazer?</div>
      <button id="btnRotas" style="background-color:#3b82f6;color:white;border:none;border-radius:12px;padding:6px 12px;margin-bottom:8px;width:100%;font-weight:bold;cursor:pointer;">ROTAS</button>
      <a href="../pages/pagina_denuncia.html" style="display:inline-block;background-color:#dc2626;color:white;text-decoration:none;border-radius:12px;padding:6px 0;width:100%;font-weight:bold;">DENUNCIAR</a>
    </div>
  `;

  currentMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(popupContent)
    .openPopup();

  currentMarker.on('popupopen', () => {
    setTimeout(() => {
      const btnRotas = document.getElementById('btnRotas');
      if (btnRotas) {
        btnRotas.addEventListener('click', () => {
          if (!userLocation) {
            alert("Localização do usuário não encontrada ainda.");
            return;
          }
          traçarRota(L.latLng(lat, lng));
        });
      }
    }, 100);
  });

  currentMarker.on('popupclose', () => {
    map.removeLayer(currentMarker);
    currentMarker = null;
    if (routingControl) {
      map.removeControl(routingControl);
      routingControl = null;
    }
  });
}

map.on('click', onMapClick);

function adicionarMarcadorDenuncia(denuncia) {
  const { lat, lng, tipo, descricao, data, hora } = denuncia;

  if (!lat || !lng) return;

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) return;

  const popupContent = `
    <div style="font-family:Poppins,sans-serif;max-width:200px">
      <b>Tipo:</b> ${tipo}<br>
      <b>Data:</b> ${data}<br>
      <b>Hora:</b> ${hora}<br>
      <b>Descrição:</b><br>${descricao}
    </div>
  `;

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(popupContent);
}



