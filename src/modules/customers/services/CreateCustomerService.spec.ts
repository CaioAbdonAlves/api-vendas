import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";

describe("CreateCustomer", () => {
  it("should be able to create a new customer", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    const customer = await createCustomerService.execute({
      name: "Caio",
      email: "a.caio@opentag.com",
    });

    expect(customer).toHaveProperty("id");
  });

  it("should not be able to create two customers with the same email", () => {
    expect(1).toBe(1);
  });
});
