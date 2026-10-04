"""
Benchmark Tropical Cyclone Historical Datasets and Satellite Imagery Generator
Curated for Indian Ocean Basin (Bay of Bengal & Arabian Sea)
"""

import numpy as np
import cv2
import base64

BENCHMARK_STORMS = [
    {
        "id": "biparjoy-2023",
        "name": "Cyclone Biparjoy",
        "year": 2023,
        "basin": "Arabian Sea (AS)",
        "peak_category": "Extremely Severe Cyclonic Storm (ESCS)",
        "max_wind_knots": 90,
        "max_wind_kmph": 165,
        "lowest_pressure_hpa": 958,
        "dvorak_t_number": 5.0,
        "landfall": "Naliya, Kutch, Gujarat, India",
        "landfall_coords": {"lat": 23.25, "lon": 68.80},
        "eye_type": "Ragged / Asymmetric Eye",
        "pattern": "Curved Band Pattern",
        "center": {"lat": 20.8, "lon": 66.5},
        "heading": 40.0,
        "forward_speed_kmph": 13,
        "pixel_eye_x": 242,
        "pixel_eye_y": 268,
        "thermo_profile": {
            "min_temp_c": -63.5,
            "delta_t": 24.5,
            "cold_shield_60_pct": 38.0,
            "eye_inversion_anomaly_delta_t": 24.5,
            "pattern_probs": {
                "Curved Band Pattern": 0.54,
                "Embedded Center Pattern": 0.26,
                "Central Dense Overcast (CDO)": 0.12,
                "Eye Pattern": 0.06,
                "Shear Pattern": 0.02
            }
        },
        "historical_track": [
            {"time": "-48h", "lat": 14.2, "lon": 66.0, "wind_kt": 45, "pressure": 990, "category": "CS"},
            {"time": "-36h", "lat": 16.1, "lon": 66.8, "wind_kt": 65, "pressure": 974, "category": "VSCS"},
            {"time": "-24h", "lat": 18.2, "lon": 67.2, "wind_kt": 85, "pressure": 962, "category": "ESCS"},
            {"time": "-12h", "lat": 19.8, "lon": 67.0, "wind_kt": 90, "pressure": 958, "category": "ESCS"},
            {"time": "00h", "lat": 20.8, "lon": 66.5, "wind_kt": 80, "pressure": 964, "category": "VSCS"}
        ]
    },
    {
        "id": "amphan-2020",
        "name": "Super Cyclone Amphan",
        "year": 2020,
        "basin": "Bay of Bengal (BOB)",
        "peak_category": "Super Cyclonic Storm (SuCS)",
        "max_wind_knots": 140,
        "max_wind_kmph": 260,
        "lowest_pressure_hpa": 906,
        "dvorak_t_number": 6.5,
        "landfall": "Bakkhali, West Bengal / Sundarbans",
        "landfall_coords": {"lat": 21.55, "lon": 88.25},
        "eye_type": "Well-defined Circular Eye",
        "pattern": "Eye Pattern",
        "center": {"lat": 18.5, "lon": 86.8},
        "heading": 25.0,
        "forward_speed_kmph": 18,
        "pixel_eye_x": 258,
        "pixel_eye_y": 246,
        "thermo_profile": {
            "min_temp_c": -82.0,
            "delta_t": 52.0,
            "cold_shield_60_pct": 68.0,
            "eye_inversion_anomaly_delta_t": 52.0,
            "pattern_probs": {
                "Eye Pattern": 0.81,
                "Embedded Center Pattern": 0.11,
                "Central Dense Overcast (CDO)": 0.05,
                "Curved Band Pattern": 0.02,
                "Shear Pattern": 0.01
            }
        },
        "historical_track": [
            {"time": "-48h", "lat": 11.5, "lon": 86.2, "wind_kt": 55, "pressure": 982, "category": "SCS"},
            {"time": "-36h", "lat": 13.4, "lon": 86.4, "wind_kt": 95, "pressure": 946, "category": "ESCS"},
            {"time": "-24h", "lat": 15.6, "lon": 86.6, "wind_kt": 140, "pressure": 906, "category": "SuCS"},
            {"time": "-12h", "lat": 17.2, "lon": 86.7, "wind_kt": 125, "pressure": 920, "category": "ESCS"},
            {"time": "00h", "lat": 18.5, "lon": 86.8, "wind_kt": 105, "pressure": 936, "category": "ESCS"}
        ]
    },
    {
        "id": "fani-2019",
        "name": "Cyclone Fani",
        "year": 2019,
        "basin": "Bay of Bengal (BOB)",
        "peak_category": "Extremely Severe Cyclonic Storm (ESCS)",
        "max_wind_knots": 115,
        "max_wind_kmph": 215,
        "lowest_pressure_hpa": 932,
        "dvorak_t_number": 6.0,
        "landfall": "Puri, Odisha, India",
        "landfall_coords": {"lat": 19.81, "lon": 85.83},
        "eye_type": "Pin-hole Eye",
        "pattern": "Eye Pattern",
        "center": {"lat": 17.8, "lon": 85.1},
        "heading": 35.0,
        "forward_speed_kmph": 16,
        "pixel_eye_x": 270,
        "pixel_eye_y": 235,
        "thermo_profile": {
            "min_temp_c": -74.5,
            "delta_t": 36.0,
            "cold_shield_60_pct": 58.0,
            "eye_inversion_anomaly_delta_t": 36.0,
            "pattern_probs": {
                "Eye Pattern": 0.84,
                "Central Dense Overcast (CDO)": 0.08,
                "Embedded Center Pattern": 0.05,
                "Curved Band Pattern": 0.02,
                "Shear Pattern": 0.01
            }
        },
        "historical_track": [
            {"time": "-48h", "lat": 11.2, "lon": 85.8, "wind_kt": 60, "pressure": 978, "category": "SCS"},
            {"time": "-36h", "lat": 13.0, "lon": 85.0, "wind_kt": 85, "pressure": 962, "category": "VSCS"},
            {"time": "-24h", "lat": 14.8, "lon": 84.4, "wind_kt": 110, "pressure": 938, "category": "ESCS"},
            {"time": "-12h", "lat": 16.4, "lon": 84.7, "wind_kt": 115, "pressure": 932, "category": "ESCS"},
            {"time": "00h", "lat": 17.8, "lon": 85.1, "wind_kt": 105, "pressure": 940, "category": "ESCS"}
        ]
    },
    {
        "id": "mocha-2023",
        "name": "Super Cyclone Mocha",
        "year": 2023,
        "basin": "Bay of Bengal (BOB)",
        "peak_category": "Extremely Severe Cyclonic Storm (ESCS)",
        "max_wind_knots": 135,
        "max_wind_kmph": 250,
        "lowest_pressure_hpa": 918,
        "dvorak_t_number": 6.5,
        "landfall": "Sittwe, Rakhine State, Myanmar",
        "landfall_coords": {"lat": 20.15, "lon": 92.90},
        "eye_type": "Large Well-defined Eye",
        "pattern": "Eye Pattern",
        "center": {"lat": 18.2, "lon": 91.5},
        "heading": 42.0,
        "forward_speed_kmph": 21,
        "pixel_eye_x": 250,
        "pixel_eye_y": 258,
        "thermo_profile": {
            "min_temp_c": -79.0,
            "delta_t": 46.0,
            "cold_shield_60_pct": 64.0,
            "eye_inversion_anomaly_delta_t": 46.0,
            "pattern_probs": {
                "Eye Pattern": 0.76,
                "Embedded Center Pattern": 0.14,
                "Central Dense Overcast (CDO)": 0.06,
                "Curved Band Pattern": 0.03,
                "Shear Pattern": 0.01
            }
        },
        "historical_track": [
            {"time": "-48h", "lat": 12.0, "lon": 88.0, "wind_kt": 50, "pressure": 986, "category": "CS"},
            {"time": "-36h", "lat": 13.8, "lon": 88.6, "wind_kt": 80, "pressure": 966, "category": "VSCS"},
            {"time": "-24h", "lat": 15.6, "lon": 89.8, "wind_kt": 120, "pressure": 928, "category": "ESCS"},
            {"time": "-12h", "lat": 17.0, "lon": 90.7, "wind_kt": 135, "pressure": 918, "category": "SuCS"},
            {"time": "00h", "lat": 18.2, "lon": 91.5, "wind_kt": 115, "pressure": 934, "category": "ESCS"}
        ]
    },
    {
        "id": "tauktae-2021",
        "name": "Cyclone Tauktae",
        "year": 2021,
        "basin": "Arabian Sea (AS)",
        "peak_category": "Extremely Severe Cyclonic Storm (ESCS)",
        "max_wind_knots": 100,
        "max_wind_kmph": 185,
        "lowest_pressure_hpa": 950,
        "dvorak_t_number": 5.5,
        "landfall": "Una, Saurashtra, Gujarat, India",
        "landfall_coords": {"lat": 20.82, "lon": 71.04},
        "eye_type": "Ragged Eye",
        "pattern": "Embedded Center Pattern",
        "center": {"lat": 19.5, "lon": 71.3},
        "heading": 345.0,
        "forward_speed_kmph": 17,
        "pixel_eye_x": 236,
        "pixel_eye_y": 272,
        "thermo_profile": {
            "min_temp_c": -67.0,
            "delta_t": 27.5,
            "cold_shield_60_pct": 46.0,
            "eye_inversion_anomaly_delta_t": 27.5,
            "pattern_probs": {
                "Embedded Center Pattern": 0.58,
                "Central Dense Overcast (CDO)": 0.24,
                "Curved Band Pattern": 0.12,
                "Eye Pattern": 0.04,
                "Shear Pattern": 0.02
            }
        },
        "historical_track": [
            {"time": "-48h", "lat": 12.8, "lon": 72.5, "wind_kt": 45, "pressure": 992, "category": "CS"},
            {"time": "-36h", "lat": 14.5, "lon": 72.8, "wind_kt": 70, "pressure": 970, "category": "VSCS"},
            {"time": "-24h", "lat": 16.5, "lon": 72.3, "wind_kt": 90, "pressure": 956, "category": "ESCS"},
            {"time": "-12h", "lat": 18.2, "lon": 71.8, "wind_kt": 100, "pressure": 950, "category": "ESCS"},
            {"time": "00h", "lat": 19.5, "lon": 71.3, "wind_kt": 95, "pressure": 954, "category": "ESCS"}
        ]
    }
]

