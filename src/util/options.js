import i18n from '@/locales/i18n'

export const types = [
  { name: i18n.t('question.singleSel'), value: 0 },
  { name: i18n.t('question.multiSel'), value: 1 },
  { name: i18n.t('question.judgement'), value: 2 },
  { name: i18n.t('question.fillBlank'), value: 3 },
  { name: i18n.t('question.essay'), value: 4 },
  { name: i18n.t('question.program'), value: 5 }
]

export const sectionTypes = [
  { name: i18n.t('section.chapter'), value: 0 },
  { name: i18n.t('section.section'), value: 1 }
]
