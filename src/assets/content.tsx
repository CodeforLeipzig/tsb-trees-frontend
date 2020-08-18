interface Item {
  title: string;
  description: string;
}

type TreeTypeId = 'LINDE' | 'AHORN' | 'EICHE' | 'KASTANIE' | 'PLATANE';
export interface TreeType extends Item {
  id: TreeTypeId;
}

type IconType = 'info' | 'zoom' | 'water' | 'subscribe';
export interface CollaborationItem extends Item {
  icon: IconType;
}
interface Watering extends Item {
  waterdrops: number[];
}
interface FAQ extends Item {
  qa: Array<{ question: string; answer: string }>;
}
interface Content {
  faq: FAQ;
  imprintAndPrivacy: Item;
  intro: {
    title: string;
    subline: string;
    disclaimer: string;
    description: string[];
  };
  whatsNew?: {
    title: string;
    description: string[];
  };
  loading: {
    snippets: string[];
  };
  sidebar: {
    about: Item[];
    watering: Watering[];
    treetypes: TreeType[];
  };
  collaborate: {
    title: string;
    tiles: CollaborationItem[];
  };
}

const content: Content = {
  faq: {
    title: 'F.A.Q.',
    description:
      'Ist in Vorbereitung...',
    qa: [
    ],
  },
  imprintAndPrivacy: {
    title: 'Impressum und Datenschutz',
    description:
      '<a target="blank" href="https://codefor.de/impressum/">Impressum</a> und <a target="blank" href="https://codefor.de/datenschutz/">Datenschutz</a>',
  },
  intro: {
    title: '<b>Gieß dein <span>Viertel</span></b>',
    subline:
      'Die Leipziger Stadtbäume leiden unter Trockenheit <br class="large" /> und Du kannst ihnen helfen!',
    disclaimer:
      'Hinweis: Das Laden von über 60.000 Bäumen ist ressourcenintensiv und funktioniert aktuell nicht auf allen Mobilgeräten einwandfrei. Wir empfehlen die Nutzung via Desktop-Computer',
    description: [
      'Auf dieser Plattform kannst Du Dich über Bäume in deiner Nachbarschaft und ihren Wasserbedarf informieren. Du kannst einzelne Bäume adoptieren und markieren, wenn Du sie gegossen hast.',
      'Informiere Dich ich über das richtige Gießen von Stadtbäumen. Wenn Du die Seite regelmäßig nutzen möchtest, solltest Du ein Konto erstellen. Die Karte kannst Du aber auch ohne Konto erkunden.',
    ],
  },
  whatsNew: {
    title: 'Was ist neu?',
    description: [
      `Wir haben die Farben angepasst, damit der Wasserbedarf der Berliner Bäume intuitiver zu erfassen ist. Es beginnt bei einem trockenem Gelb und geht bis in ein sattes Grün.<br /><br /><div style="display:flex">
      <div
        style=" background-color:#fde725; width: 13px; height: 13px; border-radius: 100px; margin-right: 5px;"
        color="#fde725"
      ></div>
      <div
        style=" background-color:#cae11f; width: 13px; height: 13px; border-radius: 100px; margin-right: 5px;"
        color="#cae11f"
      ></div>
      <div
        style=" background-color:#95d840; width: 13px; height: 13px; border-radius: 100px; margin-right: 5px;"
        color="#95d840"
      ></div>
      <div
        style=" background-color:#63cb5f; width: 13px; height: 13px; border-radius: 100px; margin-right: 5px;"
        color="#63cb5f"
      ></div>
      <div
        style=" background-color:#3bbb75; width: 13px; height: 13px; border-radius: 100px; margin-right: 5px;"
        color="#3bbb75"
      ></div>
      <div
        style=" background-color:#22a884; width: 13px; height: 13px; border-radius: 100px; margin-right: 5px;"
        color="#22a884"
      ></div>
    </div>`,
      'Hinzu kommen Updates der Open Source Bibliotheken die wir verwenden um die Seite schneller und stabiler laufen zu lassen. Ebenfalls wurden von euch einige Fehler gefunden und von uns behoben.',
    ],
  },
  loading: {
    snippets: [
      'Wir laden gerade über 60.000 Bäume aus dem Leipziger Baumbestand.',
      'Wenn du diese Seite über das Mobilfunknetz aufrufst, kann es etwas dauern.',
      'Sammle Informationen aller Bäume aus Leizpzigs Baumkataster.',
      'Schon gewusst? Ein junger Stadtbaum benötigt etwa 200l Wasser in der Woche.',
    ],
  },
  sidebar: {
    about: [
      {
        title: 'Über das Projekt',
        description:
          'Die Folgen des Klimawandels, insbesondere die trockenen und heißen Sommer, belasten das Leipziger Ökosystem. Unsere Stadtbäume vertrocknen und tragen langfristige Schäden davon: In den letzten Jahren mussten immer mehr Bäume gefällt werden und ihre Lebensdauer sinkt. Inzwischen wird die Bevölkerung regelmäßig zur Unterstützung aufgerufen, allerdings weitgehend unkoordiniert. Dies möchten wir ändern und mit diesem Projekt eine koordinierte Bürger*innenbeteiligung bei der Bewässerung städtischen Grüns ermöglichen.',
      },
      {
        title: 'Über uns',
        description:
          '“Gieß dein Viertel” ist eine Migration des Projekts “Gieß den Kiez” aus Berlin. Die Migration wurde vom <a target="blank" href="https://codefor.de/leipzig/">OKLab Leipzig</a> durchgeführt. “Gieß den Kiez” ist ein Projekt des <a target="blank" href="https://www.citylab-berlin.org/">CityLAB Berlin</a>. Das CityLAB ist ein öffentliches Innovationslabor für die Stadt der Zukunft im ehemaligen Flughafen Berlin-Tempelhof. Gemeinsam mit einem großen Netzwerk aus Verwaltung, Zivilgesellschaft, Wissenschaft und Start-ups arbeiten wir an neuen Ideen für ein lebenswertes Berlin. Das CityLAB ist ein offener Ort zum Mitmachen! Wenn ihr mehr wissen wollt, schaut euch auf unserer Webseite um oder kommt einfach mal vorbei! <br /> <br /> Das CityLAB ist ein Projekt der Technologiestiftung Berlin und wird gefördert durch die Berliner Senatskanzlei.',
      },
      {
        title: 'Datenquellen',
        description:
          'Die Karte zeigt die Leipziger Straßenbäume. Zusätzlich wird abgebildet, wie viel Niederschlag in den letzten 30 Tagen bei jedem Baum gefallen ist und ob diese in der Zeit bereits gegossen wurden.',
      },
    ],
    watering: [
      {
        waterdrops: [1],
        title: 'Niedriger Wasserbedarf',
        description:
          'Straßenbäume höheren Alters (>40 Jahre) haben in der Regel gelernt, sich über das Grundwasser selbst zu versorgen, aber auch sie leiden unter der zunehmenden Hitze und freuen sich über zusätzliches Wasser. Jungbäume unter 3 Jahren hingegen haben einen niedrigen Wasserbedarf, da diese im Normalfall durch die bezirklichen Grünflächenämter versorgt werden.',
      },
      {
        waterdrops: [1, 1],
        title: 'Mittlerer Wasserbedarf',
        description:
          'Mittelalte Bäume zwischen 15 und 40 Jahren werden in der Regel nicht mehr durch die Grünflächenämter bewässert, haben aber schon ein gewisses Durchhaltevermögen. Aber auch für sie sind die Hitzesommer ungewohnt und sie freuen sich über jeden Eimer: Gerne ein Mal in der Woche mit bis zu 100l gießen. ',
      },
      {
        waterdrops: [1, 1, 1],
        title: 'Hoher Wasserbedarf',
        description:
          'Jungbäume zwischen vier und 15 Jahren werden nicht in allen Bezirken von der Verwaltung bewässert und sind noch keine „Selbstversorger“. Sie freuen sich über viel Wasser von bis zu 200l pro Gießung (ein Mal in der Woche).',
      },
    ],
    treetypes: [
    ],
  },
  collaborate: {
    title: '<b>Wie kann ich mitmachen?</b>',
    tiles: [
      {
        icon: 'water',
        title: 'Bäume bewässern',
        description:
          'Informiere Dich auf unserer Plattform, ob die Bäume in deiner Straße Wasser benötigen. Wenn ja, schnapp Dir eine Gießkanne, einen Eimer oder einen Schlauch und leg los. Danach trägst Du die Bewässerung hier ein.',
      },
      {
        icon: 'subscribe',
        title: 'Bäume adoptieren',
        description:
          'Wenn Du regelmäßig die gleichen Bäume gießen willst, kannst Du sie adoptieren und so anzeigen, dass für sie gesorgt ist. So findet eine Koordinierung in der Nachbarschaft statt.',
      },
      {
        icon: 'zoom',
        title: 'Den Baumbestand erkunden',
        description:
          'Unsere Karte ermöglicht es, mehr über einzelne Bäume und auch den gesamten Baumbestand zu erfahren. Nutze die Filter- und Suchfunktion, um mehr über die Bäume Leipzigs zu lernen.',
      },
      {
        icon: 'info',
        title: 'Mit anderen austauschen',
        description:
          'Tritt unserem <a target="_blank" href="https://join.slack.com/t/giessdenkiez/shared_invite/zt-e3et281u-xON4UmBZpKavzDRkw5HmCQ">Slack-Kanal</a> bei, um Dich mit anderen User*innen auszutauschen und die Bewässerung von Bäumen in deinem Kiez zu koordinieren.',
      },
    ],
  },
};

export default content;
