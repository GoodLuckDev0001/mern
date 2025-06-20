export type clientType = 'swiss_llc' | 'swiss_sole' | 'swiss_assoc' | 'foreign_llc' | 'foreign_sole';

export interface generalInfo {
  companyName: string;
  street: string;
  postalCode: string;
  city: string;
  canton: string;
  phone?: string;
  email: string;
  industry: string;
}

