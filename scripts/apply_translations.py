import json
import re

# Update types.ts
with open('src/i18n/types.ts', 'r', encoding='utf-8') as f:
    types_content = f.read()

# Add new fields to income, creators, ideas, ai, profile, footer, common
income_old = """    interactiveTrackBadge: string;
    openFullCourse: string;
  };"""

income_new = """    interactiveTrackBadge: string;
    openFullCourse: string;
    categoryHeader: string;
    trackUpgradedBadge: string;
    facelessPossible: string;
    beginnerFriendly: string;
    stepByStepTitle: string;
    advantagesTitle: string;
    challengesTitle: string;
    realityCheckTitle: string;
    topPathsTitle: string;
    browseAllPathsBtn: string;
    categoriesList: {
      all: string;
      contentCreation: string;
      freelancing: string;
      ecommerce: string;
      marketing: string;
      techAi: string;
      gaming: string;
      microServices: string;
    };
  };"""

creators_old = """    avgRpm: string;
    payoutMethods: string;
  };"""

creators_new = """    avgRpm: string;
    payoutMethods: string;
    growthTacticsTitle: string;
    topFormatsTitle: string;
    monetizationPolicies: string;
    payoutChannels: string;
    avgRpmLabel: string;
  };"""

ideas_old = """    openingHookTitle: string;
    scriptStructureTitle: string;
    closingCtaTitle: string;
  };"""

ideas_new = """    openingHookTitle: string;
    scriptStructureTitle: string;
    closingCtaTitle: string;
    libraryBadge: string;
    readyToPublish: string;
    openingHookCallout: string;
    copyHookBtn: string;
    hookCopied: string;
    ctaFormulaTitle: string;
    ctaCopied: string;
  };"""

ai_old = """    dismiss: string;
    activeAction: string;
    thinking: string;
  };"""

ai_new = """    dismiss: string;
    activeAction: string;
    thinking: string;
    unifiedTitle: string;
    chatStatus: string;
    multilingualSupport: string;
    howCanIHelp: string;
    howCanIHelpDesc: string;
    conversation: string;
    searchConversations: string;
    fileTooLarge: string;
    analyzeFile: string;
    responseCopied: string;
    nextActionSuggestions: string;
    activeActionLabel: string;
    pressEnterToSend: string;
    quickActionsBarTitle: string;
    quickActionsBarSubtitle: string;
    loadInChat: string;
  };"""

profile_old = """    savedPathsCount: string;
    savedIdeasCount: string;
  };"""

profile_new = """    savedPathsCount: string;
    savedIdeasCount: string;
    accountTitle: string;
    accountDesc: string;
    savedLearningPaths: string;
    savedContentIdeas: string;
    noSavedTitle: string;
    noSavedDesc: string;
  };"""

footer_old = """    disclaimer: string;
    rightsReserved: string;
    foundedBy: string;
  };"""

footer_new = """    disclaimer: string;
    rightsReserved: string;
    foundedBy: string;
    brandDescription: string;
    statsSummary: string;
    founderCredit: string;
  };"""

common_old = """    sponsored: string;
    sponsorSpace: string;
  };"""

common_new = """    sponsored: string;
    sponsorSpace: string;
    savedItems: string;
    view: string;
    copy: string;
    sponsoredPartner: string;
    freeTier: string;
    resetFilters: string;
    notFound: string;
    notFoundDesc: string;
  };"""

types_content = types_content.replace(income_old, income_new)
types_content = types_content.replace(creators_old, creators_new)
types_content = types_content.replace(ideas_old, ideas_new)
types_content = types_content.replace(ai_old, ai_new)
types_content = types_content.replace(profile_old, profile_new)
types_content = types_content.replace(footer_old, footer_new)
types_content = types_content.replace(common_old, common_new)

with open('src/i18n/types.ts', 'w', encoding='utf-8') as f:
    f.write(types_content)

print('types.ts updated successfully!')
