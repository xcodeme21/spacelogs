export function miliToSecond(duration: string): number {
    let durationSecond = parseFloat(duration);
    
    if (duration.endsWith('ms')) {
      durationSecond = parseFloat(duration) / 1000;
    } else if (duration.endsWith('m')) {
      durationSecond = parseFloat(duration) * 60;
    } else {
      const durationRaw = duration.split('.');
      
      durationSecond = parseFloat(durationRaw[0]);
      
      if (durationRaw[0].includes('m')) {
        const durationRawMinute = durationRaw[0].split('m');
        durationSecond = parseFloat(durationRawMinute[0]) * 60 + parseFloat(durationRawMinute[1]);
      }
    }
    
    return durationSecond;
  }
  