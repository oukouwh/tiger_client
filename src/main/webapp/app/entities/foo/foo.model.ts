export interface IFoo {
  id: number;
  fooName?: string | null;
  address?: string | null;
  mobile?: string | null;
  fooNo?: string | null;
}

export type NewFoo = Omit<IFoo, 'id'> & { id: null };
