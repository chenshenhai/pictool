export const adjustMenuConfig = {
  title: 'Adjust',
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
        console.log('data = ', data);
        return {
          value: Math.round(data.value)
        }
      }
    }
  ]
}