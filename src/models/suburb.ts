export class Suburb {
  constructor(
    public areacode: string,
    public name: string,
    public population: number,
    public families: number,
    public medianIncome: number,
    public medianRent: number,
    public medianMortgage: number,
    public medianAge: number,
    public ancestry: any[] = [],
    public countryOfBirth: any[] = [],
  ) {}
}