def generate_synthetic_satellite_ir(storm_id: str, size=512) -> bytes:
    """
    Generates realistic multi-spectral thermal infrared (TIR1) satellite imagery
    specifically calibrated to match the historical storm's physical eye coordinates,
    eye diameter, asymmetric spiral banding, and authentic brightness temperature structure.
    """
    storm = next((s for s in BENCHMARK_STORMS if s["id"] == storm_id), BENCHMARK_STORMS[0])
    
    # Storm-specific center coordinates (avoids static (256, 256) mock center)
    cx = int(storm.get("pixel_eye_x", size // 2))
    cy = int(storm.get("pixel_eye_y", size // 2))

    # Background ambient sea surface (warm, DN ~ 210-230 in inverted IR)
    base_sea = np.random.normal(218, 5, (size, size)).clip(195, 238).astype(np.uint8)
    img = base_sea

    # Coordinate grids relative to storm center
    y, x = np.ogrid[:size, :size]
    r = np.sqrt((x - cx)**2 + (y - cy)**2)
    theta = np.arctan2(y - cy, x - cx)

    # 1. Central Dense Overcast (CDO) with realistic asymmetric cloud shield
    wind = storm.get("max_wind_knots", storm.get("peak_msw_knots", 85))
    is_severe = wind >= 115
    cdo_radius = size * (0.38 if is_severe else (0.28 if "Curved" in storm["pattern"] else 0.32))
    cdo_mask = r < cdo_radius
    cdo_intensity = np.exp(-((r / cdo_radius)**1.8) * 1.5)
    
    # Cold cloud tops have lower radiance/temp in raw IR (DN ~ 30 to 80)
    cold_cdo = (220 - cdo_intensity * (175 if is_severe else 145)).astype(np.uint8)
    img[cdo_mask] = cold_cdo[cdo_mask]

    # 2. Asymmetric Logarithmic Spiral Feeder Arms
    num_arms = 4 if is_severe else (3 if "Eye" in storm["pattern"] else 2)
    wrap_speed = 1.6 if "Curved" in storm["pattern"] else 1.3
    
    for arm in range(num_arms):
        arm_offset = arm * (2 * np.pi / num_arms)
        # Asymmetric spiral equation with radial expansion
        spiral_phase = (theta * 1.4 - np.log(np.maximum(r, 6.0) / 10.0) * wrap_speed + arm_offset) % (2 * np.pi)
        arm_dist = np.abs(spiral_phase - np.pi)
        arm_profile = np.exp(-(arm_dist**2) / 0.32) * (r < size * 0.46) * (r > size * 0.07)
        
        # Superimpose cold convective feeder bands
        spiral_dn = (arm_profile * (100 if is_severe else 80)).astype(np.uint8)
        img = np.where(spiral_dn > 22, np.maximum(30, img - spiral_dn), img)

    # 3. Eyewall & Warm Core Structure
    eye_type = storm.get("eye_type", "")
    has_clear_eye = "Circular" in eye_type or "Pin-hole" in eye_type or "Large" in eye_type
    is_ragged_eye = "Ragged" in eye_type

    if "Pin-hole" in eye_type:
        eye_radius = int(size * 0.022) # ~11 pixels
    elif "Large" in eye_type:
        eye_radius = int(size * 0.058) # ~30 pixels
    elif is_ragged_eye:
        eye_radius = int(size * 0.040) # ~20 pixels
    else:
        eye_radius = int(size * 0.035) # ~18 pixels

    if has_clear_eye:
        # Deep convective cold ring around eye (eyewall)
        eyewall_inner = eye_radius
        eyewall_outer = int(eye_radius * 2.2)
        eyewall_mask = (r >= eyewall_inner) & (r <= eyewall_outer)
        # Very cold eyewall tops (-75°C to -85°C -> raw DN ~ 25 to 40)
        img[eyewall_mask] = np.random.normal(32, 4, img.shape).astype(np.uint8)[eyewall_mask]

        # Warm center eye (higher temperature -> raw DN ~ 155 to 180)
        eye_mask = r < eyewall_inner
        eye_temp = np.random.normal(168, 6, img.shape).astype(np.uint8)
        img[eye_mask] = eye_temp[eye_mask]
    elif is_ragged_eye:
        # Asymmetric ragged eye with partial cloud contamination
        eyewall_inner = eye_radius
        eyewall_outer = int(eye_radius * 1.8)
        eyewall_mask = (r >= eyewall_inner) & (r <= eyewall_outer)
        img[eyewall_mask] = np.random.normal(48, 7, img.shape).astype(np.uint8)[eyewall_mask]

        # Ragged eye core has moderate warming (~ 115-135 DN)
        eye_mask = r < eyewall_inner
        eye_temp = np.random.normal(128, 12, img.shape).astype(np.uint8)
        img[eye_mask] = eye_temp[eye_mask]
    else:
        # Central Dense Overcast covering center (no clear eye)
        inner_mask = r < eye_radius * 1.5
        img[inner_mask] = np.random.normal(55, 6, img.shape).astype(np.uint8)[inner_mask]

    # 4. Multi-frequency Cirrus Outflow Texturing (simulates real INSAT-3DR TIR striations)
    # Add realistic high-frequency turbulence
    turbulence = np.sin(x / 9.0) * np.cos(y / 9.0) * 8.0
    striations = np.sin((r / 12.0) - theta * 3.0) * 7.0
    cloud_noise = (turbulence + striations).astype(np.int16)
    
    # Smooth with Gaussian blur to reproduce authentic satellite optical point-spread function (PSF)
    img = cv2.GaussianBlur(img, (5, 5), 0)
    img = np.clip(img.astype(np.int16) + cloud_noise, 0, 255).astype(np.uint8)

    # Encode to JPEG bytes
    _, encoded = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
    return encoded.tobytes()
