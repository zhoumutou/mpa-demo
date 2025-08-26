import type { Config } from 'postcss-load-config'
import PostcssPresetEnv from 'postcss-preset-env'
import PostcssWrapLayer from '@zhoumutou/postcss-wrap-layer'

const config: Config = {
  plugins: [
    PostcssWrapLayer({
      rules: [
        {
          pattern: /[/\\]element-plus[/\\].*\.s?css/,
          layerName: 'vendor',
        },
      ],
    }),
    PostcssPresetEnv(),
  ],
}

export default config
