export default class Mapper {
  private mappings: any;
  private reverseMappings: any;
  private defaults: any;

  constructor(mappings: any = {}, defaults: any = {}) {
    this.mappings = mappings;
    this.defaults = defaults;

    this.reverseMappings = Object.keys(mappings).reduce((o, k: any): any => {
      o[mappings[k]] = k;
      return o;
    }, {});

    this.map = this.map.bind(this);
    this.reverseMap = this.reverseMap.bind(this);
  }

  public map(obj: any, index?: number, array?: any[]): any;
  public map(obj: any, reverse: boolean): any;
  public map(obj: any): any {
    return this.mapInternal(obj, arguments.length > 1 && typeof(arguments[1]) === 'boolean' ? arguments[0] : false);
  }

  public reverseMap(obj: any, index?: number, array?: any[]): any;
  public reverseMap(obj: any): any {
    return this.mapInternal(obj, true);
  }

  private mapInternal(obj: any, reverse: boolean): any {
    const result: any = {};
    let keys = Object.keys(obj);

    if (Object.keys(this.mappings).length === 0) {
      Object.assign(result, obj);
    } else {
      keys.forEach((k) => {
        const mapKey = (reverse ? this.reverseMappings : this.mappings)[k];

        if (mapKey) {
          result[mapKey] = obj[k];
        } else {
          result[k] = obj[k];
        }
      });
    }

    // default values
    Object.keys(this.defaults).forEach((k) => {
      const value = result[k];
      if (value === null || typeof(value) === 'undefined') {
        let key = k;

        if (reverse) {
          key = this.mappings[k] || k;
        }

        result[key] = this.defaults[k];
      }
    });

    return result;
  }
}
