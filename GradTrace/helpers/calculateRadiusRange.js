export function distKM(lat1, lon1, lat2, lon2) { const a = Math, r = (lat2 - lat1) * a.PI / 180, c = (lon2 - lon1) * a.PI / 180, e = a.sin(r / 2) * a.sin(r / 2) + a.cos(lat1 * a.PI / 180) * a.cos(lat2 * a.PI / 180) * a.sin(c / 2) * a.sin(c / 2); return d = 2 * a.atan2(a.sqrt(e), a.sqrt(1 - e)) * 6371 }

// (distKM(latsekolah,lonsekolah,lathp,lonhp))



