import React from 'react'
import tw from 'twin.macro'
import { css } from 'styled-components/macro' //eslint-disable-line
import AnimationRevealPage from 'helpers/AnimationRevealPage.js'
import Hero from 'components/hero/TwoColumnWithInput.js'
import Features from 'components/features/ThreeColWithSideImage.js'
import GetStarted from 'components/cta/GetStarted'
import Footer from 'components/footers/MiniCenteredFooter.js'

import Tabs from 'components/tabs/Tabs.js'

export default () => {
  return (
    <AnimationRevealPage>
      <Hero roundedHeaderButton={true} />
      <Tabs />
      <Footer />
    </AnimationRevealPage>
  )
}
