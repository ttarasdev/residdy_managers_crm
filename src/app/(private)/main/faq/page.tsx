import { Page } from '@/components/layout-components/page/Page'

export default function HelpPage() {
    return (
        <Page title="Pomoc">
            <p>
                Wybierz moduł w menu. Filtry zawężają dane na serwerze, a pole
                wyszukiwania przeszukuje aktualną stronę tabeli.
            </p>
            <p>
                Otwórz rekord strzałką w tabeli, aby zobaczyć jego dane i
                dostępne działania. Przyciski są dostępne zgodnie z rolami
                Twojego konta.
            </p>
            <p>
                W sprawach rozwiń etap, aby zarządzać zadaniami. Strzałki w górę
                i w dół zapisują kolejność elementów.
            </p>
            <p>
                Pliki prywatne można przesłać z formularza lub otworzyć za
                pomocą ich identyfikatora. Rozsyłki i kolejki uruchamiasz
                świadomie odpowiednim działaniem.
            </p>
        </Page>
    )
}
