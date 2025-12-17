import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

interface NotificationSettingsProps {
  onBack: () => void;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  // Individual toggle states for each notification type (3.9.19, 3.9.20, 3.9.21)
  const [athleteActivityEnabled, setAthleteActivityEnabled] = useState(true);
  const [coachFeedbackEnabled, setCoachFeedbackEnabled] = useState(true);
  const [followEnabled, setFollowEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Button>
            <h1 className="text-gray-900 dark:text-white">Notification Settings</h1>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* 3.9.19 - Athlete Activity Notifications */}
          <Card className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-2">
                  Athlete Activity Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications when followed athletes upload new videos or receive performance reports
                </p>
              </div>
              <Switch
                checked={athleteActivityEnabled}
                onCheckedChange={setAthleteActivityEnabled}
                className="data-[state=checked]:bg-[#1C7F0F] dark:data-[state=checked]:bg-[#22C55E] flex-shrink-0"
              />
            </div>
          </Card>

          {/* 3.9.20 - Coach Feedback Notifications */}
          <Card className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-2">
                  Coach Feedback Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications when coaches submit feedback on your videos
                </p>
              </div>
              <Switch
                checked={coachFeedbackEnabled}
                onCheckedChange={setCoachFeedbackEnabled}
                className="data-[state=checked]:bg-[#1C7F0F] dark:data-[state=checked]:bg-[#22C55E] flex-shrink-0"
              />
            </div>
          </Card>

          {/* 3.9.21 - Follow Notifications */}
          <Card className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white mb-2">
                  Follow Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications when another user follows you
                </p>
              </div>
              <Switch
                checked={followEnabled}
                onCheckedChange={setFollowEnabled}
                className="data-[state=checked]:bg-[#1C7F0F] dark:data-[state=checked]:bg-[#22C55E] flex-shrink-0"
              />
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These settings control which types of notifications you receive. Notifications are delivered in real-time and stored in your notification inbox.
          </p>
        </div>
      </div>
    </div>
  );
}
