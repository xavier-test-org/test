import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Orders",
};

const orders = [
  { id: "NS-10482", placedAt: "2025-10-14", status: "Processing", total: "$129.00" },
  { id: "NS-10377", placedAt: "2025-09-28", status: "Shipped", total: "$58.50" },
  { id: "NS-10215", placedAt: "2025-09-03", status: "Delivered", total: "$214.99" },
];

export default function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" description="Track and review your recent orders." />
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Placed</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 font-mono">{order.id}</td>
                <td className="px-4 py-3">{order.placedAt}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3 text-right">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
