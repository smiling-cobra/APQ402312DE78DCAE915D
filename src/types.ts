export interface SelectOptions {
    value: Organization;
    label: string;
  }
  
  export interface Organization {
    [key: string]: string;
    id: string;
    name: string;
    login: string;
    repos_url: string;
  }
  
  export interface OrganizationRepo {
    name: string;
    open_issues: number;
    stargazers_count: number;
  }

  export interface OpenIssuesFilter {
    min: number;
    max: number;
  }

  export enum Pagination {
    NEXT = "next",
    PREV = "previous",
  }

  export enum FilterName {
    MIN = "min",
    MAX = "max",
  }