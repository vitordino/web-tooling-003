import { massageData } from "./App";

describe("App", () => {
  it("should massage data from response and return an array of strings", () => {
    const MOCK_DATA = {
      response: {
        message: {
          affenpinscher: [],
          african: [],
          australian: ["shepherd"],
          bulldog: ["boston", "english", "french"],
        },
        status: "success",
      },
    };

    const expectedData = ["affenpinscher", "african", "australian", "bulldog"];

    expect(massageData(MOCK_DATA)).toMatchObject(expectedData);
  });
});
