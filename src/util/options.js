import i18n from '@/locales/i18n'

export const types = [
  { name: i18n.t('question.singleSel'), value: 'SINGLE_SEL' },
  { name: i18n.t('question.multiSel'), value: 'MULTI_SEL' },
  { name: i18n.t('question.judgement'), value: 'JUDGEMENT' },
  { name: i18n.t('question.fillBlank'), value: 'FILL_BLANK' },
  { name: i18n.t('question.essay'), value: 'ESSAY' },
  { name: i18n.t('question.program'), value: 'PROGRAM' }
]

export const sectionTypes = [
  { name: i18n.t('section.chapter'), value: 0 },
  { name: i18n.t('section.section'), value: 1 }
]
