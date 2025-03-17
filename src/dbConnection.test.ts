import { connectDB, sequelize } from "./dbConnection";
import { describe, it, expect, afterEach, vi} from "vitest";

vi.mock("sequelize", () => {
  return {
    Sequelize: vi.fn().mockImplementation(() => ({
      authenticate: vi.fn(),
    })),
  };
});

describe("connectDB", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('it should connect to database succesfully', async () => {
    const connect = sequelize.authenticate as vi.Mock;
    connect.mockResolvedValueOnce({});

    const consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});

    await connectDB();

    expect(consoleMock).toHaveBeenCalledWith("Connection established");
    consoleMock.mockRestore();
  });

  it("it should return failure error if failed to connect to database", async () => {
    const authenticateMock = sequelize.authenticate as vi.Mock;
    authenticateMock.mockRejectedValueOnce(
      new Error("Failed to connect to db")
    );

    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await connectDB();

    expect(consoleError).toHaveBeenCalledWith(
      "Error connecting to database:",
      expect.any(Error)
    );
    consoleError.mockRestore();
  });
});
