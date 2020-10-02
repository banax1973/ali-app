import { ImageSource } from '@src/assets/images';

export interface Book {
  title: 		string;
  subtitle: 	string;
  category: 	string;
  price: 		number;
  author:       string;
  qualification:number;
  photo: 		ImageSource;
  description: 	string;
}
