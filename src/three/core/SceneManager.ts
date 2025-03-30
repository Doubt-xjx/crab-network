import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  controls: OrbitControls;
  container: HTMLDivElement;
  initialCameraY: number; // 存储初始相机Y位置

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f8fa);
    
    // 设置渲染器 - 使用更高质量的设置
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // 启用阴影并使用更高质量的阴影类型
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // 启用更真实的渲染设置
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    
    container.appendChild(this.renderer.domElement);
    
    // 设置正交相机 (替换透视相机)
    const aspectRatio = container.clientWidth / container.clientHeight;
    const frustumSize = 25; // 视锥体大小
    
    this.camera = new THREE.OrthographicCamera(
      frustumSize * aspectRatio / -2,  // left
      frustumSize * aspectRatio / 2,   // right
      frustumSize / 2,                 // top
      frustumSize / -2,                // bottom
      0.1,                            // near
      2000                            // far
    );
    this.camera.position.set(5, 20, 10);
    this.initialCameraY = 20; // 存储初始Y位置用于后续限制
    
    // 设置轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 1.5;
    this.controls.minPolarAngle = Math.PI / 6;
    this.controls.enableZoom = true;
    this.controls.zoomSpeed = 0.5;
    // 对于正交相机，不使用距离限制，而是缩放限制
    this.controls.minZoom = 0.1;  
    this.controls.maxZoom = 5;
    
    // 启用自动旋转并设置速率为0.2
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.2;
    
    // 添加相机位置变化监听，限制Y轴范围
    this.controls.addEventListener('change', this.limitCameraY);
  }

  // 限制相机Y轴移动范围的函数
  limitCameraY = (): void => {
    const minY = this.initialCameraY - 2;
    const maxY = this.initialCameraY + 2;
    
    if (this.camera.position.y < minY) {
      this.camera.position.y = minY;
    } else if (this.camera.position.y > maxY) {
      this.camera.position.y = maxY;
    }
  }

  onWindowResize = (): void => {
    if (!this.container) return;
    
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const aspectRatio = width / height;
    const frustumSize = 20;
    
    // 更新正交相机参数
    this.camera.left = frustumSize * aspectRatio / -2;
    this.camera.right = frustumSize * aspectRatio / 2;
    this.camera.top = frustumSize / 2;
    this.camera.bottom = frustumSize / -2;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }

  render = (): void => {
    // 确保在每帧渲染前应用Y轴限制
    this.limitCameraY();
    
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  addObject(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  removeObject(object: THREE.Object3D): void {
    this.scene.remove(object);
  }

  dispose(): void {
    // 移除相机位置变化监听
    this.controls.removeEventListener('change', this.limitCameraY);
    
    window.removeEventListener('resize', this.onWindowResize);
    
    // 清理场景中的所有对象
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        if (object.geometry) object.geometry.dispose();
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
    
    this.renderer.dispose();
    this.controls.dispose();
    
    // 从DOM中移除渲染器
    if (this.container && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
} 