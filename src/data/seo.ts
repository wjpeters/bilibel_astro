export const site = 'https://bilibel.nl';

export const descriptions: Record<string, string> = {
  '/': 'Praktijk Bilibel in Arnhem: persoonlijke begeleiding met ademwerk, Reiki, klankschaalmassage en klankreizen. Ontdek het aanbod en maak een afspraak.',
  '/wie-ben-ik/': 'Maak kennis met Bianca van Praktijk Bilibel in Arnhem. Lees over haar achtergrond en persoonlijke begeleiding tijdens jouw innerlijke reis.',
  '/aanbod/': 'Ontdek het aanbod van Praktijk Bilibel in Arnhem: ademwerk, Reiki, klankschaalmassage, Energetic SoundTouch en verschillende massages.',
  '/reiki/': 'Lees over Reiki bij Praktijk Bilibel in Arnhem, hoe een behandeling verloopt en wat je kunt verwachten. Bekijk de tarieven en neem contact op.',
  '/energetic-soundtouch/': 'Ontdek Energetic SoundTouch bij Praktijk Bilibel in Arnhem. Lees over deze behandeling met klank en aanraking en maak een persoonlijke afspraak.',
  '/klankschaalmassage/': 'Ervaar klank en trilling tijdens een klankschaalmassage bij Praktijk Bilibel in Arnhem. Lees over de behandeling en bekijk de tarieven.',
  '/ademwerk/': 'Ontdek ademwerk bij Praktijk Bilibel in Arnhem. Lees over persoonlijke begeleiding bij bewust ademen en neem contact op voor een afspraak.',
  '/stervensbegeleiding/': 'Klank en stervensbegeleiding bij Praktijk Bilibel: aandacht met muziek, zang, woorden en stilte. Neem contact op om de mogelijkheden te bespreken.',
  '/thaise-yoga-massage/': 'Lees over Thaise yoga massage bij Praktijk Bilibel in Arnhem. Ontdek de behandeling, bekijk de tarieven en neem contact op voor een afspraak.',
  '/kruidenstempelmassage/': 'Ontdek kruidenstempelmassage bij Praktijk Bilibel in Arnhem. Lees wat de behandeling inhoudt, bekijk de tarieven en maak een afspraak.',
  '/klankreis/': 'Ontdek de klankreizen van Praktijk Bilibel in Arnhem. Bekijk de data, locatie en praktische informatie en neem contact op om je aan te melden.',
  '/klankfantasie-voor-kinderen/': 'Ontdek klankfantasie voor kinderen bij Praktijk Bilibel. Lees over de klankbeleving en neem contact op voor de mogelijkheden.',
  '/klankreis-met-ouderen/': 'Lees over klankreizen met ouderen bij Praktijk Bilibel. Ontdek de mogelijkheden van een klankbeleving en bespreek je wensen met Bianca.',
  '/klankbeleving-op-maat-voor-bijzondere-mensen/': 'Klankbeleving op maat voor bijzondere mensen bij Praktijk Bilibel. Lees over de mogelijkheden en neem contact op voor een persoonlijke afstemming.',
  '/tarieven/': 'Bekijk de tarieven van Praktijk Bilibel voor ademwerk, Reiki, klankschaalmassage, klankreizen en massages, inclusief behandeltijden en bijkomende kosten.',
  '/contact/': 'Neem contact op met Praktijk Bilibel in Arnhem voor een afspraak of vraag. Bekijk het adres, telefoonnummer en e-mailadres of vul het contactformulier in.',
  '/geef-een-bijzonder-cadeau-van-heling-en-transformatie/': 'Geef een kadobon van Praktijk Bilibel voor een behandeling of klankreis. Bekijk de beschikbare bedragen en voorwaarden en vraag een kadobon aan.',
};

export function structuredData(route: string, title: string, description: string) {
  const url = site + route;
  const name = title.replace(/ - Bilibel$/, '');
  const businessId = `${site}/#business`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness', '@id': businessId,
        name: 'Praktijk Bilibel', url: site + '/',
        telephone: '+31634204401', email: 'info@bilibel.nl',
        address: { '@type': 'PostalAddress', streetAddress: 'Lieshoutstraat 21', postalCode: '6844 EE', addressLocality: 'Arnhem', addressCountry: 'NL' },
        logo: `${site}/original/wp-content/uploads/2024/12/Bilibel-Logo.png`,
      },
      { '@type': 'WebSite', '@id': `${site}/#website`, url: site + '/', name: 'Bilibel', inLanguage: 'nl-NL', publisher: { '@id': businessId } },
      {
        '@type': route === '/contact/' ? 'ContactPage' : route === '/wie-ben-ik/' ? 'AboutPage' : 'WebPage',
        '@id': url + '#webpage', url, name: title, description, inLanguage: 'nl-NL',
        isPartOf: { '@id': `${site}/#website` }, about: { '@id': businessId },
        breadcrumb: { '@id': url + '#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site + '/' },
          ...(route === '/' ? [] : [{ '@type': 'ListItem', position: 2, name, item: url }]),
        ],
      },
    ],
  };
}
