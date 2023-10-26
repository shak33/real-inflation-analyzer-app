import { deleteCompany } from "@/actions/companies/deleteCompany";
import prisma from "@/libs/prismadb";

jest.mock("../../../libs/prismadb", () => ({
  company: {
    delete: jest.fn(),
  },
}));

describe('deleteCompany action', () => {
  it('should  delete a company successfully', async () => {
    (prisma.company.delete as jest.Mock).mockResolvedValueOnce({
      message: "Company deleted successfully",
      status: 200,
    });

    const {
      message,
      status,
    } = await deleteCompany({
      companyId: "1",
    });

    expect(status).toBe(200);
    expect(message).toBe("Company deleted successfully");
    expect(prisma.company.delete).toBeCalledWith({
      where: {
        id: "1",
      },
    });
  });

  it('should return an error if company id is not provided', async () => {
    const {
      message,
      status,
    } = await deleteCompany({
      companyId: "",
    });

    expect(status).toBe(403);
    expect(message).toBe("Company id is required");
    expect(prisma.company.delete).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    (prisma.company.delete as jest.Mock).mockRejectedValueOnce({
      message: "Error deleting company",
      status: 500,
    });

    const {
      message,
      status,
    } = await deleteCompany({
      companyId: "1",
    });

    expect(status).toBe(500);
    expect(message).toBe("Error deleting company");
    expect(prisma.company.delete).toBeCalledWith({
      where: {
        id: "1",
      },
    });
  });
});