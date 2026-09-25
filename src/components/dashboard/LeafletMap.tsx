import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SpatialPoi } from '../../server/spatialDataService';
import {
  Layers,
  MapPin,
  Crosshair,
  Maximize2,
  Minimize2,
  Info,
  Store,
  Building2,
  Trees,
  ShoppingBag,
} from 'lucide-react';

interface LeafletMapProps {
  lat: number;
  lng: number;
  radiusKm: 5 | 10 | 15;
  locationName: string;
  districtName: string;
  businessType: string;
  pois: SpatialPoi[];
  onLocationChange: (lat: number, lng: number) => void;
  interactive?: boolean;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  lat,
  lng,
  radiusKm,
  locationName,
  districtName,
  businessType,
  pois,
  onLocationChange,
  interactive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const circle5Ref = useRef<L.Circle | null>(null);
  const circle10Ref = useRef<L.Circle | null>(null);
  const circle15Ref = useRef<L.Circle | null>(null);
  const poiLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'competitor' | 'mandi' | 'supplier' | 'farm'>('all');
  const [showRadiusRings, setShowRadiusRings] = useState(true);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: radiusKm === 5 ? 13 : radiusKm === 10 ? 12 : 11,
      zoomControl: false,
      attributionControl: false,
    });

    // Custom OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors | SWANIRVAR GIS',
    }).addTo(map);

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Layer group for POIs
    const poiGroup = L.layerGroup().addTo(map);
    poiLayerGroupRef.current = poiGroup;

    // Click handler on map to reposition enterprise
    if (interactive) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        onLocationChange(clickLat, clickLng);
      });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center, circles, and user marker when lat/lng/radius changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setView([lat, lng], radiusKm === 5 ? 13 : radiusKm === 10 ? 12 : 11, {
      animate: true,
    });

    // 1. User Hub Marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const userHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute -inset-2 bg-amber-400/40 rounded-full animate-ping"></div>
        <div class="relative w-8 h-8 rounded-full bg-[#083b5e] border-2 border-white shadow-xl flex items-center justify-center text-amber-300 font-bold text-xs">
          ★
        </div>
      </div>
    `;

    const userIcon = L.divIcon({
      html: userHtml,
      className: 'custom-user-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const userMarker = L.marker([lat, lng], {
      icon: userIcon,
      draggable: interactive,
    }).addTo(map);

    userMarker.bindPopup(`
      <div class="p-2 text-xs font-sans">
        <strong class="text-[#083b5e] font-black text-sm block">${locationName}</strong>
        <div class="text-slate-600 font-medium">${businessType} Centroid</div>
        <div class="text-slate-500 text-[10px] mt-1">${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E</div>
        <div class="mt-1 text-emerald-700 font-bold text-[10px]">● Catchment Radius: ${radiusKm} km</div>
      </div>
    `);

    if (interactive) {
      userMarker.on('dragend', (event) => {
        const marker = event.target;
        const position = marker.getLatLng();
        onLocationChange(position.lat, position.lng);
      });
    }

    userMarkerRef.current = userMarker;

    // 2. Concentric Buffer Circles
    if (circle5Ref.current) circle5Ref.current.remove();
    if (circle10Ref.current) circle10Ref.current.remove();
    if (circle15Ref.current) circle15Ref.current.remove();

    if (showRadiusRings) {
      // 5km circle
      circle5Ref.current = L.circle([lat, lng], {
        radius: 5000,
        color: '#e59a18',
        weight: 1.5,
        fillColor: '#e59a18',
        fillOpacity: 0.12,
        dashArray: '3, 4',
      }).addTo(map);

      // 10km circle
      if (radiusKm >= 10) {
        circle10Ref.current = L.circle([lat, lng], {
          radius: 10000,
          color: '#1e7c55',
          weight: 1.5,
          fillColor: '#1e7c55',
          fillOpacity: 0.06,
          dashArray: '4, 6',
        }).addTo(map);
      }

      // 15km circle
      if (radiusKm === 15) {
        circle15Ref.current = L.circle([lat, lng], {
          radius: 15000,
          color: '#083b5e',
          weight: 1.5,
          fillColor: '#083b5e',
          fillOpacity: 0.04,
          dashArray: '5, 8',
        }).addTo(map);
      }
    }
  }, [lat, lng, radiusKm, locationName, districtName, businessType, showRadiusRings, interactive]);

  // Update POI markers
  useEffect(() => {
    const poiGroup = poiLayerGroupRef.current;
    if (!poiGroup) return;

    poiGroup.clearLayers();

    const filteredPois = pois.filter((p) => {
      if (activeFilter === 'all') return true;
      return p.category === activeFilter;
    });

    filteredPois.forEach((poi) => {
      let bgColor = '#9b3430'; // competitor
      let label = 'C';

      if (poi.category === 'mandi') {
        bgColor = '#e59a18';
        label = 'M';
      } else if (poi.category === 'supplier') {
        bgColor = '#083b5e';
        label = 'S';
      } else if (poi.category === 'farm') {
        bgColor = '#1e7c55';
        label = 'F';
      }

      const poiHtml = `
        <div class="relative group cursor-pointer">
          <div style="background-color: ${bgColor}" class="w-5 h-5 rounded-full border border-white shadow-md flex items-center justify-center text-white text-[10px] font-black transform hover:scale-125 transition-transform">
            ${label}
          </div>
        </div>
      `;

      const poiIcon = L.divIcon({
        html: poiHtml,
        className: 'custom-poi-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: poiIcon });
      marker.bindPopup(`
        <div class="p-2 text-xs font-sans space-y-1">
          <div class="font-bold text-slate-900">${poi.name}</div>
          <div class="text-[11px] text-slate-600 font-medium">${poi.subType}</div>
          <div class="text-[10px] text-slate-500">Distance: <span class="font-bold text-[#083b5e]">${poi.distanceKm} km</span> from hub</div>
          <div class="text-[9px] uppercase tracking-wider font-bold" style="color: ${bgColor}">${poi.category}</div>
        </div>
      `);

      poiGroup.addLayer(marker);
    });
  }, [pois, activeFilter]);

  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([lat, lng], radiusKm === 5 ? 13 : radiusKm === 10 ? 12 : 11, {
      animate: true,
    });
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-100 transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)]' : 'h-80 sm:h-96'
      }`}
    >
      {/* Map DOM Target */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Header Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md text-xs flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-[#083b5e]" />
        <span className="font-bold text-slate-900">{locationName}</span>
        <span className="text-slate-400">|</span>
        <span className="text-slate-600 font-medium">{lat.toFixed(4)}°, {lng.toFixed(4)}°</span>
        <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded text-[10px]">
          {radiusKm}km Scan
        </span>
      </div>

      {/* Floating Control Toolbar (Top Right) */}
      <div className="absolute top-3 right-12 z-[1000] flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-md">
        <button
          onClick={handleRecenter}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
          title="Recenter Map on Hub"
        >
          <Crosshair className="w-4 h-4 text-[#083b5e]" />
        </button>
        <button
          onClick={() => setShowRadiusRings(!showRadiusRings)}
          className={`p-1.5 rounded-lg transition-colors ${
            showRadiusRings ? 'bg-amber-100 text-amber-900' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="Toggle Concentric 5/10/15km Catchment Rings"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Category Filter Pills (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-[1000] flex flex-wrap items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 shadow-md text-[11px] font-bold">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-2 py-0.5 rounded-lg transition-all ${
            activeFilter === 'all' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All ({pois.length})
        </button>
        <button
          onClick={() => setActiveFilter('competitor')}
          className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
            activeFilter === 'competitor' ? 'bg-[#9b3430] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#9b3430] inline-block" />
          Competitors ({pois.filter((p) => p.category === 'competitor').length})
        </button>
        <button
          onClick={() => setActiveFilter('mandi')}
          className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
            activeFilter === 'mandi' ? 'bg-[#e59a18] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#e59a18] inline-block" />
          Mandis ({pois.filter((p) => p.category === 'mandi').length})
        </button>
        <button
          onClick={() => setActiveFilter('supplier')}
          className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
            activeFilter === 'supplier' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#083b5e] inline-block" />
          Suppliers ({pois.filter((p) => p.category === 'supplier').length})
        </button>
        <button
          onClick={() => setActiveFilter('farm')}
          className={`px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
            activeFilter === 'farm' ? 'bg-[#1e7c55] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#1e7c55] inline-block" />
          Farms ({pois.filter((p) => p.category === 'farm').length})
        </button>
      </div>

      {/* Map Interactive Hint (Bottom Right) */}
      <div className="hidden sm:flex absolute bottom-3 right-3 z-[1000] bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] items-center gap-1.5 shadow">
        <Info className="w-3 h-3 text-amber-300" />
        <span>Click or drag pin to relocate hub</span>
      </div>
    </div>
  );
};
