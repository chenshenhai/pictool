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
      parseOptions(data: any) {
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
      parseOptions(data: any) {
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
      parseOptions(data: any) {
        const percent = Math.round(data.value);
        console.log('saturation.percent = ', percent);
        return {
          percent,
        }
      }
    },
    {
      name: 'Alpha',
      percent: 50,
      range: {
        min: 0,
        max: 100, 
      },
      filter: 'alpha',
      parseOptions(data: any) {
        const value = Math.round(data.value);
        console.log('alpha.value = ', value);
        return {
          value,
        }
      }
    },
    {
      name: 'Posterize',
      percent: 50,
      range: {
        min: 0,
        max: 100, 
      },
      filter: 'posterize',
      parseOptions(data: any) {
        const value = Math.round(data.value);
        console.log('posterize.value = ', value);
        return {
          value,
        }
      }
    },
  ]
}