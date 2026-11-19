# Research notes: LastPass, 1Password, Bitwarden, Keeper

All pages checked on **2026-11-19** unless a different date is noted. Every real-company fact on the site traces to a line here. Anything not in this file is labeled a hypothesis on the site or left out.

Method notes:
- lastpass.com blocks automated browsers (HTTP 403 in a headless browser), so LastPass pages were read through a plain HTTP fetch. Plan prices on lastpass.com/pricing load from a script and did not render; the Business and Business Max prices below come from FAQ text on the product pages.
- support.lastpass.com could not be reached (TLS error), so the incident roadmap and federated-login docs were not read. See "Could not verify."
- Third-party pricing sites (CostBench, Zapro, Vendr and others) disagree with each other. None of their numbers are used on the site.

---

## LastPass

### Plans and pricing
| Fact | Source |
| --- | --- |
| Business plans: Teams, Business, Business Max. Each has a 14-day free trial. | https://www.lastpass.com/pricing |
| Teams: "Up to 50 users." Business and Business Max: "Unlimited." | https://www.lastpass.com/pricing |
| Teams: "Simple credential management for small teams and startups." Business: "Effortless password and access management for small and medium-size businesses." | https://www.lastpass.com/pricing |
| Business: "everything for just $7 per user/month, or purchase a site license" | https://www.lastpass.com/products/business |
| Business Max: "$11 per user/ per month after a 14-day free trial." | https://www.lastpass.com/products/business-max |
| Teams price: not found in readable text (template placeholder). Not used on the site. | https://www.lastpass.com/pricing |

### Admin features
| Fact | Source |
| --- | --- |
| Directory integrations: "Microsoft Active Directory, Microsoft Entra ID (formerly Azure AD), Google Workspace, OneLogin, and Okta." Business and Business Max, not Teams. | https://www.lastpass.com/pricing |
| Security policies: Teams "25 policies"; Business and Business Max "100+ policies". | https://www.lastpass.com/pricing |
| Reporting: Teams basic; Business and Business Max advanced, with SIEM integrations for "Splunk and Microsoft Sentinel (Azure)". | https://www.lastpass.com/pricing |
| Federated login: included in Business and Business Max, not Teams. | https://www.lastpass.com/pricing |
| SSO apps: Business includes three; Business Max adds "Unlimited SSO". | https://www.lastpass.com/pricing |
| SaaS Monitoring & Protect: Business Max only. | https://www.lastpass.com/pricing |
| Dark web monitoring: all three business plans. | https://www.lastpass.com/pricing |
| LastPass Families for employees: Business and Business Max. | https://www.lastpass.com/pricing |
| Passkeys stored in the vault ("passwords, passkeys, notes, files..."): all business plans. | https://www.lastpass.com/pricing |
| "Authentication visualization ... (passwords, SSO, passkeys)": Business Max only. | https://www.lastpass.com/products/business-max |

### MSP program
| Fact | Source |
| --- | --- |
| "Manage multiple clients from one dashboard with seamless deployment, ready-to-use templates, and customizable policies" | https://www.lastpass.com/partner/managed-service-provider |
| "Track user licenses and SKUs across clients with detailed billing reports" | https://www.lastpass.com/partner/managed-service-provider |
| MSP trial: "Try free for 30 days." Margins and partner count: not stated. | https://www.lastpass.com/partner/managed-service-provider |

