/** MiniMax T2A API subtitle/timestamp types */

export interface SubtitleWord {
	text: string;
	start_time: number;
	end_time: number;
}

export interface SubtitleSentence {
	text: string;
	start_time: number;
	end_time: number;
	words?: SubtitleWord[];
}

export interface SectionSubtitles {
	section_id: string;
	section_title: string;
	duration: number;
	sentences: SubtitleSentence[];
}

export interface MiniMaxT2AResponse {
	audio_file: string;
	subtitles?: SubtitleSentence[];
	extra_info?: {
		audio_length?: number;
		audio_sample_rate?: number;
		audio_size?: number;
		bitrate?: number;
		word_count?: number;
		invisible_character_ratio?: number;
		usage_characters?: number;
	};
}

export interface MiniMaxAPIResponse {
	base_resp?: {
		status_code: number;
		status_msg: string;
	};
	data?: MiniMaxT2AResponse;
}

