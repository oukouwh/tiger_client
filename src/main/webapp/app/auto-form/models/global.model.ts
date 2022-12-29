/*
 * @Author: 王浩
 * @Date: 2022-12-29 16:26:02
 * @LastEditTime: 2022-12-29 16:26:08
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/models/global.model.ts
 * @Description: Do not edit
 */
export class field {
  _id?: any;
  fieldName?: any;
  fieldType?: any;
  icon?: any;
  toggle?: any;
  required?: any;
  ctrlFieldValidateRules?: any;
  errorText?: any;
  label?: any;
  description?: any;
  placeholder?: any;
  className?: any;
  subtype?: any;
  handle?: any;
  min?: number;
  max?: number;
  inline?: any;
  value?: any;
  values?: Array<value>;
  subFields?: Array<field[]>;
  columnCnt?: any;
  columns?: Array<any>;
  level?: number;
  ctrlRowNo?: any; //行No
  ctrlItemNo?: any; //枝番
  ctrlGroupNo?: any; //グループ番号
  ctrlFieldName?: any; //フィールド名
  ctrlType?: any; //項目種別／Control
  ctrlInOut?: any; //入出力
  ctrlFormat?: any; //表示フォーマット
  ctrlTextAlign?: any; //文字表示位置
  ctrlWidth?: any; //表示桁
  ctrlRequiredFlg?: any; //必須項目フラグ
  ctrlEncode?: any; //文字種
  entities?: Array<any>; //エンティティ
  ctrLabelDirect?: any; // ラベル並べ位置（'0': 関連コンポーネントと同じ行）
}

export class value {
  label?: any = '';
  value?: any = '';
}

export class outputField {
  ctrlRowNo?: any; //行No
  ctrlItemNo?: any; //枝番
  ctrlGroupNo?: any; //グループ番号
  ctrlColNo?: any; //列番号
  ctrlFieldName?: any; //フィールド名
  ctrlType?: any; //項目種別／Control
  ctrlInOut?: any; //入出力
  ctrlFormat?: any; //表示フォーマット
  ctrlTextAlign?: any; //文字表示位置
  ctrlWidth?: any; //表示桁
  ctrlRequiredFlg?: any; //必須項目フラグ
  ctrlEncode?: any; //文字種
  ctrlFieldValidateRules?: any; //文字種
}
