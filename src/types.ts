interface SelectOptions {
    value: Organization;
    label: string;
  }
  
  interface Organization {
    [key: string]: string;
    id: string;
    name: string;
    login: string;
    repos_url: string;
  }
  
  interface OrganizationRepo {
    name: string;
    open_issues: number;
    stargazers_count: number;
  }

  interface OpenIssuesFilter {
    min: number;
    max: number;
  }

  export type { SelectOptions, Organization, OrganizationRepo, OpenIssuesFilter };