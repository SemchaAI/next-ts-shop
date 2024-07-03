export interface IFormType {
  name: string;
}
export interface IFormProduct {
  title: string;
  price: number;
  img: FileList;
  typeId: {
    value: string;
    label: string;
  };
  description: string;
  cnt: number;
  info: IInfo[];
  thumbnails: [
    {
      thumbnail: File | string;
    }
  ];
}

// export interface IFormRateUpdate extends IFormRate {
//   difference: number;
// }
export interface IFormRate extends IRateRefs {
  rate: number;
  message: string;
}
export interface IRateRefs {
  userId: string;
  productId: string;
}

export interface IInfo {
  // _id: string;
  title: string;
  description: string;
  // productId: string;
}
