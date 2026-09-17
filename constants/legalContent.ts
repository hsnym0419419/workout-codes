import { Language } from '@/types/user';

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

type LegalContent = {
  terms: LegalDocument;
  privacy: LegalDocument;
};

const en: LegalContent = {
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: May 2026',
    sections: [
      {
        heading: '1. Use at Your Own Risk',
        body: 'This app provides general fitness information for educational purposes only. All exercises are performed at your own risk. Consult a qualified healthcare professional before starting any exercise program, especially if you have existing medical conditions.',
      },
      {
        heading: '2. No Liability for Injury',
        body: 'We are not responsible for any injury, illness, or physical harm that may result from using this app or performing any exercises described within it. By using this app, you acknowledge and accept all risks associated with physical exercise.',
      },
      {
        heading: '3. Content Changes',
        body: 'The content of this app, including exercises, workout plans, and recommendations, may be updated or changed at any time without prior notice. We do not guarantee the accuracy or completeness of any information provided.',
      },
      {
        heading: '4. Service Availability',
        body: 'We reserve the right to suspend, modify, or discontinue the app or any of its features at any time, with or without notice. We are not liable for any loss or inconvenience caused by such actions.',
      },
      {
        heading: '5. Prohibited Uses',
        body: 'You agree not to reverse engineer, copy, distribute, or commercially exploit any part of this app. You may not use this app for any unlawful purpose or in any way that could damage, disable, or impair the service.',
      },
      {
        heading: '6. Intellectual Property',
        body: 'All content within this app, including text, graphics, logos, images, and software, is the property of the app developer and is protected by applicable copyright laws. Unauthorized reproduction or distribution is strictly prohibited.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: May 2026',
    sections: [
      {
        heading: '1. About This App',
        body: 'This app provides 7-minute workout routines to help you achieve your fitness goals. It includes features such as workout tracking, exercise guides, and optional reminder notifications.',
      },
      {
        heading: '2. Notifications',
        body: 'If you grant permission, this app may send you push notifications to remind you of your daily workout. You can disable notifications at any time through your device settings or within the app.',
      },
      {
        heading: '3. Advertising',
        body: 'This app may display advertisements provided by third-party services such as Google AdMob. These services may collect certain device information to serve relevant ads in accordance with their own privacy policies.',
      },
      {
        heading: '4. No Personal Information Collected',
        body: 'We do not collect, store, or share any personally identifiable information such as your name, email address, or location. All workout data is stored locally on your device.',
      },
      {
        heading: '5. Anonymous Usage Data',
        body: 'We may collect anonymized, aggregated usage data (such as app crash reports or feature usage statistics) to help us improve the app. This data cannot be used to identify you personally.',
      },
      {
        heading: '6. Third-Party Services',
        body: 'This app may integrate with third-party services such as Google AdMob for advertising. These services operate under their own privacy policies, which we encourage you to review.',
      },
      {
        heading: '7. Data Usage',
        body: 'Any data collected is used solely to improve app performance and user experience. We do not sell, rent, or share your data with third parties for marketing purposes.',
      },
      {
        heading: '8. Contact Us',
        body: 'If you have any questions or concerns about this Privacy Policy, please contact us through the App Store or Google Play support channel. We will respond to your inquiry as promptly as possible.',
      },
    ],
  },
};

const ja: LegalContent = {
  terms: {
    title: '利用規約',
    lastUpdated: '最終更新日: 2026年5月',
    sections: [
      {
        heading: '1. 自己責任による利用',
        body: 'このアプリは、一般的なフィットネス情報を教育目的で提供するものです。すべてのエクササイズはご自身の責任においてお試しください。既往症がある場合は、エクササイズを始める前に医療専門家にご相談ください。',
      },
      {
        heading: '2. 怪我等に関する免責',
        body: '当アプリの使用またはアプリ内で紹介するエクササイズの実施によって生じた怪我、体調不良、その他の身体的損害について、当社は一切の責任を負いません。ご利用にあたっては、運動に伴うすべてのリスクをご理解・ご承認いただくものとします。',
      },
      {
        heading: '3. コンテンツの変更',
        body: 'エクササイズ、ワークアウトプラン、推奨事項を含むアプリのコンテンツは、予告なく更新または変更される場合があります。提供する情報の正確性や完全性を保証するものではありません。',
      },
      {
        heading: '4. サービスの停止',
        body: '当社は、予告の有無にかかわらず、アプリまたはその機能の全部もしくは一部を停止、変更、または終了する権利を留保します。これに起因するいかなる損失または不便についても、当社は責任を負いません。',
      },
      {
        heading: '5. 禁止事項',
        body: 'アプリのいかなる部分についても、リバースエンジニアリング、複製、配布、商業的利用を行わないことに同意するものとします。また、違法な目的やサービスに損害を与える方法でのアプリ使用を禁止します。',
      },
      {
        heading: '6. 著作権について',
        body: 'テキスト、グラフィック、ロゴ、画像、ソフトウェアを含むアプリ内のすべてのコンテンツは、アプリ開発者の所有物であり、著作権法によって保護されています。無断複製・配布は固く禁じられています。',
      },
    ],
  },
  privacy: {
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日: 2026年5月',
    sections: [
      {
        heading: '1. アプリについて',
        body: 'このアプリは、あなたのフィットネス目標達成を支援するための7分間ワークアウトを提供します。ワークアウトの記録、エクササイズのガイド、任意のリマインダー通知などの機能を備えています。',
      },
      {
        heading: '2. 通知機能',
        body: '許可をいただいた場合、アプリは毎日のワークアウトをリマインドするプッシュ通知を送信することがあります。通知はデバイスの設定またはアプリ内からいつでも無効にできます。',
      },
      {
        heading: '3. 広告の表示',
        body: 'このアプリは、Google AdMobなどのサードパーティサービスが提供する広告を表示する場合があります。これらのサービスは、それぞれのプライバシーポリシーに従い、関連する広告を配信するためにデバイス情報を収集することがあります。',
      },
      {
        heading: '4. 個人情報の不収集',
        body: '当社は、氏名、メールアドレス、位置情報などの個人を特定できる情報を収集・保存・共有することはありません。すべてのワークアウトデータはデバイス内にローカル保存されます。',
      },
      {
        heading: '5. 匿名の利用データ',
        body: 'アプリの改善のため、クラッシュレポートや機能の利用統計などの匿名化・集約されたデータを収集する場合があります。このデータによって個人を特定することはできません。',
      },
      {
        heading: '6. 外部サービスの利用',
        body: 'このアプリは、広告目的でGoogle AdMobなどのサードパーティサービスと連携している場合があります。これらのサービスはそれぞれのプライバシーポリシーの下で運営されており、内容のご確認をお勧めします。',
      },
      {
        heading: '7. データの利用目的',
        body: '収集したデータは、アプリのパフォーマンスおよびユーザー体験の向上のみを目的として使用されます。マーケティング目的でデータを第三者に販売・貸与・共有することはありません。',
      },
      {
        heading: '8. お問い合わせ',
        body: 'このプライバシーポリシーに関するご質問やご不明点は、App StoreまたはGoogle Playのサポートチャンネルよりお問い合わせください。できる限り速やかにご回答いたします。',
      },
    ],
  },
};

const fr: LegalContent = {
  terms: {
    title: "Conditions d'utilisation",
    lastUpdated: 'Dernière mise à jour : mai 2026',
    sections: [
      {
        heading: '1. Utilisation à vos risques',
        body: "Cette application fournit des informations générales sur le fitness à des fins éducatives uniquement. Tous les exercices sont effectués à vos risques et périls. Consultez un professionnel de santé qualifié avant de commencer tout programme d'exercice.",
      },
      {
        heading: '2. Absence de responsabilité en cas de blessure',
        body: "Nous déclinons toute responsabilité en cas de blessure, maladie ou préjudice corporel pouvant résulter de l'utilisation de cette application. En utilisant l'application, vous reconnaissez et acceptez tous les risques liés à l'exercice physique.",
      },
      {
        heading: '3. Modifications du contenu',
        body: 'Le contenu de cette application, y compris les exercices, les plans d\'entraînement et les recommandations, peut être mis à jour ou modifié à tout moment sans préavis. Nous ne garantissons pas l\'exactitude ou l\'exhaustivité des informations fournies.',
      },
      {
        heading: '4. Disponibilité du service',
        body: 'Nous nous réservons le droit de suspendre, modifier ou interrompre l\'application ou l\'une de ses fonctionnalités à tout moment, avec ou sans préavis. Nous ne saurions être tenus responsables de toute perte ou inconvénient en résultant.',
      },
      {
        heading: '5. Utilisations interdites',
        body: 'Vous vous engagez à ne pas rétroconcevoir, copier, distribuer ou exploiter commercialement toute partie de cette application. Toute utilisation à des fins illégales ou susceptible d\'endommager le service est strictement interdite.',
      },
      {
        heading: '6. Propriété intellectuelle',
        body: "Tout le contenu de cette application, y compris textes, graphiques, logos, images et logiciels, appartient au développeur et est protégé par les lois sur le droit d'auteur applicables. Toute reproduction ou distribution non autorisée est strictement interdite.",
      },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : mai 2026',
    sections: [
      {
        heading: '1. À propos de cette application',
        body: "Cette application propose des séances d'entraînement de 7 minutes pour vous aider à atteindre vos objectifs fitness. Elle comprend le suivi des séances, des guides d'exercices et des notifications de rappel optionnelles.",
      },
      {
        heading: '2. Notifications',
        body: "Si vous l'autorisez, l'application peut vous envoyer des notifications push pour vous rappeler votre entraînement quotidien. Vous pouvez désactiver les notifications à tout moment dans les paramètres de votre appareil ou de l'application.",
      },
      {
        heading: '3. Publicité',
        body: "Cette application peut afficher des publicités fournies par des services tiers tels que Google AdMob. Ces services peuvent collecter certaines informations sur l'appareil pour diffuser des annonces pertinentes conformément à leurs propres politiques de confidentialité.",
      },
      {
        heading: '4. Aucune collecte de données personnelles',
        body: 'Nous ne collectons, stockons ni partageons aucune information personnelle identifiable telle que votre nom, adresse e-mail ou localisation. Toutes les données d\'entraînement sont stockées localement sur votre appareil.',
      },
      {
        heading: '5. Données d\'utilisation anonymes',
        body: 'Nous pouvons collecter des données d\'utilisation anonymisées et agrégées (rapports de plantage, statistiques d\'utilisation) pour améliorer l\'application. Ces données ne peuvent pas être utilisées pour vous identifier personnellement.',
      },
      {
        heading: '6. Services tiers',
        body: 'Cette application peut intégrer des services tiers tels que Google AdMob pour la publicité. Ces services fonctionnent selon leurs propres politiques de confidentialité que nous vous encourageons à consulter.',
      },
      {
        heading: '7. Utilisation des données',
        body: 'Les données collectées sont utilisées uniquement pour améliorer les performances de l\'application et l\'expérience utilisateur. Nous ne vendons, louons ni partageons vos données à des fins marketing.',
      },
      {
        heading: '8. Nous contacter',
        body: 'Pour toute question relative à cette Politique de confidentialité, contactez-nous via le canal de support de l\'App Store ou Google Play. Nous répondrons à votre demande dans les meilleurs délais.',
      },
    ],
  },
};

const es: LegalContent = {
  terms: {
    title: 'Términos de servicio',
    lastUpdated: 'Última actualización: mayo de 2026',
    sections: [
      {
        heading: '1. Uso bajo tu responsabilidad',
        body: 'Esta aplicación proporciona información general sobre fitness únicamente con fines educativos. Todos los ejercicios se realizan bajo tu propia responsabilidad. Consulta a un profesional de la salud antes de comenzar cualquier programa de ejercicio.',
      },
      {
        heading: '2. Sin responsabilidad por lesiones',
        body: 'No somos responsables de ninguna lesión, enfermedad u otro daño físico que pueda derivarse del uso de esta aplicación. Al usarla, reconoces y aceptas todos los riesgos asociados al ejercicio físico.',
      },
      {
        heading: '3. Cambios en el contenido',
        body: 'El contenido de esta aplicación, incluidos ejercicios, planes de entrenamiento y recomendaciones, puede actualizarse o modificarse en cualquier momento sin previo aviso. No garantizamos la exactitud ni la integridad de la información proporcionada.',
      },
      {
        heading: '4. Disponibilidad del servicio',
        body: 'Nos reservamos el derecho de suspender, modificar o interrumpir la aplicación o cualquiera de sus funciones en cualquier momento, con o sin previo aviso. No seremos responsables de ninguna pérdida o inconveniente derivado de dichas acciones.',
      },
      {
        heading: '5. Usos prohibidos',
        body: 'Aceptas no realizar ingeniería inversa, copiar, distribuir ni explotar comercialmente ninguna parte de esta aplicación. No puedes usar esta aplicación para ningún propósito ilegal o de manera que pueda dañar o deteriorar el servicio.',
      },
      {
        heading: '6. Propiedad intelectual',
        body: 'Todo el contenido de esta aplicación, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad del desarrollador y está protegido por las leyes de derechos de autor aplicables. La reproducción o distribución no autorizada está estrictamente prohibida.',
      },
    ],
  },
  privacy: {
    title: 'Política de privacidad',
    lastUpdated: 'Última actualización: mayo de 2026',
    sections: [
      {
        heading: '1. Acerca de esta aplicación',
        body: 'Esta aplicación ofrece rutinas de entrenamiento de 7 minutos para ayudarte a alcanzar tus objetivos de fitness. Incluye funciones como seguimiento de entrenamientos, guías de ejercicios y notificaciones de recordatorio opcionales.',
      },
      {
        heading: '2. Notificaciones',
        body: 'Si lo permites, la aplicación puede enviarte notificaciones push para recordarte tu entrenamiento diario. Puedes desactivar las notificaciones en cualquier momento desde los ajustes de tu dispositivo o dentro de la aplicación.',
      },
      {
        heading: '3. Publicidad',
        body: 'Esta aplicación puede mostrar anuncios de servicios de terceros como Google AdMob. Estos servicios pueden recopilar cierta información del dispositivo para mostrar anuncios relevantes de acuerdo con sus propias políticas de privacidad.',
      },
      {
        heading: '4. No se recopila información personal',
        body: 'No recopilamos, almacenamos ni compartimos ninguna información de identificación personal como tu nombre, correo electrónico o ubicación. Todos los datos de entrenamiento se almacenan localmente en tu dispositivo.',
      },
      {
        heading: '5. Datos de uso anónimos',
        body: 'Podemos recopilar datos de uso anónimos y agregados (como informes de errores o estadísticas de uso) para mejorar la aplicación. Estos datos no pueden usarse para identificarte personalmente.',
      },
      {
        heading: '6. Servicios de terceros',
        body: 'Esta aplicación puede integrarse con servicios de terceros como Google AdMob para publicidad. Estos servicios operan bajo sus propias políticas de privacidad, que te recomendamos revisar.',
      },
      {
        heading: '7. Uso de los datos',
        body: 'Los datos recopilados se usan únicamente para mejorar el rendimiento de la aplicación y la experiencia del usuario. No vendemos, alquilamos ni compartimos tus datos con terceros con fines de marketing.',
      },
      {
        heading: '8. Contacto',
        body: 'Si tienes preguntas sobre esta Política de privacidad, contáctanos a través del canal de soporte de la App Store o Google Play. Responderemos a tu consulta lo antes posible.',
      },
    ],
  },
};

const zh: LegalContent = {
  terms: {
    title: '服务条款',
    lastUpdated: '最后更新：2026年5月',
    sections: [
      {
        heading: '1. 自行承担风险',
        body: '本应用仅出于教育目的提供一般性健身信息。所有锻炼均由您自行承担风险。在开始任何锻炼计划之前，尤其是有既往病史时，请咨询合格的医疗专业人员。',
      },
      {
        heading: '2. 受伤免责声明',
        body: '对于因使用本应用或执行其中所述锻炼而可能导致的任何伤害、疾病或身体损害，我们概不负责。使用本应用即表示您知晓并接受与体育锻炼相关的所有风险。',
      },
      {
        heading: '3. 内容变更',
        body: '本应用的内容，包括锻炼项目、训练计划和建议，可能随时更改而不另行通知。我们不保证所提供信息的准确性或完整性。',
      },
      {
        heading: '4. 服务可用性',
        body: '我们保留随时暂停、修改或终止应用程序或其任何功能的权利，无论是否事先通知。对于由此造成的任何损失或不便，我们概不负责。',
      },
      {
        heading: '5. 禁止事项',
        body: '您同意不对本应用的任何部分进行逆向工程、复制、分发或商业利用。您不得将本应用用于任何非法目的，或以任何可能损害、禁用或削弱服务的方式使用本应用。',
      },
      {
        heading: '6. 知识产权',
        body: '本应用内的所有内容，包括文字、图形、标志、图片和软件，均为应用开发者的财产，受适用版权法保护。未经授权的复制或分发被严格禁止。',
      },
    ],
  },
  privacy: {
    title: '隐私政策',
    lastUpdated: '最后更新：2026年5月',
    sections: [
      {
        heading: '1. 关于本应用',
        body: '本应用提供7分钟训练方案，帮助您实现健身目标。包括训练记录、锻炼指南及可选的提醒通知等功能。',
      },
      {
        heading: '2. 通知功能',
        body: '如果您授予权限，本应用可能会向您发送推送通知以提醒您每日锻炼。您可以随时通过设备设置或应用内设置关闭通知。',
      },
      {
        heading: '3. 广告展示',
        body: '本应用可能展示由Google AdMob等第三方服务提供的广告。这些服务可能会根据其自身隐私政策收集某些设备信息，以投放相关广告。',
      },
      {
        heading: '4. 不收集个人信息',
        body: '我们不收集、存储或共享任何可识别个人身份的信息，如您的姓名、电子邮件地址或位置信息。所有训练数据均存储在您的设备本地。',
      },
      {
        heading: '5. 匿名使用数据',
        body: '我们可能会收集匿名汇总的使用数据（如崩溃报告或功能使用统计），以帮助改进应用。这些数据无法用于识别您的个人身份。',
      },
      {
        heading: '6. 第三方服务',
        body: '本应用可能与Google AdMob等第三方服务集成用于广告投放。这些服务按照各自的隐私政策运营，我们建议您查阅相关内容。',
      },
      {
        heading: '7. 数据使用',
        body: '收集的数据仅用于改善应用性能和用户体验。我们不会出于营销目的向第三方出售、租赁或共享您的数据。',
      },
      {
        heading: '8. 联系我们',
        body: '如果您对本隐私政策有任何疑问，请通过App Store或Google Play支持渠道联系我们。我们将尽快回复您的咨询。',
      },
    ],
  },
};

export const LEGAL_CONTENT: Record<Language, LegalContent> = { en, ja, fr, es, zh };
