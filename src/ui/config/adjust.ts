export const adjustMenuConfig = {
  title: 'Adjustment',
  menu: [
    {
      name: 'Lightness',
      percent: 50,
      range: {
        min: -100,
        max: 100, 
      },
      filter: 'lightness',
      parseOptions(data) {
        const percent = Math.round(data.value);
        console.log('lightness.percent = ', percent);
        return {
          percent,
        }
      }
    },
    {
      name: 'Hue',
      percent: 50,
      range: {
        min: 0,
        max: 360, 
      },
      filter: 'hue',
      parseOptions(data) {
        const value = Math.round(data.value);
        console.log('hue.value = ', value);
        return {
          value,
        }
      }
    },
    {
      name: 'Saturation',
      percent: 50,
      range: {
        min: -100,
        max: 100, 
      },
      filter: 'saturation',
      parseOptions(data) {
        const percent = Math.round(data.value);
        console.log('saturation.percent = ', percent);
        return {
          percent,
        }
      }
    },
  ]
}