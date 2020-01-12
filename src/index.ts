export class BooleanSchema {
  private _key: string;
  private type = "boolean";

  constructor(key: string) {
    this._key = key;
  }

  get key(): string {
    return this._key;
  }

  parseWithValue(): ParseResult<boolean> {
    return {
      name: this.key,
      type: this.type,
      value: true
    };
  }

  parseWithDefaultValue(): ParseResult<boolean> {
    return {
      name: this.key,
      type: this.type,
      value: false
    };
  }
}

interface ParseResult<T> {
  name: string;
  type: string;
  value: T;
}

export default class Parser {
  private schemaNames: string[] = [];
  private schemaMap: Map<string, BooleanSchema> = new Map<string, BooleanSchema>();

  constructor(schemas: BooleanSchema[]) {
    this.schemaNames = schemas.map(schema => schema.key);
    schemas.forEach(schema => this.schemaMap.set(schema.key, schema));
  }

  run(args: string): ParseResult<boolean>[] {
    const regex = new RegExp(/(?<!\w|,)-[a-zA-Z]\w*/g);
    const schemaNamesInArgs = args ? args.match(regex).map(arg => arg.replace("-", "")) : [];
    this.checkArgs(schemaNamesInArgs);
    const result = schemaNamesInArgs.map(schemaName => this.schemaMap.get(schemaName).parseWithValue());

    result.push(
      ...this.schemaNames
        .filter(schemaName => schemaNamesInArgs.indexOf(schemaName) === -1)
        .map(schemaName => this.schemaMap.get(schemaName).parseWithDefaultValue())
    );

    return result;
  }

  private checkArgs(args: string[]): void {
    const invalidArgs = args.filter(schemaName => this.schemaNames.indexOf(schemaName) === -1);
    if (invalidArgs.length !== 0) {
      throw new Error("invalid arguments");
    }
  }
}
