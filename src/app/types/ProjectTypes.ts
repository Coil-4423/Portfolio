
interface Tool {
    tool_name: string;
    tool_image: {
      url: string;
      alt: string;
    };
  }
  

export interface Project {
    id: number;
    title: {
        rendered: string;
    };
    acf: {
        project_overview?: string;
        description?: string;
        features_functionality?: string;
        github_repository_link?: string;
        live_site_link?: string;
        gallery?: {
            url: string;
        }[];
        tools?:Tool[]
    };
    slug: string;
}