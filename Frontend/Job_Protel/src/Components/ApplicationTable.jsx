import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";

const ApplicationTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.application);

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-gray-200">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 py-2">
          A list of your recently applied jobs
        </TableCaption>

        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left px-4 py-2">Date</TableHead>
            <TableHead className="text-left px-4 py-2">Job Role</TableHead>
            <TableHead className="text-left px-4 py-2">Company</TableHead>
            <TableHead className="text-right px-4 py-2">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs && allAppliedJobs.length > 0 ? (
            allAppliedJobs.map((appliedjob) => (
              <TableRow
                key={appliedjob?._id ?? Math.random()}
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <TableCell className="px-4 py-2">
                  {appliedjob?.createdAt?.split?.("T")[0] ?? "NA"}
                </TableCell>
                <TableCell className="px-4 py-2 font-medium">
                  {appliedjob?.job?.title ?? "NA"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {appliedjob?.job?.company?.name ?? "NA"}
                </TableCell>
                <TableCell className="px-4 py-2 text-right">
                  <Badge
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appliedjob?.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : appliedjob?.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {appliedjob?.status?.toUpperCase() ?? "NA"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                No applied jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
