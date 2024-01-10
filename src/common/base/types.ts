export type SelectOperator =
  | '='
  | '!='
  | '<'
  | '>'
  | '<='
  | '>='
  | 'NOT'
  | 'IN'
  | 'LIKE'
  | 'ILIKE'
  | 'IS';

export type SelectOptionItem<T, Entity> = {
  tableAlias: string;
  columnName: keyof Entity;
  operator: SelectOperator;
  key: keyof T;
  whereType: 'andWhere' | 'orWhere';
};

export type SelectOption<T, Entity> = SelectOptionItem<T, Entity>[];
