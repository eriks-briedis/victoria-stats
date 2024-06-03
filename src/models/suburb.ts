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
    public religion: any[] = [],
    public laborForce: any[] = [],
    public employmentStatus: any[] = [],
    public occupation: any[] = [],
    public industry: any[] = [],
    public medianWeeklyIncome: any[] = [],
    public methodOfTravelToWork: any[] = [],
    public familyComposition: any[] = [],
    public employmentStatusOfCoupleFamilies: any[] = []
  ) {}
}
