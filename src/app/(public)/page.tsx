import { Intro } from '@/components/intro/Intro'
import { routes } from '@/shared/config/routes'

export default function HomePage() {
    return (
        <>
            <Intro />
            <script
                id="intro-redirect"
                dangerouslySetInnerHTML={{
                    __html: `(() => {
                        const intro = document.getElementById('residdy-intro');
                        if (!intro) return;
                        window.__residdyIntro ??= new WeakSet();
                        window.__residdyIntro.add(intro);
                        window.setTimeout(() => {
                            if (!intro.isConnected || window.location.pathname !== '/') return;
                            let destination = ${JSON.stringify(routes.auth)};
                            try {
                                if (window.localStorage.getItem('access_token')) destination = ${JSON.stringify(routes.main)};
                            } catch {
                                destination = ${JSON.stringify(routes.auth)};
                            }
                            window.location.replace(destination);
                        }, 3000);
                    })();`,
                }}
            />
        </>
    )
}
