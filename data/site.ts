export interface SiteConfig {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

export const siteConfig: SiteConfig = {
  github: "https://github.com/Kondatejagoud",
  linkedin: "", // Unconfigured by default, will display as 'NOT CONFIGURED'
  email: "kondateja888@gmail.com",
  resume: "", // Unconfigured by default, button will be hidden
};
