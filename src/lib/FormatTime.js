export const formatToIndonesianTime = (isoString) => {
    const date = new Date(isoString);
  
    // Set timezone ke Jakarta (WIB)
    const optionsDate = {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
  
    const optionsTime = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
  
    const formattedDate = date.toLocaleDateString('id-ID', optionsDate);
    const formattedTime = date.toLocaleTimeString('id-ID', optionsTime);
  
    // WIB = UTC+7, WITA = UTC+8, WIT = UTC+9
    const jakartaOffset = 7; // WIB default
    let zone = '';
  
    switch (jakartaOffset) {
      case 7:
        zone = 'WIB';
        break;
      case 8:
        zone = 'WITA';
        break;
      case 9:
        zone = 'WIT';
        break;
      default:
        zone = 'UTC';
    }
  
    return `${formattedDate} ${formattedTime} ${zone}`;
  };
  