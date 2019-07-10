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
        console.log('lightness.data = ', data);
        return {
          percent: Math.round(data.value)
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
        console.log('hue.data = ', data);
        return {
          value: Math.round(data.value)
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
        console.log('saturation.data = ', data);
        return {
          percent: Math.round(data.value)
        }
      }
    },
  ]
}