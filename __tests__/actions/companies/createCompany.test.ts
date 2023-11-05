import { createCompany } from "@/actions/companies/createCompany";
import prisma from "@/libs/prismadb";

jest.mock("../../../libs/prismadb", () => ({
  company: {
    create: jest.fn(),
  },
}));

describe('createCompany action', () => {
  it('should create a company successfully', async () => {
    (prisma.company.create as jest.Mock).mockResolvedValueOnce({
      message: "Company created successfully",
      status: 200,
    });

    const {
      message,
      status,
    } = await createCompany({
      name: "Company",
      logo: "logo.png",
    });

    expect(status).toBe(200);
    expect(message).toBe("Company created successfully");
    expect(prisma.company.create).toBeCalledWith({
      name: "Company",
      logo: "logo.png",
    });
  });

  it('should return an error if company name is not provided', async () => {
    const {
      message,
      status,
    } = await createCompany({
      name: "",
      logo: "logo.png",
    });

    expect(status).toBe(403);
    expect(message).toBe("Company name is required");
    expect(prisma.company.create).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    (prisma.company.create as jest.Mock).mockRejectedValueOnce(new Error("Error creating company"));

    const {
      message,
      status,
    } = await createCompany({
      name: "Company",
      logo: "logo.png",
    });

    expect(status).toBe(500);
    expect(message).toBe("Error creating company");
  });
});