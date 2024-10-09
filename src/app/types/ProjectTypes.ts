interface Project {
    id: number;
    title: {
        rendered: string;
    };
    acf: {
        project_overview?: string;
        description?: string;
        gallery: {
            url: string;
        }[];
    };
}