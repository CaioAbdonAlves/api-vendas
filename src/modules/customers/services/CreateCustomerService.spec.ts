import "reflect-metadata";
import CreateCustomerService from "./CreateCustomerService";
import FakeCustomersRepository from "../domain/repositories/fakes/FakeCustomersRepository";
import AppError from "@shared/errors/AppError";

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

  it("should not be able to create two customers with the same email", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomerService = new CreateCustomerService(
      fakeCustomersRepository,
    );

    await createCustomerService.execute({
      name: "Caio",
      email: "a.caio@opentag.com",
    });

    expect(
      createCustomerService.execute({
        name: "Caio",
        email: "a.caio@opentag.com",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
