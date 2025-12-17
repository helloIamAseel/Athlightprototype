import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { mockVideos } from "../data/mockData";

interface SendFeedbackModalProps {
  athleteId?: string;
  onClose: () => void;
}

export function SendFeedbackModal({ athleteId, onClose }: SendFeedbackModalProps) {
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [scoreError, setScoreError] = useState("");

  // Get athlete info if athleteId is provided
  const athlete = athleteId ? mockVideos.find(v => v.athleteId === athleteId) : null;

  const handleScoreChange = (value: string) => {
    setScore(value);
    setScoreError("");
    
    if (value && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 10)) {
      setScoreError("Score must be between 0 and 10");
    }
  };

  const handleSubmit = () => {
    if (!score) {
      toast.error("Please enter a score");
      return;
    }
    
    const scoreNum = Number(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
      toast.error("Score must be between 0 and 10");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    // Simulate feedback submission
    const athleteName = athlete?.athleteName || "athlete";
    toast.success(`Feedback submitted successfully to ${athleteName}`);
    onClose();
  };

  const handleDiscard = () => {
    if (score || comment) {
      if (confirm("Are you sure you want to discard this feedback?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={handleDiscard}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 dark:border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-gray-900 dark:text-white">Send Feedback</h2>
              {athlete && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  To: {athlete.athleteName}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDiscard}
              className="hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Score Input */}
            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Enter Score (0-10)
              </label>
              <Input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="0.0"
                value={score}
                onChange={(e) => handleScoreChange(e.target.value)}
                className={`dark:bg-gray-900 dark:border-gray-800 ${
                  scoreError ? "border-red-500 dark:border-red-500" : ""
                }`}
              />
              {scoreError && (
                <p className="text-xs text-red-500">{scoreError}</p>
              )}
            </div>

            {/* Comment Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Enter Comment
                </label>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {comment.length}/500
                </span>
              </div>
              <Textarea
                placeholder="Write your feedback here..."
                value={comment}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setComment(e.target.value);
                  }
                }}
                maxLength={500}
                rows={6}
                className="dark:bg-gray-900 dark:border-gray-800 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              onClick={handleDiscard}
              className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}