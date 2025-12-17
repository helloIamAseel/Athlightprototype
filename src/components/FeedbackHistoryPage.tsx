import { useState } from "react";
import { ArrowLeft, Edit, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { ThemeToggle } from "./ThemeToggle";
import { EditFeedbackModal } from "./EditFeedbackModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface FeedbackHistoryPageProps {
  onBack: () => void;
}

interface Feedback {
  id: string;
  athleteName: string;
  videoTitle: string;
  videoThumbnail: string;
  score: number;
  comment: string;
  date: string;
}

export function FeedbackHistoryPage({ onBack }: FeedbackHistoryPageProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [feedbackToEdit, setFeedbackToEdit] = useState<Feedback | null>(null);
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      athleteName: "Mohammed Al-Sayed",
      videoTitle: "Sprint Training Session",
      videoThumbnail: "https://images.unsplash.com/photo-1616514169928-a1e40c6f791c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0cmFpbmluZyUyMHZpZGVvfGVufDF8fHx8MTc2NTU1NTMxNnww&ixlib=rb-4.1.0&q=80&w=1080",
      score: 8.5,
      comment: "Excellent form and technique during the sprint drills. Your acceleration has improved significantly compared to last session. Keep focusing on maintaining proper posture during the final phase of your sprints.",
      date: "Dec 10, 2025",
    },
    {
      id: "2",
      athleteName: "Amira Al-Qasimi",
      videoTitle: "Championship Match Highlights",
      videoThumbnail: "https://images.unsplash.com/photo-1759694542153-ad02551b15b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwbWF0Y2glMjBhY3Rpb258ZW58MXx8fHwxNzY1NTU1MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      score: 9.0,
      comment: "Outstanding performance! Your decision-making under pressure was exceptional. The tactical awareness you demonstrated in the second half shows great maturity.",
      date: "Dec 8, 2025",
    },
    {
      id: "3",
      athleteName: "Faisal Al-Harbi",
      videoTitle: "Agility Drills",
      videoThumbnail: "https://images.unsplash.com/photo-1547992455-3815e61a458a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHRyYWluaW5nJTIwZHJpbGx8ZW58MXx8fHwxNzY1NTU1MzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      score: 7.5,
      comment: "Good effort on the agility work. Your footwork is improving but needs more consistency. Focus on keeping your center of gravity lower during direction changes.",
      date: "Dec 5, 2025",
    },
  ]);

  const handleDelete = (feedbackId: string) => {
    setFeedbackToDelete(feedbackId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (feedbackToDelete) {
      setFeedbacks(feedbacks.filter(f => f.id !== feedbackToDelete));
      toast.success("Feedback deleted successfully");
      if (selectedFeedback?.id === feedbackToDelete) {
        setSelectedFeedback(null);
      }
    }
    setDeleteDialogOpen(false);
    setFeedbackToDelete(null);
  };

  const handleEdit = (feedback: Feedback) => {
    setFeedbackToEdit(feedback);
    setEditModalOpen(true);
  };

  const handleSaveFeedback = (feedbackId: string, score: number, comment: string) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === feedbackId 
        ? { ...f, score, comment }
        : f
    ));
    
    // Update selected feedback if it's the one being edited
    if (selectedFeedback?.id === feedbackId) {
      setSelectedFeedback({ ...selectedFeedback, score, comment });
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </Button>
          <h1 className="text-gray-900 dark:text-white">Feedback History</h1>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <Card
                key={feedback.id}
                className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-[#1C7F0F] dark:hover:border-[#22C55E] transition-colors cursor-pointer"
                onClick={() => setSelectedFeedback(feedback)}
              >
                <div className="flex gap-4">
                  {/* Video Thumbnail */}
                  <div className="flex-shrink-0">
                    <img
                      src={feedback.videoThumbnail}
                      alt={feedback.videoTitle}
                      className="w-32 h-24 rounded-lg object-cover border-2 border-[#1C7F0F] dark:border-[#22C55E]"
                    />
                  </div>

                  {/* Feedback Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 dark:text-white mb-1">{feedback.videoTitle}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {feedback.athleteName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                      {truncateText(feedback.comment, 120)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="text-[#1C7F0F] dark:text-[#22C55E]">
                        Score: {feedback.score}/10
                      </span>
                      <span>{feedback.date}</span>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex gap-2 items-start">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(feedback);
                      }}
                      className="text-[#1C7F0F] dark:text-[#22C55E] hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(feedback.id);
                      }}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No feedback history available
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setSelectedFeedback(null)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950">
                <h2 className="text-gray-900 dark:text-white">Feedback Details</h2>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(selectedFeedback);
                    }}
                    className="text-[#1C7F0F] dark:text-[#22C55E] hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(selectedFeedback.id);
                    }}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFeedback(null)}
                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Video Thumbnail */}
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#1C7F0F] dark:border-[#22C55E]">
                  <img
                    src={selectedFeedback.videoThumbnail}
                    alt={selectedFeedback.videoTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Video Info */}
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-2">
                    {selectedFeedback.videoTitle}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Athlete: {selectedFeedback.athleteName}
                  </p>
                </div>

                {/* Score */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Score</p>
                  <p className="text-2xl text-[#1C7F0F] dark:text-[#22C55E]">
                    {selectedFeedback.score}/10
                  </p>
                </div>

                {/* Comment */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Comment</p>
                  <p className="text-gray-900 dark:text-white leading-relaxed">
                    {selectedFeedback.comment}
                  </p>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
                  Submitted on {selectedFeedback.date}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-gray-950 dark:border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">Delete Feedback?</AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              This action cannot be reversed. The feedback will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Feedback Modal */}
      {editModalOpen && feedbackToEdit && (
        <EditFeedbackModal
          feedbackId={feedbackToEdit.id}
          athleteName={feedbackToEdit.athleteName}
          videoTitle={feedbackToEdit.videoTitle}
          initialScore={feedbackToEdit.score}
          initialComment={feedbackToEdit.comment}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveFeedback}
        />
      )}
    </div>
  );
}