import '@/css/common.scss'
import '@/layout/button/index.js'
import '@/layout/rotate/index.js'
import '@/layout/tag/index.js'

import {renderer, css2Render, css3Render} from '@/js/renderer.js'


document.body.appendChild(renderer.domElement)
document.body.appendChild(css2Render.domElement)
document.body.appendChild(css3Render.domElement)

