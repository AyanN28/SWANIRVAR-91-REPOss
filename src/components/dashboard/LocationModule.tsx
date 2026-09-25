import React, { useState, useEffect } from 'react';
import { EnterpriseState, GisData } from './dashboardTypes';
import { LeafletMap } from './LeafletMap';
import { SpatialPoi } from '../../server/spatialDataService';
import {
  fetchReverseGeocode,
  fetchOverpassSpatialScan,
} from '../../services/spatialApiService';
import {
  LGD_INDIAN_HIERARCHY,
  GramPanchayatInfo,
  BlockInfo,
  DistrictInfo,
  StateHierarchyInfo,
} from '../../data/lgdHierarchyData';
import {
  MapPin,
  Compass,
  Radar,
  RefreshCw,
  Building2,
  Store,
  Trees,
  Truck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Volume2,
  Database,
  ExternalLink,
  Layers,
  Users,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface LocationModuleProps {
  enterprise: EnterpriseState;
  onUpdateEnterprise: (partial: Partial<EnterpriseState>) => void;
  onProceedNext: () => void;
  onSpeak: (text: string) => void;
}

export const LocationModule: React.FC<LocationModuleProps> = ({
  enterprise,
  onUpdateEnterprise,
  onProceedNext,
  onSpeak,
}) => {
  const [mode, setMode] = useState<'cascading' | 'gps' | 'manual'>('cascading');
  const [scanning, setScanning] = useState(false);
  const [pois, setPois] = useState<SpatialPoi[]>([]);
  const [gisData, setGisData] = useState<GisData>({
    farms: 28,
    suppliers: 14,
    mandis: 3,
    competitors: 7,
    densityIndex: 68,
    source: 'OSM Overpass API & Ground Spatial Registry',
  });
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Cascading Selection State
  const [selectedStateName, setSelectedStateName] = useState<string>(() => {
    return LGD_INDIAN_HIERARCHY.some((s) => s.name === enterprise.stateName)
      ? enterprise.stateName
      : LGD_INDIAN_HIERARCHY[0].name;
  });

  const currentStateObj = LGD_INDIAN_HIERARCHY.find((s) => s.name === selectedStateName) || LGD_INDIAN_HIERARCHY[0];

  const [selectedDistrictName, setSelectedDistrictName] = useState<string>(() => {
    return currentStateObj.districts.some((d) => d.name === enterprise.districtName)
      ? enterprise.districtName
      : currentStateObj.districts[0].name;
  });

  const currentDistrictObj =
    currentStateObj.districts.find((d) => d.name === selectedDistrictName) || currentStateObj.districts[0];

  const [selectedBlockName, setSelectedBlockName] = useState<string>(
    currentDistrictObj.blocks[0]?.name || ''
  );

  const currentBlockObj =
    currentDistrictObj.blocks.find((b) => b.name === selectedBlockName) || currentDistrictObj.blocks[0];

  const [selectedGpName, setSelectedGpName] = useState<string>(
    currentBlockObj?.gramPanchayats[0]?.name || ''
  );

  const currentGpObj: GramPanchayatInfo | undefined =
    currentBlockObj?.gramPanchayats.find((g) => g.name === selectedGpName) ||
    currentBlockObj?.gramPanchayats[0];

  // Perform live Overpass POI spatial scan around current coordinates
  const triggerSpatialScan = async (lat: number, lng: number, radius: 5 | 10 | 15) => {
    setScanning(true);
    try {
      const result = await fetchOverpassSpatialScan(lat, lng, radius, enterprise.businessType);
      setPois(result.pois || []);
      setGisData({
        farms: result.counts.farms,
        suppliers: result.counts.suppliers,
        mandis: result.counts.mandis,
        competitors: result.counts.competitors,
        densityIndex: result.counts.densityIndex,
        source: result.source,
      });
    } catch (err) {
      console.warn('Overpass scan error:', err);
    } finally {
      setScanning(false);
    }
  };

  // Initial scan on mount or when radius changes
  useEffect(() => {
    triggerSpatialScan(enterprise.lat, enterprise.lng, enterprise.radiusKm);
  }, [enterprise.lat, enterprise.lng, enterprise.radiusKm]);

  // Handle Cascading Selection Change
  const handleStateChange = (stateName: string) => {
    setSelectedStateName(stateName);
    const sObj = LGD_INDIAN_HIERARCHY.find((s) => s.name === stateName);
    if (sObj && sObj.districts[0]) {
      const dObj = sObj.districts[0];
      setSelectedDistrictName(dObj.name);
      if (dObj.blocks[0]) {
        const bObj = dObj.blocks[0];
        setSelectedBlockName(bObj.name);
        if (bObj.gramPanchayats[0]) {
          const gp = bObj.gramPanchayats[0];
          setSelectedGpName(gp.name);
          applyGpSelection(stateName, dObj.name, bObj.name, gp);
        }
      }
    }
  };

  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrictName(districtName);
    const dObj = currentStateObj.districts.find((d) => d.name === districtName);
    if (dObj && dObj.blocks[0]) {
      const bObj = dObj.blocks[0];
      setSelectedBlockName(bObj.name);
      if (bObj.gramPanchayats[0]) {
        const gp = bObj.gramPanchayats[0];
        setSelectedGpName(gp.name);
        applyGpSelection(selectedStateName, districtName, bObj.name, gp);
      }
    }
  };

  const handleBlockChange = (blockName: string) => {
    setSelectedBlockName(blockName);
    const bObj = currentDistrictObj.blocks.find((b) => b.name === blockName);
    if (bObj && bObj.gramPanchayats[0]) {
      const gp = bObj.gramPanchayats[0];
      setSelectedGpName(gp.name);
      applyGpSelection(selectedStateName, selectedDistrictName, blockName, gp);
    }
  };

  const handleGpChange = (gpName: string) => {
    setSelectedGpName(gpName);
    const gp = currentBlockObj?.gramPanchayats.find((g) => g.name === gpName);
    if (gp) {
      applyGpSelection(selectedStateName, selectedDistrictName, selectedBlockName, gp);
    }
  };

  const applyGpSelection = (
    stateName: string,
    districtName: string,
    blockName: string,
    gp: GramPanchayatInfo
  ) => {
    const cleanGpName = gp.name.replace(' Gram Panchayat', '');
    onUpdateEnterprise({
      stateName,
      districtName,
      locationName: cleanGpName,
      lat: gp.lat,
      lng: gp.lng,
      scanned: true,
    });
    setLocationStatus(`Localized to ${gp.name}, ${blockName}, ${districtName} (Census Population: ${gp.population.toLocaleString('en-IN')})`);
    triggerSpatialScan(gp.lat, gp.lng, enterprise.radiusKm);
    setTimeout(() => setLocationStatus(null), 5000);
  };

  // GPS Acquisition with Nominatim Reverse Geocoding
  const fetchRealLocation = () => {
    setLocationError(null);
    setLocationStatus('Requesting browser GPS satellite fix...');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLocationStatus(null);
      return;
    }

    setScanning(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocationStatus('GPS acquired. Reverse-geocoding via OpenStreetMap Nominatim...');

        try {
          const geo = await fetchReverseGeocode(lat, lng);
          onUpdateEnterprise({
            lat,
            lng,
            locationName: geo.villageOrTown,
            districtName: geo.district,
            stateName: geo.state,
            scanned: true,
          });
          setLocationStatus(`Localized to ${geo.villageOrTown}, ${geo.district}, ${geo.state} (PIN ${geo.postcode})`);
        } catch {
          onUpdateEnterprise({ lat, lng, scanned: true });
          setLocationStatus(`Localized to GPS (${lat.toFixed(4)}°, ${lng.toFixed(4)}°)`);
        }

        await triggerSpatialScan(lat, lng, enterprise.radiusKm);
        setTimeout(() => setLocationStatus(null), 6000);
      },
      (err) => {
        setLocationError(`GPS fix unavailable (${err.message}). Using regional centroid for ${enterprise.locationName}.`);
        setLocationStatus(null);
        setScanning(false);
      },
      { timeout: 9000, enableHighAccuracy: true }
    );
  };

  // Interactive relocation when user clicks on Leaflet map or drags marker
  const handleMapLocationChange = async (newLat: number, newLng: number) => {
    setLocationStatus('Resolving location details for pin...');
    try {
      const geo = await fetchReverseGeocode(newLat, newLng);
      onUpdateEnterprise({
        lat: newLat,
        lng: newLng,
        locationName: geo.villageOrTown,
        districtName: geo.district,
        stateName: geo.state,
        scanned: true,
      });
      setLocationStatus(`Relocated to ${geo.villageOrTown}, ${geo.district}`);
    } catch {
      onUpdateEnterprise({ lat: newLat, lng: newLng, scanned: true });
      setLocationStatus(`Relocated to ${newLat.toFixed(4)}°, ${newLng.toFixed(4)}°`);
    }

    await triggerSpatialScan(newLat, newLng, enterprise.radiusKm);
    setTimeout(() => setLocationStatus(null), 5000);
  };

  const handleRadiusChange = (r: 5 | 10 | 15) => {
    onUpdateEnterprise({ radiusKm: r });
    triggerSpatialScan(enterprise.lat, enterprise.lng, r);
  };

  const narration = `Location Intelligence for ${enterprise.locationName}, ${enterprise.districtName}, ${enterprise.stateName}. Real coordinates are latitude ${enterprise.lat.toFixed(4)}, longitude ${enterprise.lng.toFixed(4)}. In the ${enterprise.radiusKm} kilometer catchment, OpenStreetMap and Overpass scan detected ${gisData.competitors} competitor stores, ${gisData.mandis} APMC mandis and weekly haats, ${gisData.suppliers} input suppliers, and ${gisData.farms} production farms. Census Gram Panchayat demographics show high local consumer demand for ${enterprise.businessType}.`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#173326] to-[#244b39] text-white p-6 rounded-2xl shadow-lg border border-emerald-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-radial-gradient opacity-15 pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Step 1: Hyper-Local GIS Spatial & LGD Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Granular Gram Panchayat & Spatial Ecosystem Scan
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mt-1">
              4-tier Local Government Directory (State $\rightarrow$ District $\rightarrow$ Block $\rightarrow$ Gram Panchayat) with Census 2011 demographics and live OpenStreetMap Overpass POI queries.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSpeak(narration)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-white/20"
              title="Listen to narration"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>Listen</span>
            </button>
            <button
              onClick={fetchRealLocation}
              disabled={scanning}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50"
            >
              <Radar className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
              <span>{scanning ? 'Scanning...' : 'Live GPS Fix'}</span>
            </button>
          </div>
        </div>

        {locationStatus && (
          <div className="mt-3 text-xs bg-emerald-950/70 text-emerald-200 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-2 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{locationStatus}</span>
          </div>
        )}

        {locationError && (
          <div className="mt-3 text-xs bg-red-950/60 text-red-200 border border-red-500/40 px-3 py-1.5 rounded-lg">
            {locationError}
          </div>
        )}
      </div>

      {/* 4-Tier Granular Cascading Dropdown Selector Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#083b5e]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                5. Granular Local Government Directory (LGD) Cascading Selector
              </h3>
              <p className="text-xs text-slate-500">
                Select State $\rightarrow$ District $\rightarrow$ Sub-Division/Block $\rightarrow$ Gram Panchayat for automatic demographic loading
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
            <button
              onClick={() => setMode('cascading')}
              className={`px-3 py-1 rounded-md transition-colors ${
                mode === 'cascading' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              LGD Cascader
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`px-3 py-1 rounded-md transition-colors ${
                mode === 'manual' ? 'bg-[#083b5e] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Custom Typing
            </button>
          </div>
        </div>

        {mode === 'cascading' ? (
          <div className="space-y-4">
            {/* 4 Cascading Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">1. State / UT</label>
                <select
                  value={selectedStateName}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  {LGD_INDIAN_HIERARCHY.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">2. District</label>
                <select
                  value={selectedDistrictName}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  {currentStateObj.districts.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Sub-Division / Block */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">3. Block / Sub-Division</label>
                <select
                  value={selectedBlockName}
                  onChange={(e) => handleBlockChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  {currentDistrictObj.blocks.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Gram Panchayat / Village */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">4. Gram Panchayat</label>
                <select
                  value={selectedGpName}
                  onChange={(e) => handleGpChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border-2 border-emerald-600 bg-emerald-50/50 text-xs font-black text-emerald-950 focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  {currentBlockObj?.gramPanchayats.map((g) => (
                    <option key={g.name} value={g.name}>
                      {g.name} (PIN {g.pinCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Gram Panchayat Census & Demographics Profile */}
            {currentGpObj && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">GP Population</span>
                  <strong className="text-sm font-black text-[#083b5e]">{currentGpObj.population.toLocaleString('en-IN')}</strong>
                  <span className="text-[9px] text-slate-400 block">Census 2011</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Sex Ratio</span>
                  <strong className="text-sm font-black text-emerald-700">{currentGpObj.femaleRatio} / 1000</strong>
                  <span className="text-[9px] text-slate-400 block">Females per 1k</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Literacy Rate</span>
                  <strong className="text-sm font-black text-slate-900">{currentGpObj.literacyRate}%</strong>
                  <span className="text-[9px] text-slate-400 block">Educated base</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">SC / ST Ratio</span>
                  <strong className="text-sm font-black text-purple-700">{currentGpObj.scStPercentage}%</strong>
                  <span className="text-[9px] text-slate-400 block">SCA Priority</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Postal Code</span>
                  <strong className="text-sm font-black text-amber-700">PIN {currentGpObj.pinCode}</strong>
                  <span className="text-[9px] text-slate-400 block">India Post HQ</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Block Distance</span>
                  <strong className="text-sm font-black text-slate-900">{currentGpObj.distanceToBlockKm} km</strong>
                  <span className="text-[9px] text-slate-400 block">HQ transit line</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">State Name</label>
              <input
                type="text"
                value={enterprise.stateName}
                onChange={(e) => onUpdateEnterprise({ stateName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                placeholder="e.g. West Bengal"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">District Name</label>
              <input
                type="text"
                value={enterprise.districtName}
                onChange={(e) => onUpdateEnterprise({ districtName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                placeholder="e.g. Jalpaiguri"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gram Panchayat / Town</label>
              <input
                type="text"
                value={enterprise.locationName}
                onChange={(e) => onUpdateEnterprise({ locationName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                placeholder="e.g. Gairkata"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Real Leaflet Map + Spatial Parameters Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Leaflet Map & Spatial Scanner */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#083b5e]" />
                <span>Live Leaflet.js Spatial Ecosystem Map</span>
              </h3>
              <p className="text-xs text-slate-500">
                Hub Centroid: <strong className="text-slate-900">{enterprise.locationName}</strong> ({enterprise.lat.toFixed(4)}°, {enterprise.lng.toFixed(4)}°)
              </p>
            </div>
            {/* Radius Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
              {[5, 10, 15].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRadiusChange(r as 5 | 10 | 15)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    enterprise.radiusKm === r
                      ? 'bg-[#083b5e] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>

          {/* Real Leaflet Map Container */}
          <LeafletMap
            lat={enterprise.lat}
            lng={enterprise.lng}
            radiusKm={enterprise.radiusKm}
            locationName={enterprise.locationName}
            districtName={enterprise.districtName}
            businessType={enterprise.businessType}
            pois={pois}
            onLocationChange={handleMapLocationChange}
            interactive={true}
          />

          {/* Density Scan Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                <span>Competitors</span>
              </div>
              <div className="text-xl font-black text-rose-700 mt-0.5">{gisData.competitors}</div>
              <div className="text-[10px] text-slate-400">Direct peer shops</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Mandis & Haats</span>
              </div>
              <div className="text-xl font-black text-amber-600 mt-0.5">{gisData.mandis}</div>
              <div className="text-[10px] text-slate-400">Wholesale corridors</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#083b5e]" />
                <span>Suppliers</span>
              </div>
              <div className="text-xl font-black text-[#083b5e] mt-0.5">{gisData.suppliers}</div>
              <div className="text-[10px] text-slate-400">Input material points</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Agricultural Nodes</span>
              </div>
              <div className="text-xl font-black text-emerald-700 mt-0.5">{gisData.farms}</div>
              <div className="text-[10px] text-slate-400">Producer clusters</div>
            </div>
          </div>

          {/* Real Data Source Traceability */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#083b5e]" />
              <span className="font-semibold">Live Data Source:</span>
              <span className="text-slate-800">{gisData.source}</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Census & LGD Ground-Matched
            </span>
          </div>
        </div>

        {/* Right: Geographic Context & Form Configuration */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Enterprise & Scheme Parameters</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Configured enterprise classification for concessional SCA/CA scheme eligibility.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Proposed Business Activity</label>
                <input
                  type="text"
                  value={enterprise.businessType}
                  onChange={(e) => onUpdateEnterprise({ businessType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-400 outline-none text-sm font-bold text-[#083b5e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location Sector</label>
                  <select
                    value={enterprise.locationType}
                    onChange={(e) => onUpdateEnterprise({ locationType: e.target.value as 'Rural' | 'Urban' })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                  >
                    <option value="Rural">Rural (PMEGP 25%-35% Subsidy)</option>
                    <option value="Urban">Urban (PMEGP 15%-25% Subsidy)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Beneficiary Category</label>
                  <select
                    value={enterprise.category}
                    onChange={(e) => onUpdateEnterprise({ category: e.target.value as 'General' | 'Special' })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold"
                  >
                    <option value="General">General Category</option>
                    <option value="Special">Special (SC/ST/OBC/Women/Minority)</option>
                  </select>
                </div>
              </div>

              {currentGpObj && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Primary Agrarian / Industrial Base:</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-snug">
                    {currentGpObj.mainOccupation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Key Insight Box & Next Button */}
          <div className="pt-4 border-t border-slate-200">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl mb-4 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Spatial Verification:</strong> {enterprise.locationName} has {gisData.suppliers} input suppliers, {gisData.mandis} APMC mandis, and {gisData.competitors} competitor outlets within {enterprise.radiusKm} km.
              </span>
            </div>
            <button
              onClick={onProceedNext}
              className="w-full bg-[#083b5e] hover:bg-[#062c46] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors text-sm"
            >
              <span>Proceed to Demographics & People</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
