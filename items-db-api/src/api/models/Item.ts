import {IProperties} from "./Properties";

export interface IItem {
  id: string;
  className: string;
  tag: string;
  description?: string;
  properties?: IProperties;
}
