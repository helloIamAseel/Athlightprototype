import { X, Sparkles, Download } from "lucide-react";
import { Button } from "./ui/button";

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
  athleteName: string;
  age: number;
  sport: string;
  position: string;
}

export function ReportDetailsModal({
  isOpen,
  onClose,
  reportId,
  athleteName,
  age,
  sport,
  position,
}: ReportDetailsModalProps) {
  if (!isOpen) return null;

  // Mock data based on reportId
  const reportData = {
    month: "December 2025",
    date: "31/12/2025",
    metrics: [
      {
        name: "Avg. Speed",
        improvementRate: "12%",
        expectedPerformance: "15%",
      },
      {
        name: "Agility Score",
        improvementRate: "8.5",
        expectedPerformance: "9.2",
      },
      {
        name: "Total Distance",
        improvementRate: "45 km",
        expectedPerformance: "50 km",
      },
    ],
    generalSentiment:
      "The athlete shows consistent improvement across all key performance indicators. Coaches have noted excellent dedication during training sessions and strong technical execution. Areas of strength include speed development and endurance. Recommended focus areas include agility drills and tactical awareness.",
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export functionality
    console.log("Exporting report as PDF...");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-950 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-800">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex-1">
            <h2 className="text-gray-900 dark:text-white mb-3">
              Monthly Performance Report ({reportData.month})
            </h2>
            <div className="space-y-1.5 text-sm">
              <div className="flex gap-8">
                <span className="text-gray-700 dark:text-gray-300">
                  {athleteName}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Age: {age}
                </span>
              </div>
              <div className="flex gap-8">
                <span className="text-gray-700 dark:text-gray-300">
                  {sport}/{position}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Date: {reportData.date}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors ml-4"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Performance Metrics Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">
                    Metrics
                  </th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">
                    Improvement Rate
                  </th>
                  <th className="text-left py-3 px-4 text-gray-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      <span>Expected Performance</span>
                      <Sparkles className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData.metrics.map((metric, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-800"
                  >
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {metric.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {metric.improvementRate}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {metric.expectedPerformance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* General Sentiment Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border border-gray-200 dark:border-gray-800">
                  <td className="py-3 px-4 text-gray-900 dark:text-white w-1/3">
                    <div className="flex items-center gap-0.5">
                      <span>General Sentiment from Feedback</span>
                      <Sparkles className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {reportData.generalSentiment}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
          <Button
            onClick={handleExportPDF}
            className="bg-[#1C7F0F] hover:bg-[#165F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Export as PDF
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}