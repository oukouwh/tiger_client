/*
 * @Author: 王浩
 * @Date: 2022-12-29 16:26:02
 * @LastEditTime: 2023-01-06 14:41:56
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/models/global.model.ts
 * @Description: Do not edit
 */
export interface IField {
  _id?: any | undefined;
  fieldName?: string | null;
  fieldType?: any | undefined;
  icon?: any | undefined;
  toggle?: any | undefined;
  required: boolean | false;
  ctrlFieldValidateRules?: any | undefined;
  errorText?: string | null;
  label: string | null;
  description?: string | null;
  placeholder?: any | undefined;
  className?: string | null;
  subtype?: any | undefined;
  handle?: any | undefined;
  min?: number;
  max?: number;
  inline?: any | undefined;
  value?: any | undefined;
  values?: Array<value>;
  subFields: Array<IField[]> | undefined;
  columnCnt?: any | undefined;
  columns?: Array<any> | undefined;
  level?: number;
  ctrlRowNo?: any | undefined; //行No
  ctrlItemNo?: any | undefined; //枝番
  ctrlGroupNo?: any | undefined; //グループ番号
  ctrlFieldName: string | null; //フィールド名
  ctrlType: any | undefined; //項目種別／Control
  ctrlInOut: any | undefined; //入出力
  ctrlFormat: any | undefined; //表示フォーマット
  ctrlTextAlign: any | undefined; //文字表示位置
  ctrlWidth: any | undefined; //表示桁
  ctrlRequiredFlg: any | undefined; //必須項目フラグ
  ctrlEncode: any | undefined; //文字種
  entities: Array<any>; //エンティティ
  ctrLabelDirect: any | undefined; // ラベル並べ位置（'0': 関連コンポーネントと同じ行）
}

export type NewField = Omit<IField, 'id'> & { id: null };

export class value {
  label: any = '';
  value: any = '';
}

export class outputField {
  ctrlRowNo?: any | undefined; //行No
  ctrlItemNo?: any | undefined; //枝番
  ctrlGroupNo?: any | undefined; //グループ番号
  ctrlColNo?: any | undefined; //列番号
  ctrlFieldName?: any | undefined; //フィールド名
  ctrlType?: any | undefined; //項目種別／Control
  ctrlInOut?: any | undefined; //入出力
  ctrlFormat?: any | undefined; //表示フォーマット
  ctrlTextAlign?: any | undefined; //文字表示位置
  ctrlWidth?: any | undefined; //表示桁
  ctrlRequiredFlg?: any | undefined; //必須項目フラグ
  ctrlEncode?: any | undefined; //文字種
  ctrlFieldValidateRules?: any | undefined; //文字種
}
