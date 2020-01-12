import Parser, { BooleanSchema } from "../src";

describe("Boolean Schema", () => {
  it("should return [{ 'name': 'f','type':'boolean','value':true}] when run given an args '-f' and an BooleanSchema 'f'", () => {
    const booleanSchema = new BooleanSchema("f");

    const result = new Parser([booleanSchema]).run("-f");

    expect(result).toEqual([{ name: "f", type: "boolean", value: true }]);
  });

  it("should return [{ 'name': 'f','type':'boolean','value':false}] when run given an args '' and an BooleanSchema 'f'", () => {
    const booleanSchema = new BooleanSchema("f");

    const result = new Parser([booleanSchema]).run("");

    expect(result).toEqual([{ name: "f", type: "boolean", value: false }]);
  });

  it("should raise error 'invalid arguments' when run given an args '-p' and an BooleanSchema 'f'", () => {
    const booleanSchema = new BooleanSchema("f");

    expect(() => {
      new Parser([booleanSchema]).run("-p");
    }).toThrow(new Error("invalid arguments"));
  });

  it("should return [{ 'name': 'f','type':'boolean','value':true},{ 'name': 'd','type':'boolean','value':false}] when run given an args '-f' and an BooleanSchema 'f' and 'd'", () => {
    const fBooleanSchema = new BooleanSchema("f");
    const dBooleanSchema = new BooleanSchema("d");

    const result = new Parser([fBooleanSchema, dBooleanSchema]).run("-f");

    expect(result).toEqual([
      { name: "f", type: "boolean", value: true },
      { name: "d", type: "boolean", value: false }
    ]);
  });
});
