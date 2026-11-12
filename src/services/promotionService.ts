export interface PromotionOverviewResponse {
  success: boolean;
  todayDate: string;
  targetChannel: string;
  targetBlog: string;
  dailySlotsTarget: number;
  todayScheduledCount: number;
  todaySlots: {
    slot: "morning" | "afternoon" | "evening";
    windowLabel: string;
    calculatedTime: string;
    assignedRecord: any | null;
  }[];
  totalPromotionalRecords: number;
  categoryLeaderboard: {
    category: string;
    totalViews: number;
    totalLikes: number;
    totalClicks: number;
    efficiencyScore: number;
  }[];
  trafficAnalytics: {
    totalClicksTracked: number;
    bySource: Record<string, number>;
    byCampaign: Record<string, number>;
    recentClicks: any[];
  };
  cooldownPolicy: string;
}

export async function fetchPromotionOverview(): Promise<PromotionOverviewResponse> {
  const res = await fetch("/api/promotion/overview");
  if (!res.ok) throw new Error("Failed to load promotion overview");
  return res.json();
}

export async function generateDailyPromotionPackApi(date?: string): Promise<{ success: boolean; message: string; pack: any }> {
  const res = await fetch("/api/promotion/generate-daily-pack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date }),
  });
  if (!res.ok) throw new Error("Failed to generate daily promotion pack");
  return res.json();
}

export async function fetchPromotionRecords(params?: { date?: string; category?: string; status?: string; q?: string }): Promise<any[]> {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`/api/promotion/records?${query}`);
  if (!res.ok) throw new Error("Failed to fetch promotional records");
  const data = await res.json();
  return data.items || [];
}

export async function updateRecordPerformanceApi(contentId: string, metrics: any): Promise<any> {
  const res = await fetch("/api/promotion/update-performance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contentId, metrics }),
  });
  if (!res.ok) throw new Error("Failed to update performance metrics");
  return res.json();
}

export async function fetchEvergreenPages(): Promise<any[]> {
  const res = await fetch("/api/promotion/evergreen-pages");
  if (!res.ok) throw new Error("Failed to fetch evergreen pages");
  const data = await res.json();
  return data.pages || [];
}

export async function trackTrafficClickApi(params: {
  source: string;
  medium: string;
  campaign: string;
  contentId?: string;
  targetRoute?: string;
}): Promise<any> {
  const res = await fetch("/api/promotion/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to track click");
  return res.json();
}
