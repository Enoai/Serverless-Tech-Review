export default class ExpandedError extends Error {
  public statusCode: number;

  public errorName: string;

  constructor(message: string, name:string, statusCode:number) {
    super(message);
    this.statusCode = statusCode;
    this.errorName = name;
  }
}
