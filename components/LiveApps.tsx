'use client'

import TiltCard from './TiltCard'

export interface AppType {
    id: string
    name: string
    description: string
    platform: 'android' | 'ios' | 'both'
    playStoreUrl?: string
    appStoreUrl?: string
    tags: string[]
}

/** Ensures a URL is always absolute – avoids hash-relative links like site.com/#https://... */
function toAbsoluteUrl(url: string): string {
    if (!url) return '#'
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
}

function PlayStoreBadge({ url }: { url: string }) {
    return (
        <a
            href={toAbsoluteUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-medium transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
        >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.37.21.8.24 1.2.07l12.47-7.21-2.79-2.79-10.88 9.93zm-1.18-20.5v17.48c0 .59.34 1.1.85 1.36l9.97-9.97-9.97-9.97c-.51.26-.85.77-.85 1.1zm20.12 8.55l-2.54-1.47-3.17 3.16 3.17 3.17 2.57-1.49c.73-.42.73-1.95-.03-2.37zm-17.58-9.44l10.88 9.93 2.79-2.79L5.74.07c-.4-.17-.83-.14-1.2.07z" />
            </svg>
            Google Play
        </a>
    )
}

function AppStoreBadge({ url }: { url: string }) {
    return (
        <a
            href={toAbsoluteUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-medium transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
        >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.28-2.16 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.37 2.77zm-5.71-17.5c.73-.89 1.94-1.56 2.94-1.6.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.01z" />
            </svg>
            App Store
        </a>
    )
}

const platformLabel: Record<AppType['platform'], string> = {
    both: 'Android + iOS',
    android: 'Android',
    ios: 'iOS',
}

export default function LiveApps({ apps }: { apps: AppType[] }) {

    return (
        <section id="live-apps" className="min-h-[100dvh] w-full flex items-center border-t border-border bg-background snap-start snap-always">
            <div className="w-full mx-auto max-w-[1100px] px-6 py-20">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Live Apps</h2>
                <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                    Apps I&apos;ve shipped that are available on the Play Store and App Store.
                </p>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {apps.map((app) => (
                        <TiltCard
                            key={app.id}
                            className="group flex flex-col justify-between space-y-6 border border-border/60 bg-transparent p-6 transition-[border-color] duration-300 hover:border-foreground"
                        >
                            {/* Accent line */}
                            <span
                                className="absolute left-0 top-0 z-20 h-0.5 w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                                aria-hidden="true"
                            />

                            <div className="relative z-20 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold tracking-tight">{app.name}</h3>
                                    <span className="border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                        {platformLabel[app.platform]}
                                    </span>
                                </div>

                                <p className="text-sm leading-relaxed text-muted-foreground">{app.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {app.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block border border-muted bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-20 flex translate-y-1 flex-wrap gap-3 opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                {app.playStoreUrl && app.playStoreUrl !== '#' && <PlayStoreBadge url={app.playStoreUrl} />}
                                {app.appStoreUrl && app.appStoreUrl !== '#' && <AppStoreBadge url={app.appStoreUrl} />}
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
