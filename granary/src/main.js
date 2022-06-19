import '@/css/common.scss'
import '@/layout/granary-detail/granary-detail.js'

import {renderer, css2Renderer, css3Renderer} from '@/js/renderer.js'


document.body.appendChild(renderer.domElement)
document.body.appendChild(css2Renderer.domElement)
document.body.appendChild(css3Renderer.domElement)
