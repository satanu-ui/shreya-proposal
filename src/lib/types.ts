export interface DateResponse {
  id?: string;
  created_at?: string;
  shreya_name: string;
  agreed_to_date: boolean;
  no_click_attempts: number;
  destination: string;
  custom_destination?: string;
  date_selected: string;
  time_slot: string;
  custom_time?: string;
  food_preferences: string[];
  custom_food?: string;
  what_she_likes_about_me: string;
  excitement_level: number;
  special_wishes?: string;
  promise_kept: boolean;
  user_agent?: string;
}

export type ProposalStep =
  | 'proposal'
  | 'destination'
  | 'datetime'
  | 'food'
  | 'love_note'
  | 'wishlist'
  | 'celebration';
