// Define types for API response and ACF fields
export interface Tool {
  tool_name: string;
  tool_image: {
    url: string;
    alt: string;
  };
}

export interface ACFFields {
  who_i_am: string;
  what_i_do: string;
  future_goals: string;
  tools: Tool[];
}

export interface AboutPageData {
  id: number;
  title: {
    rendered: string;
  };
  acf: ACFFields;
}
