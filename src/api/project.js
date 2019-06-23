import axios from 'axios';



const Projects =  [

  {
    name: 'Scented Candles',
    quantity: '22 (Boxes)',
    progress: 90,
    color: 'pink',
  },

  {
    name: 'Chicken Wings',
    quantity: '34 (cartons)',
    progress: 70,
    color: 'success'
  },

  {
    name: 'MintX Brake Fluid',
    quantity: '3 (Boxes)',
    progress: 50,
    color: 'info'
  },

  {
    name: 'Pepsodent XL Size',
    quantity: '2 (Packs)',
    progress: 30,
    color: 'teal'
  },

  {
    name: 'Ever Sheen Cocoa Butter',
    quantity: '4 (Boxes)',
    progress: 15,
    color: 'grey'
  },

];

const getProject = (limit) => {
  return (limit) ? Projects.slice(0, limit) : Projects;
};


export {
  Projects,
  getProject
};