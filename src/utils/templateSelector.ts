export function getTemplatesToGenerate(formState: any): string[] {
  const templates: string[] = [];

  templates.push('902.1e'); 

  const isHighRisk =
    !!formState.sanctionsInfo?.isPep ||
    formState.sanctionsInfo?.pepType === 'foreign' ||
    formState.sanctionsInfo?.pepType === 'international' ||
    !!formState.sanctionsInfo?.hasPepRelationship ||
    (formState.sanctionsInfo?.sanctionedCountries || []).length > 0 ||
    (formState.beneficialInfo?.beneficialOwners?.length || 0) > 1;

  if (isHighRisk) {
    templates.push('902.4e');
  }
  if (formState.clientType.includes('llc') || formState.clientType.includes('assoc')) {
    templates.push('902.5e'); 
    templates.push('902.9e'); 
    // templates.push('902.11e'); 
  }

  if (
    formState.controllingInfo &&
    formState.controllingInfo.controllingPersons &&
    formState.controllingInfo.controllingPersons.length > 0 &&
    !templates.includes('902.11e')
  ) {
    // templates.push('902.11e');
  }


  return templates;
} 