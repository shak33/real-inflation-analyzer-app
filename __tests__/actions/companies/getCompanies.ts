import { getCompanies } from "@/actions/companies/getCompanies"
import prisma from "@/libs/prismadb"

jest.mock("../../../libs/prismadb", () => ({
  company: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe('getCompanies action', () => {
  it('should fetch single company details when ID is provided', async () => {
    (prisma.company.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "1",
      name: "Company",
      logo: "logo.png",
      products: [],
    });

    const {
      data,
      message,
      status,
    } = await getCompanies({
      id: "1",
    });

    expect(status).toBe(200);
    expect(message).toBe("");
    expect(data).toEqual({
      id: "1",
      name: "Company",
      logo: "logo.png",
      products: 0,
    });
    expect(prisma.company.findUnique).toBeCalledWith({
      where: {
        id: "1",
      },
      include: {
        products: true,
      }
    });
  });

  it('should fetch all companies when no ID is provided', async () => {
    (prisma.company.findMany as jest.Mock).mockResolvedValueOnce([
      {
        id: "1",
        name: "Company",
        logo: "logo.png",
        products: [],
      },
    ]);

    const {
      data,
      message,
      status,
    } = await getCompanies({});

    expect(status).toBe(200);
    expect(message).toBe("");
    expect(data).toEqual([
      {
        id: "1",
        name: "Company",
        logo: "logo.png",
        products: 0,
      },
    ]);
    expect(prisma.company.findMany).toBeCalledWith({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        products: true,
      }
    });
  });

  it ('should handle errors', async () => {
    (prisma.company.findUnique as jest.Mock).mockRejectedValueOnce({
      message: "Error fetching company",
      status: 500,
    });

    const {
      data,
      message,
      status,
    } = await getCompanies({
      id: "1",
    });

    expect(status).toBe(500);
    expect(message).toBe("Error fetching company");
    expect(data).toBeNull();
    expect(prisma.company.findUnique).toBeCalledWith({
      where: {
        id: "1",
      },
      include: {
        products: true,
      }
    });
  });
});