// api/logger.js
export default async (req, res) => {
  // 1. Obtener información básica del request
  const userAgent = req.headers['user-agent'] || 'Desconocido';
  // Vercel expone la IP del usuario en este encabezado:
  const ipAddress = req.headers['x-forwarded-for'] || 'IP Desconocida';
  
  let locationData = { country: 'Desconocido', city: 'Desconocida' };

  // 2. Obtener Geolocalización usando un servicio externo (si la IP es conocida)
  if (ipAddress !== 'IP Desconocida') {
    try {
      // Usamos un servicio de geolocalización público
      const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const geoJson = await geoResponse.json();

      if (geoJson.status === 'success') {
        locationData = {
          country: geoJson.country,
          city: geoJson.city,
          region: geoJson.regionName,
          timezone: geoJson.timezone
        };
      }
    } catch (error) {
      console.error('Error al obtener geolocalización:', error);
    }
  }

  // 3. Registrar toda la información detallada en los logs de Vercel
  console.log(`\n--- Nuevo Evento DETALLADO de Visita ---`);
  console.log(`IP: ${ipAddress}`);
  console.log(`Ubicación: ${locationData.city}, ${locationData.country} (${locationData.region})`);
  console.log(`Zona Horaria: ${locationData.timezone}`);
  console.log(`User-Agent: ${userAgent}`);

  // 4. Devolver la respuesta JSON al cliente (usando res.status(200).json)
  res.status(200).json({
    status: "success",
    message: "Petición de logger avanzada recibida éticamente.",
    ip_address: ipAddress,
    location: locationData,
    user_agent: userAgent
  });
};