### Who LastPass sells to (its own words)
| Fact | Source |
| --- | --- |
| "Built for: Small to midsize businesses, including non-technical users" (LastPass row); Bitwarden row: "Technical teams that value open-source code". Published May 14, 2026. | https://blog.lastpass.com/posts/lastpass-vs-bitwarden |
| LastPass row: "Closed-source, cloud-based". | https://blog.lastpass.com/posts/lastpass-vs-bitwarden |
| "LastPass is designed so employees can start using it with little to no training." Published Jan 22, 2026. | https://blog.lastpass.com/posts/lastpass-vs-1password-vs-bitwarden-small-businesses |
| "LastPass Business includes 24/7 support through phone, email, and live chat." | https://blog.lastpass.com/posts/lastpass-vs-1password-vs-bitwarden-small-businesses |
| LastPass says 1Password support runs "9:00 AM – 5:00 PM EST with no 24/7 phone option." (LastPass's claim, not checked with 1Password.) | https://blog.lastpass.com/posts/lastpass-vs-1password-vs-bitwarden-small-businesses |
| LastPass says Bitwarden support is "Email and ticket only, no phone support." (LastPass's claim.) | https://blog.lastpass.com/posts/lastpass-vs-bitwarden |

### Security model
| Fact | Source |
| --- | --- |
| "LastPass uses PBKDF2-SHA256 with 600,000 iterations to derive an encryption key." | https://www.lastpass.com/security/zero-knowledge-security |
| Vault data protected with AES-256; section heading "Only decrypted on your device." | https://www.lastpass.com/security/zero-knowledge-security |
| "Only your plaintext Master Password – which is not stored on our servers – will unlock the data within your vault." | https://www.lastpass.com/security/zero-knowledge-security |
| Certifications: "ISO 27001, SOC2 Type II, SOC3, BSI C5, TRUSTe, and more." | https://www.lastpass.com/security |
| "Core Security Upgrades": stronger device, cloud and endpoint security; PBKDF2 raised to 600,000; enhanced vault encryption; secure software factory with SBOM tracking and SLSA compliance. No dates given. | https://www.lastpass.com/security/is-lastpass-secure |

### Incident history: what LastPass has said
| Fact | Source |
| --- | --- |
| 2022: attacker copied "a backup of customer vault data"; URLs unencrypted; usernames, passwords, notes and form-fill fields encrypted. (Dec 22, 2022 update.) | https://blog.lastpass.com/posts/notice-of-recent-security-incident |
| 2022: "the master password is never known to LastPass and is not stored or maintained by LastPass" | https://blog.lastpass.com/posts/notice-of-recent-security-incident |
| After 2022: decommissioned and rebuilt the affected environment; added logging and alerting; added a managed endpoint detection and response vendor; rotated credentials and certificates. | https://blog.lastpass.com/posts/notice-of-recent-security-incident |
| Mar 1, 2023: "Rotated all relevant cleartext secrets"; "Analyzed and changed existing privileged access controls"; "deployed several new security technologies across our infrastructure" | https://blog.lastpass.com/posts/security-incident-update-recommended-actions |
| May 2026 FAQ: "rebuilt its infrastructure from the ground up on a new cloud platform, put a new security and privacy framework in place, and achieved ISO 27701 compliance." A "Threat Intelligence, Mitigation, and Escalation (TIME) team" monitors threats. | https://blog.lastpass.com/posts/lastpass-vs-bitwarden |
| June 22, 2026: learned June 12 of an incident at Klue (a third-party vendor). Attacker obtained OAuth tokens Klue held, and reached "standard business contact information and related customer relationship management (CRM) data", plus support case and sales data. "LastPass products, services, and infrastructure were not impacted in any way and customer vaults remain secure." | https://blog.lastpass.com/posts/klue-supply-chain-incident-and-lastpass-response |
| Klue response: "Discontinued all employee access to Klue"; "Rotated the exposed API access tokens"; remediation completed. | https://blog.lastpass.com/posts/klue-supply-chain-incident-and-lastpass-response |
| March 3, 2026: LastPass warned customers of a phishing campaign using fake email chains; "No Impact to LastPass Systems" (title). Body not read. | https://blog.lastpass.com/posts/march-2026-phishing-campaign-targeting-lastpass-customers |

### Incident history: major outlets and regulators
| Fact | Source |
| --- | --- |
| BleepingComputer (June 23, 2026): LastPass confirmed a breach in the Klue supply chain attack. Per LastPass, names, phone numbers, emails, addresses, support case and sales data may have been exposed; vaults remained secure. Claimed by the Icarus extortion group. | https://www.bleepingcomputer.com/news/security/lastpass-confirms-data-breach-in-klue-supply-chain-attack/ |
| The Register (Dec 11, 2025): the UK ICO fined LastPass £1.2 million over the 2022 breach, which "compromised information from up to 1.6 million UK users". (The ICO's own page blocks automated reads.) | https://www.theregister.com/2025/12/11/lastpass_ico_fine/ |
| BleepingComputer (Mar 7, 2025): US authorities seized over $23 million in crypto; "Investigators believe hackers who breached LastPass in 2022 were behind the attack." LastPass statement: authorities "have not made us aware of any conclusive evidence that connects any crypto thefts to our incident." | https://www.bleepingcomputer.com/news/security/us-seizes-23-million-in-crypto-stolen-via-password-manager-breach/ |

---

## 1Password (primary)

| Fact | Source |
| --- | --- |
| Teams Starter Pack: "$2.49 / user", "Per month. Billed yearly.", "10 users minimum. Up to 20 users." FAQ: $24.95/month covers 10 members; extra seats $4.99 each. | https://1password.com/teams/pricing/ |
| Business: "$8.99 / user", "Per month. Billed yearly.", "1 user minimum." | https://1password.com/teams/pricing/ |
| 14-day trial on both, no credit card. | https://1password.com/teams/pricing/ |
| Business adds "Integrate with Okta, Entra ID, OneLogin, Duo, and more" and Watchtower alerts. | https://1password.com/teams/pricing/ |
| Provisioning: "Azure AD, Google Workspace, Okta, OneLogin, Rippling, and JumpCloud". | https://1password.com/teams/pricing/ |
| SIEM: "Splunk, Elastic, Sumo Logic, and Panther". | https://1password.com/teams/pricing/ |
| Security: AES 256-bit end-to-end; "Two-Key Derivation using your password and Secret Key"; "SOC 2 Type II certification". | https://1password.com/teams/pricing/ |
| MSP: "Enterprise Password Manager - MSP Edition", 14-day MSP trial, pricing not shown. | https://1password.com/teams/pricing/ |
| Enterprise products (Device Trust, SaaS Manager, Privileged Access) are quote-only. | https://1password.com/pricing/enterprise |
| vs LastPass page: "LastPass has experienced multiple security incidents involving customer vault data." | https://1password.com/compare/1password-vs-lastpass |
| vs LastPass page: SOC 2 and "ISO 27001, 27017, 27018, and 27701". | https://1password.com/compare/1password-vs-lastpass |
| vs LastPass page: "Unlike LastPass, 1Password supports multi-tenancy with parent and child account structures." | https://1password.com/compare/1password-vs-lastpass |
| vs LastPass page: "LastPass' Security Dashboard isn't available on iOS and Android." | https://1password.com/compare/1password-vs-lastpass |
| Oct 22, 2026: SCIM Bridge 2.9.17, a patch release for two CVEs; Entra ID, Okta, OneLogin and JumpCloud users told to "switch to hosted provisioning". | https://releases.1password.com/provisioning/ |
| Oct 22, 2026: "Introducing 1Password for Agents", for Individual and Family accounts at no extra cost. | https://1password.com/blog/1password-for-ai-agents |
| Oct 23, 2026: 1Password Privileged Access named an Honorable Mention in the 2026 Gartner Magic Quadrant for PAM. | https://1password.com/blog/1password-recognized-in-2026-gartner-magic-quadrant-for-privileged-access-management |

## Bitwarden (primary)

| Fact | Source |
| --- | --- |
| Teams: "$4 per month / per user billed annually". Enterprise: "$6 per month / per user billed annually". Seats unlimited. | https://bitwarden.com/pricing/business/ |
| Both plans: event logs ("over 50 types of events", retained indefinitely), Directory Connector, SCIM, Duo two-step, groups, API. | https://bitwarden.com/pricing/business/ |
| Enterprise only: passwordless SSO, enterprise policies, self-host option, Access Intelligence, custom roles, account recovery, free Families plan. | https://bitwarden.com/pricing/business/ |
| Support: "Priority 24/7 email support". | https://bitwarden.com/pricing/business/ |
| "Open source and third-party audited" | https://bitwarden.com/bitwarden-alternatives/ |
| Comparison table prices Bitwarden at "$6/user per month, everything included" and LastPass at "$7/user per month + add-ons". | https://bitwarden.com/bitwarden-alternatives/ |
| Migration guide for LastPass Enterprise customers moving to Bitwarden Teams or Enterprise (direct import, SCIM or Directory Connector onboarding). | https://bitwarden.com/help/lastpass-enterprise-migration-guide/ |
| Oct 14, 2026 (updated): "Introducing Bitwarden Access Intelligence". | https://bitwarden.com/blog/introducing-bitwarden-access-intelligence-proactive-security-protection/ |
| Sep 29, 2026: "Bitwarden Privileged Controls", private preview. | https://bitwarden.com/blog/bitwarden-privileged-controls-secure-your-most-sensitive-accounts-in-minutes/ |
| Server 2026.9.0: SCIM and Directory Connector can provision users into a Staged status. | https://bitwarden.com/help/releasenotes/ |
| Server 2026.11.0: new accounts get updated encryption algorithms; a new whitepaper version to follow. No release date shown. | https://bitwarden.com/help/releasenotes/ |
| Nov 19, 2026: "November 2026 product update for Bitwarden Business plans" (title only). | https://bitwarden.com/blog/november-2026-product-update-for-bitwarden-business-plans/ |
| LastPass's view of Bitwarden: "Around 18 policies, no per-user or per-group scoping"; Access Intelligence "can't detect non-vaulted logins". LastPass's claims. | https://blog.lastpass.com/posts/lastpass-vs-bitwarden |

## Keeper (secondary)

| Fact | Source |
| --- | --- |
| Plans: Business Starter, Business, Enterprise. Starter: "Protection for 5–10 users". Enterprise: request a quote. Dollar figures did not render in our read. | https://www.keepersecurity.com/pricing/business-and-enterprise.html |
| Enterprise adds "Advanced provisioning (SCIM, AD/LDAP, SSO/SAML)". Business adds "Free Family Plan for every user". | https://www.keepersecurity.com/pricing/business-and-enterprise.html |
| SIEM integration and compliance reporting are add-ons. KeeperPAM and KeeperMSP are sold through sales. | https://www.keepersecurity.com/pricing/business-and-enterprise.html |
| Claims "SOC 2 Type 2 and SOC 3", "ISO 27001, 27017 and 27018", "FedRAMP High and GovRAMP Authorized". | https://www.keepersecurity.com/pricing/business-and-enterprise.html |
| vs LastPass page: Keeper "has never experienced a data breach"; cites the LastPass 2022 breach, a class-action settlement, and the ICO fine; says LastPass "is not FedRAMP Certified at any level". | https://www.keepersecurity.com/vs/lastpass.html |
| vs LastPass page: Keeper offers "24/7 customer support via phone and live chat". | https://www.keepersecurity.com/vs/lastpass.html |
| Nov 5, 2026: Self-managed Keeper brings PAM to air-gapped environments. | https://www.keepersecurity.com/blog/2026/11/05/self-managed-keeper-brings-zero-trust-pam-to-air-gapped-and-critical-infrastructure-environments/ |
| Nov 10, 2026: milestone toward DoD IL5 authorization. | https://www.keepersecurity.com/blog/2026/11/10/keeper-surpasses-key-milestone-toward-dod-il5-authorization-hardening-identity-security-for-national-defense/ |
| Nov 18, 2026: global emergency breach response service. | https://www.keepersecurity.com/blog/2026/11/18/keeper-launches-global-emergency-breach-response-service-for-organizations-under-active-cyber-attack/ |

## Dashlane and NordPass (noted only)
Not researched in depth. Listed on the site as "watch" competitors with no facts.

---

## Brand
Pulled from https://www.lastpass.com/assets/styles/styles.css (most-used values; Claude in Chrome and the built-in browser were both unavailable for computed styles):
- Brand red `#d71340` (hover `#c50b3a`, active `#a50c38`)
- Near-black `#050606`, slate text `#4c535d`, light surfaces `#f9fafb` and `#f0f2f5`
- Font: "Source Sans 3" (413 declarations)

---

## Could not verify (and what the site does instead)
- **LastPass Teams price.** Placeholder on the pricing page. The site does not state it.
- **Keeper per-user prices.** Did not render. The site says "published on Keeper's pricing page" with no figure.
- **How LastPass federated login handles the master password and vault key.** Docs on support.lastpass.com were unreachable. The deal assistant demo shows this question going to a sales engineer instead of being answered.
- **LastPass incident roadmap page** (support.lastpass.com). Not read. The site cites only the blog posts and security pages above.
- **The July 2026 phishing warning** reported by Forbes. The article returned 403 and no LastPass post was found. Not used.
- **1Password self-hosting, family accounts for business users, and MSP pricing.** Not checked. Matrix cells say "not checked".
- **Bitwarden certifications list and MSP billing.** Not checked. Matrix cells say "not checked".
