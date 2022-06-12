import * as THREE from 'three'
import phone from './phone.js'
import arc720 from './arc360.js'

const group = new THREE.Group()
group.add(phone)
group.add(arc720)
group.position.y += 12

export default group
