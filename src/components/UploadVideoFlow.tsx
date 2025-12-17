import { useState } from "react";
import { X, Upload, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";

interface UploadVideoFlowProps {
  onClose: () => void;
  onUploadComplete: (videoName: string, videoType: "training" | "match") => void;
}

type FlowStep = "select-type" | "permission" | "album-picker" | "upload-progress";

export function UploadVideoFlow({ onClose, onUploadComplete }: UploadVideoFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("select-type");
  const [selectedVideoType, setSelectedVideoType] = useState<"training" | "match" | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoName, setVideoName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Mock video library
  const mockVideos = [
    "https://images.unsplash.com/photo-1616514169928-a1e40c6f791c?w=400",
    "https://images.unsplash.com/photo-1759694542153-ad02551b15b0?w=400",
    "https://images.unsplash.com/photo-1547992455-3815e61a458a?w=400",
    "https://images.unsplash.com/photo-1657957746418-6a38df9e1ea7?w=400",
    "https://images.unsplash.com/photo-1609540204874-3f48f851636c?w=400",
    "https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?w=400",
  ];

  const handleSelectType = (type: "training" | "match") => {
    setSelectedVideoType(type);
    setCurrentStep("permission");
  };

  const handleAllowAccess = () => {
    setCurrentStep("album-picker");
  };

  const handleSelectVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setCurrentStep("upload-progress");
  };

  const handleUpload = () => {
    if (!videoName.trim()) {
      toast.error("Please enter a video name");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Video uploaded successfully");
          setTimeout(() => {
            if (selectedVideoType) {
              onUploadComplete(videoName, selectedVideoType);
            }
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCancel = () => {
    if (currentStep === "upload-progress" && isUploading) {
      setIsUploading(false);
      setUploadProgress(0);
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => !isUploading && onClose()}
      />

      {/* Bottom Sheet / Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-950 rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Step 1: Select Video Type */}
        {currentStep === "select-type" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white">Upload Video</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <Button
                onClick={() => handleSelectType("training")}
                variant="outline"
                className="w-full h-16 border-2 border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
              >
                Training Session
              </Button>
              <Button
                onClick={() => handleSelectType("match")}
                variant="outline"
                className="w-full h-16 border-2 border-[#1C7F0F] dark:border-[#22C55E] text-[#1C7F0F] dark:text-[#22C55E] hover:bg-[#1C7F0F] hover:text-white dark:hover:bg-[#22C55E] dark:hover:text-black"
              >
                Match Video
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-gray-600 dark:text-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Access Permission */}
        {currentStep === "permission" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white">Allow Access to Photos</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>

            <div className="max-w-md mx-auto text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-12 h-12 text-[#1C7F0F] dark:text-[#22C55E]" />
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                To upload a video, the app needs permission to access your media library.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleAllowAccess}
                  className="w-full bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black"
                >
                  Allow Access
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Album Picker */}
        {currentStep === "album-picker" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="text-[#1C7F0F] dark:text-[#22C55E] hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                Cancel
              </Button>
              <h2 className="text-gray-900 dark:text-white">Select Video</h2>
              <div className="w-16"></div> {/* Spacer for alignment */}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {mockVideos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectVideo(video)}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1C7F0F] dark:hover:border-[#22C55E] transition-colors"
                >
                  <img
                    src={video}
                    alt={`Video ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Upload Progress */}
        {currentStep === "upload-progress" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 dark:text-white">Upload Video</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                disabled={isUploading}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              {/* Video Preview */}
              {selectedVideo && (
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-[#1C7F0F] dark:border-[#22C55E]">
                  <img
                    src={selectedVideo}
                    alt="Selected video"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Uploading...</span>
                    <span className="text-[#1C7F0F] dark:text-[#22C55E]">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Video Name Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Video Name</label>
                <Input
                  type="text"
                  placeholder="Enter video name..."
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  disabled={isUploading}
                  className="dark:bg-gray-900 dark:border-gray-800"
                />
              </div>

              {/* Validation Info */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Format: MP4, MOV, AVI</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Max size: 500MB</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleUpload}
                  disabled={isUploading || !videoName.trim()}
                  className="w-full bg-[#1C7F0F] hover:bg-[#155F0B] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] text-white dark:text-black disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isUploading}
                  className="w-full text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
