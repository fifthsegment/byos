export type ScreenType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export const getScreenType = (px: number): ScreenType => {
  if (px < 576) {
    return 'xs'
  } else if (px >= 576 && px < 768) {
    return 'md'
  } else if (px >= 768 && px < 992) {
    return 'lg'
  } else if (px >= 992 && px < 1200) {
    return 'xl'
  } else if (px >= 1200) {
    return 'xxl'
  }
}
