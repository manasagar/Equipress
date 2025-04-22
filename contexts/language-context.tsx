"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  formatDate: (date: Date | string) => string;
  formatNumber: (num: number) => string;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Expanded translations for the application
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    home: "Home",
    news: "News",
    about: "About",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    profile: "Profile",

    // Dashboard
    analysisQueue: "Analysis Queue",
    validationQueue: "Validation Queue",
    analyzeArticle: "Analyze Article",
    validateArticle: "Validate Article",

    // Article Analysis
    analyzeThisArticle: "Analyze This Article",
    rateArticleAccuracy:
      "Rate the article's accuracy and provide your expert analysis",
    accuracyRating: "Accuracy Rating",
    inaccurate: "Inaccurate",
    accurate: "Accurate",
    analysisComments: "Analysis Comments",
    provideDetailedAnalysis:
      "Provide your detailed analysis of the article's accuracy, sources, and any potential biases or omissions...",
    sourceEvaluation: "Source Evaluation",
    evaluateSourceCredibility:
      "Evaluate the credibility and relevance of the sources cited in the article...",
    submitAnalysis: "Submit Analysis",
    submittingAnalysis: "Submitting Analysis...",
    analysisVisibleToValidators:
      "Your analysis will be visible to validators and will influence the verification status of this article.",
    beThoroughAndObjective:
      "Please be thorough and objective in your assessment.",

    // Article Validation
    castYourVote: "Cast Your Vote",
    basedOnArticleAndAnalyses:
      "Based on the article and expert analyses, is this article true or false?",
    currentConsensus: "Current Consensus",
    trueArticleAccurate: "True - The article is accurate",
    falseArticleInaccurate:
      "False - The article contains significant inaccuracies",
    additionalComments: "Additional Comments",
    optional: "Optional",
    provideAdditionalComments:
      "Provide any additional comments to support your vote...",
    submitVote: "Submit Vote",
    submittingVote: "Submitting Vote...",
    voteContributesToVerification:
      "Your vote will contribute to the final verification status of this article.",
    considerAllEvidence:
      "Please consider all available evidence before casting your vote.",

    // Token Economy
    earnTokens: "Earn Tokens",
    qualityAnalysisRewards:
      "Quality analyses earn more tokens. Higher accuracy ratings and detailed comments increase your rewards.",
    validationRewardsExplanation:
      "Your vote earns tokens based on your stake and reputation. Consensus with other validators increases rewards.",
    analysisSubmitted: "Analysis Submitted",
    yourAnalysisHasBeenSubmitted:
      "Your analysis has been submitted and is now available for validators to review.",
    validationSubmitted: "Validation Submitted",
    yourVoteHasBeenRecorded:
      "Your vote has been recorded and will contribute to the article's verification status.",
    youEarned: "You Earned",
    stakingOpportunity: "Staking Opportunity",
    stakeTokensForMoreInfluence:
      "Stake your tokens to increase your influence in the verification process and earn higher rewards.",
    stakeMoreTokensForGreaterRewards:
      "Stake more tokens to increase your voting power and earn greater rewards.",
    claimReward: "Claim Reward",
    analyzeAnotherArticle: "Analyze Another Article",
    validateAnotherArticle: "Validate Another Article",

    // Token Economy Component
    tokenEconomy: "Token Economy",
    manageTokensAndStaking: "Manage your ETH tokens and staking",
    balance: "Balance",
    staked: "Staked",
    rewards: "Rewards",
    stakingAPY: "Staking APY",
    stake: "Stake",
    unstake: "Unstake",
    amountToStake: "Amount to Stake",
    amountToUnstake: "Amount to Unstake",
    stakingIncreasesInfluence:
      "Staking increases your influence in the verification process and earns rewards.",
    unstakingReducesInfluence:
      "Unstaking reduces your influence but allows you to use your tokens elsewhere.",
    availableRewards: "Available Rewards",
    rewardsEarnedBasedOn:
      "Rewards are earned based on your staking amount and platform contributions.",
    claimRewards: "Claim Rewards",
    lastUpdated: "Last updated",
    viewHistory: "View History",
    success: "Success",
    error: "Error",
    pendingRewardsClaimed: "Pending rewards claimed",

    // General
    sources: "Sources",
    expertAnalyses: "Expert Analyses",
    credibilityScore: "Credibility Score",
    rating: "rating",
    analyzed: "Analyzed",
  },
  es: {
    // Navigation
    home: "Inicio",
    news: "Noticias",
    about: "Acerca de",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    dashboard: "Panel",
    profile: "Perfil",

    // Dashboard
    analysisQueue: "Cola de análisis",
    validationQueue: "Cola de validación",
    analyzeArticle: "Analizar artículo",
    validateArticle: "Validar artículo",

    // Article Analysis
    analyzeThisArticle: "Analizar este artículo",
    rateArticleAccuracy:
      "Califica la precisión del artículo y proporciona tu análisis experto",
    accuracyRating: "Calificación de precisión",
    inaccurate: "Impreciso",
    accurate: "Preciso",
    analysisComments: "Comentarios de análisis",
    provideDetailedAnalysis:
      "Proporciona tu análisis detallado sobre la precisión del artículo, las fuentes y cualquier posible sesgo u omisión...",
    sourceEvaluation: "Evaluación de fuentes",
    evaluateSourceCredibility:
      "Evalúa la credibilidad y relevancia de las fuentes citadas en el artículo...",
    submitAnalysis: "Enviar análisis",
    submittingAnalysis: "Enviando análisis...",
    analysisVisibleToValidators:
      "Tu análisis será visible para los validadores e influirá en el estado de verificación de este artículo.",
    beThoroughAndObjective:
      "Por favor, sé minucioso y objetivo en tu evaluación.",

    // Article Validation
    castYourVote: "Emite tu voto",
    basedOnArticleAndAnalyses:
      "Basado en el artículo y los análisis de expertos, ¿es este artículo verdadero o falso?",
    currentConsensus: "Consenso actual",
    trueArticleAccurate: "Verdadero - El artículo es preciso",
    falseArticleInaccurate:
      "Falso - El artículo contiene imprecisiones significativas",
    additionalComments: "Comentarios adicionales",
    optional: "Opcional",
    provideAdditionalComments:
      "Proporciona cualquier comentario adicional para respaldar tu voto...",
    submitVote: "Enviar voto",
    submittingVote: "Enviando voto...",
    voteContributesToVerification:
      "Tu voto contribuirá al estado de verificación final de este artículo.",
    considerAllEvidence:
      "Por favor, considera toda la evidencia disponible antes de emitir tu voto.",

    // Token Economy
    earnTokens: "Gana tokens",
    qualityAnalysisRewards:
      "Los análisis de calidad ganan más tokens. Las calificaciones de mayor precisión y los comentarios detallados aumentan tus recompensas.",
    validationRewardsExplanation:
      "Tu voto gana tokens según tu participación y reputación. El consenso con otros validadores aumenta las recompensas.",
    analysisSubmitted: "Análisis enviado",
    yourAnalysisHasBeenSubmitted:
      "Tu análisis ha sido enviado y ahora está disponible para que los validadores lo revisen.",
    validationSubmitted: "Validación enviada",
    yourVoteHasBeenRecorded:
      "Tu voto ha sido registrado y contribuirá al estado de verificación del artículo.",
    youEarned: "Has ganado",
    stakingOpportunity: "Oportunidad de staking",
    stakeTokensForMoreInfluence:
      "Haz staking de tus tokens para aumentar tu influencia en el proceso de verificación y ganar mayores recompensas.",
    stakeMoreTokensForGreaterRewards:
      "Haz staking de más tokens para aumentar tu poder de voto y ganar mayores recompensas.",
    claimReward: "Reclamar recompensa",
    analyzeAnotherArticle: "Analizar otro artículo",
    validateAnotherArticle: "Validar otro artículo",

    // Token Economy Component
    tokenEconomy: "Economía de tokens",
    manageTokensAndStaking: "Administra tus tokens ETH y staking",
    balance: "Saldo",
    staked: "En staking",
    rewards: "Recompensas",
    stakingAPY: "APY de staking",
    stake: "Hacer staking",
    unstake: "Retirar staking",
    amountToStake: "Cantidad para hacer staking",
    amountToUnstake: "Cantidad para retirar",
    stakingIncreasesInfluence:
      "El staking aumenta tu influencia en el proceso de verificación y genera recompensas.",
    unstakingReducesInfluence:
      "Retirar el staking reduce tu influencia pero te permite usar tus tokens en otro lugar.",
    availableRewards: "Recompensas disponibles",
    rewardsEarnedBasedOn:
      "Las recompensas se obtienen según tu cantidad en staking y contribuciones a la plataforma.",
    claimRewards: "Reclamar recompensas",
    lastUpdated: "Última actualización",
    viewHistory: "Ver historial",
    success: "Éxito",
    error: "Error",
    pendingRewardsClaimed: "Recompensas pendientes reclamadas",

    // General
    sources: "Fuentes",
    expertAnalyses: "Análisis de expertos",
    credibilityScore: "Puntuación de credibilidad",
    rating: "calificación",
    analyzed: "Analizado",
  },
  fr: {
    // Navigation
    home: "Accueil",
    news: "Actualités",
    about: "À propos",
    login: "Connexion",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    profile: "Profil",

    // Dashboard
    analysisQueue: "File d'analyse",
    validationQueue: "File de validation",
    analyzeArticle: "Analyser l'article",
    validateArticle: "Valider l'article",

    // Article Analysis
    analyzeThisArticle: "Analyser cet article",
    rateArticleAccuracy:
      "Évaluez la précision de l'article et fournissez votre analyse d'expert",
    accuracyRating: "Évaluation de précision",
    inaccurate: "Inexact",
    accurate: "Précis",
    analysisComments: "Commentaires d'analyse",
    provideDetailedAnalysis:
      "Fournissez votre analyse détaillée de la précision de l'article, des sources et de tout biais ou omission potentiel...",
    sourceEvaluation: "Évaluation des sources",
    evaluateSourceCredibility:
      "Évaluez la crédibilité et la pertinence des sources citées dans l'article...",
    submitAnalysis: "Soumettre l'analyse",
    submittingAnalysis: "Soumission de l'analyse...",
    analysisVisibleToValidators:
      "Votre analyse sera visible pour les validateurs et influencera le statut de vérification de cet article.",
    beThoroughAndObjective:
      "Veuillez être minutieux et objectif dans votre évaluation.",

    // Article Validation
    castYourVote: "Votez",
    basedOnArticleAndAnalyses:
      "Sur la base de l'article et des analyses d'experts, cet article est-il vrai ou faux?",
    currentConsensus: "Consensus actuel",
    trueArticleAccurate: "Vrai - L'article est précis",
    falseArticleInaccurate:
      "Faux - L'article contient des inexactitudes significatives",
    additionalComments: "Commentaires supplémentaires",
    optional: "Optionnel",
    provideAdditionalComments:
      "Fournissez des commentaires supplémentaires pour soutenir votre vote...",
    submitVote: "Soumettre le vote",
    submittingVote: "Soumission du vote...",
    voteContributesToVerification:
      "Votre vote contribuera au statut de vérification final de cet article.",
    considerAllEvidence:
      "Veuillez considérer toutes les preuves disponibles avant de voter.",

    // Token Economy
    earnTokens: "Gagnez des jetons",
    qualityAnalysisRewards:
      "Les analyses de qualité rapportent plus de jetons. Des évaluations de précision plus élevées et des commentaires détaillés augmentent vos récompenses.",
    validationRewardsExplanation:
      "Votre vote rapporte des jetons en fonction de votre mise et de votre réputation. Le consensus avec d'autres validateurs augmente les récompenses.",
    analysisSubmitted: "Analyse soumise",
    yourAnalysisHasBeenSubmitted:
      "Votre analyse a été soumise et est maintenant disponible pour que les validateurs l'examinent.",
    validationSubmitted: "Validation soumise",
    yourVoteHasBeenRecorded:
      "Votre vote a été enregistré et contribuera au statut de vérification de l'article.",
    youEarned: "Vous avez gagné",
    stakingOpportunity: "Opportunité de staking",
    stakeTokensForMoreInfluence:
      "Misez vos jetons pour augmenter votre influence dans le processus de vérification et gagner des récompenses plus élevées.",
    stakeMoreTokensForGreaterRewards:
      "Misez plus de jetons pour augmenter votre pouvoir de vote et gagner des récompenses plus importantes.",
    claimReward: "Réclamer la récompense",
    analyzeAnotherArticle: "Analyser un autre article",
    validateAnotherArticle: "Valider un autre article",

    // Token Economy Component
    tokenEconomy: "Économie de jetons",
    manageTokensAndStaking: "Gérez vos jetons ETH et votre staking",
    balance: "Solde",
    staked: "Misé",
    rewards: "Récompenses",
    stakingAPY: "APY de staking",
    stake: "Miser",
    unstake: "Retirer",
    amountToStake: "Montant à miser",
    amountToUnstake: "Montant à retirer",
    stakingIncreasesInfluence:
      "Le staking augmente votre influence dans le processus de vérification et génère des récompenses.",
    unstakingReducesInfluence:
      "Le retrait réduit votre influence mais vous permet d'utiliser vos jetons ailleurs.",
    availableRewards: "Récompenses disponibles",
    rewardsEarnedBasedOn:
      "Les récompenses sont gagnées en fonction de votre montant misé et de vos contributions à la plateforme.",
    claimRewards: "Réclamer les récompenses",
    lastUpdated: "Dernière mise à jour",
    viewHistory: "Voir l'historique",
    success: "Succès",
    error: "Erreur",
    pendingRewardsClaimed: "Récompenses en attente réclamées",

    // General
    sources: "Sources",
    expertAnalyses: "Analyses d'experts",
    credibilityScore: "Score de crédibilité",
    rating: "évaluation",
    analyzed: "Analysé",
  },
  // Add translations for other languages as needed
  de: {
    // Basic translations from before
    home: "Startseite",
    news: "Nachrichten",
    about: "Über uns",
    login: "Anmelden",
    logout: "Abmelden",
    dashboard: "Dashboard",
    profile: "Profil",
    // Add more German translations as needed
  },
  zh: {
    // Basic translations from before
    home: "首页",
    news: "新闻",
    about: "关于",
    login: "登录",
    logout: "登出",
    dashboard: "仪表板",
    profile: "个人资料",
    // Add more Chinese translations as needed
  },
  ar: {
    // Basic translations from before
    home: "الرئيسية",
    news: "الأخبار",
    about: "حول",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    dashboard: "لوحة التحكم",
    profile: "الملف الشخصي",
    // Add more Arabic translations as needed
  },
  hi: {
    // Basic translations from before
    home: "होम",
    news: "समाचार",
    about: "हमारे बारे में",
    login: "लॉगिन",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफाइल",
    // Add more Hindi translations as needed
  },
  ru: {
    // Basic translations from before
    home: "Главная",
    news: "Новости",
    about: "О нас",
    login: "Вход",
    logout: "Выход",
    dashboard: "Панель управления",
    profile: "Профиль",
    // Add more Russian translations as needed
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0]
  );

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      const language = languages.find((lang) => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      const language = languages.find((lang) => lang.code === browserLang);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem("language", language.code);
    document.documentElement.lang = language.code;
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(currentLanguage.code, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(currentLanguage.code).format(num);
  };

  const translate = (key: string) => {
    return (
      translations[currentLanguage.code]?.[key] || translations.en[key] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        formatDate,
        formatNumber,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
