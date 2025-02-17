import { db } from ".";
import {
  customers as customersSchema,
  tickets as ticketsSchema,
} from "./schema";

const main = async () => {
  const currentDatetime = new Date();

  const customers: (typeof customersSchema.$inferInsert)[] = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      notes: "Customer since 2020",
      active: true,
      updatedAt: currentDatetime,
      createdAt: currentDatetime,
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address1: "456 Oak St",
      address2: null,
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      notes: "VIP customer",
      active: true,
      updatedAt: currentDatetime,
      createdAt: currentDatetime,
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "555-123-4567",
      address1: "789 Pine St",
      address2: "Suite 100",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      notes: null,
      active: true,
      updatedAt: currentDatetime,
      createdAt: currentDatetime,
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      phone: "444-555-6666",
      address1: "321 Maple St",
      address2: null,
      city: "Houston",
      state: "TX",
      zip: "77001",
      notes: "Preferred customer",
      active: true,
      updatedAt: currentDatetime,
      createdAt: currentDatetime,
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie.davis@example.com",
      phone: "222-333-4444",
      address1: "654 Elm St",
      address2: "Floor 2",
      city: "San Francisco",
      state: "CA",
      zip: "94101",
      notes: "New customer",
      active: true,
      updatedAt: currentDatetime,
      createdAt: currentDatetime,
    },
  ];

  const tickets: (typeof ticketsSchema.$inferInsert)[] = [
    {
      customerId: 1,
      title: "Laptop not powering on",
      description:
        "Customer reported that their laptop does not power on even when plugged in.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 1,
      title: "Slow computer performance",
      description:
        "Customer mentioned that their computer is running very slowly.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 1,
      title: "Virus removal",
      description:
        "Customer needs virus removal service for their desktop computer.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 2,
      title: "Screen replacement",
      description:
        "Customer needs to replace a cracked screen on their laptop.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 2,
      title: "Data recovery",
      description:
        "Customer accidentally deleted important files and needs data recovery.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 2,
      title: "Software installation",
      description: "Customer requested installation of new software.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 3,
      title: "Wi-Fi connectivity issues",
      description: "Customer is experiencing problems connecting to Wi-Fi.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 3,
      title: "Keyboard not working",
      description:
        "Customer reported that the keyboard on their laptop is not functioning.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 3,
      title: "Overheating problem",
      description:
        "Customer's computer is overheating and shutting down frequently.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 4,
      title: "Hard drive replacement",
      description: "Customer needs to replace a failing hard drive.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 4,
      title: "Operating system upgrade",
      description:
        "Customer requested an upgrade to the latest operating system.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 4,
      title: "Battery replacement",
      description: "Customer needs a replacement for their laptop battery.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 5,
      title: "Printer setup",
      description: "Customer needs help setting up a new printer.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 5,
      title: "Blue screen error",
      description:
        "Customer's computer is showing a blue screen error frequently.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
    {
      customerId: 5,
      title: "Memory upgrade",
      description: "Customer requested an upgrade to their computer’s RAM.",
      completed: false,
      tech: "unassigned",
      createdAt: currentDatetime,
      updatedAt: currentDatetime,
    },
  ];

  try {
    const insertedCustomers = await db
      .insert(customersSchema)
      .values(customers);
    console.log(`${insertedCustomers.rowCount} customers inserted...`);

    const insertedTickets = await db.insert(ticketsSchema).values(tickets);
    console.log(`${insertedTickets.rowCount} customers inserted...`);
  } catch (error) {
    console.error(error);
  }
};

main();
