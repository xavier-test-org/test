import { PageHeader } from "@/components/page-header";

const stats = [
  { label: "Open orders", value: "3" },
  { label: "Orders this year", value: "27" },
  { label: "Store credit", value: "$42.00" },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="An overview of your Northstar account." />
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>
    </>
  );
}
