/**
 * @see https://css-tricks.com/how-to-get-all-custom-properties-on-a-page-in-javascript/
 */

const isSameDomain = (styleSheet) => {
  if (!styleSheet.href) {
    return true
  }

  return styleSheet.href.indexOf(window.location.origin) === 0
}

const isStyleRule = (rule) => rule.type === 1

export const getCSSCustomPropIndex = () =>
  [...document.styleSheets].filter(isSameDomain).reduce(
    (finalArr, sheet) =>
      finalArr.concat(
        [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
          const props = [...rule.style]
            .map((propName) => [
              propName.trim(),
              rule.style.getPropertyValue(propName).trim()
            ])
            .filter(([propName]) => propName.indexOf("--") === 0)

          return [...propValArr, ...props]
        }, [])
      ),
    []
  )