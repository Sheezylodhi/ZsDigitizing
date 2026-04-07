import Order from "@/lib/models/Order";

export default async function generateSerial(orderType) {

  let prefix = "ORD";

  if (orderType.includes("Digitizing")) prefix = "PPO";
  else if (orderType.includes("Vector")) prefix = "PPV";
  else if (orderType.includes("Patches")) prefix = "PO";

  const lastOrder = await Order.findOne({
    serialNumber: { $regex: `^${prefix}-` }
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastOrder?.serialNumber) {
    const num = parseInt(lastOrder.serialNumber.split("-")[1]);
    if (!isNaN(num)) nextNumber = num + 1;
  }

  return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
}